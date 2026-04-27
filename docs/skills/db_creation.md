# Skill: DB Creation (@db_creation)

設計されたデータモデル（DBML）を元に、Djangoプロジェクトでデータベーステーブルを作成し、マイグレーションまでを実行するための自動化手順です。

## 実行条件
事前に `@se_consultant` などによって **DBML（Database Markup Language）** が定義されていること。

## ワークフロー

### 1. DDL（Django Models）の生成
提供されたDBMLを解析し、`backend/_project/infrastructure/models.py`（または該当するアプリの `models.py`）にDjangoのORMモデルとしてPythonコードを記述します。
- リレーション（`ForeignKey`, `ManyToManyField`）を正確にマッピングします。
- 制約（`null=True`, `unique=True`, `max_length` など）をDBMLの定義から抽出して反映させます。
- `__str__` メソッドなどのユーティリティも追加します。

### 2. 管理画面 (Admin) への登録
開発やデバッグを容易にするため、生成したモデルを `admin.py` に登録します。

### 3. マイグレーションファイルの生成
ターミナルコマンドを実行し、モデル変更をマイグレーションファイルとして書き出します。
```bash
python backend/manage.py makemigrations
```

### 4. マイグレーションの実行
生成されたマイグレーションをデータベースに適用します。
```bash
python backend/manage.py migrate
```

## エラーハンドリング
- マイグレーション時にエラー（デフォルト値の欠落、リレーションの不整合など）が発生した場合は、自動的に原因を分析し、モデルを修正して再度マイグレーションを試みます。
