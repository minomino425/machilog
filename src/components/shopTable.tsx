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
    <div className="sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/3 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-4">
        <h1 className="text-xl font-bold text-gray-800">マチログ</h1>
        <AddShop />
        <ul className="mt-4 divide-y divide-gray-200 flex flex-wrap">{shopList}</ul>
      </div>
    </div>
  );
}
