"use client";
import AddShop from "./addShop";
import { ReactElement, useState, useEffect } from "react";
import getData from "./getData";

export default function ShopTable() {
  const [shopList, setShopList] = useState<Array<ReactElement>>([]);

  useEffect(() => {
    getData(setShopList);
  }, []);

  return (
    <div className="bg-white rounded-3xl max-w-[355px] border-2 border-[#090A0A] mb-8">
      <div className="p-5">
        <AddShop />
        <ul className="flex justify-between flex-wrap gap-y-9">{shopList}</ul>
      </div>
    </div>
  );
}
