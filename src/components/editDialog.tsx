import { supabase } from '@/utils/supabase';
import { Dispatch, SetStateAction, ReactElement, useState } from 'react';
import Upload from './upload';

export default function EditDialog(props: {
  id: number;
  showModal: Dispatch<SetStateAction<boolean>>;
}) {
  const { showModal } = props;
  const [shop_name, setText] = useState('');
  const [shop_review, setReview] = useState('');

  const onSubmit = async (event: any) => {
    event.preventDefault();
    showModal(false);
    try {
      const { data, error } = await supabase
        .from('shopInfo')
        .update({ shop_name: shop_name, shop_review: shop_review })
        .eq('id', props.id)
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
    <div className="bg-black-rgba fixed left-0 right-0 top-0 z-50 h-screen w-full items-center justify-center overflow-y-auto overflow-x-hidden pt-28">
      <div className="relative m-auto max-h-full w-full max-w-md p-4">
        <div className="relative rounded-lg bg-white shadow">
          <div className="flex items-center justify-between rounded-t border-b p-4 md:p-5">
            <h3 className="text-xl font-semibold text-gray-900">編集</h3>
            <button
              type="button"
              className="end-2.5 ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
              data-modal-hide="authentication-modal"
              onClick={() => showModal(false)}
            >
              <svg
                className="h-3 w-3"
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
            <form className="space-y-4" onSubmit={onSubmit}>
              <div>
                <input
                  type="text"
                  name="text"
                  id="text"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  value={shop_name}
                  placeholder="店名を入力してください"
                  onChange={(e) => setText(e.target.value)}
                />
                <textarea
                  name="text"
                  id="review"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  value={shop_review}
                  placeholder="レビューを入力してください"
                  onChange={(e) => setReview(e.target.value)}
                />
                <Upload id={props.id} />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full rounded-lg bg-blue-500 px-5 text-center text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                  保存
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
