/**
 * useFetch Hook
 * APIからデータを取得するカスタムフック
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import { apiClient } from '../api/client';

export function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refetchTrigger, setRefetchTrigger] = useState(0);
  const optionsRef = useRef(options);
  const fetchPromiseRef = useRef(null);

  // optionsをrefで保持して再レンダリングを防ぐ
  useEffect(() => {
    optionsRef.current = options;
  });

  const refetch = useCallback(() => {
    setRefetchTrigger(prev => prev + 1);
    // Promiseを返して、呼び出し側でawaitできるようにする
    return new Promise((resolve) => {
      fetchPromiseRef.current = resolve;
    });
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get(url, optionsRef.current);
        if (isMounted) {
          setData(response.data);
          setError(null);
          // refetchが呼ばれていた場合、完了を通知
          if (fetchPromiseRef.current) {
            fetchPromiseRef.current(response.data);
            fetchPromiseRef.current = null;
          }
        }
      } catch (err) {
        if (isMounted) {
          setError(err);
          setData(null);
          // エラーの場合も通知
          if (fetchPromiseRef.current) {
            fetchPromiseRef.current(null);
            fetchPromiseRef.current = null;
          }
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
  }, [url, refetchTrigger]);

  return { data, loading, error, refetch };
}
