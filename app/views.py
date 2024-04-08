from django.shortcuts import render
from django.http import HttpResponse
from .models import *

# home
def home(request):
    products = Product.objects.all()
    context = {"products": products}
    return render(request, "app/home.html", context)

#  cart
def cart(request):
    if request.user.is_authenticated:
        customer = request.user.customer
        order, created = Order.objects.get_or_create(customer, complete=False)
        items = order.orderitem_set.all()
    else:
        items=[]
    context = {'items':items,'order':order}
    return render(request, "app/cart.html", context)

#  checkout
def checkout(request):
    context = {}
    return render(request, "app/checkout.html", context)
