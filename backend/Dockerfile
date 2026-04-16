FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Expose port (not strictly required if docker-compose port maps, but good practice)
EXPOSE 8000
