from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class HelloWorldView(APIView):
    """
    A simple API endpoint to test the setup.
    """
    def get(self, request):
        return Response({
            'message': 'Hello from Django!',
            'framework': 'reactango',
            'status': 'running'
        }, status=status.HTTP_200_OK)
