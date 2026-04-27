import { apiClient } from './client';

export interface Task {
  id: number;
  project_id: number | null;
  title: string;
  description: string | null;
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  due_date: string | null;
  assigned_users: any[];
  created_at: string;
  updated_at: string;
}

export const fetchTasks = async (): Promise<Task[]> => {
  const response = await apiClient.get('/tasks/');
  return response.data;
};

export const createTask = async (data: any): Promise<any> => {
  const response = await apiClient.post('/tasks/', data);
  return response.data;
};

export const updateTaskStatus = async (taskId: number, status: string): Promise<any> => {
  const response = await apiClient.patch(`/tasks/${taskId}/`, { status });
  return response.data;
};

export const assignTaskUser = async (taskId: number, userId: number): Promise<any> => {
  const response = await apiClient.post(`/tasks/${taskId}/assign/`, { user_id: userId });
  return response.data;
};
