import { supabase } from "@/utils/supabase";
import { Dispatch, SetStateAction, ReactElement, useState } from "react";

export default function AddDialog(props: { showModal: Dispatch<SetStateAction<boolean>>;
}) {
  const { showModal } = props;
  const [shop_name, setText] = useState("");
  const [shop_review, setReview] = useState("");
  const [favorite_menu_01, setMenu01] = useState("");
  const [favorite_menu_02, setMenu02] = useState("");
  const [favorite_menu_03, setMenu03] = useState("");
  const [instagram_id, setInstagramId] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const onSubmit = async (event: any) => {
    event.preventDefault();
    showModal(false);
    try {
      const { data, error } = await supabase
        .from("shopInfo")
        .insert({ shop_name: shop_name, shop_review: shop_review, favorite_menu_01: favorite_menu_01, favorite_menu_02: favorite_menu_02, favorite_menu_03: favorite_menu_03, instagram_id: instagram_id, image_url: imageUrl })
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
            <input
                type="file"
                className="w-full border border-gray-300 rounded-lg px-2 py-1"
                placeholder="画像を選択してください"
                required
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
            />
            <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-2 py-1"
                placeholder="Instagram IDを入力してください"
                required
                value={instagram_id}
                onChange={(e) => setInstagramId(e.target.value)}
            />
            <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-2 py-1"
                placeholder="好きなメニューを入力してください"
                required
                value={favorite_menu_01}
                onChange={(e) => setMenu01(e.target.value)}
            />
            <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-2 py-1"
                placeholder="好きなメニューを入力してください"
                required
                value={favorite_menu_02}
                onChange={(e) => setMenu02(e.target.value)}
            />
            <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-2 py-1"
                placeholder="好きなメニューを入力してください"
                required
                value={favorite_menu_03}
                onChange={(e) => setMenu03(e.target.value)}
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
                変更を保存
            </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
