import { supabase } from "@/utils/supabase";

export async function getShopInfoById(id: number) {
  try {
    const { data, error } = await supabase
      .from("shopInfo")
      .select("*")
      .eq("id", id)
      .single();
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error('Error fetching shop info:', error);
    return null;
  }
}
