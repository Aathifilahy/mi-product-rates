"""
Quick Oracle connection test.
Reads credentials from backend/.env
"""
import os
from pathlib import Path
from dotenv import load_dotenv
import oracledb

# Load .env from the same folder as this script
load_dotenv(Path(__file__).resolve().parent / ".env")

conn = oracledb.connect(
    user=os.getenv("ORACLE_USER"),
    password=os.getenv("ORACLE_PASSWORD"),
    dsn=os.getenv("ORACLE_DSN"),
)
with conn.cursor() as cur:
    cur.execute("SELECT banner_full FROM v$version WHERE ROWNUM = 1")
    print("Connected:", cur.fetchone()[0])
conn.close()