'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Header from '../../../components/header';
import { getShopInfoById } from '../../../components/api';
import Upload from '../../../components/upload';
import EditData from '../../../components/editData';

type shopInfoType = {
  created_at: string;
  id: number;
  shop_genre: string | null;
  shop_name: string | null;
  shop_review: string | null;
  imageUrl: string | null;
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
      setShopInfo(data);
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
    <div>
      <Header shop_name={shopInfo.shop_name} />
      <p>{shopInfo.shop_review}</p>
      <img
        src={shopInfo.imageUrl ?? ''}
        alt={shopInfo.shop_name ?? ''}
        className="block h-36 w-36 [clip-path:circle(45%)]"
      />
      <p>
        最終更新日時：{new Date(shopInfo.created_at).toLocaleString('ja-JP')}
      </p>
      <EditData
        id={shopInfo.id}
        shop_name={shopInfo.shop_name}
        created_at={shopInfo.created_at}
      />
    </div>
  );
}
