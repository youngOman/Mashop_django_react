from django.db.models.signals import pre_save
from django.contrib.auth.models import User


# 當特定 User 被save時，就會觸發這個signal    
def updateUser(sender,instance,**kwargs):
    user = instance
    if user.email !='':
        user.username = user.email
    print("Signal triggered")

pre_save.connect(updateUser,sender=User)