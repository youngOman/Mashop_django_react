# api的urls
from django.urls import path
from api.views import user_views as views

urlpatterns = [
    path('login/', views.MytokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('register/', views.registerUser, name='register'),
    path('profile/', views.getUserProfile, name='users_profile'),
    path('profile/update/', views.updateUserProfile, name='users_profile_update'),
    path('', views.getUsers, name='users'),

    # path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
