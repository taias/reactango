"""
Base Entity for DDD
フレームワーク層: エンティティの基底クラス
"""
from abc import ABC
from datetime import datetime


class BaseEntity(ABC):
    """
    エンティティの基底クラス
    DDDのエンティティパターンを実装
    """

    def __init__(self, id: any = None):
        self._id = id
        self._created_at = datetime.now()
        self._updated_at = datetime.now()

    @property
    def id(self):
        return self._id

    @property
    def created_at(self):
        return self._created_at

    @property
    def updated_at(self):
        return self._updated_at

    def _update_timestamp(self):
        """更新日時を現在時刻に設定"""
        self._updated_at = datetime.now()

    def __eq__(self, other):
        """エンティティの同一性はIDで判定"""
        if not isinstance(other, BaseEntity):
            return False
        return self.id == other.id

    def __hash__(self):
        return hash(self.id)
