from statistics import mode

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
    count_join = models.IntegerField(default=0)
    count_report = models.IntegerField(default=0)
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]


class Conversation(models.Model):
    
    GENDER_CHOICES = (
        ("MALE", "MALE"),
        ("FEMALE", "FEMALE"),
        ("LGBT", "LGBT")
    )

    name = models.CharField(max_length=128)
    find_gender = models.CharField(
        max_length=20, choices=GENDER_CHOICES
    )
    user_gender = models.CharField(
        max_length=20, choices=GENDER_CHOICES
    )
    user_create_zoom = models.ForeignKey(
        AuthUser, on_delete=models.CASCADE, related_name="conversation_create_user", null=True, blank=True
    )
    user_guest = models.ForeignKey(
        AuthUser, on_delete=models.CASCADE, related_name="conversation_guest_user", null=True, blank=True
    )
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['-id']

    def __str__(self):
        return self.name


class Message(models.Model):
    conversation = models.ForeignKey(
        Conversation, on_delete=models.CASCADE, related_name="messages"
    )
    from_user = models.ForeignKey(
        AuthUser, on_delete=models.CASCADE, related_name="messages_from_me"
    )
    to_user = models.ForeignKey(
        AuthUser, on_delete=models.CASCADE, related_name="messages_to_me"
    )
    content = models.CharField(max_length=512)
    created_at = models.DateTimeField(auto_now_add=True)
    read = models.BooleanField(default=False)

    class Meta:
        ordering = ['-id']

    def __str__(self):
        return f"From {self.from_user.username} to {self.to_user.username}: {self.content} [{self.created_at}]"

class Config(models.Model):
    noti_text = models.CharField(max_length=500, null=True, blank=True)
    link = models.CharField(max_length=500, null=True, blank=True)
    
    def __str__(self) -> str:
        return self.noti_text