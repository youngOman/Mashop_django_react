# api的urls
from django.urls import path
from . import views

urlpatterns = [
    # path('', views.get_route,name="routes"),
    path('products/', views.getProducts,name="getProducts"),
    path('products/<str:id>', views.getProduct_detail,name="product"),
    path('users/login/', views.MytokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('users/profile/', views.getUserProfile, name='users_profile'),
    # path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

]