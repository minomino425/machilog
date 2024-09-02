import { useState, Dispatch, SetStateAction, ReactElement } from 'react';
import EditDialog from './editDialog';
import RemoveDialog from './removeDialog';
type shopInfoType = {
  created_at: string;
  id: number;
  shop_name: string | null;
  shop_review: string | null;
  imageUrl: string | null;
} | null;

export default function editData(props: {
  id: number;
  shop_name: string | null;
  created_at: string | null;
}) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);

  const id = props.id;

  return (
    <>
      <div className="flex">
        <button
          type="button"
          className="w-9 text-blue-500 hover:text-blue-600"
          onClick={() => setShowEditModal(true)}
        >
          編集
        </button>
        <button
          type="button"
          className="ml-2 w-9 text-red-500 hover:text-red-600"
          onClick={() => setShowRemoveModal(true)}
        >
          削除
        </button>
      </div>
      {showEditModal ? (
        <EditDialog id={id} showModal={setShowEditModal}></EditDialog>
      ) : null}
      {showRemoveModal ? (
        <RemoveDialog id={id} showModal={setShowRemoveModal}></RemoveDialog>
      ) : null}
    </>
  );
}
