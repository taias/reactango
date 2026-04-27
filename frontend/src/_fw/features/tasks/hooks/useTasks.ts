import { useState, useEffect, useCallback } from 'react';
import { fetchTasks, createTask, updateTaskStatus, assignTaskUser, Task } from '../../../api/tasks';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTasks = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchTasks();
      setTasks(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const addTask = async (data: any) => {
    try {
      await createTask(data);
      await loadTasks();
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to create task');
      return false;
    }
  };

  const changeStatus = async (taskId: number, newStatus: string) => {
    try {
      // Optimistic update
      setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus as any } : t));
      await updateTaskStatus(taskId, newStatus);
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to update status');
      await loadTasks(); // Revert on failure
      return false;
    }
  };

  return {
    tasks,
    loading,
    error,
    loadTasks,
    addTask,
    changeStatus,
  };
}
