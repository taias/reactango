/**
 * useUserDetails Hook
 * 単一ユーザーの詳細情報を管理
 */
import { apiClient } from '@/_fw/api';
import { useFetch } from '@/_fw/hooks';

export function useUserDetails(userId) {
  const { data, loading, error, refetch } = useFetch(`/users/${userId}/`);

  const updateUser = async (userData) => {
    try {
      const response = await apiClient.put(`/users/${userId}/`, userData);
      console.log('Update response:', response.data);
      // 更新後にデータを再取得
      await refetch();
      return response.data;
    } catch (err) {
      console.error('Update error:', err);
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
