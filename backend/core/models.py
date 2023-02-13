from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.

class AuthUser(AbstractUser):
    GENDER_CHOICES = (
        ("MALE", "MALE"),
        ("FEMALE", "FEMALE"),
        ("LGBT", "LGBT")
    )
    
    email = models.EmailField(
        verbose_name="email address", max_length=255, unique=True
    )
    username = models.CharField(max_length=100, unique=False, null=True, default=None)
    gender = models.CharField(
        max_length=20, choices=GENDER_CHOICES
    )
    age = models.IntegerField(default=0)
    address = models.CharField(max_length=500, unique=False, null=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]
