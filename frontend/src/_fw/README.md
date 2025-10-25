# Framework (_fw) Layer

## 概要
このディレクトリには、フロントエンド全体で使用される共通のフレームワーク機能が含まれています。
再利用可能なコンポーネント、カスタムフック、ユーティリティ関数、およびサンプル実装（Users機能）を提供します。

## ディレクトリ構成

```
_fw/
├── hooks/              # カスタムフック（共通）
│   ├── useFetch.js
│   └── useForm.js
├── components/         # 共通UIコンポーネント (Material UI base)
│   ├── Card/              # ホバーエフェクト付きカード
│   ├── DataTable/         # データテーブル
│   ├── FlexBox/           # Flexboxレイアウト
│   ├── FormDialog/        # フォーム用ダイアログ
│   ├── LoadingSpinner/    # ローディング表示
│   ├── PageContainer/     # ページコンテナ
│   ├── PageHeader/        # ページヘッダー
│   ├── PrimaryButton/     # プライマリボタン
│   ├── TextField/         # テキスト入力
│   ├── UniformGrid/       # 均等幅グリッド
│   ├── Button/            # (Legacy)
│   ├── Input/             # (Legacy)
│   └── Layout/            # アプリケーションレイアウト
├── api/               # API通信ユーティリティ
│   └── client.js
├── utils/             # ユーティリティ関数
│   └── dateFormatter.js
└── features/          # サンプル機能実装
    ├── dashboard/     # ダッシュボード（FW機能紹介）
    └── users/         # User機能（サンプル）
        ├── index.jsx
        ├── hooks/
        ├── list/
        └── details/
```

## フォルダ命名規則
- アンダースコアプレフィックス (`_fw`) を使用
- フォルダ一覧で先頭に表示され、FW層であることが明確

## 主要コンポーネント

### Hooks (カスタムフック)
- 再利用可能なReactフック
- 状態管理ロジック
- 副作用の抽象化
- 例: `useFetch`, `useForm`

### Components (共通コンポーネント)
Material UIベースの統一されたUIコンポーネント集。詳細は `components/README.md` を参照。

#### レイアウトコンポーネント
- **PageContainer** - ページ全体のコンテナ（maxWidth: 1600）
- **PageHeader** - ページヘッダー（タイトル、説明、アクション）
- **FlexBox** - Flexboxレイアウトラッパー
- **UniformGrid** - 均等幅グリッドレイアウト

#### UIコンポーネント
- **Card** - ホバーエフェクト付きカード
- **PrimaryButton** - アニメーション付きボタン
- **TextField** - Material UIテキストフィールド
- **DataTable** - データテーブル（ソート、フィルタ対応）
- **FormDialog** - フォーム用ダイアログ
- **LoadingSpinner** - ローディングスピナー

#### Legacy (非推奨)
- Button, Input（Material UI移行前の旧実装）

### API
- HTTPクライアント
- API通信の抽象化
- エラーハンドリング

### Utils
- ヘルパー関数
- 日付フォーマット
- バリデーション

### Features (サンプル機能)
- User機能をサンプル実装として提供
- 新機能開発時の参考実装

## 設計原則

### 再利用性
- 汎用的な実装
- プロジェクト固有のロジックは含まない
- カスタマイズ可能なインターフェース

### 疎結合
- ビジネスロジックからの分離
- 依存性の最小化
- テスト可能な設計

## 使用方法

### 推奨コンポーネントの使用 (Material UI)
```jsx
import { 
  PageContainer, 
  PageHeader, 
  Card, 
  PrimaryButton,
  DataTable 
} from '@/_fw/components';
import { Add as AddIcon } from '@mui/icons-material';

function UserList() {
  return (
    <PageContainer>
      <PageHeader
        title="ユーザー管理"
        description="登録されているユーザーの一覧"
        action={
          <PrimaryButton startIcon={<AddIcon />} onClick={handleAdd}>
            新規登録
          </PrimaryButton>
        }
      />
      
      <DataTable
        columns={columns}
        data={users}
        onRowClick={handleRowClick}
      />
    </PageContainer>
  );
}
```

### カスタムフックの使用
```jsx
import { useFetch } from '@/_fw/hooks';

function UserList() {
  const { data, loading, error } = useFetch('/users/');
  
  if (loading) return <LoadingSpinner />;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <ul>
      {data.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

### 共通コンポーネントの使用（Legacy）
```jsx
import { Button, Input } from '@/_fw/components';

function LoginForm() {
  return (
    <form>
      <Input type="email" placeholder="Email" />
      <Input type="password" placeholder="Password" />
      <Button type="submit">Login</Button>
    </form>
  );
}
```

### APIクライアントの使用
```jsx
import { apiClient } from '@/_fw/api';

async function createUser(userData) {
  const response = await apiClient.post('/users/', userData);
  return response.data;
}
```

## サンプル機能

### Dashboard
Reactangoフレームワークの機能紹介ページ。以下の内容を表示：
- フレームワークの特徴（4つの主要機能）
- バックエンドアーキテクチャ（DDD 4層構造）
- フロントエンドアーキテクチャ（モジュール構成）
- クイックリンク（API Root、Admin、Documentation）

### Users
Users機能はFW層のサンプル実装として提供されています：

#### 構成
- `index.jsx` - エントリーポイント
- `hooks/` - ビジネスロジック（useUsers）
- `list/` - 一覧ページ（DataTable使用）
- `details/` - 詳細ページ（編集機能付き）

#### 新機能開発時の参考
Users機能を参考に、同じ構造で新しい機能を開発できます。
- 共通コンポーネント（PageContainer, PageHeader, DataTableなど）の活用例
- カスタムフック（useUsers）によるロジック分離
- Material UIを活用したモダンなUI実装

## 注意事項
- このディレクトリ内のファイルを変更する場合は、全ての機能への影響を考慮すること
- ビジネスロジックを含めないこと
- ドキュメントを整備すること
- 破壊的変更を避けるか、バージョン管理を徹底すること
