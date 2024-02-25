"use client";
import { supabase } from "@/utils/supabase";
import { Dispatch, SetStateAction, ReactElement, useState } from "react";
import getData from "./getData";

export default function AddTask(props: {
  taskList: Dispatch<SetStateAction<Array<ReactElement>>>;
}) {
  const [shop_name, setText] = useState("");

  const onSubmit = async (event: any) => {
    event.preventDefault();
    try {
      let { data, error } = await supabase
        .from("shopInfo")
        .insert([{ shop_name: shop_name }])
        .select();
      if (error) {
        console.log(error);
      }

      await getData(props.taskList);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="mt-4" onSubmit={onSubmit}>
      <input
        type="text"
        className="w-full border border-gray-300 rounded-lg px-2 py-1"
        placeholder="店名を入力してください"
        required
        value={shop_name}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        type="submit"
        className="mt-2 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg px-4 py-2"
      >
        追加
      </button>
    </form>
  );
}
