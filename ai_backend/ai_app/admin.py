from django.contrib import admin
from .models import Order


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'full_name',
        'email',
        'artwork_name',
        'quantity',
        'total_price',
        'payment_method',
        'created_at',
    )
    list_filter = ('payment_method', 'created_at')
    search_fields = ('full_name', 'email', 'artwork_name')
    ordering = ('-created_at',)
