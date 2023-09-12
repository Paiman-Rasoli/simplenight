import { useState, useEffect } from 'react';

interface Response<T>{
   data ?: T;
   isLoading: boolean;
   error: any;
   doRefetch: () => void;
}

function useFetch<T extends any>(url: string): Response<T> {

  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  const [refetch, setRefetch] = useState<boolean>(false)
  const doRefetch = () =>  {
     // set to rerender useEffect
     setRefetch((prev) => !prev);
  }

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
  }, [url, refetch]);

  return { data, isLoading, error , doRefetch};
}
export default useFetch;