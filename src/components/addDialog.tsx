import { supabase } from '@/utils/supabase';
import { Dispatch, SetStateAction, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';

type FormValues = {
  shop_name: string;
  shop_review: string;
  favorite_menus: { value: string }[];
  instagram_id: string;
  imageUrl: FileList;
};

export default function AddDialog(props: {
  showModal: Dispatch<SetStateAction<boolean>>;
}) {
  const { showModal } = props;
  const [imageUrl, setImageUrl] = useState('');
  const { register, handleSubmit, control, reset } = useForm<FormValues>({
    defaultValues: {
      shop_name: '',
      instagram_id: '',
      shop_review: '',
      favorite_menus: [{ value: '' }],
    },
  });
  const { fields, append, remove } = useFieldArray<FormValues>({
    control,
    name: 'favorite_menus',
  });

  const uploadImage = async (imageFile: File | null) => {
    if (!imageFile) return null;
    const fileName = `${Date.now()}_${imageFile.name}`;
    const { data, error } = await supabase.storage
      .from('pictures')
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

  const onSubmit = async (data: FormValues) => {
    showModal(false);

    try {
      const imageFile = data.imageUrl[0];
      const image_url = await uploadImage(imageFile);

      console.log(image_url);

      const { data: supabaseData, error } = await supabase
        .from('shopInfo')
        .insert({
          shop_name: data.shop_name,
          shop_review: data.shop_review,
          favorite_menus: data.favorite_menus,
          instagram_id: data.instagram_id,
          imageUrl: image_url,
        })
        .select();

      if (error) {
        console.log(error);
      } else {
        reset();
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-black-rgba fixed  inset-0 z-20 flex items-center justify-center">
      <div className="relative w-full p-4">
        <div className="relative h-[75vh] max-w-[355px] rounded-lg border-2 border-[#090A0A] bg-white pt-3">
          <div className="mr-2 flex items-center rounded-t md:p-5">
            <button
              type="button"
              className="ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
              onClick={() => showModal(false)}
            >
              <svg
                className="h-4 w-4"
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
          <div className="mx-auto h-[90%] w-[70%] overflow-x-hidden">
            <form className="" onSubmit={handleSubmit(onSubmit)}>
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
                          fill="#666666"
                        />
                      </svg>
                    )}
                  </div>
                </label>
                <input
                  {...register('imageUrl')}
                  id="image-upload"
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setImageUrl(URL.createObjectURL(e.target.files[0]));
                    }
                  }}
                />
              </div>
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  お店の名前
                </label>
                <input
                  {...register('shop_name')}
                  type="text"
                  placeholder="お店の名前"
                  className="w-full rounded-lg border-2 border-[#090A0A] py-3 pl-3 text-sm text-black"
                />
              </div>
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Instagram ID
                </label>
                <input
                  {...register('instagram_id')}
                  type="text"
                  placeholder="Instagram ID"
                  className="w-full rounded-lg border-2 border-[#090A0A] py-3 pl-3 text-sm text-black"
                />
              </div>
              <div className="mb-4">
                <div className="mb-4">
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    好きなメニュー
                  </label>
                  {fields.map((field, index) => (
                    <div key={field.id} className="mb-2 flex items-center">
                      <input
                        {...register(`favorite_menus.${index}`)}
                        type="text"
                        placeholder="メニュー名"
                        className="w-full rounded-lg border-2 border-[#090A0A] py-3 pl-3 text-sm text-black"
                      />
                      <button
                        type="button"
                        className="ml-2 text-red-500"
                        onClick={() => remove(index)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="text-blue-500"
                    onClick={() => append({ value: '' })}
                  >
                    + メニュー追加
                  </button>
                </div>
                <div className="mb-4">
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    レビュー
                  </label>
                  <textarea
                    {...register('shop_review')}
                    placeholder="レビュー"
                    className="h-28 w-full rounded-lg border-2 border-[#090A0A] py-3 pl-3 text-sm text-black"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-[#090A0A] py-3 text-sm font-medium text-white hover:bg-opacity-90"
              >
                登録する
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
