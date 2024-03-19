// pages/[id].tsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getShopInfoById } from '../../components/api';

export default function TaskDetailPage() {
  const router = useRouter();
  const { id } = router.query;
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
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{shopInfo.shop_name}</h1>
      <p>{shopInfo.shop_review}</p>
      <p>最終更新日時：{new Date(shopInfo.created_at).toLocaleString("ja-JP")}</p>
    </div>
  );
}
