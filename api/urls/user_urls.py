# api的 urls
from django.urls import path
from api.views import user_views as views

urlpatterns = [
    path('login/', views.MytokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('register/', views.registerUser, name='register'),
    path('profile/', views.getUserProfile, name='users_profile'),
    path('profile/update/', views.updateUserProfile, name='users_profile_update'),
    path('', views.getUsers, name='users'),
    # 非動態路由要寫在動態路由 <str:pk>/ 之前，django 匹配路徑時，是從上往下找，匹配完成其他路徑就不會再找
    # Admin
    path('<str:pk>/', views.adminGetUserById, name='user_get_by_id'),
    path('update/<str:pk>/', views.adminUpdateUser, name='user_update'),
    path('delete/<str:pk>/', views.deleteUser, name='user_delete'),
    # path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
