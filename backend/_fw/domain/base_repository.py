"""
Base Repository Interface for DDD
フレームワーク層: リポジトリの基底インターフェース

エンティティがCode値オブジェクトを持つ場合、save()時に自動で重複チェックが実行される。
"""
from abc import ABC, abstractmethod
from typing import Generic, TypeVar, Optional, List

T = TypeVar('T')


class BaseRepository(ABC, Generic[T]):
    """
    リポジトリの基底抽象クラス
    DDDのリポジトリパターンを実装
    
    特徴:
    - エンティティがcodeプロパティを持つ場合、save()時に自動で重複チェック
    - exists_by_code()を実装すれば有効になる
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

    def save(self, entity: T) -> T:
        """
        エンティティを保存(新規作成または更新)
        
        codeプロパティを持つエンティティの場合、自動で重複チェックが実行される。
        
        Args:
            entity: 保存するエンティティ
            
        Returns:
            保存されたエンティティ
            
        Raises:
            DuplicateCodeException: codeが重複している場合
        """
        self._check_code_uniqueness(entity)
        return self._do_save(entity)

    @abstractmethod
    def _do_save(self, entity: T) -> T:
        """
        実際の保存処理（サブクラスで実装）
        
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

    # ============================================
    # Code重複チェック（自動実行）
    # ============================================

    def _check_code_uniqueness(self, entity: T) -> None:
        """
        codeの重複をチェック（Code値オブジェクトを持つ場合のみ）
        """
        code = getattr(entity, 'code', None)
        if code is None:
            return
        
        # Code値オブジェクトかどうか確認
        from _fw.domain.value_objects.code import Code
        if not isinstance(code, Code):
            return
        
        # exists_by_codeが実装されていなければスキップ
        exists_method = getattr(self, 'exists_by_code', None)
        if exists_method is None or exists_method == BaseRepository.exists_by_code:
            return
        
        # 更新時は自分自身を除外
        exclude_id = getattr(entity, 'id', None)
        
        if self.exists_by_code(code, exclude_id=exclude_id):
            from _fw.domain.exceptions import DuplicateCodeException
            raise DuplicateCodeException(code.value, entity.__class__.__name__)

    def exists_by_code(self, code, exclude_id=None) -> bool:
        """
        指定されたコードが既に存在するか確認
        
        codeを持つエンティティのリポジトリでオーバーライドする。
        オーバーライドしない場合、重複チェックは実行されない。
        """
        return False

    def find_by_code(self, code) -> Optional[T]:
        """
        コードでエンティティを検索
        
        codeを持つエンティティのリポジトリでオーバーライドする。
        """
        return None
