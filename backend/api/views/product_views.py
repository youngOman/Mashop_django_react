# from .products import products
from api.models import Product
# DRF
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from api.serializer import ProductSerializer


@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getProduct_detail(request, id):  # id參數要跟urls.py的<str:id>一樣
    product = Product.objects.get(id=id)
    serializer = ProductSerializer(product, many=False)
    # product= None #　初始化變數
    # for i in products:
    #     if i['_id']==id:
    #         product=i
    #         break
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request, id):
    product = Product.objects.get(id=id)
    product.delete()
    return Response('產品刪除成功！')


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request, pk):  # pk = primary key，產品的 id
    data = request.data
    product = Product.objects.get(id=pk)
    product.name = data['name']
    product.price = data['price']
    product.brand = data['brand']
    product.countInStock = data['countInStock']
    product.category = data['category']
    product.description = data['description']

    product.save()
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    user = request.user
    product = Product.objects.create(  # 預設產品資料
        user=user,
        name='Sample Name',
        price=0,
        brand='Sample Brand',
        countInStock=0,
        category='Sample Category',
        description='Sample Description',
    )

    serializer = ProductSerializer(product, many=False)
    # print("Request Data:", serializer.data)
    return Response(serializer.data)


@api_view(['POST'])
def uploadProductImage(request):
    # print("進入 uploadProductImage 視圖函數")
    if 'product_image' not in request.FILES:
        return Response({'detail': '未接收到圖片檔案'}, status=400)

    data = request.data
    product_id = data['product_id']  # 取得產品 id
    product = Product.objects.get(id=product_id)
    product.image = request.FILES.get('product_image')
    
    # print("FILES:", request.FILES)
    product.save()
    return Response('圖片上傳成功！')
