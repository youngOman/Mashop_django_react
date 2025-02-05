
from django.contrib import admin
from django.urls import path, include
# static_url
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView 
from django.http import JsonResponse

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', TemplateView.as_view(template_name='index.html')),  # 讓 React 的 index.html(原localhost:3000)靜態頁面能被 Django(localhost:8000) 載入
    path('api/', lambda request: JsonResponse({"message": "API is running"})),
    path('api/products/', include('api.urls.product_urls')),
    path('api/users/', include('api.urls.user_urls')),
    path('api/orders/', include('api.urls.order_urls')),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)  # 指向 settings.py 的 MEDIA_URL
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)  # 指向 settings.py 的 MEDIA_URL
