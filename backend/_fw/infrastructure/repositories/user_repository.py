"""
Django User Repository Implementation
DjangoORMを使用したユーザーリポジトリの実装
"""
from typing import Optional, List
from _fw.domain.repositories.user_repository import UserRepository
from _fw.domain.entities.user import User
from _fw.infrastructure.models.user_model import UserModel


class DjangoUserRepository(UserRepository):
    """Django ORMを使用したユーザーリポジトリの実装"""

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

    def save(self, entity: User) -> User:
        """ユーザーを保存"""
        if entity.id:
            # 更新
            user_model = UserModel.objects.get(pk=entity.id)
            data = entity.to_orm()
            user_model.name = data['name']
            user_model.email = data['email']
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
