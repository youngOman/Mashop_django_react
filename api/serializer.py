from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Product, Order, OrderItem, ShippingAddress, Review, UserProfile


class UserSerializer(serializers.ModelSerializer):
    first_name = serializers.SerializerMethodField(
        read_only=True)  # 這個欄位不會存到資料庫，只是用來顯示
    isAdmin = serializers.SerializerMethodField(read_only=True)
    avatar = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        fields = ['id', 'isAdmin', 'first_name', 'last_name', 'username', 'email', 'avatar']

    def get_avatar(self, obj): # obj = User 的 instance
        try:
            if obj.userprofile.avatar:  # 確保 avatar 存在
                return obj.userprofile.avatar.url
        except AttributeError:
            pass  # 若 userprofile 不存在，則直接返回預設值
        return '/media/avatars/default_avatar.png'  # 預設頭像

    def get_isAdmin(self, obj):  # 取得 is_staff 值，包裝」成一個叫 isAdmin 的欄位，輸出到 API 的回應中，方便前端判斷
        return obj.is_staff

    def get_first_name(self, obj):  # 命名就是一定得 get_(跟欄位名稱一樣)
        first_name = obj.first_name
        if first_name == '':
            first_name = obj.email.split('@')[0]
        return first_name


class UserSerializerWithToken(UserSerializer):  # 繼承 UserSerializer 就不用重複寫欄位，分兩個 class 寫，這個 class 是負責產生第一次 "註冊 "或 "重設密碼 "的新 token
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'isAdmin', 'first_name', 'last_name', 'username', 'email','avatar', 'token']

    def get_token(self, obj):  # 命名就是一定得 get_(跟欄位名稱一樣)
        token = RefreshToken.for_user(obj)  # 當使用者註冊或重設密碼，就會產生新的token
        return str(token.access_token)  # 因為token是物件，所以要轉成字串


class UserProfileSerializer(serializers.ModelSerializer): # 用戶更換頭像
    class Meta:
        model = UserProfile
        fields = ['avatar']


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):
    reviews = serializers.SerializerMethodField(read_only=True)  # 新增評論欄位

    class Meta:
        model = Product
        fields = '__all__'

    def get_reviews(self, obj):  # get_+欄位名稱，是 DRF 固定寫法
        reviews = obj.review_set.all()
        serializer = ReviewSerializer(reviews, many=True)
        return serializer.data


class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = '__all__'


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):
    orderItems = serializers.SerializerMethodField(read_only=True)
    shippingAddress = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Order
        fields = '__all__'

    def get_orderItems(self, obj):
        # 一對多關聯，orderitem_set 是 django 為 OrderItems Model 預設的反向關聯名稱
        items = obj.orderitem_set.all()
        serializer = OrderItemSerializer(items, many=True)
        return serializer.data

    def get_shippingAddress(self, obj):
        try:
            # 一對一關聯，所以才只需要 obj.shippingaddress
            address = ShippingAddressSerializer(obj.shippingaddress, many=False).data
        except:
            address = False  # 如果沒有設定運送地址，就會出現錯誤，所以要用 try except
        return address

    def get_user(self, obj):
        # print(obj)
        user = obj.user
        user_serializer = UserSerializer(user, many=False)
        return user_serializer.data
