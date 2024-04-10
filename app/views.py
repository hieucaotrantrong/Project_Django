from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .models import *
import json


# home
def home(request):
    products = Product.objects.all()
    context = {"products": products}
    return render(request, "app/home.html", context)


#  cart
def cart(request):
    if request.user.is_authenticated:
        customer = request.user.customer
        order, created = Order.objects.get_or_create(customer=customer, complete=False)
        items = order.orderitem_set.all()
    else:
        items = []
        order = {"get_cart_items": 0, "get_cart_totaL": 0}
    context = {"items": items, "order": order}
    return render(request, "app/cart.html", context)


#  checkout
def checkout(request):
    if request.user.is_authenticated:
        customer = request.user.customer
        order, created = Order.objects.get_or_create(customer, complete=False)
        items = order.orderitem_set.all()
    else:
        items = []
        order = {"get_cart_items": 0, "get_cart_totaL": 0}
    context = {"items": items, "order": order}
    return render(request, "app/checkout.html", context)


# updateItem
def updateItem(request):
    data = json.loads(request.body)
    productId = data[" productId"]
    action = data[" action"]
    customer = request.user.customer
    product = Product.objects.get(id=productId)
    order, created = Order.objects.get_or_create(customer=customer, complete=False)
    orderItem, created = OrderItem.objects.get_or_create(order=order, product=False)
    if action == "add":
        orderItem.quantity += 1
    elif action == "remove":
        orderItem.quantity -= 1
    orderItem.save()
    if orderItem.quantity <= 0:
        orderItem.delete()
    return JsonResponse("added", safe=False)
