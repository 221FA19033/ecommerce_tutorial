from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import Product, Customer
from rest_framework import viewsets
from .models import Product, Customer
from .serializers import ProductSerializer, CustomerSerializer
from rest_framework.permissions import IsAuthenticated


# -------------------- CUSTOMERS --------------------

@csrf_exempt
def add_customer(request):
    """POST -> Add new customer"""
    if request.method == "POST":
        try:
            data = json.loads(request.body.decode("utf-8"))
            c = Customer.objects.create(
                name=data.get("name", ""),
                email=data.get("email", ""),
                phone=data.get("phone", "")
            )
            return JsonResponse({"message": "Customer added", "id": c.id})
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
    return JsonResponse({"error": "Invalid method"}, status=405)


def list_customers(request):
    """GET -> List all customers"""
    if request.method == "GET":
        customers = list(Customer.objects.values())
        return JsonResponse(customers, safe=False)
    return JsonResponse({"error": "Invalid method"}, status=405)


@csrf_exempt
def update_customer(request, customer_id):
    """PUT -> Update customer"""
    if request.method == "PUT":
        try:
            data = json.loads(request.body.decode("utf-8"))
            customer = Customer.objects.get(id=customer_id)
            customer.name = data.get("name", customer.name)
            customer.email = data.get("email", customer.email)
            customer.phone = data.get("phone", customer.phone)
            customer.save()
            return JsonResponse({"message": "Customer updated"})
        except Customer.DoesNotExist:
            return JsonResponse({"error": "Customer not found"}, status=404)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
    return JsonResponse({"error": "Invalid method"}, status=405)


@csrf_exempt
def delete_customer(request, customer_id):
    if request.method == "DELETE":
        try:
            customer = Customer.objects.get(id=customer_id)
            customer.delete()
            return JsonResponse({"message": "Customer deleted"})
        except Customer.DoesNotExist:
            return JsonResponse({"error": "Customer not found"}, status=404)
    return JsonResponse({"error": "Invalid method"}, status=405)

# -------------------- PRODUCTS --------------------

def product_list(request):
    """GET -> List all products"""
    if request.method == "GET":
        qs = Product.objects.order_by('-created_at').values()
        return JsonResponse(list(qs), safe=False)
    return JsonResponse({"error": "Invalid method"}, status=405)


@csrf_exempt
def add_product(request):
    """POST -> Add new product"""
    if request.method == "POST":
        try:
            data = json.loads(request.body.decode("utf-8"))
            product = Product.objects.create(
                name=data.get("name", ""),
                price=data.get("price", 0),
                stock=data.get("stock", 0),
                description=data.get("description", ""),
            )
            return JsonResponse({"message": "Product added", "id": product.id})
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
    return JsonResponse({"error": "Invalid method"}, status=405)


@csrf_exempt
def update_product(request, product_id):
    """PUT -> Update product"""
    if request.method == "PUT":
        try:
            data = json.loads(request.body.decode("utf-8"))
            product = Product.objects.get(id=product_id)
            product.name = data.get("name", product.name)
            product.price = data.get("price", product.price)
            product.stock = data.get("stock", product.stock)
            product.description = data.get("description", product.description)
            product.save()
            return JsonResponse({"message": "Product updated"})
        except Product.DoesNotExist:
            return JsonResponse({"error": "Product not found"}, status=404)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
    return JsonResponse({"error": "Invalid method"}, status=405)


@csrf_exempt
def delete_product(request, product_id):
    if request.method == "DELETE":
        try:
            product = Product.objects.get(id=product_id)
            product.delete()
            return JsonResponse({"message": "Product deleted"})
        except Product.DoesNotExist:
            return JsonResponse({"error": "Product not found"}, status=404)
    return JsonResponse({"error": "Invalid method"}, status=405)


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated] 

# Customer API
class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
