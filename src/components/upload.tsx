import { useState, useEffect, ChangeEvent } from 'react';
import { supabase } from '../utils/supabase';

export default function Upload(props: { id: number }) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleImageChange = async (
    event: ChangeEvent<HTMLInputElement>,
  ): Promise<void> => {
    if (!event.target.files || event.target.files.length === 0) {
      return;
    }

    const file = event.target.files[0];
    const filePath = `thumbnail/${file.name}`;

    const { error: uploadError } = await supabase.storage
      .from('pictures')
      .upload(filePath, file);

    if (uploadError) {
      console.error('Upload error:', uploadError);
      return;
    }

    const { data } = await supabase.storage
      .from('pictures')
      .getPublicUrl(filePath);

    const imageUrl = data?.publicUrl;

    if (imageUrl) {
      setImageUrl(imageUrl);

      const { error: insertError } = await supabase
        .from('shopInfo')
        .upsert([{ id: props.id, imageUrl }]);

      if (insertError) {
        console.error('Database insertion error:', insertError);
      }
    }
  };

  useEffect(() => {
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
      <input
        type="file"
        onChange={handleImageChange}
        style={{ display: 'none' }}
        id="file-input"
      />
      <div onClick={() => document.getElementById('file-input')?.click()}>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Uploaded"
            width="800"
            height="500"
            className="mx-auto block h-40 w-40 [clip-path:circle(45%)]"
          />
        ) : (
          <div
            style={{
              width: '800px',
              height: '500px',
              backgroundColor: '#f0f0f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            画像を選択してください
          </div>
        )}
      </div>
    </div>
  );
}
