import { useState, useEffect, useCallback } from 'react';

const sendHttpRequest = async (url, config) => {
  const response = await fetch(url, config);
  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(
      responseData.message || 'Something went wrong, failed to send request.',
    );
  }

  return responseData;
};

const useHttp = (url, config, initialData) => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(initialData);

  function clearData() {
    setData(initialData);
  }

  const sendRequest = useCallback(
    async (data) => {
      setIsLoading(true);
      try {
        const resData = await sendHttpRequest(url, { ...config, body: data });
        setData(resData);
      } catch (err) {
        setError(err.message || 'Something went wrong.');
      }
      setIsLoading(false);
    },
    [url, config],
  );

  useEffect(() => {
    if (config && config.method === 'GET') {
      sendRequest();
    }
  }, [sendRequest, config]);

  return {
    error,
    isLoading,
    data,
    sendRequest,
    clearData,
  };
};

export default useHttp;
