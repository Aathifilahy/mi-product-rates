from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="MIProductRate",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("sr_id", models.CharField(db_column="SR_ID", editable=False, max_length=20, unique=True)),
                ("service", models.CharField(db_column="SERVICE", max_length=255)),
                ("executive_level", models.CharField(db_column="EXECUTIVE_LEVEL", max_length=255)),
                ("rate", models.DecimalField(db_column="RATE", decimal_places=2, max_digits=12)),
                ("created_date", models.DateTimeField(auto_now_add=True, db_column="CREATED_DATE")),
                ("created_user", models.CharField(db_column="CREATED_USER", max_length=100)),
                ("updated_date", models.DateTimeField(auto_now=True, db_column="UPDATED_DATE")),
                ("updated_user", models.CharField(blank=True, db_column="UPDATED_USER", max_length=100, null=True)),
                ("status", models.CharField(choices=[("Active", "Active"), ("Inactive", "Inactive")], db_column="STATUS", default="Active", max_length=10)),
                ("attachment", models.FileField(blank=True, db_column="ATTACHMENT", null=True, upload_to="attachments/")),
                ("comments", models.CharField(blank=True, db_column="COMMENTS", max_length=500, null=True)),
            ],
            options={
                "db_table": "SIA_MI_PRODUCT_RATES",
                "ordering": ["-id"],
                "verbose_name": "MI Product Rate",
                "verbose_name_plural": "MI Product Rates",
            },
        ),
    ]