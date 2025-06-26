from rest_framework import serializers
from .models import AcaoCorretiva


class AcaoCorretivaSerializer(serializers.ModelSerializer):
    class Meta:
        model = AcaoCorretiva
        fields = "__all__"
