from rest_framework import serializers
from .models import Inspecao


class InspecaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Inspecao
        fields = "__all__"
