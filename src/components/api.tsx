import { supabase } from '@/utils/supabase';

type shopInfoType = {
  created_at: string;
  id: number;
  shop_genre: string | null;
  shop_name: string | null;
  shop_review: string | null;
  imageUrl: string | null;
};

export async function getShopInfoById(
  id: number,
): Promise<shopInfoType | null> {
  try {
    const { data, error } = await supabase
      .from('shopInfo')
      .select('*')
      .eq('id', id)
      .single();
    if (error) {
      throw error;
    }
    if (data) {
      const shopInfo: shopInfoType = {
        created_at: data.created_at,
        id: data.id,
        shop_genre: data.shop_genre,
        shop_name: data.shop_name,
        shop_review: data.shop_review,
        imageUrl: data.imageUrl,
      };
      return shopInfo;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching shop info:', error);
    return null;
  }
}
