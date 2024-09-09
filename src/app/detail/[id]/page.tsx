'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Header from '../../../components/header';
import { getShopInfoById } from '../../../components/api';

type shopInfoType = {
  created_at: string;
  id: number;
  shop_name: string | null;
  shop_review: string | null;
  favorite_menus: string[] | null; // favorite_menus を文字列の配列に変更
  imageUrl: string | null;
  instagram_id: string | null;
} | null;

export default function ShopDetailPage() {
  const params = useParams();
  const id = params?.id;
  const [shopInfo, setShopInfo] = useState<shopInfoType | null>(null);

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  const fetchData = async () => {
    try {
      const data = await getShopInfoById(Number(id));
      console.log(data); // デバッグ用
      setShopInfo(data as shopInfoType);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  if (!shopInfo) {
    return <p>Loading...</p>;
  }

  if (!id) {
    return null;
  }

  return (
    <>
      <div>
        {shopInfo.instagram_id ? (
          <Header
            id={shopInfo.id}
            shop_name={shopInfo.shop_name}
            instagram_id={shopInfo.instagram_id}
          />
        ) : (
          <Header id={shopInfo.id} shop_name={shopInfo.shop_name} />
        )}
        <div className="mt-2 flex justify-center">
          <img
            src={shopInfo.imageUrl ?? ''}
            alt={shopInfo.shop_name ?? ''}
            className="block h-48 w-48 [clip-path:circle(45%)]"
          />
        </div>
        <div className="mx-auto mb-8 mt-4 max-w-[355px] rounded-3xl border-2 border-[#090A0A] bg-white px-4 py-6">
          <div className="mb-2">
            <p className="text-base font-medium tracking-wider">
              🍭好きなメニュー
            </p>
            {shopInfo.favorite_menus && shopInfo.favorite_menus.length > 0 ? (
              shopInfo.favorite_menus.map((menu, index) => (
                <p key={index} className="mt-1 text-sm tracking-wider">
                  {menu} {/* menu.value ではなく menu とする */}
                </p>
              ))
            ) : (
              <p className="mt-1 text-sm tracking-wider">
                メニューが登録されていません。
              </p>
            )}
          </div>
          <div className="mb-2">
            <p className="text-base font-medium tracking-wider">
              🍒好きポイント
            </p>
            <p className="mt-1 text-sm tracking-wider">
              {shopInfo.shop_review || 'レビューがありません。'}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
