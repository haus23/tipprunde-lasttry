import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/api/supabase';

export const useStorage = (
  bucket: string,
  path: string
): [string, (file: File, fileName?: string) => Promise<void>] => {
  const [fileUrl, setFileUrl] = useState<string>(null);

  const downloadFn = useCallback(
    () => supabase.storage.from(bucket).download(path),
    [bucket, path]
  );

  useEffect(() => {
    (async () => {
      const { data, error } = await downloadFn();
      if (error) {
        throw error;
      }
      const url = URL.createObjectURL(data);
      setFileUrl(url);
    })();
  }, [downloadFn]);

  const upload = async (file: File, fileName?: string) => {
    fileName = fileName ?? file.name;
    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(fileName, file);

    if (uploadError) {
      throw uploadError;
    }
  };

  return [fileUrl, upload];
};
