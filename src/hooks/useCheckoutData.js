import useHttp from './useHttp.js';
import { API_BASE } from '../util/config.js';

const requestConfig = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
};

const useCheckoutData = () => {
  const response = useHttp(`${API_BASE}/orders`, requestConfig);

  return { ...response };
};

export default useCheckoutData;
