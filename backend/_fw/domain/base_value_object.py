"""
Base Value Object for DDD
フレームワーク層: 値オブジェクトの基底クラス
"""
from abc import ABC


class BaseValueObject(ABC):
    """
    値オブジェクトの基底クラス
    DDDの値オブジェクトパターンを実装
    不変性と等価性を持つ
    """

    def __eq__(self, other):
        """
        値オブジェクトの等価性は全ての属性の値で判定
        """
        if not isinstance(other, self.__class__):
            return False
        return self.__dict__ == other.__dict__

    def __hash__(self):
        """
        不変オブジェクトとしてハッシュ化可能にする
        """
        return hash(tuple(sorted(self.__dict__.items())))

    def __repr__(self):
        attrs = ', '.join(f'{k}={v}' for k, v in self.__dict__.items())
        return f'{self.__class__.__name__}({attrs})'
