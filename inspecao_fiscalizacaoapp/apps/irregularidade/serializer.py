from rest_framework import serializers
from .models import Irregularidade


class IrregularidadeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Irregularidade
        fields = "__all__"
