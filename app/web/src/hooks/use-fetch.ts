import { useState, useEffect } from 'react';

interface Response<T>{
   data ?: T;
   isLoading: boolean;
   error: any;
}

function useFetch<T extends any>(url: string): Response<T> {

  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        setData(jsonData);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, isLoading, error };
}
export default useFetch;