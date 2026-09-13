# Setup

## Backend

```powershell
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

The API runs at `http://localhost:8000`. The default settings target Oracle Thin mode at `localhost:1521/FREEPDB1`; override `DB_NAME`, `DB_USER`, `DB_PASSWORD`, and optionally `DB_ENGINE` for your environment.

## Frontend

```powershell
cd frontend
npm install
npm start
```

The React app runs at `http://localhost:3000`. Set `REACT_APP_API_URL` when the API is hosted at a different URL.
