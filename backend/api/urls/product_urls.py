# api的urls
from django.urls import path
from api.views import product_views as views

urlpatterns = [
    path('', views.getProducts,name="getProducts"),
    path('<str:id>', views.getProduct_detail,name="product"),

]