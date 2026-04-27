# Skill: Environment Setup (@environment_setup)

Reactangoプロジェクトにおける開発環境の構築・変更・修復を行うためのルールセットです。

## 基本的な環境構築ステップ
新しい開発者がプロジェクトに参画した際、あるいはクリーンな状態から立ち上げる際は以下の手順を自動化・サポートします。

### 1. 依存関係のインストール
- **Backend (Python)**: `backend/requirements.txt` を読み込み、仮想環境（venv）内で `pip install` を実行します。
- **Frontend (Node.js)**: `frontend/` ディレクトリで `npm install` または `yarn install` を実行します。

### 2. データベースの初期化
- `.env` などの環境変数を設定し、`python manage.py migrate` を実行してスキーマを最新状態にします。

### 3. パッケージの追加ルール
- Pythonパッケージを追加した場合は、必ず `pip freeze > requirements.txt` （あるいは必要なパッケージのみ追記）を行い、Git管理下に含めること。
- Node.jsパッケージの追加は `npm install <package>` を使い、`package.json` が更新されることを確認すること。

## トラブルシューティング
- パッケージのバージョン競合が発生した場合は、依存ツリーを解析して、動作するバージョンを特定し再インストールします。
- `node_modules` や `venv` の破損が疑われる場合は、フォルダを削除してクリーンインストールを提案・実行します。
