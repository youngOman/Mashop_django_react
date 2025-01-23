# api的urls
from django.urls import path
from api.views import order_views as views

urlpatterns = [
    path('', views.adminGetAllOrders, name='get-all-orders'),
    path('add/', views.addOrderItems, name='orders-add'),
    path('myorders/', views.getMyOrders, name='myorders'),
    # 非動態路由要寫在動態路由 <str:pk>/ 之前，django 匹配路徑時，是從上往下找，匹配完成其他路徑就不會再找
    path('<str:pk>/delivered/', views.updateOrderToDelivered, name='order-delivered'),
    path('<str:pk>/', views.getOrderById, name='user-order'),
    path('<str:pk>/pay/', views.updateOrderToPaid, name='pay'),
]
