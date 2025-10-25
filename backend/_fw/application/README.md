# Framework Layer - Application

## 概要
フレームワーク層のアプリケーション機能を提供します。
共通のユースケース、DTO、アプリケーションサービスなどを含みます。

## 主要コンポーネント

### Base Use Case
- ユースケースの基底クラス
- 入力DTOと出力DTOの型定義
- 実行メソッドの標準化

### サンプル実装: User機能

#### ユースケース
- `CreateUserUseCase` - ユーザー作成
- `GetUserUseCase` - ユーザー取得
- `UpdateUserUseCase` - ユーザー更新
- `DeleteUserUseCase` - ユーザー削除

#### DTO
- `CreateUserInputDTO` - ユーザー作成入力
- `UserOutputDTO` - ユーザー出力
- `UpdateUserInputDTO` - ユーザー更新入力

## 使用方法

```python
from _fw.application.use_cases.user.create_user import CreateUserUseCase
from _fw.application.dto.user_dto import CreateUserInputDTO

# ユースケースの実行
use_case = CreateUserUseCase(user_repository)
output = use_case.execute(CreateUserInputDTO(name="Test", email="test@example.com"))
```
