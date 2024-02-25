import { supabase } from "@/utils/supabase";
import Task from "./task";
import { Dispatch, SetStateAction, ReactElement } from "react";

export default async function getData(
  taskList: Dispatch<SetStateAction<Array<ReactElement>>>
) {
  const tmpTaskList = [];
  try {
    let { data: shopInfo, error } = await supabase.from("shopInfo").select("*");
    if (error) {
      console.log(error);
    }

    if (shopInfo != null) {
      for (let index = 0; index < shopInfo.length; index++) {
        tmpTaskList.push(
          <li
            className="flex items-center justify-between py-2"
            key={shopInfo[index]["id"]}
          >
            <Task
              taskList={taskList}
              id={shopInfo[index]["id"]}
              shop_name={shopInfo[index]["shop_name"] ?? ""}
              created_at={shopInfo[index]["created_at"] ?? ""}
            ></Task>
          </li>
        );
      }
      taskList(tmpTaskList);
    }
  } catch (error) {
    console.log(error);
  }
}
