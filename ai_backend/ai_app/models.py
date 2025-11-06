from django.db import models
from django.db import models


class Order(models.Model):
    full_name = models.CharField(max_length=255)
    email = models.EmailField()
    artwork_name = models.CharField(max_length=255)
    quantity = models.PositiveIntegerField(default=1)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    address = models.TextField(blank=True, null=True)  # Made optional
    pincode = models.CharField(max_length=10, blank=True, null=True)  # Made optional
    payment_method = models.CharField(
        max_length=50,
        choices=[
            ('COD', 'Cash on Delivery'),
            ('CARD', 'Credit/Debit Card'),
            ('UPI', 'UPI'),
            ('PAYPAL', 'PayPal'),
        ],
        default='COD'
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order {self.id} - {self.full_name} - {self.artwork_name}"
