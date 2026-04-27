from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from _fw.application.use_cases.task import (
    CreateTaskUseCase, CreateTaskInputDTO,
    GetTasksUseCase, GetTasksInputDTO,
    UpdateTaskUseCase, UpdateTaskInputDTO,
    AssignTaskUseCase, AssignTaskInputDTO
)
from _fw.infrastructure.repositories.task_repository import DjangoTaskRepository
from _fw.infrastructure.repositories.user_repository import DjangoUserRepository
from _fw.presentation.serializers.task_serializer import (
    CreateTaskSerializer, UpdateTaskStatusSerializer, AssignTaskSerializer
)

class TaskListPresenter(APIView):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.task_repo = DjangoTaskRepository()

    def get(self, request):
        project_id = request.query_params.get('project_id')
        input_dto = GetTasksInputDTO(project_id=int(project_id) if project_id else None)
        use_case = GetTasksUseCase(self.task_repo)
        
        output_dto = use_case.execute(input_dto)
        return Response(output_dto.tasks, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = CreateTaskSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        input_dto = CreateTaskInputDTO(**serializer.validated_data)
        use_case = CreateTaskUseCase(self.task_repo)
        
        output_dto = use_case.execute(input_dto)
        return Response(output_dto.__dict__, status=status.HTTP_201_CREATED)

class TaskDetailPresenter(APIView):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.task_repo = DjangoTaskRepository()

    def patch(self, request, task_id):
        serializer = UpdateTaskStatusSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        input_dto = UpdateTaskInputDTO(task_id=task_id, status=serializer.validated_data['status'])
        use_case = UpdateTaskUseCase(self.task_repo)
        
        output_dto = use_case.execute(input_dto)
        if not output_dto.success:
            return Response({"error": "Task not found"}, status=status.HTTP_404_NOT_FOUND)
            
        return Response(output_dto.__dict__, status=status.HTTP_200_OK)

class TaskAssignPresenter(APIView):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.task_repo = DjangoTaskRepository()
        self.user_repo = DjangoUserRepository()

    def post(self, request, task_id):
        serializer = AssignTaskSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        input_dto = AssignTaskInputDTO(task_id=task_id, user_id=serializer.validated_data['user_id'])
        use_case = AssignTaskUseCase(self.task_repo, self.user_repo)
        
        output_dto = use_case.execute(input_dto)
        if not output_dto.success:
            return Response({"error": "Task or User not found"}, status=status.HTTP_404_NOT_FOUND)
            
        return Response(output_dto.__dict__, status=status.HTTP_200_OK)
