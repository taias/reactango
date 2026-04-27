"""
Code Uniqueness Service - コード一意性ドメインサービス

複数エンティティにまたがるビジネスルール「コードの一意性」を保証する。
これはドメインサービスの責務である理由：
- 単一エンティティに属さないビジネスルール
- リポジトリ（永続化層）への参照が必要
- 値オブジェクトは自己完結であるべき
"""
from abc import ABC, abstractmethod
from typing import Optional
from _fw.domain.exceptions import DuplicateCodeException


class CodeUniquenessChecker(ABC):
    """
    コード存在確認のインターフェース
    
    リポジトリがこのインターフェースを実装することで、
    ドメインサービスから利用可能になる。
    """
    
    @abstractmethod
    def exists_by_code(self, code, exclude_id=None) -> bool:
        """
        指定されたコードが既に存在するか確認
        
        Args:
            code: チェックするコード（Code値オブジェクト or 文字列）
            exclude_id: 除外するエンティティのID（更新時に自分自身を除外）
            
        Returns:
            bool: 存在する場合True
        """
        pass


class CodeUniquenessService:
    """
    コード一意性を保証するドメインサービス
    
    Usage:
        # ユースケースで使用
        class CreateUserUseCase:
            def __init__(self, repository, uniqueness_service):
                self._repository = repository
                self._uniqueness_service = uniqueness_service
            
            def execute(self, code, name, email):
                # 明示的に一意性をチェック
                self._uniqueness_service.ensure_unique(code)
                
                user = User.create(code, name, email)
                return self._repository.save(user)
    """
    
    def __init__(self, checker: CodeUniquenessChecker, entity_name: str = None):
        """
        Args:
            checker: コード存在確認を行うオブジェクト（通常はリポジトリ）
            entity_name: エンティティ名（例外メッセージ用）
        """
        self._checker = checker
        self._entity_name = entity_name
    
    def ensure_unique(self, code, exclude_id=None) -> None:
        """
        コードの一意性を保証する
        
        Args:
            code: チェックするコード（Code値オブジェクト or 文字列）
            exclude_id: 除外するエンティティのID（更新時に自分自身を除外）
            
        Raises:
            DuplicateCodeException: コードが重複している場合
        """
        if code is None:
            return
        
        if self._checker.exists_by_code(code, exclude_id=exclude_id):
            code_value = code.value if hasattr(code, 'value') else code
            raise DuplicateCodeException(code_value, self._entity_name)
    
    def is_unique(self, code, exclude_id=None) -> bool:
        """
        コードが一意かどうかを確認（例外を投げない版）
        
        Args:
            code: チェックするコード
            exclude_id: 除外するエンティティのID
            
        Returns:
            bool: 一意の場合True
        """
        if code is None:
            return True
        return not self._checker.exists_by_code(code, exclude_id=exclude_id)
