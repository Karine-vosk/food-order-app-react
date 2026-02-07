import useHttp from './useHttp.js';

const requestConfig = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
};

const useCheckoutData = () => {
  const response = useHttp('http://localhost:3000/orders', requestConfig);

  return { ...response };
};

export default useCheckoutData;
