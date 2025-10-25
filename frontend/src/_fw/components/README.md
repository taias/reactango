# FW Components

Reactango フレームワークの共通UIコンポーネント集です。Material UIをベースに、プロジェクト全体で統一されたデザインとUXを提供します。

## レイアウトコンポーネント

### PageContainer
ページ全体のコンテナ。maxWidthとpaddingを自動管理します。

```jsx
import { PageContainer } from '@/_fw/components';

<PageContainer maxWidth={1600} padding>
  {/* ページコンテンツ */}
</PageContainer>
```

**Props:**
- `maxWidth` (number): 最大幅（デフォルト: 1600）
- `padding` (boolean): パディングを適用するか（デフォルト: true）

### PageHeader
ページのヘッダーセクション。タイトル、説明、アクションボタンを配置します。

```jsx
import { PageHeader, PrimaryButton } from '@/_fw/components';
import { Add as AddIcon } from '@mui/icons-material';

<PageHeader
  title="ユーザー管理"
  description="登録されているユーザーの一覧と管理"
  action={
    <PrimaryButton startIcon={<AddIcon />} onClick={handleAdd}>
      新規登録
    </PrimaryButton>
  }
/>
```

**Props:**
- `title` (string): ページタイトル
- `description` (string): ページの説明文
- `action` (ReactNode): アクションボタンなど

### FlexBox
Flexboxレイアウト用のラッパーコンポーネント。

```jsx
import { FlexBox } from '@/_fw/components';

<FlexBox direction="row" justify="space-between" align="center" gap={2}>
  <div>左側</div>
  <div>右側</div>
</FlexBox>
```

**Props:**
- `direction` (string): flex-direction（デフォルト: 'row'）
- `justify` (string): justify-content（デフォルト: 'flex-start'）
- `align` (string): align-items（デフォルト: 'stretch'）
- `gap` (number): gap（デフォルト: 2）
- `wrap` (string): flex-wrap（デフォルト: 'nowrap'）

### UniformGrid
均等幅のグリッドレイアウト。カードを並べる際に便利です。

```jsx
import { UniformGrid, Card } from '@/_fw/components';

<UniformGrid gap={3}>
  {items.map(item => (
    <Card key={item.id}>
      {item.content}
    </Card>
  ))}
</UniformGrid>
```

**Props:**
- `columns` (number): カラム数（デフォルト: 4）
- `gap` (number): 間隔（デフォルト: 3）
- `minWidth` (number): 最小幅（デフォルト: 0）

## UIコンポーネント

### Card
ホバーエフェクト付きのカードコンポーネント。

```jsx
import { Card } from '@/_fw/components';

<Card elevation={1} hover>
  <h3>カードタイトル</h3>
  <p>カードの内容</p>
</Card>
```

**Props:**
- `elevation` (number): 影の深さ（デフォルト: 1）
- `hover` (boolean): ホバーエフェクトを有効にするか（デフォルト: false）

### PrimaryButton
アニメーション付きのボタンコンポーネント。

```jsx
import { PrimaryButton } from '@/_fw/components';
import { Save as SaveIcon } from '@mui/icons-material';

<PrimaryButton
  variant="contained"
  startIcon={<SaveIcon />}
  onClick={handleSave}
  loading={saving}
>
  保存
</PrimaryButton>
```

**Props:**
- `variant` (string): 'contained' | 'outlined' | 'text'（デフォルト: 'contained'）
- `size` (string): 'small' | 'medium' | 'large'（デフォルト: 'medium'）
- `loading` (boolean): ローディング状態（デフォルト: false）
- `startIcon` (ReactNode): 左側のアイコン
- `endIcon` (ReactNode): 右側のアイコン

### TextField
Material UIのTextFieldラッパー。

```jsx
import { TextField } from '@/_fw/components';

<TextField
  label="メールアドレス"
  type="email"
  value={email}
  onChange={handleChange}
  error={!!errors.email}
  helperText={errors.email}
  required
/>
```

**Props:**
- `label` (string): ラベル
- `type` (string): input type（デフォルト: 'text'）
- `error` (boolean): エラー状態
- `helperText` (string): ヘルプテキスト
- `required` (boolean): 必須項目か
- `fullWidth` (boolean): 全幅表示（デフォルト: true）

### DataTable
データテーブルコンポーネント。

```jsx
import { DataTable } from '@/_fw/components';
import { Chip } from '@mui/material';

const columns = [
  { field: 'id', label: 'ID', width: '10%' },
  { field: 'name', label: '名前', width: '30%' },
  { 
    field: 'email', 
    label: 'メール', 
    width: '40%',
    render: (value) => <Typography noWrap>{value}</Typography>
  },
  { 
    field: 'status', 
    label: 'ステータス', 
    width: '20%',
    render: (value) => <Chip label={value} size="small" />
  },
];

<DataTable
  columns={columns}
  data={users}
  onRowClick={(row) => navigate(`/users/${row.id}`)}
  emptyMessage="ユーザーが登録されていません"
/>
```

**Props:**
- `columns` (array): カラム定義の配列
  - `field` (string): データのフィールド名
  - `label` (string): ヘッダーラベル
  - `width` (string): カラム幅
  - `align` (string): テキスト揃え
  - `render` (function): カスタムレンダー関数
- `data` (array): 表示するデータ配列
- `onRowClick` (function): 行クリック時のハンドラ
- `emptyMessage` (string): データが空の時のメッセージ
- `hover` (boolean): ホバーエフェクト（デフォルト: true）

### FormDialog
フォーム用のダイアログコンポーネント。

```jsx
import { FormDialog, TextField } from '@/_fw/components';
import { Box } from '@mui/material';

<FormDialog
  open={showForm}
  onClose={() => setShowForm(false)}
  title="新規ユーザー作成"
  onSubmit={handleSubmit}
  submitLabel="作成"
  submitting={creating}
>
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
    <TextField
      label="名前"
      value={formData.name}
      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      required
    />
    <TextField
      label="メールアドレス"
      type="email"
      value={formData.email}
      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      required
    />
  </Box>
</FormDialog>
```

**Props:**
- `open` (boolean): ダイアログの表示状態
- `onClose` (function): 閉じる時のハンドラ
- `title` (string): ダイアログタイトル
- `onSubmit` (function): 送信時のハンドラ
- `submitLabel` (string): 送信ボタンのラベル（デフォルト: '保存'）
- `cancelLabel` (string): キャンセルボタンのラベル（デフォルト: 'キャンセル'）
- `submitting` (boolean): 送信中状態（デフォルト: false）
- `maxWidth` (string): 最大幅（デフォルト: 'sm'）

### LoadingSpinner
ローディングスピナーコンポーネント。

```jsx
import { LoadingSpinner } from '@/_fw/components';

{loading && <LoadingSpinner size={60} minHeight="400px" />}
```

**Props:**
- `size` (number): スピナーのサイズ（デフォルト: 60）
- `minHeight` (string): 最小高さ（デフォルト: '400px'）

## 使用例

### ユーザー一覧ページ

```jsx
import { 
  PageContainer, 
  PageHeader, 
  DataTable, 
  PrimaryButton,
  FormDialog,
  TextField,
  LoadingSpinner 
} from '@/_fw/components';
import { Add as AddIcon } from '@mui/icons-material';
import { Box } from '@mui/material';
import { useState } from 'react';
import { useUsers } from '../hooks/useUsers';

export function UserList() {
  const { users, loading, createUser, creating } = useUsers();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });

  const columns = [
    { field: 'id', label: 'ID', width: '10%' },
    { field: 'name', label: '名前', width: '30%' },
    { field: 'email', label: 'メール', width: '40%' },
    { field: 'created_at', label: '作成日時', width: '20%' },
  ];

  const handleSubmit = async () => {
    await createUser(formData);
    setFormData({ name: '', email: '' });
    setShowForm(false);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <PageContainer>
      <PageHeader
        title="ユーザー管理"
        description="登録されているユーザーの一覧と管理"
        action={
          <PrimaryButton 
            startIcon={<AddIcon />}
            onClick={() => setShowForm(true)}
          >
            新規登録
          </PrimaryButton>
        }
      />

      <DataTable
        columns={columns}
        data={users}
        onRowClick={(row) => navigate(`/users/${row.id}`)}
      />

      <FormDialog
        open={showForm}
        onClose={() => setShowForm(false)}
        title="新規ユーザー作成"
        onSubmit={handleSubmit}
        submitting={creating}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
          <TextField
            label="名前"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <TextField
            label="メールアドレス"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </Box>
      </FormDialog>
    </PageContainer>
  );
}
```

### ダッシュボードページ

```jsx
import { 
  PageContainer, 
  Card, 
  UniformGrid 
} from '@/_fw/components';
import { Speed as SpeedIcon } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';

export function Dashboard() {
  const features = [
    { icon: <SpeedIcon />, title: 'High Performance', description: '高速な開発体験' },
    // ... more features
  ];

  return (
    <PageContainer>
      <UniformGrid gap={3}>
        {features.map((feature, index) => (
          <Card key={index} hover>
            <Box sx={{ textAlign: 'center' }}>
              {feature.icon}
              <Typography variant="h6">{feature.title}</Typography>
              <Typography variant="body2">{feature.description}</Typography>
            </Box>
          </Card>
        ))}
      </UniformGrid>
    </PageContainer>
  );
}
```

## スタイリング

すべてのコンポーネントは `sx` プロップをサポートしており、Material UIのスタイリングシステムでカスタマイズ可能です。

```jsx
<Card 
  sx={{ 
    bgcolor: 'primary.light',
    '&:hover': { bgcolor: 'primary.main' }
  }}
>
  カスタムスタイル
</Card>
```

## アニメーション

多くのコンポーネントには組み込みのアニメーションが含まれています：
- **fadeInUp**: フェードイン＋上昇アニメーション
- **hover transform**: ホバー時の浮き上がり効果
- **transition**: スムーズなトランジション（cubic-bezier(0.4, 0, 0.2, 1)）
