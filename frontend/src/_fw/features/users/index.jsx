/**
 * Users Feature - Main Index
 * ユーザー機能のエントリーポイント
 */
import React from 'react';
import { UserList } from './list/UserList';

export function Users() {
  return (
    <div className="users-page">
      <UserList />
    </div>
  );
}

export default Users;
