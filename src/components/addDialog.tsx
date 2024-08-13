import { supabase } from "@/utils/supabase";
import { Dispatch, SetStateAction, ReactElement, useState } from "react";
import Upload from "./upload";

export default function AddDialog(props: { showModal: Dispatch<SetStateAction<boolean>>;
}) {
  const { showModal } = props;
  const [shop_name, setText] = useState("");
  const [shop_review, setReview] = useState("");

  const onSubmit = async (event: any) => {
    event.preventDefault();
    showModal(false);
    try {
      const { data, error } = await supabase
        .from("shopInfo")
        .insert({ shop_name: shop_name, shop_review: shop_review})
        .select();
      if (error) {
        console.log(error);
      } else {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full h-screen bg-black-rgba pt-28">
      <div className="m-auto relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg max-w-355">
          <div className="flex items-center p-4 md:p-5 border-b rounded-t">
            <h3 className="text-xl font-semibold text-gray-900">追加</h3>
            <button
              type="button"
              className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              data-modal-hide="authentication-modal"
              onClick={() => showModal(false)}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">モーダルを閉じる</span>
            </button>
          </div>
          <div className="p-4 md:p-5">
          <form className="mt-4" onSubmit={onSubmit}>
            <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-2 py-1"
                placeholder="店名を入力してください"
                required
                value={shop_name}
                onChange={(e) => setText(e.target.value)}
            />
            <textarea
                  name="text"
                  id="review"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                  value={shop_review}
                  placeholder="レビューを入力してください"
                  onChange={(e) => setReview(e.target.value)}
                />
            <button
                type="submit"
                className="mt-2 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg px-4"
            >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="26.4235" height="1.64275" rx="0.821374" transform="matrix(0.716824 0.697255 -0.586356 0.810053 1.05908 0)" fill="black"/>
                  <path d="M0.481517 19.3346C0.747507 19.7021 1.22674 19.7436 1.55192 19.4273L19.3153 2.14879C19.6405 1.8325 19.6885 1.2782 19.4225 0.91073C19.1565 0.543263 18.6773 0.501783 18.3521 0.818081L0.58868 18.0966C0.263506 18.4129 0.215527 18.9672 0.481517 19.3346Z" fill="black"/>
                </svg>
            </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
