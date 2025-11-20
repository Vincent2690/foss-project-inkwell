import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export const useBookmarks = () => {
  const { user } = useAuth();
  const [bookmarkedHostels, setBookmarkedHostels] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchBookmarks();
      
      // Set up real-time subscription
      const channel = supabase
        .channel('bookmarks-changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'bookmarks',
            filter: `student_id=eq.${user.id}`
          },
          () => {
            fetchBookmarks();
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    } else {
      setBookmarkedHostels([]);
      setLoading(false);
    }
  }, [user]);

  const fetchBookmarks = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('bookmarks')
        .select('hostel_id')
        .eq('student_id', user.id);

      if (error) throw error;
      
      setBookmarkedHostels(data?.map(b => b.hostel_id) || []);
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleBookmark = async (hostelId: string) => {
    if (!user) {
      toast.error("Please log in to bookmark hostels");
      return;
    }

    const isBookmarked = bookmarkedHostels.includes(hostelId);

    try {
      if (isBookmarked) {
        const { error } = await supabase
          .from('bookmarks')
          .delete()
          .eq('student_id', user.id)
          .eq('hostel_id', hostelId);

        if (error) throw error;
        toast.success("Removed from bookmarks");
      } else {
        const { error } = await supabase
          .from('bookmarks')
          .insert({
            student_id: user.id,
            hostel_id: hostelId
          });

        if (error) throw error;
        toast.success("Added to bookmarks");
      }
    } catch (error: any) {
      console.error('Error toggling bookmark:', error);
      toast.error(error.message || "Failed to update bookmark");
    }
  };

  const isBookmarked = (hostelId: string) => {
    return bookmarkedHostels.includes(hostelId);
  };

  return {
    bookmarkedHostels,
    loading,
    toggleBookmark,
    isBookmarked
  };
};
