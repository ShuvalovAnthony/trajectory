from rest_framework import serializers

from .models import * 


class ParentSerializer(serializers.ModelSerializer):

   class Meta:
      model = Parent
      fields = "__all__"


class ChildrenSerializer(serializers.ModelSerializer):

   class Meta:
      model = Children
      fields = "__all__"


class LeadSerializer(serializers.ModelSerializer):

   class Meta:
      model = Lead
      fields = "__all__"