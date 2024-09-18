import { supabase } from '@/utils/supabase';
import { Dispatch, SetStateAction, ReactElement } from 'react';
import { useRouter } from 'next/navigation';

export default function RemoveDialog(props: {
  id: number;
  showModal: Dispatch<SetStateAction<boolean>>;
}) {
  const { showModal } = props;
  const router = useRouter();
  const onSubmit = async (event: any) => {
    event.preventDefault();
    showModal(false);
    try {
      const { error } = await supabase
        .from('shopInfo')
        .delete()
        .eq('id', props.id);
      if (error) {
        console.log(error);
      }
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-black-rgba fixed left-0 right-0 top-0 z-50 h-screen w-full items-center justify-center overflow-y-auto overflow-x-hidden pt-28">
      <div className="relative m-auto max-h-full w-full max-w-md p-4">
        <div className="relative rounded-lg bg-white shadow">
          <div className="flex items-center justify-between rounded-t border-b p-4 md:p-5">
            <h3 className="text-xl font-semibold text-gray-900">
              このお店を削除します。よろしいですか？
            </h3>
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
            <div className="flex">
              <form className="w-1/2" onSubmit={onSubmit}>
                <button
                  type="submit"
                  className="w-full rounded-lg bg-blue-500 px-5 text-center text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                  削除
                </button>
              </form>
              <button
                className="ml-2 w-1/2 rounded-lg bg-gray-400 px-5 text-center text-sm font-medium text-white hover:bg-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-300"
                onClick={() => showModal(false)}
              >
                キャンセル
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
