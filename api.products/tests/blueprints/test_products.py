from pytest import fixture
from app import PRODUCTS_URL
from api.blueprints.products import products_blueprint
from api.models import Product
import json

@fixture()
def test_client(test_app):
    test_app.register_blueprint(products_blueprint, url_prefix=PRODUCTS_URL)
    return test_app.test_client()

@fixture()
def init_db():
    active_product = Product(
        ProductName="Test1",
        ProductPhotoURL="/test1",
        ProductStatus="Active"
    )
    active_product.save()
    in_active_product = Product(
        ProductName="Test2",
        ProductPhotoURL="/test2",
        ProductStatus="InActive"
    )
    in_active_product.save()

    return [active_product, in_active_product]

def test_products(test_client, init_db):
    response = test_client.get(f"{PRODUCTS_URL}/")
    assert response.status_code == 200
    deserialized_response = json.loads(response.data)
    data = deserialized_response.get('data')
    assert data is not None
    assert len(data) == 2

def test_products_name(test_client, init_db):
    response = test_client.get(f"{PRODUCTS_URL}/")
    assert response.status_code == 200
    deserialized_response = json.loads(response.data)
    data = deserialized_response.get('data')
    product_names = []
    for product in data:
        product_names.append(product["ProductName"])
    assert "Test1" in product_names
    assert "Test2" in product_names

def test_products_status(test_client, init_db):
    response = test_client.get(f"{PRODUCTS_URL}/")
    assert response.status_code == 200
    deserialized_response = json.loads(response.data)
    data = deserialized_response.get('data')
    product_statuses = {}
    for product in data:
        status = product.get("ProductStatus")
        if status in product_statuses.keys():
            product_statuses[status] += 1
        else: product_statuses[status] = 1
    assert len(product_statuses.keys()) == 2
    assert product_statuses.get("Active") == 1
    assert product_statuses.get("InActive") == 1
