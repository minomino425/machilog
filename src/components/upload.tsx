import { useState, useEffect, ChangeEvent } from 'react';
import { supabase } from '../utils/supabase';

export default function Upload(props: { id: number }) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleImageChange = async (
    event: ChangeEvent<HTMLInputElement>,
  ): Promise<void> => {
    if (!event.target.files || event.target.files.length === 0) {
      // 画像が選択されていない場合は処理を終了
      return;
    }

    const file = event.target.files[0]; // 選択された画像を取得
    const filePath = `thumbnail/${file.name}`; // 画像の保存先のpathを指定

    const { error: uploadError } = await supabase.storage
      .from('pictures')
      .upload(filePath, file);

    if (uploadError) {
      // アップロードエラーが発生した場合の処理
      console.error('Upload error:', uploadError);
      return;
    }

    // アップロードが成功したら画像のURLを取得
    const { data } = await supabase.storage
      .from('pictures')
      .getPublicUrl(filePath);

    const imageUrl = data?.publicUrl;

    if (imageUrl) {
      // 画像のURLを状態にセット
      setImageUrl(imageUrl);

      // 画像のURLをDBに保存
      const { error: insertError } = await supabase
        .from('shopInfo')
        .upsert([{ id: props.id, imageUrl }]);

      if (insertError) {
        // DB挿入エラーが発生した場合の処理
        console.error('Database insertion error:', insertError);
      }
    }
  };

  useEffect(() => {
    // shopInfoテーブルから最新のimageUrlを取得
    async function fetchImageUrl() {
      try {
        const { data, error } = await supabase
          .from('shopInfo')
          .select('imageUrl')
          .eq('id', props.id);
        console.log(data);
        if (error) {
          throw error;
        }

        if (data && data.length > 0) {
          setImageUrl(data[0].imageUrl);
        }
      } catch (error) {
        console.error('Error fetching image URL:', error);
      }
    }

    fetchImageUrl();
  }, []);

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      {imageUrl && <img src={imageUrl} alt="" width="800" height="500" />}
    </div>
  );
}
