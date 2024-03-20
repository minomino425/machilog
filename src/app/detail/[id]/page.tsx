"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getShopInfoById } from '../../../components/api';
import Upload from "../../../components/upload";
import EditData from "../../../components/editData";

export default function ShopDetailPage() {
  const params = useParams();
  console.log(params);
  //pathnameからidを取得
  const id = params?.id;
  // const { id } = pathname;
  const [shopInfo, setShopInfo] = useState<any>(null);

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  const fetchData = async () => {
    try {
      const data = await getShopInfoById(Number(id));
      setShopInfo(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  if (!shopInfo) {
    return (
      <p>
        Loading...
      </p>
    );
  }

  if (!id) {
    return null;
  }

  return (
      <div>
        <h1>{shopInfo.shop_name}</h1>
        <p>{shopInfo.shop_review}</p>
        <Upload id={shopInfo.id}/>
        <p>最終更新日時：{new Date(shopInfo.created_at).toLocaleString("ja-JP")}</p>
        <EditData id={shopInfo.id} shop_name={shopInfo.shop_name} created_at={shopInfo.created_at} shopList={shopInfo.shopList}/>
      </div>
  );
}
