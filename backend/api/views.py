# from django.shortcuts import render
# from django.http import JsonResponse
from .products import products
from .models import Product,User
# DRF
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from rest_framework.response import Response
from .serializer import ProductSerializer,UserSerializer,UserSerializerWithToken
# JWT
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data # self.user是JWT的user,data是UserSerializerWithToken的資料
        for k,v in serializer.items(): # items 可以把dict的key跟value一起取出來
            # print(k,v) k = id,v =1 ; k = isAdmin,v = False,
            data[k] = v # data['id'] = serializer['id']
        return data
class MytokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer 

# 要有DRF的畫面就需把JsonResponse改成DRF的套件Response，要有decorater Ex:@api_view才會作用
# @api_view(['GET'])
# def get_route(request):
#     routes=[
#         'api/products/',
#     ]
#     return Response(routes)


@api_view(['GET']) # 取單個 User
@permission_classes([IsAuthenticated]) # 只有登入的人才能 access
def getUserProfile(request):
    user = request.user
    serializer = UserSerializer(user,many=False)
    return Response(serializer.data)


@api_view(['GET']) # 取所有 User
@permission_classes([IsAdminUser]) # 只有登入的人才能 access
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users,many=True)
    return Response(serializer.data)



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
