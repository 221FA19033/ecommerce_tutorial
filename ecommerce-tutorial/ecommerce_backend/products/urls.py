
from django.urls import path
from . import views

urlpatterns = [
    # ---------------- Products ----------------
    path("api/products/", views.product_list),                   # GET all products
    path("api/products/add/", views.add_product),               # POST add product
    path("api/products/<int:product_id>/", views.update_product), # PUT update product
    path("api/products/<int:product_id>/delete/", views.delete_product), # DELETE product

    # ---------------- Customers ----------------
    path("api/customers/", views.list_customers),               # GET all customers
    path("api/customers/add/", views.add_customer),             # POST add customer
    path("api/customers/<int:customer_id>/", views.update_customer), # PUT update customer
    path("api/customers/<int:customer_id>/delete/", views.delete_customer), # DELETE customer
]
