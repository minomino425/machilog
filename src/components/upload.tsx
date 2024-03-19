import { useState } from 'react';
import { uploadStorage } from './storage';
import { supabase } from "../utils/supabase";

export default function Upload(){
  const [ path,setPathName ] = useState<string | undefined>();
  const handleUploadStorage = async (folder: FileList | null) => {
    if (!folder || !folder.length) return;
    const { path } = await uploadStorage({
      folder,
      bucketName: "pictures",
    });
    const { data } = supabase.storage.from("pictures").getPublicUrl(path)
    if (path) setPathName(data.publicUrl);
  };
  return (
    <label htmlFor="file-upload">
      <span>アップロードする</span>
      <input
        id="file-upload"
        name="file-upload"
        type="file"
        className="sr-only"
				accept="image/png, image/jpeg"
        onChange={(e) => {
          const fileList = e.target?.files;
          console.log(fileList);
          handleUploadStorage(fileList);
        }}
      />
    {path && <img src={path} alt="" width="800" height="500"/>}
    </label>
  );
};

