# Contributing to Reactango

Reactangoへの貢献に興味を持っていただきありがとうございます！

## 開発環境のセットアップ

1. リポジトリをフォーク
2. ローカルにクローン
   ```bash
   git clone https://github.com/YOUR_USERNAME/reactango.git
   cd reactango
   ```
3. 開発環境を起動
   ```bash
   ./dev.sh
   ```

## コントリビューションのガイドライン

### コードスタイル

**Python (Django)**
- PEP 8に従う
- 関数とクラスにdocstringを追加
- Type hintsを使用（可能な場合）

**JavaScript (React)**
- ESLintの設定に従う
- 関数コンポーネントを優先
- PropTypesまたはTypeScriptで型を定義

### コミットメッセージ

明確で説明的なコミットメッセージを使用してください：

```
feat: 新機能の追加
fix: バグ修正
docs: ドキュメントのみの変更
style: コードの意味に影響を与えない変更（空白、フォーマットなど）
refactor: バグ修正でも機能追加でもないコード変更
test: テストの追加または既存テストの修正
chore: ビルドプロセスやドキュメント生成などの補助ツールやライブラリの変更
```

### Pull Requestプロセス

1. 新しいブランチを作成
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. 変更をコミット
   ```bash
   git commit -m "feat: your feature description"
   ```

3. ブランチをプッシュ
   ```bash
   git push origin feature/your-feature-name
   ```

4. GitHubでPull Requestを作成

5. Pull Requestの説明に以下を含める：
   - 変更の概要
   - なぜこの変更が必要か
   - テスト方法
   - スクリーンショット（UI変更の場合）

### テスト

変更を送信する前に、以下を確認してください：

**Backend:**
```bash
cd backend
python manage.py test
python manage.py check
```

**Frontend:**
```bash
cd frontend
npm run build
npm run lint  # (設定されている場合)
```

### 報告するバグ

バグを見つけた場合は、GitHubのIssueで以下の情報を提供してください：

- バグの説明
- 再現手順
- 期待される動作
- 実際の動作
- スクリーンショット（該当する場合）
- 環境情報（OS、Python/Nodeバージョンなど）

### 機能リクエスト

新機能を提案する場合は、Issueで以下を説明してください：

- 機能の説明
- なぜこの機能が必要か
- 可能な実装方法
- 代替案（検討している場合）

## 開発のヒント

### バックエンド開発

```bash
# 新しいDjangoアプリを作成
cd backend
python manage.py startapp myapp

# マイグレーションを作成
python manage.py makemigrations

# マイグレーションを適用
python manage.py migrate

# スーパーユーザーを作成
python manage.py createsuperuser

# Djangoシェルを起動
python manage.py shell
```

### フロントエンド開発

```bash
# 新しいコンポーネントを作成
# frontend/src/components/MyComponent.jsx

# 依存関係を追加
cd frontend
npm install package-name

# 開発サーバーを起動
npm run dev

# プロダクションビルド
npm run build
```

## コミュニティ

- 質問がある場合は、Discussionsで聞いてください
- セキュリティの問題を見つけた場合は、公開せずに直接連絡してください
- 他のコントリビューターを尊重してください

## ライセンス

コントリビューションすることで、あなたの貢献がMITライセンスの下でライセンスされることに同意したものとみなされます。

---

貢献いただきありがとうございます！ 🎉
