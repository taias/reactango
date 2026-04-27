"""
Django User Repository Implementation
DjangoORMを使用したユーザーリポジトリの実装
"""
from typing import Optional, List
from _fw.domain.repositories.user_repository import UserRepository
from _fw.domain.entities.user import User
from _fw.infrastructure.models.user_model import UserModel


class DjangoUserRepository(UserRepository):
    """
    Django ORMを使用したユーザーリポジトリの実装
    
    UserエンティティはCode値オブジェクトを持つため、
    save()時に自動でcodeの重複チェックが実行される。
    """

    def find_by_id(self, id: int) -> Optional[User]:
        """IDでユーザーを検索"""
        try:
            user_model = UserModel.objects.get(pk=id)
            return self._to_entity(user_model)
        except UserModel.DoesNotExist:
            return None

    def find_all(self) -> List[User]:
        """全てのユーザーを取得"""
        user_models = UserModel.objects.all()
        return [self._to_entity(model) for model in user_models]

    def exists_by_code(self, code, exclude_id=None) -> bool:
        """
        指定されたコードが既に存在するか確認
        
        これを実装することでsave()時の自動チェックが有効になる
        """
        code_value = code.value if hasattr(code, 'value') else code
        qs = UserModel.objects.filter(code=code_value)
        if exclude_id:
            qs = qs.exclude(pk=exclude_id)
        return qs.exists()

    def find_by_code(self, code) -> Optional[User]:
        """コードでユーザーを検索"""
        code_value = code.value if hasattr(code, 'value') else code
        try:
            user_model = UserModel.objects.get(code=code_value)
            return self._to_entity(user_model)
        except UserModel.DoesNotExist:
            return None

    def _do_save(self, entity: User) -> User:
        """実際の保存処理"""
        if entity.id:
            # 更新
            user_model = UserModel.objects.get(pk=entity.id)
            data = entity.to_orm()
            user_model.code = data['code']
            user_model.name = data['name']
            user_model.email = data['email']
            user_model.favorite_food = data['favorite_food']
        else:
            # 新規作成
            data = entity.to_orm()
            user_model = UserModel(**data)
        
        user_model.save()
        return self._to_entity(user_model)

    def delete(self, id: int) -> bool:
        """ユーザーを削除"""
        try:
            user_model = UserModel.objects.get(pk=id)
            user_model.delete()
            return True
        except UserModel.DoesNotExist:
            return False

    def find_by_email(self, email: str) -> Optional[User]:
        """メールアドレスでユーザーを検索"""
        try:
            user_model = UserModel.objects.get(email=email)
            return self._to_entity(user_model)
        except UserModel.DoesNotExist:
            return None

    def _to_entity(self, model: UserModel) -> User:
        """ORMモデルをドメインエンティティに変換"""
        return User.from_orm(model)
