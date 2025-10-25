"""
User Repository Interface
ユーザーリポジトリのインターフェース
"""
from abc import abstractmethod
from typing import Optional
from _fw.domain.base_repository import BaseRepository
from _fw.domain.entities.user import User


class UserRepository(BaseRepository[User]):
    """ユーザーリポジトリのインターフェース"""

    @abstractmethod
    def find_by_email(self, email: str) -> Optional[User]:
        """
        メールアドレスでユーザーを検索
        
        Args:
            email: メールアドレス
            
        Returns:
            ユーザーエンティティまたはNone
        """
        pass
