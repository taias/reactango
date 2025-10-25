"""
User Entity - ユーザーエンティティ
ドメイン層のビジネスオブジェクト
"""
from _fw.domain.base_entity import BaseEntity
from _fw.domain.value_objects.email import Email


class User(BaseEntity):
    """ユーザーエンティティ"""

    def __init__(self, id, name: str, email: str):
        super().__init__(id)
        self._name = name
        self._email = Email(email)

    @property
    def name(self) -> str:
        return self._name

    @property
    def email(self) -> Email:
        return self._email

    def change_name(self, new_name: str):
        """名前を変更する"""
        if not new_name or len(new_name.strip()) == 0:
            raise ValueError("Name cannot be empty")
        self._name = new_name
        self._update_timestamp()

    def change_email(self, new_email: str):
        """メールアドレスを変更する"""
        self._email = Email(new_email)
        self._update_timestamp()

    @classmethod
    def create(cls, name: str, email: str):
        """
        新規ユーザーを作成するファクトリメソッド
        
        Args:
            name: ユーザー名
            email: メールアドレス
            
        Returns:
            User: 新規ユーザーエンティティ
            
        Raises:
            ValueError: バリデーションエラー
        """
        if not name or len(name.strip()) == 0:
            raise ValueError("Name is required")
        if not email or len(email.strip()) == 0:
            raise ValueError("Email is required")
        
        return cls(id=None, name=name, email=email)

    @classmethod
    def from_orm(cls, model):
        """
        ORMモデルからエンティティを生成
        
        Args:
            model: UserModel (Django ORM)
            
        Returns:
            User: ユーザーエンティティ
        """
        user = cls(
            id=model.id,
            name=model.name,
            email=model.email
        )
        user._created_at = model.created_at
        user._updated_at = model.updated_at
        return user

    def to_orm(self):
        """
        エンティティからORMモデル用のデータを生成
        
        Returns:
            dict: ORMモデルに渡すデータ
        """
        return {
            'name': self._name,
            'email': self._email.value,
        }

    def to_dict(self):
        """
        辞書形式に変換（API レスポンス用）
        
        Returns:
            dict: ユーザー情報の辞書
        """
        return {
            'id': self.id,
            'name': self._name,
            'email': self._email.value,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
        }

    @classmethod
    def from_dict(cls, data: dict):
        """
        辞書からエンティティを生成（API リクエスト用）
        
        Args:
            data: ユーザーデータの辞書
            
        Returns:
            User: ユーザーエンティティ
        """
        return cls(
            id=data.get('id'),
            name=data['name'],
            email=data['email']
        )

    def __repr__(self):
        return f"User(id={self.id}, name={self.name}, email={self.email.value})"
