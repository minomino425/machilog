import { useState, Dispatch, SetStateAction, ReactElement } from "react";
import Link from "next/link";

export default function Shop(props: {
  id: number;
  shop_name: string;
  imageUrl: string;
  shopList: Dispatch<SetStateAction<Array<ReactElement>>>;
}) {

  const id = props.id;
  const shop_name = props.shop_name;
  const imageUrl = props.imageUrl;

  return (
    <>
      <div>
        <Link href={`/detail/${id}`} passHref>
          <span className="text-gray-600 break-all">{shop_name}</span>
          <img src={imageUrl} alt={shop_name} className="w-40 h-40 block ml-2" />
        </Link>
      </div>
    </>
  );
}
