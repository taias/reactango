/**
 * useFetch Hook
 * APIからデータを取得するカスタムフック
 */
import { useState, useEffect, useCallback } from 'react';
import { apiClient } from '../api/client';

export function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refetchTrigger, setRefetchTrigger] = useState(0);

  const refetch = useCallback(() => {
    setRefetchTrigger(prev => prev + 1);
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get(url, options);
        if (isMounted) {
          setData(response.data);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err);
          setData(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url, options, refetchTrigger]);

  return { data, loading, error, refetch };
}
