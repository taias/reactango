# Framework (_fw) Layer

## 概要
このディレクトリには、アプリケーション全体で使用される共通のフレームワーク機能が含まれています。
DDDアーキテクチャの基盤となる基底クラスとインターフェース、およびサンプル実装（User機能）を提供します。

## ディレクトリ構成

```
_fw/
├── application/         # アプリケーション層
│   ├── base_use_case.py
│   ├── use_cases/
│   │   └── user/       # Userユースケース
│   └── dto/
│       └── user_dto.py
├── domain/             # ドメイン層
│   ├── base_entity.py
│   ├── base_value_object.py
│   ├── base_repository.py
│   ├── entities/
│   │   └── user.py
│   ├── value_objects/
│   │   └── email.py
│   └── repositories/
│       └── user_repository.py
├── infrastructure/     # インフラストラクチャ層
│   ├── models/
│   │   └── user_model.py
│   └── repositories/
│       └── user_repository.py
└── presentation/       # プレゼンテーション層
    ├── base_presenter.py
    ├── serializers/
    │   └── user_serializer.py
    ├── presenters/
    │   └── user_presenter.py
    └── urls.py
```

## 目的
- フレームワーク機能の一元管理
- FWの更新が各レイヤーに影響を与えないように抽象化
- DDDパターンの標準実装を提供
- サンプル実装（User機能）を通じた使用方法の提示

## フォルダ命名規則
- アンダースコアプレフィックス (`_fw`) を使用
- フォルダ一覧で先頭に表示され、FW層であることが明確

## 主要コンポーネント

### Application層
- `BaseUseCase` - ユースケースの基底クラス
- User機能のユースケース実装
- User機能のDTO

### Domain層
- `BaseEntity` - エンティティの基底クラス
- `BaseValueObject` - 値オブジェクトの基底クラス
- `BaseRepository` - リポジトリの基底インターフェース
- User機能のドメインモデル

### Infrastructure層
- User機能のORMモデル
- User機能のリポジトリ実装

### Presentation層
- `BasePresenter` - プレゼンターの基底クラス
- User機能のシリアライザ
- User機能のAPIエンドポイント

## 使用方法

各レイヤーでFW層のコンポーネントを活用します：

```python
# 新機能でFW層を活用する例

# Domain Layer
from _fw.domain.base_entity import BaseEntity

class Product(BaseEntity):
    def __init__(self, id, name):
        super().__init__(id)
        self.name = name

# Application Layer
from _fw.application.base_use_case import BaseUseCase

class CreateProductUseCase(BaseUseCase):
    def execute(self, input_dto):
        # 実装
        pass

# Presentation Layer
from _fw.presentation.base_presenter import BasePresenter

class ProductPresenter(BasePresenter):
    def post(self, request):
        # 実装
        pass
```

## User機能（サンプル実装）

User機能はFW層のサンプル実装として提供されています：

### API エンドポイント
- `POST /api/v1/users/` - ユーザー作成
- `GET /api/v1/users/` - ユーザー一覧
- `GET /api/v1/users/{id}/` - ユーザー詳細

### 実装の流れ
1. リクエスト → Presenter
2. Presenter → UseCase
3. UseCase → Repository → Domain
4. レスポンス返却

## 設計原則
- **依存性逆転の原則**: 上位レイヤーが下位レイヤーに依存しない
- **開放閉鎖の原則**: 拡張に対して開き、修正に対して閉じる
- **単一責任の原則**: 各クラスは一つの責任のみを持つ

## 注意事項
- このディレクトリ内のファイルを変更する場合は、全てのレイヤーへの影響を考慮すること
- 新しい機能を追加する場合は、Userサンプルを参考にすること
- FWの更新は慎重に行い、バージョン管理を徹底すること
