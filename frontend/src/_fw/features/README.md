# Features

## 概要
このディレクトリには、アプリケーションの各機能が含まれています。
各機能は独立したモジュールとして実装され、FW層のコンポーネントとフックを活用します。

## 目的
- 機能ごとの明確な分離
- FWとビジネスロジックの分離
- 保守性と拡張性の向上

## ディレクトリ構成

各機能は以下の構造を持ちます：

```
features/
├── users/              # ユーザー機能
│   ├── index.jsx      # メインページコンポーネント
│   ├── hooks/         # 機能固有のフック
│   ├── details/       # 詳細ページ
│   └── list/          # 一覧ページ
└── README.md
```

## ファイル構成の説明

### `index.jsx`
- 機能のエントリーポイント
- ルーティング設定
- レイアウト構成

### `hooks/`
- 機能固有のカスタムフック
- ビジネスロジックのカプセル化
- API通信ロジック

### `details/`
- 詳細表示ページ
- 単一リソースの表示・編集

### `list/`
- 一覧表示ページ
- リスト表示とフィルタリング

## 設計原則

### 機能の独立性
- 各機能は独立して動作する
- 他の機能への依存を最小化
- FW層を通じてのみ共通機能を使用

### ページ構成の一貫性
- index, hooks, details, listの構造を維持
- 新しい機能も同じパターンで実装
- 予測可能な構造

## 使用例

### 新しい機能の追加

```bash
features/
└── products/
    ├── index.jsx
    ├── hooks/
    │   └── useProducts.js
    ├── details/
    │   └── ProductDetails.jsx
    └── list/
        └── ProductList.jsx
```

### フックの実装例
```jsx
// features/users/hooks/useUsers.js
import { useFetch } from '@/fw/hooks';
import { apiClient } from '@/fw/api';

export function useUsers() {
  const { data, loading, error } = useFetch('/users/');
  
  const createUser = async (userData) => {
    return await apiClient.post('/users/', userData);
  };
  
  return { users: data, loading, error, createUser };
}
```

### リストコンポーネントの実装例
```jsx
// features/users/list/UserList.jsx
import { useUsers } from '../hooks/useUsers';
import { Button } from '@/fw/components';

export function UserList() {
  const { users, loading } = useUsers();
  
  if (loading) return <div>Loading...</div>;
  
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users?.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

## 注意事項
- FW層の機能を直接変更せず、活用すること
- 機能間の直接的な依存を避けること
- 共通ロジックはFW層に抽出すること
- コンポーネントは小さく保つこと
