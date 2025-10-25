"""
Base Use Case for DDD
フレームワーク層: ユースケースの基底クラス
"""
from abc import ABC, abstractmethod
from typing import Generic, TypeVar

InputDTO = TypeVar('InputDTO')
OutputDTO = TypeVar('OutputDTO')


class BaseUseCase(ABC, Generic[InputDTO, OutputDTO]):
    """
    ユースケースの基底クラス
    アプリケーション層のビジネスロジックを実装
    """

    @abstractmethod
    def execute(self, input_dto: InputDTO) -> OutputDTO:
        """
        ユースケースを実行
        
        Args:
            input_dto: 入力DTO
            
        Returns:
            output_dto: 出力DTO
        """
        pass
