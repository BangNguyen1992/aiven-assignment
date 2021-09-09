import { useState, useEffect } from 'react';

// https://polvara.me/posts/fetching-asynchronous-data-with-react-hooks
// https://stackoverflow.com/a/62171426
export default function useAsync<T>(url: string): {
  isLoading: boolean;
  data: T | null;
  error: Error | null;
} {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);

      const fetching = await fetch(url);
      const data = await fetching.json();

      setData(data);
    } catch (error: any) {
      setError(error);
      // console.error('Fetching error: ', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [url]);

  return { isLoading, data, error };
}
