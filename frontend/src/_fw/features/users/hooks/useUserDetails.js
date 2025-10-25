/**
 * useUserDetails Hook
 * 単一ユーザーの詳細情報を管理
 */
import { apiClient } from '@/_fw/api';
import { useFetch } from '@/_fw/hooks';

export function useUserDetails(userId) {
  const { data, loading, error } = useFetch(`/users/${userId}/`);

  const updateUser = async (userData) => {
    try {
      const response = await apiClient.put(`/users/${userId}/`, userData);
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  return {
    user: data,
    loading,
    error,
    updateUser
  };
}
