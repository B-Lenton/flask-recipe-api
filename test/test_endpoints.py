import os
import requests

def test_blueprint_recipes_get(api_v1_host):
    endpoint = os.path.join(api_v1_host, 'recipes')
    response = requests.get(endpoint)
    assert response.status_code == 200
    json = response.json()
    assert {'creator': 3, 'description': 'Test ready for deletion', 'recipe_id': 1, 'recipe_name': "Chris' Toast Recipe"} in json
    assert json[0]['creator'] == 3


# development testing: pytest test/test_endpoints.py

# to run tests on the production host: pytest --host=http://localhost:8600
