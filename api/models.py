from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Product(models.Model):
    user = models.ForeignKey(User,on_delete=models.SET_NULL,null=True) # SET_NULL 當User被刪除，不要刪除此User新增的產品，null=True 產品可以是在沒有指定User的情況下產生
    name = models.CharField(max_length=200,null=True,blank=True) # null=True 欄位可以是空值,blank=True 可以不填 name
    image = models.ImageField(null=True,blank=True,upload_to='products/',default='products/placeholder.png')
    brand = models.CharField(max_length=200,null=True,blank=True) # blank=True 可以不填
    category = models.CharField(max_length=200,null=True,blank=True) # blank=True 可以不填
    description = models.TextField(max_length=200,null=True,blank=True) # blank=True 可以不填
    rating = models.DecimalField(max_digits=7, decimal_places=2,null=True,blank=True)
    numReviews = models.IntegerField(null=True,blank=True,default=0) # 預設為0
    price = models.IntegerField(null=True,blank=True)
    countInStock = models.IntegerField(null=True,blank=True,default=0) # 預設為0
    createdAt = models.DateTimeField(auto_now_add=True) # auto_now_add 創建欄位時自動擷取當下時間並成為該值
    # _id = models.AutoField(primary_key=True,editable=False) # 他不想重新寫前端才這樣搞
    def __str__(self) -> str: # 讓後台能顯示產品名稱，否則只會顯示 Product Object(1)
        return self.name

# 評論
class Review(models.Model):
    product = models.ForeignKey(Product,on_delete=models.CASCADE,null=True) # 當產品被刪除，此產品的評論也一併刪除
    user = models.ForeignKey(User,on_delete=models.SET_NULL,null=True)
    name = models.CharField(max_length=50,null=True,blank=True)
    rating = models.IntegerField(null=True, blank=True,default=0)
    comment = models.TextField(null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return str(self.rating) # 要轉換成字串，否則會報錯(__str__ returned non-string (type int)


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    paymentMethod = models.CharField(max_length=200, null=True, blank=True)
    taxPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    shippingPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    totalPrice = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    isPaid = models.BooleanField(default=False)
    paidAt = models.DateTimeField(auto_now_add=False, null=True, blank=True) # auto_now_add=False 不要動他直到我手動去改變他的資料
    isDelivered = models.BooleanField(default=False)
    deliveredAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    # _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.createdAt)


class OrderItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    qty = models.IntegerField(null=True, blank=True, default=0)
    price = models.IntegerField(null=True, blank=True)
    image = models.CharField(max_length=200, null=True, blank=True)
    # _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.name)

# 寄送地址
class ShippingAddress(models.Model):
    order = models.OneToOneField(Order, on_delete=models.CASCADE, null=True, blank=True)
    address = models.CharField(max_length=200, null=True, blank=True)
    city = models.CharField(max_length=200, null=True, blank=True)
    postalCode = models.CharField(max_length=200, null=True, blank=True)
    country = models.CharField(max_length=200, null=True, blank=True)
    shippingPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    # _id = models.AutoField(primary_key=True, editable=False)

    class Meta:
        verbose_name_plural = 'ShippingAddress' # 指定複數顯示名稱
    def __str__(self):
        return str(self.address)

# 用戶資料
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True) # # 當 User 被刪除，Profile 也一併刪除
    avatar = models.ImageField(null=True, blank=True, upload_to='avatars/', default='avatars/default_avatar.png')

    def __str__(self):
        return str(self.user.username) # 顯示使用者名稱