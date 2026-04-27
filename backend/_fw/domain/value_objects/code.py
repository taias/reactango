"""
Code Value Object - コード値オブジェクト
一意性を持つコード（商品コード、カテゴリコード等）の値オブジェクト
"""
import re
from _fw.domain.base_value_object import BaseValueObject


class Code(BaseValueObject):
    """
    コードの値オブジェクト
    
    一意性を持つコードを表現する。
    重複チェックはリポジトリ層で行う（ドメインサービスの責務）。
    この値オブジェクトは形式の妥当性のみを担当する。
    """

    # デフォルトのバリデーションルール（サブクラスでオーバーライド可能）
    MIN_LENGTH = 1
    MAX_LENGTH = 50
    PATTERN = r'^[a-zA-Z0-9_-]+$'  # 英数字、アンダースコア、ハイフンのみ

    def __init__(self, value: str):
        """
        コード値オブジェクトを生成
        
        Args:
            value: コード文字列
            
        Raises:
            ValueError: バリデーションエラー
        """
        normalized = self._normalize(value)
        self._validate(normalized)
        self._value = normalized

    @property
    def value(self) -> str:
        """コードの値を取得"""
        return self._value

    def _normalize(self, value: str) -> str:
        """
        値を正規化する（サブクラスでオーバーライド可能）
        デフォルトでは前後の空白を除去
        """
        if value is None:
            return ""
        return str(value).strip()

    def _validate(self, value: str) -> None:
        """
        コードのバリデーション
        
        Args:
            value: 検証する値
            
        Raises:
            ValueError: バリデーションエラー
        """
        if not value:
            raise ValueError("Code cannot be empty")
        
        if len(value) < self.MIN_LENGTH:
            raise ValueError(f"Code must be at least {self.MIN_LENGTH} characters")
        
        if len(value) > self.MAX_LENGTH:
            raise ValueError(f"Code must be at most {self.MAX_LENGTH} characters")
        
        if not re.match(self.PATTERN, value):
            raise ValueError(
                f"Code contains invalid characters. "
                f"Only alphanumeric characters, underscores, and hyphens are allowed: {value}"
            )

    def __str__(self) -> str:
        return self._value

    def __eq__(self, other) -> bool:
        if isinstance(other, Code):
            return self._value == other._value
        if isinstance(other, str):
            return self._value == other
        return False

    def __hash__(self) -> int:
        return hash(self._value)
