import { useState } from "react";
import AddDialog from "./addDialog";

export default function AddShop (){
  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <>
    <button
          type="button"
          className="w-9 text-blue-500 hover:text-blue-600"
          onClick={() => setShowEditModal(true)}
        >
      追加
        </button>
    {showEditModal ? (
      <AddDialog
        showModal={setShowEditModal}
      ></AddDialog>
    ) : null}
    </>
  );
}
