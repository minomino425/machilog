// getData.tsx

import { Dispatch, SetStateAction, ReactElement } from "react";
import { supabase } from "@/utils/supabase";
import Task from "./task";

// データ取得とタスクリストの更新を行う関数
export default async function getData(
  taskList: Dispatch<SetStateAction<Array<ReactElement>>>
) {
  try {
    const { data: shopInfo, error } = await supabase.from("shopInfo").select("*");
    if (error) {
      throw error;
    }

    if (shopInfo != null) {
      const tmpTaskList: ReactElement[] = shopInfo.map((shop: any) => (
        <li
          className="flex items-center justify-between py-2"
          key={shop.id}
        >
            <Task
              taskList={taskList}
              id={shop.id}
              shop_name={shop.shop_name ?? ""}
              created_at={shop.created_at ?? ""}
            />
        </li>
      ));

      taskList(tmpTaskList); // taskListを更新
    }
  } catch (error) {
    console.log("Error fetching data:", error);
  }
}
