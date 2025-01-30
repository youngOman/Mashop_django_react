from django.urls import path
from api.views import product_views as views

urlpatterns = [
    path('', views.getProducts,name="getProducts"),
    path('create/', views.createProduct,name="product_create"),
    path('upload/', views.uploadProductImage,name="product_image_upload"),
    # 非動態路由要寫在動態路由 <str:pk>/ 之前，django 匹配路徑時，是從上往下找，匹配完成其他路徑就不會再找
    path('<str:pk>/reviews/', views.createProductReview, name="create-review"),
    path('<str:id>', views.getProduct_detail,name="product"),
    path('delete/<str:id>', views.deleteProduct,name="product_delete"),
    path('update/<str:pk>', views.updateProduct,name="product_update"),
]
