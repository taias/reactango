"""
User Repository Interface
ユーザーリポジトリのインターフェース
"""
from abc import abstractmethod
from typing import Optional
from _fw.domain.base_repository import BaseRepository
from _fw.domain.entities.user import User


class UserRepository(BaseRepository[User]):
    """
    ユーザーリポジトリのインターフェース
    
    UserエンティティはCode値オブジェクトを持つため、
    exists_by_code()を実装することでsave()時に自動で重複チェックが実行される。
    """

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

    @abstractmethod
    def find_by_code(self, code) -> Optional[User]:
        """
        コードでユーザーを検索
        
        Args:
            code: ユーザーコード（Code値オブジェクト or 文字列）
            
        Returns:
            ユーザーエンティティまたはNone
        """
        pass

    @abstractmethod
    def exists_by_code(self, code, exclude_id=None) -> bool:
        """
        指定されたコードが既に存在するか確認
        
        これを実装することでsave()時の自動重複チェックが有効になる
        
        Args:
            code: チェックするコード（Code値オブジェクト or 文字列）
            exclude_id: 除外するエンティティのID（更新時に自分自身を除外）
            
        Returns:
            bool: 存在する場合True
        """
        pass
