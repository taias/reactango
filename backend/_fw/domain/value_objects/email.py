"""
Email Value Object - メールアドレス値オブジェクト
"""
import re
from _fw.domain.base_value_object import BaseValueObject


class Email(BaseValueObject):
    """メールアドレスの値オブジェクト"""

    def __init__(self, value: str):
        if not self._is_valid(value):
            raise ValueError(f"Invalid email format: {value}")
        self._value = value

    @property
    def value(self) -> str:
        return self._value

    @staticmethod
    def _is_valid(email: str) -> bool:
        """メールアドレスの形式を検証"""
        if not email:
            return False
        # 簡易的なバリデーション
        pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        return re.match(pattern, email) is not None

    def __str__(self):
        return self._value
