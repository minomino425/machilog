import { useState, Dispatch, SetStateAction, ReactElement } from "react";
import Link from "next/link";

export default function Shop(props: {
  id: number;
  shop_name: string;
  imageUrl: string;
}) {

  const id = props.id;
  const shop_name = props.shop_name;
  const imageUrl = props.imageUrl;

  return (
    <>
        <Link href={`/detail/${id}`} passHref className="text-center">
          <img src={imageUrl} alt={shop_name} className="w-36 h-36 block [clip-path:circle(40%)]" />
          <span className="block text-[14px] font-[600] tracking-wider">{shop_name}</span>
        </Link>
    </>
  );
}
