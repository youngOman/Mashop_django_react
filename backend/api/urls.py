# api的urls
from django.urls import path
from . import views


urlpatterns = [
    # path('', views.get_route,name="routes"),
    path('products/', views.getProducts,name="getProducts"),
    path('products/<str:id>', views.getProduct_detail,name="product"),

]