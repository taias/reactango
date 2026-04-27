# Skill: DDD Implementation (@ddd_implementation)

Reactangoのバックエンドにおいて、DDD（ドメイン駆動設計）の思想に基づいて新機能を実装するためのステップ・バイ・ステップのガイドラインです。

## ワークフロー

### Step 1: Domain層の実装
何よりも先にビジネスルールの中心であるドメインを定義します。
- **Entity**: 識別子を持つオブジェクトを作成します。`_fw.domain.base_entity.BaseEntity` を継承させます。
- **Value Object**: 属性のみを持つオブジェクトを定義します（必要な場合）。
- **Repository Interface**: DBとのやり取りを抽象化するインターフェース（`abc.ABC`）を定義します。

### Step 2: Application層の実装
ユースケース（機能の実行単位）を実装します。
- **DTO**: 外部から受け取るデータ、外部へ返すデータを定義します。
- **Use Case**: `_fw.application.base_use_case.BaseUseCase` を継承し、ドメインエンティティとリポジトリIFを利用してビジネスロジックをオーケストレーションします。

### Step 3: Infrastructure層の実装
技術的詳細（Django依存の処理）を実装します。
- **Django Models**: `models.py` にDBのテーブル設計を定義します。
- **Repository Impl**: Step 1で定義したインターフェースを実装し、Djangoモデルとドメインエンティティ間の変換（マッピング）を行います。

### Step 4: Presentation層の実装
APIエンドポイントを公開します。
- **Serializers**: HTTPリクエストとDTOの相互変換を行います。
- **Views**: `_fw.presentation.base_presenter.BasePresenter` や DRFのAPIViewを使用し、リクエストを受け取ってユースケースを実行し、結果を返します。
- **URLs**: エンドポイントをルーティングに追加します。
