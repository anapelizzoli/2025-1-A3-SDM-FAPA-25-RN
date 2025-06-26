from .models import Local_Inspecao
from rest_framework import serializers


class Local_InspecaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Local_Inspecao
        fields = "__all__"
