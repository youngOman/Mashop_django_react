from api.models import Order, OrderItem, Product, ShippingAddress
# DRF
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from api.serializer import OrderSerializer
from rest_framework import status
from django.utils import timezone
import pytz

# 新增訂單
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user = request.user
    data = request.data
    orderItems = data['orderItems']
    # print(orderItems)
    if orderItems and len(orderItems) == 0:  # 如果訂單項目(orderItems)長度為 0
        return Response({'detail': '沒有商品或訂單項目未提供'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        # 檢查總金額是否超出範圍
        total_price = data['totalPrice']
        max_price = 9999999  # 設定最大允許的總金額
        if total_price > max_price:
            return Response({'detail': '總金額超出範圍'}, status=status.HTTP_400_BAD_REQUEST)
        # (1) 建立訂單
        order = Order.objects.create(
            user=user,
            paymentMethod=data['paymentMethod'],
            # taxPrice=data['taxPrice'],
            shippingPrice=data['shippingPrice'],
            totalPrice=data['totalPrice'],
        )
        # (2) 建立運送地址
        shipping = ShippingAddress.objects.create(
            order=order,
            address=data['shippingAddress']['address'],
            city=data['shippingAddress']['city'],
            postalCode=data['shippingAddress']['postalCode'],
            country=data['shippingAddress']['country'],
        )
        # (3) 建立訂單項目並設定訂單(Order)與訂單項目(OrderItem)的 關聯
        for i in orderItems:
            # print(i)
            # 這邊是從 cartActions.js 的 addToCart 回傳的資料
            product = Product.objects.get(id=i['product_id'])
            item = OrderItem.objects.create(
                product=product,
                order=order,
                name=product.name,
                qty=i['qty'],
                price=i['price'],
                image=product.image.url,
            )

        # (4) 更新庫存 (Product.countInStock)
        product.countInStock -= int(item.qty)
        product.save()
    serializer = OrderSerializer(order, many=False)
    # print(serializer)
    return Response(serializer.data)

# 取得此用戶的訂單 進度-2024/12/12
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyOrders(request):
    user = request.user
    orders = user.order_set.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)

# 取得單一訂單
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderById(request, pk):
    user = request.user
    try:
        order = Order.objects.get(id=pk)
        if order.user == user or user.is_staff:
            serializer = OrderSerializer(order, many=False)
            return Response(serializer.data)
        else:
            return Response({'detail':'你沒有權限查看此訂單'},status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({'detail':'訂單不存在'},status=status.HTTP_400_BAD_REQUEST)

# 更新訂單為已付款
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateOrderToPaid(request, pk):
    order = Order.objects.get(id=pk)
    order.isPaid = True
    timezone_taipei = pytz.timezone('Asia/Taipei')
    now = timezone.now().astimezone(timezone_taipei)
    order.paidAt = now
    order.save()
    return Response('訂單已付款')

# 取得所有訂單
@api_view(['GET'])
@permission_classes([IsAdminUser])
def adminGetAllOrders(request):
    orders = Order.objects.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)

# 更新訂單運送狀態為：已運送
@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateOrderToDelivered(request, pk):
    order = Order.objects.get(id=pk)
    order.isDelivered = True
    # 取得現在時間
    timezone_taipei = pytz.timezone('Asia/Taipei')
    now = timezone.now().astimezone(timezone_taipei)
    order.deliveredAt = now
    order.save()
    return Response('訂單狀態已更新為：已運送')


