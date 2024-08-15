'use client';
import AddShop from './addShop';
import { ReactElement, useState, useEffect } from 'react';
import getData from './getData';

export default function ShopTable() {
  const [shopList, setShopList] = useState<Array<ReactElement>>([]);

  useEffect(() => {
    getData(setShopList);
  }, []);

  return (
    <div className="mb-8 max-w-[355px] rounded-3xl border-2 border-[#090A0A] bg-white">
      <div className="relative p-5">
        <AddShop />
        <ul className="flex flex-wrap justify-between gap-y-9">{shopList}</ul>
      </div>
    </div>
  );
}
