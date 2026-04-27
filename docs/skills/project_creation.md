# Skill: Project Creation (@project_creation)

Reactangoにおいて、新しい機能モジュールやアプリケーション基盤を追加作成するための手順を定義します。

## 新規機能の追加ルール
バックエンドとフロントエンドの両方で、指定された構成に従ってディレクトリとファイルを作成します。

### 1. バックエンド (_project/)
`backend/_project/` 配下に新機能のコードを配置します。機能が大きくなる場合は、Djangoの独立したアプリケーションとして作成することも検討します。
- `domain/` : エンティティ定義、リポジトリIF
- `application/` : ユースケース定義
- `infrastructure/` : Djangoモデル、リポジトリ実装
- `presentation/` : Views, Serializers, URLs

### 2. フロントエンド (_project/features/)
`frontend/src/_project/features/<feature-name>/` にディレクトリを作成します。
必ず以下の構成を保つようにします。
- `index.jsx` : その機能のルーティング定義
- `hooks/use<Feature>.js` : バックエンド通信と状態管理
- `list/` : 一覧画面コンポーネント
- `details/` : 詳細・作成・編集画面コンポーネント

## コマンド実行の原則
ファイル作成を行う際、手動ではなくAI（Antigravity）のファイル作成ツール（`write_to_file`など）を活用して一括で構造を組み上げます。
