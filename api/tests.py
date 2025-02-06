from django.test import TestCase
from django.contrib.auth.models import User
from .models import UserProfile  

class UserProfileSignalTest(TestCase):
    def test_user_profile_creation_signal(self):
        user = User.objects.create(username="testuser", email="test@example.com", password="password123")
        self.assertTrue(UserProfile.objects.filter(user=user).exists(), "UserProfile 未正確建立")
