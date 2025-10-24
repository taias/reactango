# Reactango アーキテクチャ

## 概要

Reactangoは、モダンなフルスタックWeb開発のためのフレームワークで、以下のコンポーネントで構成されています：

```
┌─────────────────────────────────────────────────────────┐
│                      Browser                             │
│                 (http://localhost:5173)                  │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│                 React Frontend (Vite)                    │
│  ┌──────────────────────────────────────────────────┐  │
│  │  - React Components                               │  │
│  │  - State Management                               │  │
│  │  - API Calls via fetch                            │  │
│  │  - Hot Module Replacement (HMR)                   │  │
│  └──────────────────────────────────────────────────┘  │
└────────────────────┬────────────────────────────────────┘
                     │
                     │ HTTP Requests (/api/*)
                     │ Vite Proxy → Django
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│              Django Backend (REST API)                   │
│                (http://localhost:8000)                   │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Django REST Framework                            │  │
│  │  ├─ API Views                                     │  │
│  │  ├─ Serializers                                   │  │
│  │  └─ URL Routing                                   │  │
│  │                                                    │  │
│  │  CORS Headers                                     │  │
│  │  └─ Cross-origin requests from React              │  │
│  │                                                    │  │
│  │  Database (SQLite)                                │  │
│  │  └─ ORM Models                                    │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

## コンポーネント詳細

### 1. フロントエンド (React + Vite)

**場所**: `frontend/`

**技術スタック**:
- React 18+
- Vite (ビルドツール)
- ES6+ JavaScript

**主な機能**:
- 高速な開発サーバー（HMR対応）
- コンポーネントベースのUI
- APIプロキシ経由でDjangoと通信

**設定ファイル**:
- `vite.config.js`: Viteの設定、プロキシ設定を含む
- `package.json`: Node.js依存関係

### 2. バックエンド (Django + DRF)

**場所**: `backend/`

**技術スタック**:
- Django 5.2+
- Django REST Framework
- django-cors-headers

**プロジェクト構造**:
```
backend/
├── config/          # Django プロジェクト設定
│   ├── settings.py  # メイン設定
│   ├── urls.py      # ルートURL設定
│   └── wsgi.py      # WSGIアプリケーション
├── api/             # APIアプリケーション
│   ├── views.py     # APIビュー
│   ├── urls.py      # APIのURL設定
│   ├── models.py    # データモデル
│   └── serializers.py (追加可能)
└── manage.py        # Django管理コマンド
```

**主な機能**:
- RESTful APIエンドポイント
- CORS対応（React開発サーバーからのリクエストを許可）
- データベースORM
- 管理インターフェース (`/admin/`)

### 3. データフロー

1. **ユーザー → React**
   - ブラウザでReactアプリにアクセス
   - Reactコンポーネントがレンダリング

2. **React → Django**
   - `fetch('/api/endpoint')` でAPIリクエスト
   - Viteプロキシが `http://localhost:8000` にリクエストを転送

3. **Django → Database**
   - Django ORMでデータベースにアクセス
   - クエリ実行、データ取得

4. **Django → React**
   - JSON形式でレスポンスを返す
   - CORS ヘッダーを含む

5. **React → ユーザー**
   - レスポンスデータでUIを更新
   - 状態管理とレンダリング

## 開発ワークフロー

### 新しいAPIエンドポイントの追加

1. **モデルの作成** (必要な場合)
   ```python
   # backend/api/models.py
   from django.db import models
   
   class MyModel(models.Model):
       name = models.CharField(max_length=100)
   ```

2. **ビューの作成**
   ```python
   # backend/api/views.py
   from rest_framework.views import APIView
   from rest_framework.response import Response
   
   class MyView(APIView):
       def get(self, request):
           return Response({'data': 'value'})
   ```

3. **URLの登録**
   ```python
   # backend/api/urls.py
   from .views import MyView
   
   urlpatterns = [
       path('myendpoint/', MyView.as_view()),
   ]
   ```

4. **マイグレーション** (モデルを変更した場合)
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

### Reactコンポーネントの作成

1. **コンポーネントファイルの作成**
   ```jsx
   // frontend/src/components/MyComponent.jsx
   import { useState, useEffect } from 'react'
   
   function MyComponent() {
       const [data, setData] = useState(null)
       
       useEffect(() => {
           fetch('/api/myendpoint/')
               .then(res => res.json())
               .then(data => setData(data))
       }, [])
       
       return <div>{data && data.message}</div>
   }
   ```

2. **App.jsxにインポート**
   ```jsx
   import MyComponent from './components/MyComponent'
   ```

## 環境変数

### バックエンド (.env)
```
SECRET_KEY=your-secret-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:5173
```

### フロントエンド (.env)
```
VITE_API_URL=http://localhost:8000
```

## デプロイメント考慮事項

### 本番環境への準備

1. **Django設定の変更**
   - `DEBUG = False`
   - `SECRET_KEY` を環境変数から読み込む
   - `ALLOWED_HOSTS` を適切に設定
   - データベースをPostgreSQLなどに変更

2. **React ビルド**
   ```bash
   cd frontend
   npm run build
   ```

3. **静的ファイルの配信**
   - Nginxやディレクトリから配信
   - Django の `collectstatic` コマンド使用

4. **HTTPS の設定**
   - SSL証明書の取得
   - リバースプロキシの設定

## セキュリティ

- **CORS**: 開発環境では緩く設定されているが、本番環境では特定のドメインのみ許可
- **CSRF**: Django の CSRF 保護が有効
- **認証**: 必要に応じて Django REST Framework の認証を追加
- **環境変数**: 機密情報は `.env` ファイルに保存（Gitにはコミットしない）

## パフォーマンス最適化

1. **フロントエンド**
   - Code splitting
   - Lazy loading
   - 画像最適化

2. **バックエンド**
   - データベースクエリ最適化
   - キャッシング (Redis など)
   - ページネーション

## 拡張性

このフレームワークは、以下の追加が容易です：

- **認証システム**: JWT, OAuth2
- **リアルタイム機能**: Django Channels + WebSocket
- **タスクキュー**: Celery + Redis
- **検索機能**: Elasticsearch
- **ファイルストレージ**: AWS S3, MinIO
- **状態管理**: Redux, Zustand
- **UIライブラリ**: Material-UI, Ant Design

## トラブルシューティング

### よくある問題

1. **CORSエラー**
   - `settings.py` の `CORS_ALLOWED_ORIGINS` を確認
   - ミドルウェアの順序を確認

2. **APIが404を返す**
   - URLパターンを確認
   - Viteプロキシ設定を確認

3. **データベースエラー**
   - マイグレーションを実行
   - データベースファイルの権限を確認
