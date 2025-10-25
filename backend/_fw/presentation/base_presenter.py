"""
Base Presenter for DDD
フレームワーク層: プレゼンターの基底クラス
"""
from abc import ABC, abstractmethod
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class BasePresenter(APIView, ABC):
    """
    プレゼンターの基底クラス
    プレゼンテーション層でHTTPリクエストを処理し、
    ユースケースを呼び出す
    """

    def handle_error(self, error: Exception) -> Response:
        """
        エラーハンドリングの共通処理
        
        Args:
            error: 発生した例外
            
        Returns:
            エラーレスポンス
        """
        return Response(
            {
                'error': str(error),
                'type': error.__class__.__name__
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    def success_response(self, data: dict, status_code: int = status.HTTP_200_OK) -> Response:
        """
        成功レスポンスの共通処理
        
        Args:
            data: レスポンスデータ
            status_code: HTTPステータスコード
            
        Returns:
            成功レスポンス
        """
        return Response(data, status=status_code)
