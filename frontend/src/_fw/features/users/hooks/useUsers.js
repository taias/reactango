/**
 * useUsers Hook
 * ユーザー関連のビジネスロジック
 */
import { apiClient } from '@/_fw/api';
import { useFetch } from '@/_fw/hooks';
import { useState } from 'react';

export function useUsers() {
  const { data, loading, error, refetch } = useFetch('/users/');
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState(null);

  const createUser = async (userData) => {
    try {
      setCreating(true);
      setCreateError(null);
      console.log('Creating user:', userData);
      const response = await apiClient.post('/users/', userData);
      console.log('User created:', response.data);
      // リストを再取得
      await refetch();
      return response.data;
    } catch (err) {
      console.error('Create user error:', err);
      setCreateError(err);
      throw err;
    } finally {
      setCreating(false);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await apiClient.delete(`/users/${userId}/`);
      // リストを再取得
      await refetch();
    } catch (err) {
      throw err;
    }
  };

  return {
    users: data || [],
    loading,
    error,
    createUser,
    creating,
    createError,
    deleteUser
  };
}
