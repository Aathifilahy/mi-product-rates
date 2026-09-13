from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [("rates", "0001_initial")]

    operations = [
        migrations.RunSQL(
            sql="""
                CREATE SEQUENCE SIA_MI_PRODUCT_RATES_SEQ
                    START WITH 1
                    INCREMENT BY 1
                    NOCACHE
                    NOCYCLE
            """,
            reverse_sql="DROP SEQUENCE SIA_MI_PRODUCT_RATES_SEQ",
        ),
    ]