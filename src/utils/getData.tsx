import { Dispatch, SetStateAction, ReactElement } from 'react';
import { supabase } from '@/utils/supabase';
import Shop from '@/components/organisms/shop';

export default async function getData(
  shopList: Dispatch<SetStateAction<Array<ReactElement>>>,
) {
  try {
    const { data: shopInfo, error } = await supabase
      .from('shopInfo')
      .select('*');
    if (error) {
      throw error;
    }

    if (shopInfo != null) {
      const tmpShopList: ReactElement[] = shopInfo.map((shop: any) => (
        <li className="flex items-center" key={shop.id}>
          <Shop
            id={shop.id}
            shop_name={shop.shop_name ?? ''}
            imageUrl={shop.imageUrl ?? ''}
          />
        </li>
      ));

      shopList(tmpShopList);
    }
  } catch (error) {
    console.log('Error fetching data:', error);
  }
}
