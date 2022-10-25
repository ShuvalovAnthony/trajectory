from rest_framework import serializers

from .models import * 


class PlanSerializer(serializers.ModelSerializer):
   user = serializers.HiddenField(default=serializers.CurrentUserDefault())

   class Meta:
      model = Plan
      fields = "__all__"


class ThemeSerializer(serializers.ModelSerializer):

   class Meta:
      model = Theme
      fields = "__all__"


class StepSerializer(serializers.ModelSerializer):

   class Meta:
      model = Step
      fields = "__all__"