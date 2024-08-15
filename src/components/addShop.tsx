import { useState } from 'react';
import AddDialog from './addDialog';

export default function AddShop() {
  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <>
      <button
        type="button"
        className="absolute -bottom-5 -right-2 grid h-20 w-20 place-items-center rounded-full border-2 border-[#090A0A] bg-[#FDFF89]"
        onClick={() => setShowEditModal(true)}
      >
        <svg
          width="23"
          height="23"
          viewBox="0 0 23 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 11.8162H22"
            stroke="#090A0A"
            stroke-width="2"
            stroke-linecap="round"
          />
          <path
            d="M11.18 22V1"
            stroke="#090A0A"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
      </button>
      {showEditModal ? (
        <AddDialog showModal={setShowEditModal}></AddDialog>
      ) : null}
    </>
  );
}
