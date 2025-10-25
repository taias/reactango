"""
User Use Cases
ユーザー関連のユースケース
"""
from _fw.domain.repositories.user_repository import UserRepository
from _fw.domain.entities.user import User


class UserUseCase:
    """ユーザーユースケース"""

    def __init__(self, user_repository: UserRepository):
        self.user_repository = user_repository

    def create_user(self, name: str, email: str) -> User:
        """
        ユーザーを作成する
        
        Args:
            name: ユーザー名
            email: メールアドレス
            
        Returns:
            User: 作成されたユーザーエンティティ
            
        Raises:
            ValueError: バリデーションエラーまたはメールアドレス重複
        """
        # メールアドレスの重複チェック
        existing_user = self.user_repository.find_by_email(email)
        if existing_user:
            raise ValueError(f"Email already exists: {email}")

        # ユーザーエンティティの作成（バリデーション含む）
        user = User.create(name=name, email=email)

        # 永続化
        saved_user = self.user_repository.save(user)

        return saved_user

    def get_user(self, user_id: int) -> User:
        """
        IDでユーザーを取得する
        
        Args:
            user_id: ユーザーID
            
        Returns:
            User: ユーザーエンティティ
            
        Raises:
            ValueError: ユーザーが見つからない場合
        """
        user = self.user_repository.find_by_id(user_id)
        
        if not user:
            raise ValueError(f"User not found: {user_id}")

        return user

    def get_all_users(self) -> list[User]:
        """
        全ユーザーを取得する
        
        Returns:
            list[User]: ユーザーエンティティのリスト
        """
        return self.user_repository.find_all()

    def update_user(self, user_id: int, name: str = None, email: str = None) -> User:
        """
        ユーザー情報を更新する
        
        Args:
            user_id: ユーザーID
            name: 新しい名前（オプション）
            email: 新しいメールアドレス（オプション）
            
        Returns:
            User: 更新されたユーザーエンティティ
            
        Raises:
            ValueError: ユーザーが見つからない場合
        """
        user = self.get_user(user_id)

        if name:
            user.change_name(name)
        if email:
            user.change_email(email)

        return self.user_repository.save(user)

    def delete_user(self, user_id: int) -> None:
        """
        ユーザーを削除する
        
        Args:
            user_id: ユーザーID
            
        Raises:
            ValueError: ユーザーが見つからない場合
        """
        user = self.get_user(user_id)
        self.user_repository.delete(user_id)
