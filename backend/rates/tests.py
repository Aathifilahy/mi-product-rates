from rest_framework.test import APITestCase
from .models import MIProductRate


class MIProductRateApiTests(APITestCase):
    def test_list_rates(self):
        MIProductRate.objects.create(
            service="Managed Hosting",
            executive_level="L2",
            rate="1250.00",
            created_user="test",
        )
        response = self.client.get("/api/mi-product-rates/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data[0]["service"], "Managed Hosting")
