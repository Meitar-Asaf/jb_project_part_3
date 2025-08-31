FROM python:3.10-slim

WORKDIR /app/backend
ENV PYTHONUNBUFFERED=1

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt
RUN pip install --no-cache-dir gunicorn

COPY . .
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "--workers", "1", "vacations_statistics_project.wsgi:application"]
EXPOSE 8000




