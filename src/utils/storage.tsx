import { v4 as uuidv4 } from 'uuid';
import { supabase } from './supabase';

type UploadStorage = {
  folder: FileList;
  bucketName: string;
};

type UploadPathname = {
  path: string;
};

export const uploadStorage = async ({
  folder,
  bucketName,
}: UploadStorage): Promise<UploadPathname> => {
  const file = folder[0];
  const pathName = `thumbnail/${uuidv4()}`;
  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(pathName, file, {
      cacheControl: 'public,max-age=31536000',
      upsert: false,
    });
  if (error) throw error;
  return {
    path: data?.path ?? null,
  };
};
