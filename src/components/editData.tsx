import { useState, Dispatch, SetStateAction, ReactElement } from 'react';
import EditDialog from './editDialog';
import RemoveDialog from './removeDialog';
type shopInfoType = {
  id: number;
  shop_name: string | null;
  shop_review: string | null;
  imageUrl: string | null;
} | null;

export default function editData(props: {
  id: number;
  shop_name: string | null;
}) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);

  const id = props.id;

  return (
    <>
      <div className="absolute right-1 top-10 z-10 w-[103px] rounded-xl border-2 border-[#090A0A] bg-white p-2">
        <p
          className="flex items-center gap-2"
          onClick={() => setShowEditModal(true)}
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.125 11.875H4.01562L10.125 5.76562L9.23438 4.875L3.125 10.9844V11.875ZM1.875 13.125V10.4688L10.125 2.23438C10.25 2.11979 10.388 2.03125 10.5391 1.96875C10.6901 1.90625 10.849 1.875 11.0156 1.875C11.1823 1.875 11.3438 1.90625 11.5 1.96875C11.6562 2.03125 11.7917 2.125 11.9062 2.25L12.7656 3.125C12.8906 3.23958 12.9818 3.375 13.0391 3.53125C13.0964 3.6875 13.125 3.84375 13.125 4C13.125 4.16667 13.0964 4.32552 13.0391 4.47656C12.9818 4.6276 12.8906 4.76562 12.7656 4.89062L4.53125 13.125H1.875ZM9.67188 5.32812L9.23438 4.875L10.125 5.76562L9.67188 5.32812Z"
              fill="#090A0A"
            />
          </svg>
          <span className="text-sm">編集する</span>
        </p>
        <p
          className="mt-1 flex items-center gap-2"
          onClick={() => setShowRemoveModal(true)}
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.41175 12.9412C4.04778 12.9412 3.7362 12.826 3.477 12.5956C3.21781 12.3652 3.08822 12.0882 3.08822 11.7647V4.11762H2.42645V2.94115H5.73528V2.35292H9.70586V2.94115H13.0147V4.11762H12.3529V11.7647C12.3529 12.0882 12.2233 12.3652 11.9641 12.5956C11.7049 12.826 11.3934 12.9412 11.0294 12.9412H4.41175ZM11.0294 4.11762H4.41175V11.7647H11.0294V4.11762ZM5.73528 10.5882H7.05881V5.29409H5.73528V10.5882ZM8.38234 10.5882H9.70586V5.29409H8.38234V10.5882Z"
              fill="#090A0A"
            />
          </svg>
          <span className="text-sm">削除する</span>
        </p>
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
