from rest_framework import serializers
from .models import MIProductRate


class MIProductRateSerializer(serializers.ModelSerializer):
    attachment_url = serializers.SerializerMethodField(read_only=True)
    remove_attachment = serializers.BooleanField(
        write_only=True, required=False, default=False
    )

    class Meta:
        model = MIProductRate
        fields = [
            'id', 'sr_id', 'service', 'executive_level', 'rate',
            'created_date', 'created_user',
            'updated_date', 'updated_user',
            'status', 'attachment', 'attachment_url', 'comments',
            'remove_attachment',
        ]
        read_only_fields = ['id', 'sr_id', 'created_date', 'updated_date']

    def get_attachment_url(self, obj):
        if not obj.attachment:
            return None
        request = self.context.get('request')
        url = obj.attachment.url
        return request.build_absolute_uri(url) if request else url

    # ---------- Validation ----------
    def validate_service(self, value):
        if not value or not value.strip():
            raise serializers.ValidationError("Service is required.")
        return value.strip()

    def validate_executive_level(self, value):
        if not value or not value.strip():
            raise serializers.ValidationError("Executive Level is required.")
        return value.strip()

    def validate_rate(self, value):
        if value is None:
            raise serializers.ValidationError("Rate is required.")
        if value <= 0:
            raise serializers.ValidationError("Rate must be greater than 0.")
        return value

    def validate_status(self, value):
        if value not in ('Active', 'Inactive'):
            raise serializers.ValidationError("Status must be 'Active' or 'Inactive'.")
        return value

    # ---------- Attachment handling ----------
    def create(self, validated_data):
        # The `remove_attachment` flag is only meaningful on update.
        # Drop it before the model tries to save it.
        validated_data.pop('remove_attachment', None)
        return super().create(validated_data)

    def update(self, instance, validated_data):
        remove = validated_data.pop('remove_attachment', False)
        # If user asked to remove but did not upload a new file, clear the field
        if remove and 'attachment' not in validated_data:
            if instance.attachment:
                instance.attachment.delete(save=False)   # delete file from disk
            instance.attachment = None
        return super().update(instance, validated_data)