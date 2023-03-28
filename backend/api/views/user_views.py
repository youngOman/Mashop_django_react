
from api.models import User
# DRF
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from rest_framework.response import Response
from api.serializer import UserSerializer,UserSerializerWithToken
# JWT
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from rest_framework import status
from django.contrib.auth.hashers import make_password # 加密密碼


@api_view(['POST'])
def registerUser(requset):
    data = requset.data
    # print("DATA",data)
    try:
        user = User.objects.create(
            first_name = data['first_name'], # 這邊 data['']，記得要跟 postman 的 key 一樣
            username = data['email'], 
            email = data['email'], 
            password = make_password(data['password']),
        )
        serializer = UserSerializerWithToken(user,many=False) # UserSerializerWithToken 當創立帳戶即產生新的token
        return Response(serializer.data)
    except:
        message = {'警告':'此信箱已存在，請嘗試不同的信箱'}
        return Response(message,status=status.HTTP_400_BAD_REQUEST)
class MyTokenObtainPairSerializer(TokenObtainPairSerializer): # 這是負責產生token的
    def validate(self, attrs):
        data = super().validate(attrs)
        serializer = UserSerializerWithToken(self.user).data # self.user是JWT的user,data是UserSerializerWithToken的資料
        for k,v in serializer.items(): # items 可以把dict的key跟value一起取出來
            # print(k,v) k = id,v =1 ; k = isAdmin,v = False,
            data[k] = v # data['id'] = serializer['id']
        return data
class MytokenObtainPairView(TokenObtainPairView): 
    serializer_class = MyTokenObtainPairSerializer 

@api_view(['PUT']) # 更新自己的 profile
@permission_classes([IsAuthenticated]) # 只有登入的人才能 access
def updateUserProfile(request):
    user = request.user
    serializer = UserSerializerWithToken(user,many=False) # 記得這邊要用 UserSerializerWithToken 而不是 UserSerializer，因為要產生新的token

    data = request.data

    user.first_name = data['first_name']
    user.username = data['email']
    user.email = data['email']

    if data['password'] != '':
        user.password = make_password(data['password'])

    user.save()
    return Response(serializer.data)

@api_view(['GET']) # 取單個 User
@permission_classes([IsAuthenticated]) # 只有登入的人才能 access
def getUserProfile(request):
    user = request.user
    serializer = UserSerializer(user,many=False)
    return Response(serializer.data)


@api_view(['GET']) # 取所有 User
@permission_classes([IsAdminUser]) # 只有Admin才能 access
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users,many=True)
    return Response(serializer.data)