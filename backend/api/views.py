# from django.shortcuts import render
# from django.http import JsonResponse
from .products import products
from .models import Product
# DRF
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializer import ProductSerializer

# 要有DRF的畫面就需把JsonResponse改成DRF的套件Response，要有decorater Ex:@api_view才會作用
# @api_view(['GET'])
# def get_route(request):
#     routes=[
#         'api/products/',
#     ]
#     return Response(routes)


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
