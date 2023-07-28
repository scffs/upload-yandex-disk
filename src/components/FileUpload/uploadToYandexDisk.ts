const uploadToYandexDisk = async (url: string, path: string): Promise<void> => {
  try {
    const accessToken = import.meta.env.VITE_ACCESS_TOKEN as string;
    const uploadUrl = 'https://cloud-api.yandex.net/v1/disk/resources/upload';

    const params = new URLSearchParams();
    params.append('path', path); // Здесь можно передать нужный вам путь на Яндекс.Диске
    params.append('url', url);

    const response = await fetch(`${uploadUrl}?${params.toString()}`, {
      method: 'POST',
      headers: {
        Authorization: `OAuth ${accessToken}`,
      },
    });

    if (response.ok) {
      console.log('Файл успешно загружен на Яндекс.Диск:', await response.json());
    } else {
      console.error('Ошибка при загрузке файла на Яндекс.Диск:', response);
    }
  } catch (error) {
    console.error('Ошибка при загрузке файла на Яндекс.Диск:', error);
  }
};

export default uploadToYandexDisk;
