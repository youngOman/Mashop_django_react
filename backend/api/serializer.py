from django.contrib.auth.models import User
from .models import Product
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated,IsAdminUser

# 這個 class是負責產生 "登入"的token
class UserSerializer(serializers.ModelSerializer):
    first_name = serializers.SerializerMethodField(read_only=True) # 這個欄位不會存到資料庫，只是用來顯示
    isAdmin = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        fields = ['id','isAdmin','first_name','last_name','username','email']

    def get_isAdmin(self,obj): # obj 就是user
        return obj.is_staff # django 預設欄位

    def get_first_name(self,obj): # 命名就是一定得 get_(跟欄位名稱一樣)
        first_name = obj.first_name
        if first_name == '':
            first_name = obj.email.split('@')[0]
        return first_name

# 分兩個 class 寫，這個 class 是負責產生第一次 "註冊"或"重設密碼"的新 token
class UserSerializerWithToken(UserSerializer): # 繼承UserSerializer 就不用重複寫欄位 
    token = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        fields = ['id','isAdmin','first_name','last_name','username','email','token']

    def get_token(self,obj): # 命名就是一定得 get_(跟欄位名稱一樣)
         token = RefreshToken.for_user(obj) # 當使用者註冊或重設密碼，就會產生新的token
         return str(token.access_token) # 因為token是物件，所以要轉成字串


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'