# Reactango

Django + React 開発フレームワーク

DDDアーキテクチャとコンポーネント駆動開発を採用した、モダンなフルスタックWebアプリケーションフレームワーク

## 🚀 機能

- **DDD Architecture**: ドメイン駆動設計による保守性の高いバックエンド
- **Django REST API**: Django REST Frameworkを使用したRESTful API
- **React + Vite**: 高速な開発環境とHMR対応
- **Material UI**: 統一されたモダンなUIデザインシステム
- **Component Library**: 再利用可能な共通コンポーネント集（10種類）
- **CORS対応**: フロントエンドとバックエンド間の通信を簡単に設定
- **開発環境**: Docker対応、VS Codeタスク、ワンコマンドでの起動
- **サンプル実装**: ユーザー管理機能（CRUD）を含む

## 📋 必要要件 (Prerequisites)

- Python 3.12以上
- Node.js 20以上
- npm または yarn

## 🛠️ セットアップ (Setup)

### 方法1: 手動セットアップ (Manual Setup)

#### バックエンド (Backend)

```bash
cd backend

# 仮想環境の作成と有効化
python3 -m venv venv
source venv/bin/activate  # Windowsの場合: venv\Scripts\activate

# 依存関係のインストール
pip install -r requirements.txt

# データベースのマイグレーション
python manage.py migrate

# 開発サーバーの起動
python manage.py runserver
```

バックエンドは http://localhost:8000 で起動します。

#### フロントエンド (Frontend)

```bash
cd frontend

# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

フロントエンドは http://localhost:5173 で起動します。

### 方法2: 開発スクリプト (Development Script)

```bash
./dev.sh
```

このスクリプトは、バックエンドとフロントエンドの両方を自動的に起動します。

### 方法3: Docker (Docker)

```bash
docker-compose up
```

## 📁 プロジェクト構造

```
reactango/
├── backend/              # Djangoバックエンド
│   ├── _fw/             # フレームワーク層（FW機能 + サンプル実装）
│   │   ├── application/ # アプリケーション層（ユースケース）
│   │   ├── domain/      # ドメイン層（エンティティ、リポジトリIF）
│   │   ├── infrastructure/ # インフラ層（DB実装）
│   │   ├── presentation/   # プレゼン層（API、シリアライザ）
│   │   └── migrations/  # データベースマイグレーション
│   ├── _project/        # プロジェクト独自実装（FW層を継承）
│   │   ├── application/
│   │   ├── domain/
│   │   ├── infrastructure/
│   │   └── presentation/
│   ├── config/          # Django設定
│   ├── manage.py        # Django管理スクリプト
│   ├── requirements.txt # Python依存関係
│   └── Dockerfile       # バックエンドDockerfile
├── frontend/            # Reactフロントエンド
│   └── src/
│       ├── _fw/        # フレームワーク層（FW機能 + サンプル実装）
│       │   ├── components/ # 共通コンポーネント（10種類）
│       │   ├── hooks/   # カスタムフック
│       │   ├── api/     # APIクライアント
│       │   ├── utils/   # ユーティリティ関数
│       │   └── features/users/  # サンプル実装（ユーザー管理）
│       ├── _project/   # プロジェクト独自機能
│       │   └── features/
│       ├── layouts/    # レイアウトコンポーネント
│       ├── App.jsx     # アプリケーションルート
│       └── main.jsx    # エントリーポイント
├── .vscode/            # VS Code設定（タスク定義）
├── docker-compose.yml  # Docker Compose設定
└── dev.sh             # 開発用起動スクリプト
```

### フォルダ命名規則

- **`_fw`プレフィックス**: フレームワーク層を表す
  - フォルダ一覧で先頭に表示され、FW層であることが明確
  - FW更新時の影響範囲を最小化
  - 独自実装との分離を視覚的に強調

- **`_project`プレフィックス**: プロジェクト独自実装を表す
  - FW層を継承・拡張して独自機能を実装
  - FW層と同じ構造を維持

## 🏗️ アーキテクチャ

### システム構成

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
│  │  - React Components (Material UI)                │  │
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
│  │  Presentation Layer (API Views, Serializers)     │  │
│  │  Application Layer (Use Cases)                   │  │
│  │  Domain Layer (Entities, Value Objects)          │  │
│  │  Infrastructure Layer (ORM, Repositories)        │  │
│  │                                                    │  │
│  │  CORS Headers (django-cors-headers)              │  │
│  │  Database (SQLite / PostgreSQL)                  │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### バックエンド（DDD 4層アーキテクチャ）

1. **Domain層** - ビジネスロジックの中核
   - エンティティ（Entity）
   - 値オブジェクト（Value Object）
   - リポジトリインターフェース
   - ドメインサービス

2. **Application層** - ユースケースの実装
   - ユースケース（Use Case）
   - DTO（Data Transfer Object）
   - トランザクション管理

3. **Infrastructure層** - 技術的実装
   - Django ORMモデル
   - リポジトリ実装
   - 外部サービス連携

4. **Presentation層** - APIインターフェース
   - REST APIビュー
   - シリアライザ
   - HTTPリクエスト/レスポンス処理

### フロントエンド（コンポーネント駆動開発）

- **コンポーネント**: 再利用可能なUIパーツ（10種類）
- **カスタムフック**: ビジネスロジックの分離
- **機能モジュール**: index/hooks/details/listの一貫した構造
- **APIクライアント**: バックエンドとの通信

## 🔧 設定 (Configuration)

### 環境変数 (Environment Variables)

バックエンドとフロントエンドには、それぞれ `.env.example` ファイルがあります。
これらをコピーして `.env` ファイルを作成し、必要に応じて編集してください。

**Backend (.env):**
```bash
cp backend/.env.example backend/.env
```

**Frontend (.env):**
```bash
cp frontend/.env.example frontend/.env
```

## 🌐 API エンドポイント (API Endpoints)

### FW機能（サンプル実装）
- `GET /api/v1/users/` - ユーザー一覧取得
- `POST /api/v1/users/` - ユーザー作成
- `GET /api/v1/users/{id}/` - ユーザー詳細取得
- `PUT /api/v1/users/{id}/` - ユーザー更新
- `DELETE /api/v1/users/{id}/` - ユーザー削除

### システム
- `GET /api/hello/` - API接続確認

## 🎨 フロントエンドコンポーネント

### レイアウトコンポーネント
- **PageContainer** - ページ全体のコンテナ（maxWidth: 1600）
- **PageHeader** - ページヘッダー（タイトル、説明、アクション）
- **FlexBox** - Flexboxレイアウトラッパー
- **UniformGrid** - 均等幅グリッドレイアウト

### UIコンポーネント
- **Card** - ホバーエフェクト付きカード
- **PrimaryButton** - アニメーション付きボタン
- **TextField** - Material UIテキストフィールド
- **DataTable** - データテーブル（カスタムレンダー対応）
- **FormDialog** - フォーム用ダイアログ
- **LoadingSpinner** - ローディングスピナー

詳細は `frontend/src/_fw/components/README.md` を参照してください。

## 🔧 技術スタック (Tech Stack)

### Backend
- Django 5.x
- Django REST Framework 3.x
- django-cors-headers
- Python 3.12+

### Frontend
- React 19.1
- Vite 7.1
- Material UI (MUI) 7.3
- Emotion (CSS-in-JS)
- React Router 7.9

## 🧪 開発

### VS Codeタスク

プロジェクトルートで以下のタスクが使用可能：

**タスク実行方法**:
1. `Ctrl+Shift+P` でコマンドパレットを開く
2. "Tasks: Run Task" を選択
3. 実行したいタスクを選択

**利用可能なタスク**:
- **Start All Servers**: バックエンドとフロントエンドを同時起動
- **Backend: Run Django Server**: Djangoサーバーのみ起動
- **Backend: Make Migrations**: マイグレーションファイル生成
- **Backend: Migrate Database**: マイグレーション実行
- **Frontend: Run Vite Dev Server**: Viteサーバーのみ起動
- **Frontend: Build**: プロダクションビルド

### 新機能の追加

#### バックエンド（DDD）

1. **Domain層**でエンティティを定義
   ```python
   # backend/_project/domain/entities/product.py
   from _fw.domain.base_entity import BaseEntity
   
   class Product(BaseEntity):
       def __init__(self, id, name, price):
           super().__init__(id)
           self._name = name
           self._price = price
   ```

2. **Application層**でユースケースを実装
   ```python
   # backend/_project/application/use_cases/create_product.py
   from _fw.application.base_use_case import BaseUseCase
   
   class CreateProductUseCase(BaseUseCase):
       def execute(self, input_dto):
           # ビジネスロジック実装
           pass
   ```

3. **Infrastructure層**でリポジトリを実装
   ```python
   # backend/_project/infrastructure/repositories/product_repository.py
   from _project.domain.repositories.product_repository import ProductRepository
   
   class DjangoProductRepository(ProductRepository):
       # CRUD操作の実装
       pass
   ```

4. **Presentation層**でAPIエンドポイントを作成
   ```python
   # backend/_project/presentation/presenters/product_presenter.py
   from _fw.presentation.base_presenter import BasePresenter
   
   class ProductPresenter(BasePresenter):
       def post(self, request):
           # APIリクエスト処理
           pass
   ```

#### フロントエンド（コンポーネント駆動）

1. **features/**に新機能フォルダを作成
   ```
   frontend/src/_project/features/products/
   ├── index.jsx          # ルーティング
   ├── hooks/
   │   └── useProducts.js # ビジネスロジック
   ├── list/
   │   └── ProductList.jsx # 一覧画面
   └── details/
       └── ProductDetails.jsx # 詳細画面
   ```

2. **hooks**でビジネスロジックを実装
   ```jsx
   // frontend/src/_project/features/products/hooks/useProducts.js
   import { useFetch } from '@/_fw/hooks';
   
   export function useProducts() {
       const { data, loading, error } = useFetch('/api/v1/products/');
       return { products: data, loading, error };
   }
   ```

3. **list/details**でUIコンポーネントを実装
   ```jsx
   // frontend/src/_project/features/products/list/ProductList.jsx
   import { useProducts } from '../hooks/useProducts';
   import { PageContainer, DataTable, PrimaryButton } from '@/_fw/components';
   
   export function ProductList() {
       const { products, loading } = useProducts();
       
       return (
           <PageContainer>
               <DataTable data={products} loading={loading} />
           </PageContainer>
       );
   }
   ```

### データフロー

1. **ユーザー → React** - ブラウザでReactアプリにアクセス
2. **React → Django** - `fetch('/api/endpoint')` でAPIリクエスト（Viteプロキシ経由）
3. **Django → Database** - Django ORMでデータベースにアクセス
4. **Django → React** - JSON形式でレスポンスを返す（CORS対応）
5. **React → ユーザー** - レスポンスデータでUIを更新

## 🚀 デプロイメント

### 本番環境への準備

1. **Django設定の変更**
   ```python
   # backend/config/settings.py
   DEBUG = False
   SECRET_KEY = os.environ.get('SECRET_KEY')
   ALLOWED_HOSTS = ['yourdomain.com']
   
   # PostgreSQLに変更（推奨）
   DATABASES = {
       'default': {
           'ENGINE': 'django.db.backends.postgresql',
           'NAME': os.environ.get('DB_NAME'),
           'USER': os.environ.get('DB_USER'),
           'PASSWORD': os.environ.get('DB_PASSWORD'),
           'HOST': os.environ.get('DB_HOST'),
           'PORT': os.environ.get('DB_PORT', '5432'),
       }
   }
   ```

2. **React ビルド**
   ```bash
   cd frontend
   npm run build
   ```

3. **静的ファイルの配信**
   - Nginxまたは他のWebサーバーから配信
   - Django の `collectstatic` コマンド使用

4. **HTTPS の設定**
   - SSL証明書の取得（Let's Encrypt等）
   - リバースプロキシの設定（Nginx等）

### セキュリティ

- **CORS**: 本番環境では特定のドメインのみ許可
- **CSRF**: Django の CSRF 保護が有効
- **認証**: JWT、OAuth2等を追加可能
- **環境変数**: 機密情報は `.env` ファイルに保存（Gitには含めない）

### パフォーマンス最適化

**フロントエンド**:
- Code splitting（コード分割）
- Lazy loading（遅延読み込み）
- 画像最適化

**バックエンド**:
- データベースクエリ最適化（select_related, prefetch_related）
- キャッシング（Redis等）
- ページネーション

## 🔌 拡張性

このフレームワークは、以下の追加が容易です：

- **認証システム**: JWT, OAuth2, Social Auth
- **リアルタイム機能**: Django Channels + WebSocket
- **タスクキュー**: Celery + Redis
- **検索機能**: Elasticsearch
- **ファイルストレージ**: AWS S3, MinIO
- **状態管理**: Redux, Zustand
- **型安全性**: TypeScript化

## 🐛 トラブルシューティング

### よくある問題

**CORSエラー**
- `backend/config/settings.py` の `CORS_ALLOWED_ORIGINS` を確認
- ミドルウェアの順序を確認

**APIが404を返す**
- URLパターンを確認
- `frontend/vite.config.js` のプロキシ設定を確認

**データベースエラー**
- マイグレーションを実行: `python manage.py migrate`
- データベースファイルの権限を確認

**HMRが動作しない**
- Viteサーバーを再起動
- ブラウザのキャッシュをクリア

## 🤝 貢献

### Pull Requestプロセス

1. リポジトリをフォーク
2. 新しいブランチを作成: `git checkout -b feature/your-feature`
3. 変更をコミット: `git commit -m "feat: 新機能の追加"`
4. ブランチをプッシュ: `git push origin feature/your-feature`
5. Pull Requestを作成

### コミットメッセージ規則

```
feat: 新機能の追加
fix: バグ修正
docs: ドキュメントのみの変更
style: コードの意味に影響を与えない変更（空白、フォーマット等）
refactor: バグ修正でも機能追加でもないコード変更
test: テストの追加または既存テストの修正
chore: ビルドプロセスや補助ツールの変更
```

### コードスタイル

**Python (Django)**
- PEP 8に従う
- 関数とクラスにdocstringを追加
- Type hintsを使用（可能な場合）

**JavaScript (React)**
- ESLintの設定に従う
- 関数コンポーネントを優先
- PropTypesで型を定義

### バグ報告

GitHubのIssueで以下の情報を提供してください：
- バグの説明
- 再現手順
- 期待される動作 vs 実際の動作
- スクリーンショット（該当する場合）
- 環境情報（OS、Python/Nodeバージョン等）

## 📖 関連ドキュメント

- [Backend FW層詳細](backend/_fw/README.md)
- [Frontend FW層詳細](frontend/src/_fw/README.md)
- [Frontend コンポーネント詳細](frontend/src/_fw/components/README.md)

## 🧪 開発 (Development)

### バックエンドに新しいAPIを追加

1. `backend/api/views.py` に新しいビューを作成
2. `backend/api/urls.py` にURLパターンを追加
3. 必要に応じてモデルとシリアライザーを作成

### フロントエンドの開発

1. `frontend/src/` にReactコンポーネントを追加
2. APIエンドポイントは `/api/` プレフィックスで呼び出し（Viteプロキシが自動的にDjangoにルーティング）

## 📝 ライセンス

MIT License

---

**Reactango** - モダンなフルスタックWeb開発フレームワーク
