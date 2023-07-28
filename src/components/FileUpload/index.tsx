import React, { FC, useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import uploadToTemporaryServer from './uploadToTemporaryServer';
import uploadToYandexDisk from './uploadToYandexDisk';

const FileUpload: FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const onDrop = useCallback(async (acceptedFiles: File[]): Promise<void> => {
    try {
      const promises = acceptedFiles.map(async (file) => {
        const urlToUpload = await uploadToTemporaryServer(file);
        if (urlToUpload) {
          await uploadToYandexDisk(urlToUpload, file.name);
        }
        return file;
      });

      const getUploadedFiles = await Promise.all(promises);
      setUploadedFiles(getUploadedFiles);
    } catch (error) {
      console.error('Ошибка при загрузке файлов:', error);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: '*/*',
    multiple: true,
    onDrop,
    maxFiles: 100,
  });

  return (
    <div>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <button type='button'>Перетащите файлы сюда или кликните, чтобы выбрать файлы</button>
      </div>
      {uploadedFiles.length > 0 && (
        <div>
          <h2>Загруженные файлы:</h2>
          <ul>
            {uploadedFiles.map((file) => (
              <li key={file.name}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
