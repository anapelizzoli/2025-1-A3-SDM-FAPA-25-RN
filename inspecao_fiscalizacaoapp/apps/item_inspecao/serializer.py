from rest_framework import serializers
from .models import ItemInspecao


class ItemInspecaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemInspecao
        fields = "__all__"
