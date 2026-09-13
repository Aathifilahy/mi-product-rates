from django.db import connection, models


class MIProductRate(models.Model):
    STATUS_CHOICES = [("Active", "Active"), ("Inactive", "Inactive")]

    sr_id = models.CharField(max_length=20, unique=True, editable=False, db_column="SR_ID")
    service = models.CharField(max_length=255, db_column="SERVICE")
    executive_level = models.CharField(max_length=255, db_column="EXECUTIVE_LEVEL")
    rate = models.DecimalField(max_digits=12, decimal_places=2, db_column="RATE")
    created_date = models.DateTimeField(auto_now_add=True, db_column="CREATED_DATE")
    created_user = models.CharField(max_length=100, db_column="CREATED_USER")
    updated_date = models.DateTimeField(auto_now=True, db_column="UPDATED_DATE")
    updated_user = models.CharField(max_length=100, null=True, blank=True, db_column="UPDATED_USER")
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default="Active", db_column="STATUS")
    attachment = models.FileField(upload_to="attachments/", null=True, blank=True, db_column="ATTACHMENT")
    comments = models.CharField(max_length=500, null=True, blank=True, db_column="COMMENTS")

    class Meta:
        db_table = "SIA_MI_PRODUCT_RATES"
        ordering = ["-id"]
        verbose_name = "MI Product Rate"
        verbose_name_plural = "MI Product Rates"

    def __str__(self):
        return f"{self.sr_id} - {self.service} ({self.executive_level})"

    def _next_sr_id(self):
        with connection.cursor() as cursor:
            cursor.execute("SELECT SIA_MI_PRODUCT_RATES_SEQ.NEXTVAL FROM DUAL")
            nextval = cursor.fetchone()[0]
        return f"SR{nextval:03d}"

    def save(self, *args, **kwargs):
        if not self.sr_id:
            self.sr_id = self._next_sr_id()
        super().save(*args, **kwargs)
