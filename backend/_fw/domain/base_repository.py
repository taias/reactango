"""
Base Repository Interface for DDD
フレームワーク層: リポジトリの基底インターフェース
"""
from abc import ABC, abstractmethod
from typing import Generic, TypeVar, Optional, List

T = TypeVar('T')


class BaseRepository(ABC, Generic[T]):
    """
    リポジトリの基底抽象クラス
    DDDのリポジトリパターンを実装
    """

    @abstractmethod
    def find_by_id(self, id: any) -> Optional[T]:
        """
        IDでエンティティを検索
        
        Args:
            id: エンティティのID
            
        Returns:
            エンティティまたはNone
        """
        pass

    @abstractmethod
    def find_all(self) -> List[T]:
        """
        全てのエンティティを取得
        
        Returns:
            エンティティのリスト
        """
        pass

    @abstractmethod
    def save(self, entity: T) -> T:
        """
        エンティティを保存(新規作成または更新)
        
        Args:
            entity: 保存するエンティティ
            
        Returns:
            保存されたエンティティ
        """
        pass

    @abstractmethod
    def delete(self, id: any) -> bool:
        """
        エンティティを削除
        
        Args:
            id: 削除するエンティティのID
            
        Returns:
            削除成功時True
        """
        pass
