"use client";
import { useState, Dispatch, SetStateAction, ReactElement } from "react";
import Upload from "./upload";
import EditData from "./editData";
import Link from "next/link";

export default function Task(props: {
  id: number;
  shop_name: string;
  created_at: string;
  taskList: Dispatch<SetStateAction<Array<ReactElement>>>;
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
        <Upload />
        <p className="text-xs text-gray-400">
          最終更新日時：{last_update.toLocaleString("ja-JP")}
        </p>
      </div>
      <EditData id={id} shop_name={shop_name} created_at={created_at} taskList={props.taskList}/>
    </>
  );
}
