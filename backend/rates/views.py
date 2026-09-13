from rest_framework import status, viewsets
from rest_framework.parsers import FormParser, JSONParser, MultiPartParser
from rest_framework.response import Response
from .models import MIProductRate
from .serializers import MIProductRateSerializer


class MIProductRateViewSet(viewsets.ModelViewSet):
    queryset = MIProductRate.objects.all()
    serializer_class = MIProductRateSerializer
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        data.setdefault("created_user", data.get("created_user") or "system")
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response({"message": "Record created successfully.", "data": serializer.data}, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop("partial", False)
        instance = self.get_object()
        data = request.data.copy()
        data.setdefault("updated_user", data.get("updated_user") or "system")
        serializer = self.get_serializer(instance, data=data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response({"message": "Record updated successfully.", "data": serializer.data})

    def destroy(self, request, *args, **kwargs):
        self.perform_destroy(self.get_object())
        return Response({"message": "Record deleted successfully."})
