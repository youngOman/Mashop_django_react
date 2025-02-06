from django.db.models.signals import pre_save
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from .models import UserProfile


# 當特定 User 儲存前就會觸發這個 signal
def updateUser(sender, instance, **kwargs):
    user = instance
    if user.email != '':
        user.username = user.email
    print("Signal triggered")


pre_save.connect(updateUser, sender=User)  # 這個 signal 會連接到 updateUser 這個 function


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        # print("User Created")
        UserProfile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.userprofile.save()
