from rest_framework import serializers

class AIArtRequestSerializer(serializers.Serializer):
    prompt = serializers.CharField(max_length=500, help_text="Description of the art you want to generate")
    style = serializers.CharField(max_length=100, required=False, default="realistic", help_text="Art style (e.g., realistic, abstract, cartoon)")
    
    def validate_prompt(self, value):
        """Validate that prompt is not empty"""
        if not value.strip():
            raise serializers.ValidationError("Prompt cannot be empty")
        return value

class AIArtResponseSerializer(serializers.Serializer):
    message = serializers.CharField()
    status = serializers.CharField()
    data = serializers.DictField()

class AIStatusSerializer(serializers.Serializer):
    message = serializers.CharField()
    status = serializers.CharField()
    version = serializers.CharField() 