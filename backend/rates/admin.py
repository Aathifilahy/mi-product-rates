from django.contrib import admin
from .models import MIProductRate


@admin.register(MIProductRate)
class MIProductRateAdmin(admin.ModelAdmin):
    list_display = ("sr_id", "service", "executive_level", "rate", "status", "created_date")
    list_filter = ("status", "executive_level")
    search_fields = ("sr_id", "service", "executive_level")
    readonly_fields = ("sr_id", "created_date", "updated_date")
