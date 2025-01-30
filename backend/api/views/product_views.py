# from .products import products
from api.models import Product, Review
# DRF
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from api.serializer import ProductSerializer


@api_view(['GET'])
def getProducts(request):
    query = request.query_params.get('keyword')
    # print("query:", query)
    if query is None:
        query = ''

    products = Product.objects.filter(name__icontains=query)

    page = request.query_params.get('page') # 從網址取得 page 參數
    paginator = Paginator(products, 2)  # 每頁顯示 2 個產品

    try:
        products = paginator.page(page)
    except PageNotAnInteger:  # 如果 page 不是整數，則預設為 1
        products = paginator.page(1)
    except EmptyPage:
        products = paginator.page(paginator.num_pages)

    if page is None:
        page = 1

    page = int(page)
    print("page:", page)

    serializer = ProductSerializer(products, many=True)
    # return Response(serializer.data)
    return Response({'products': serializer.data, 'page': page, 'pages': paginator.num_pages})


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

# 用戶發表產品評論


@api_view(['POST'])
def createProductReview(request, pk):
    user = request.user
    product = Product.objects.get(id=pk)
    data = request.data
    print("data:", data)

    # 檢查用戶是否已經評論過該產品
    alreadyExists = product.review_set.filter(user=user).exists()
    if alreadyExists:
        content = {'detail': '您已經評論過該產品'}
        return Response(content, status=400)
    # 檢查評論的 Rating 是否存在或為 0
    elif data['rating'] == 0 or data['rating'] is None or data['rating'] == '':
        content = {'detail': '請選擇評分'}
        return Response(content, status=400)
    else:
        review = Review.objects.create(
            user=user,
            product=product,
            name=user.first_name,
            rating=data['rating'],
            comment=data['comment'],
        )
    # 新增評論，並計算、更新評論數量和評分
    reviews = product.review_set.all()
    product.numReviews = len(reviews)
    # 計算評分
    total = 0
    for i in reviews:
        total += i.rating
    product.rating = total / len(reviews)
    product.save()
    return Response('評論發表成功！')
