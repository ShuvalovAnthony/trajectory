from rest_framework import serializers

from .models import * 


class CourseSerializer(serializers.ModelSerializer):
   user = serializers.HiddenField(default=serializers.CurrentUserDefault())

   class Meta:
      model = Course
      fields = "__all__"


class ThemeSerializer(serializers.ModelSerializer):

   class Meta:
      model = Theme
      fields = "__all__"


class StepSerializer(serializers.ModelSerializer):

   class Meta:
      model = Step
      fields = "__all__"


class StepStatusSerializer(serializers.ModelSerializer):
   user = serializers.HiddenField(default=serializers.CurrentUserDefault())
   
   class Meta:
      model = StepStatus
      fields = "__all__"


class NoteSerializer(serializers.ModelSerializer):
   user = serializers.HiddenField(default=serializers.CurrentUserDefault())

   class Meta:
      model = Note
      fields = "__all__"