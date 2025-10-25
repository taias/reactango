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

    def create_user(self, name: str, email: str, favorite_food: str = None) -> User:
        """
        ユーザーを作成する
        
        Args:
            name: ユーザー名
            email: メールアドレス
            favorite_food: 好きな食べ物（オプション）
            
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
        user = User.create(name=name, email=email, favorite_food=favorite_food)

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

    def update_user(self, user_id: int, name: str = None, email: str = None, favorite_food: str = None) -> User:
        """
        ユーザー情報を更新する
        
        Args:
            user_id: ユーザーID
            name: 新しい名前（オプション）
            email: 新しいメールアドレス（オプション）
            favorite_food: 新しい好きな食べ物（オプション）
            
        Returns:
            User: 更新されたユーザーエンティティ
            
        Raises:
            ValueError: ユーザーが見つからない場合
        """
        user = self.get_user(user_id)

        print(f"[DEBUG] Updating user {user_id}")
        print(f"[DEBUG] name: {name}")
        print(f"[DEBUG] email: {email}")
        print(f"[DEBUG] favorite_food: {favorite_food}")

        if name:
            user.change_name(name)
        if email:
            user.change_email(email)
        if favorite_food is not None:
            print(f"[DEBUG] Calling change_favorite_food with: {favorite_food}")
            user.change_favorite_food(favorite_food)

        saved_user = self.user_repository.save(user)
        print(f"[DEBUG] Saved user: {saved_user.to_dict()}")
        
        return saved_user

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
