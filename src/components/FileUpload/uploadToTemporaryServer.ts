interface FileResponseData {
  link: string;
}

const uploadToTemporaryServer = async (file: File): Promise<string | null> => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('https://file.io', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const data = await response.json() as FileResponseData;
      return data.link;
    }
    console.error('Ошибка при загрузке файла на временный сервер:', response);
    return null;
  } catch (error) {
    console.error('Ошибка при загрузке файла на временный сервер:', error);
    return null;
  }
};

export default uploadToTemporaryServer;
