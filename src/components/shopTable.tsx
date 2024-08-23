'use client';
import AddShop from './addShop';
import getData from './getData';
import { ReactElement, useState, useEffect } from 'react';

export default function ShopTable() {
  const [shopList, setShopList] = useState<Array<ReactElement>>([]);

  useEffect(() => {
    getData(setShopList);
  }, []);

  return (
    <>
      <div className="relative mb-8 max-w-[355px] rounded-3xl border-2 border-[#090A0A] bg-white">
        <div className="relative min-h-[70vh] p-5">
          <ul className="flex flex-wrap justify-between gap-y-9">{shopList}</ul>
        </div>
        <AddShop />
      </div>
    </>
  );
}
