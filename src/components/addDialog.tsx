import { supabase } from '@/utils/supabase';
import { Dispatch, SetStateAction, useState } from 'react';

export default function AddDialog(props: {
  showModal: Dispatch<SetStateAction<boolean>>;
}) {
  const { showModal } = props;
  const [shop_name, setText] = useState('');
  const [shop_review, setReview] = useState('');
  const [favorite_menu_01, setMenu01] = useState('');
  const [favorite_menu_02, setMenu02] = useState('');
  const [favorite_menu_03, setMenu03] = useState('');
  const [menus, setMenus] = useState(['']);
  const [instagram_id, setInstagramId] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  const uploadImage = async () => {
    if (!imageFile) return null;
    const fileName = `${Date.now()}_${imageFile.name}`;
    const { data, error } = await supabase.storage
      .from('pictures') // あなたのバケット名
      .upload(fileName, imageFile);

    if (error) {
      console.error(error);
      return null;
    }

    const { data: publicUrlData } = await supabase.storage
      .from('pictures')
      .getPublicUrl(fileName);
    const publicUrl = publicUrlData.publicUrl;
    return publicUrl;
  };

  const handleAddMenu = () => {
    setMenus([...menus, '']);
  };

  const handleMenuChange = (index: number, value: string) => {
    const updatedMenus = [...menus];
    updatedMenus[index] = value;
    setMenus(updatedMenus);
  };

  const handleRemoveMenu = (index: number) => {
    const updatedMenus = menus.filter((_, i) => i !== index);
    setMenus(updatedMenus);
  };

  const onSubmit = async (event: any) => {
    event.preventDefault();
    showModal(false);

    try {
      const image_url = await uploadImage();

      const { data, error } = await supabase
        .from('shopInfo')
        .insert({
          shop_name: shop_name,
          shop_review: shop_review,
          favorite_menu_01: favorite_menu_01,
          favorite_menu_02: favorite_menu_02,
          favorite_menu_03: favorite_menu_03,
          instagram_id: instagram_id,
          imageUrl: image_url,
        })
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
        <div className="max-w-355 relative rounded-lg border-2 border-[#090A0A] bg-white">
          <div className="flex items-center rounded-t md:p-5">
            <button
              type="button"
              className="end-2.5 ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
              onClick={() => showModal(false)}
            >
              <svg
                className="h-3 w-3"
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
            </button>
          </div>
          <div className="mx-auto w-[70%] pb-5">
            <form className="" onSubmit={onSubmit}>
              <div className="text-center">
                <label
                  htmlFor="image-upload"
                  className="mb-8 inline-block cursor-pointer"
                >
                  <div className="q flex h-32 w-32 items-center justify-center overflow-hidden rounded-full bg-gray-200">
                    {imageUrl ? (
                      <>
                        <div className="relative">
                          <img
                            src={imageUrl}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                          <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/40"></div>
                          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                            <svg
                              width="30"
                              height="27"
                              viewBox="0 0 30 27"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M15 21.75C16.875 21.75 18.4687 21.0937 19.7812 19.7812C21.0937 18.4687 21.75 16.875 21.75 15C21.75 13.125 21.0937 11.5312 19.7812 10.2187C18.4687 8.90625 16.875 8.25 15 8.25C13.125 8.25 11.5312 8.90625 10.2187 10.2187C8.90625 11.5312 8.25 13.125 8.25 15C8.25 16.875 8.90625 18.4687 10.2187 19.7812C11.5312 21.0937 13.125 21.75 15 21.75ZM15 18.75C13.95 18.75 13.0625 18.3875 12.3375 17.6625C11.6125 16.9375 11.25 16.05 11.25 15C11.25 13.95 11.6125 13.0625 12.3375 12.3375C13.0625 11.6125 13.95 11.25 15 11.25C16.05 11.25 16.9375 11.6125 17.6625 12.3375C18.3875 13.0625 18.75 13.95 18.75 15C18.75 16.05 18.3875 16.9375 17.6625 17.6625C16.9375 18.3875 16.05 18.75 15 18.75ZM3 27C2.175 27 1.46875 26.7062 0.88125 26.1187C0.29375 25.5312 0 24.825 0 24V6C0 5.175 0.29375 4.46875 0.88125 3.88125C1.46875 3.29375 2.175 3 3 3H7.725L10.5 0H19.5L22.275 3H27C27.825 3 28.5312 3.29375 29.1187 3.88125C29.7062 4.46875 30 5.175 30 6V24C30 24.825 29.7062 25.5312 29.1187 26.1187C28.5312 26.7062 27.825 27 27 27H3ZM3 24H27V6H20.925L18.1875 3H11.8125L9.075 6H3V24Z"
                                fill="white"
                              />
                            </svg>
                          </div>
                        </div>
                      </>
                    ) : (
                      <svg
                        width="30"
                        height="27"
                        viewBox="0 0 30 27"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15 21.75C16.875 21.75 18.4687 21.0937 19.7812 19.7812C21.0937 18.4687 21.75 16.875 21.75 15C21.75 13.125 21.0937 11.5312 19.7812 10.2187C18.4687 8.90625 16.875 8.25 15 8.25C13.125 8.25 11.5312 8.90625 10.2187 10.2187C8.90625 11.5312 8.25 13.125 8.25 15C8.25 16.875 8.90625 18.4687 10.2187 19.7812C11.5312 21.0937 13.125 21.75 15 21.75ZM15 18.75C13.95 18.75 13.0625 18.3875 12.3375 17.6625C11.6125 16.9375 11.25 16.05 11.25 15C11.25 13.95 11.6125 13.0625 12.3375 12.3375C13.0625 11.6125 13.95 11.25 15 11.25C16.05 11.25 16.9375 11.6125 17.6625 12.3375C18.3875 13.0625 18.75 13.95 18.75 15C18.75 16.05 18.3875 16.9375 17.6625 17.6625C16.9375 18.3875 16.05 18.75 15 18.75ZM3 27C2.175 27 1.46875 26.7062 0.88125 26.1187C0.29375 25.5312 0 24.825 0 24V6C0 5.175 0.29375 4.46875 0.88125 3.88125C1.46875 3.29375 2.175 3 3 3H7.725L10.5 0H19.5L22.275 3H27C27.825 3 28.5312 3.29375 29.1187 3.88125C29.7062 4.46875 30 5.175 30 6V24C30 24.825 29.7062 25.5312 29.1187 26.1187C28.5312 26.7062 27.825 27 27 27H3ZM3 24H27V6H20.925L18.1875 3H11.8125L9.075 6H3V24Z"
                          fill="white"
                        />
                      </svg>
                    )}
                  </div>
                </label>
              </div>
              <div className="mb-4">
                <label htmlFor="shop_name" className="block font-semibold">
                  店名
                </label>
                <input
                  id="shop_name"
                  type="text"
                  className="w-full rounded-lg border border-gray-300 px-2 py-1"
                  placeholder="店名を入力してください"
                  required
                  value={shop_name}
                  onChange={(e) => setText(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="instagram_id" className="block font-semibold">
                  Instagram ID
                </label>
                <input
                  id="instagram_id"
                  type="text"
                  className="w-full rounded-lg border border-gray-300 px-2 py-1"
                  placeholder="Instagram IDを入力してください"
                  required
                  value={instagram_id}
                  onChange={(e) => setInstagramId(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="favorite_menu" className="block font-semibold">
                  好きなメニュー
                </label>
                {menus.map((menu, index) => (
                  <div key={index} className="relative mb-4">
                    <input
                      id={`favorite_menu_${index + 1}`}
                      type="text"
                      className="w-full rounded-lg border border-gray-300 px-2 py-1"
                      placeholder="好きなメニューを入力してください"
                      value={menu}
                      onChange={(e) => handleMenuChange(index, e.target.value)}
                    />
                    {menus.length > 1 && (
                      <button
                        type="button"
                        className="absolute right-2 top-1/2 -translate-y-1/2 transform text-red-500"
                        onClick={() => handleRemoveMenu(index)}
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
                {menus.length < 3 && (
                  <button
                    type="button"
                    className="rounded-lg bg-blue-500 px-4 py-2 text-white"
                    onClick={handleAddMenu}
                  >
                    +
                  </button>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="shop_review" className="block font-semibold">
                  レビュー
                </label>
                <textarea
                  id="shop_review"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                  placeholder="レビューを入力してください"
                  required
                  value={shop_review}
                  onChange={(e) => setReview(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="mt-2 w-full rounded-lg bg-blue-500 px-4 font-semibold text-white hover:bg-blue-600"
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
