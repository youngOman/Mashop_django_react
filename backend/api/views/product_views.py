# from django.shortcuts import render
# from .products import products
from api.models import Product
# DRF
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from rest_framework.response import Response
from api.serializer import ProductSerializer



@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products,many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getProduct_detail(request,id): # id參數要跟urls.py的<str:id>一樣
    product = Product.objects.get(id=id)
    serializer = ProductSerializer(product,many=False)
    # product= None #　初始化變數
    # for i in products:
    #     if i['_id']==id:
    #         product=i
    #         break
    return Response(serializer.data)