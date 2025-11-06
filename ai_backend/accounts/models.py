from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    bio = models.TextField(blank=True)
    profile_picture = models.ImageField(upload_to='profiles/', blank=True, null=True)
    date_of_birth = models.DateField(blank=True, null=True)
    phone_number = models.CharField(max_length=15, blank=True)
    is_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.username
