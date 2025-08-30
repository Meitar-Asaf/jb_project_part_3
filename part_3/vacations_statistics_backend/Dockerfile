FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt
RUN pip install --no-cache-dir gunicorn

COPY . .
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "vacations_statistics_project.wsgi:application"]