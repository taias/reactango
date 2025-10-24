# Reactango

Django + React 開発フレームワーク (Django + React Development Framework)

Reactangoは、DjangoバックエンドとReactフロントエンドを統合した、モダンなフルスタックWeb開発フレームワークです。

## 🚀 機能 (Features)

- **Django Backend**: Django REST Frameworkを使用したRESTful API
- **React Frontend**: Viteを使用した高速なReact開発環境
- **CORS対応**: フロントエンドとバックエンド間の通信を簡単に設定
- **開発環境**: Docker対応、ワンコマンドでの起動

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

## 📁 プロジェクト構造 (Project Structure)

```
reactango/
├── backend/              # Djangoバックエンド
│   ├── config/          # Django設定
│   ├── api/             # APIアプリケーション
│   ├── manage.py        # Django管理スクリプト
│   ├── requirements.txt # Python依存関係
│   └── Dockerfile       # バックエンドDockerfile
├── frontend/            # Reactフロントエンド
│   ├── src/            # ソースコード
│   ├── public/         # 静的ファイル
│   ├── package.json    # Node.js依存関係
│   └── Dockerfile      # フロントエンドDockerfile
├── docker-compose.yml  # Docker Compose設定
└── dev.sh             # 開発用起動スクリプト
```

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

- `GET /api/hello/` - テスト用のHello Worldエンドポイント

## 🧪 開発 (Development)

### バックエンドに新しいAPIを追加

1. `backend/api/views.py` に新しいビューを作成
2. `backend/api/urls.py` にURLパターンを追加
3. 必要に応じてモデルとシリアライザーを作成

### フロントエンドの開発

1. `frontend/src/` にReactコンポーネントを追加
2. APIエンドポイントは `/api/` プレフィックスで呼び出し（Viteプロキシが自動的にDjangoにルーティング）

## 📝 ライセンス (License)

MIT License

## 🤝 貢献 (Contributing)

プルリクエストを歓迎します！大きな変更の場合は、まずissueを開いて変更内容を議論してください。

---

作成者: reactangoコミュニティ
