"""
User Presenter
ユーザーAPI のプレゼンター
"""
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import status

from _fw.presentation.base_presenter import BasePresenter
from _fw.application.use_cases.user.user_use_case import UserUseCase
from _fw.infrastructure.repositories.user_repository import DjangoUserRepository
from _fw.presentation.serializers.user_serializer import (
    CreateUserSerializer,
    UserSerializer
)


class UserPresenter(BasePresenter):
    """ユーザーAPIのプレゼンター"""

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        # リポジトリの初期化
        self.user_repository = DjangoUserRepository()
        # ユースケースの初期化
        self.user_use_case = UserUseCase(self.user_repository)

    def post(self, request: Request) -> Response:
        """
        ユーザー作成
        POST /api/v1/users/
        """
        try:
            # リクエストデータの検証
            serializer = CreateUserSerializer(data=request.data)
            if not serializer.is_valid():
                return Response(
                    serializer.errors,
                    status=status.HTTP_400_BAD_REQUEST
                )

            # ユースケースを実行（Domainエンティティを直接使用）
            user = self.user_use_case.create_user(
                name=serializer.validated_data['name'],
                email=serializer.validated_data['email']
            )

            # レスポンスを返す（Domainの to_dict() を使用）
            return self.success_response(
                user.to_dict(),
                status.HTTP_201_CREATED
            )

        except Exception as e:
            return self.handle_error(e)

    def get(self, request: Request, user_id: int = None) -> Response:
        """
        ユーザー取得
        GET /api/v1/users/{user_id}/
        GET /api/v1/users/ (一覧)
        """
        try:
            if user_id:
                # 単一ユーザー取得
                user = self.user_use_case.get_user(user_id)
                return self.success_response(user.to_dict())
            else:
                # ユーザー一覧取得
                users = self.user_use_case.get_all_users()
                users_data = [user.to_dict() for user in users]
                return self.success_response(users_data)

        except Exception as e:
            return self.handle_error(e)
