import { supabase } from '@/utils/supabase';
import { Dispatch, SetStateAction, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import InputField from '@/components/atoms/inputField';

type FormValues = {
  shop_name: string;
  shop_review: string;
  favorite_menus: { value: string }[];
  instagram_id: string;
  imageFile: File | null;
};

export default function AddDialog(props: {
  showModal: Dispatch<SetStateAction<boolean>>;
}) {
  const { showModal } = props;
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { register, handleSubmit, control, reset } = useForm<FormValues>({
    defaultValues: {
      shop_name: '',
      instagram_id: '',
      shop_review: '',
      favorite_menus: [{ value: '' }],
      imageFile: null,
    },
  });
  const { fields, append, remove } = useFieldArray<FormValues>({
    control,
    name: 'favorite_menus',
  });

  const uploadImage = async (imageFile: File) => {
    if (!imageFile) return null;
    const fileName = `${Date.now()}_${imageFile.name}`;
    const { data, error } = await supabase.storage
      .from('pictures')
      .upload(fileName, imageFile);

    if (error) {
      console.error('Image upload error:', error);
      return null;
    }

    const { data: publicUrlData } = supabase.storage
      .from('pictures')
      .getPublicUrl(fileName);

    return publicUrlData.publicUrl;
  };

  const onSubmit = async (data: FormValues) => {
    showModal(false);
    console.log(data);

    try {
      const image_url = imageFile ? await uploadImage(imageFile) : null;

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
    <div className="bg-black-rgba fixed inset-0 z-20 flex w-full items-center justify-center p-4">
      <div className="h-[75vh] w-full max-w-[355px] rounded-lg border-2 border-[#090A0A] bg-white">
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
        <div className="mx-auto h-[88%] overflow-x-hidden">
          <form className="" onSubmit={handleSubmit(onSubmit)}>
            <div className="text-center">
              <label
                htmlFor="image-upload"
                className="mb-8 inline-block cursor-pointer"
              >
                <div className="text-center">
                  <div className="q flex h-32 w-32 items-center justify-center overflow-hidden rounded-full bg-gray-200">
                    {imageFile ? (
                      <div className="relative">
                        <img
                          src={URL.createObjectURL(imageFile)}
                          alt="Selected"
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
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={(e) =>
                      setImageFile(e.target.files ? e.target.files[0] : null)
                    }
                  />
                </div>
              </label>
            </div>
            <div className="mx-auto mb-4 w-[70%]">
              <InputField
                label="店名"
                placeholder="店名"
                id="shop_name"
                register={register}
              />
            </div>
            <div className="mx-auto mb-4 w-[70%]">
              <InputField
                label="Instagram ID"
                placeholder="Instagram ID"
                id="instagram_id"
                register={register}
              />
            </div>
            <div className="mx-auto mb-4 w-[70%]">
              <label className="mb-1 block text-sm font-bold text-gray-700">
                好きなメニュー
              </label>
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="mb-4 flex w-[100%] items-center gap-1"
                >
                  <InputField
                    placeholder="好きなメニュー"
                    id={`favorite_menus.${index}.value`}
                    register={register}
                  />
                  {index > 0 && (
                    <button
                      type="button"
                      className="text-red-500"
                      onClick={() => remove(index)}
                    >
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="7.5"
                          cy="7.5"
                          r="7"
                          fill="white"
                          stroke="black"
                        />
                        <line
                          x1="5.02518"
                          y1="5.02513"
                          x2="9.97493"
                          y2="9.97487"
                          stroke="black"
                        />
                        <path
                          d="M9.97485 5.02513L5.02511 9.97487"
                          stroke="black"
                        />
                      </svg>
                    </button>
                  )}
                  <button
                    type="button"
                    className=""
                    onClick={() => append({ value: '' })}
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="7.5"
                        cy="7.5"
                        r="7"
                        fill="white"
                        stroke="black"
                      />
                      <line x1="4" y1="7.5" x2="11" y2="7.5" stroke="black" />
                      <path d="M7.5 4L7.5 11" stroke="black" />
                    </svg>
                  </button>
                </div>
              ))}
              <div className="mb-4">
                <InputField
                  label="好きポイント"
                  placeholder="このお店の好きなポイント"
                  id="shop_review"
                  register={register}
                  textarea
                />
              </div>
            </div>
            <div className="mx-auto mb-4 w-[70%]">
              <button
                type="submit"
                className="w-full rounded-lg border-2 border-[#090A0A] bg-[#FDFF89] py-3 text-sm font-bold text-black"
              >
                登録する
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
