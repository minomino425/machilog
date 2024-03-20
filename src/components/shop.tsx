import { useState, Dispatch, SetStateAction, ReactElement } from "react";
import Link from "next/link";

export default function Shop(props: {
  id: number;
  shop_name: string;
  created_at: string;
  shopList: Dispatch<SetStateAction<Array<ReactElement>>>;
}) {

  const id = props.id;
  const shop_name = props.shop_name;
  const created_at = props.created_at;
  let last_update = new Date(created_at);

  return (
    <>
      <div>
        <Link href={`/detail/${id}`} passHref>
          <span className="text-gray-600 break-all">{shop_name}</span>
        </Link>
      </div>
    </>
  );
}
