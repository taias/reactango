# Reactango クイックスタートガイド

このガイドでは、Reactangoを最速で起動する方法を説明します。

## 最速スタート (Fastest Start)

### 前提条件
- Python 3.12以上
- Node.js 20以上

### 3ステップで起動

```bash
# 1. リポジトリをクローン
git clone https://github.com/taias/reactango.git
cd reactango

# 2. 開発スクリプトを実行
./dev.sh

# 3. ブラウザでアクセス
# Frontend: http://localhost:5173
# Backend API: http://localhost:8000/api/
# Django Admin: http://localhost:8000/admin/
```

## Docker での起動

Dockerを使用する場合は、さらに簡単です：

```bash
# 1. リポジトリをクローン
git clone https://github.com/taias/reactango.git
cd reactango

# 2. Docker Composeで起動
docker-compose up

# 3. ブラウザでアクセス
# Frontend: http://localhost:5173
# Backend API: http://localhost:8000/api/
```

## 手動セットアップ（詳細）

### バックエンド

```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### フロントエンド

別のターミナルで：

```bash
cd frontend
npm install
npm run dev
```

## 次のステップ

1. **管理者アカウントの作成**
   ```bash
   cd backend
   source venv/bin/activate
   python manage.py createsuperuser
   ```

2. **新しいAPIエンドポイントの追加**
   - `backend/api/views.py` でビューを作成
   - `backend/api/urls.py` でURLを登録

3. **Reactコンポーネントの追加**
   - `frontend/src/` に新しいコンポーネントを追加
   - `/api/` プレフィックスでバックエンドAPIにアクセス

## トラブルシューティング

### ポートが既に使用されている

**Backend (ポート8000):**
```bash
python manage.py runserver 8001
```

**Frontend (ポート5173):**
```bash
npm run dev -- --port 3000
```

### CORS エラー

`backend/config/settings.py` の `CORS_ALLOWED_ORIGINS` を確認してください：
```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://localhost:3000",
]
```

### データベースのリセット

```bash
cd backend
rm db.sqlite3
python manage.py migrate
```

## リソース

- [Django ドキュメント](https://docs.djangoproject.com/)
- [React ドキュメント](https://react.dev/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [Vite ドキュメント](https://vite.dev/)

## サポート

問題が発生した場合は、GitHubのIssueを開いてください。
