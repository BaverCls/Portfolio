# 1. Hafif bir Python sürümü seçiyoruz
FROM python:3.11-slim

# 2. Konteyner içindeki çalışma klasörümüzü ayarlıyoruz
WORKDIR /app

# 3. Gerekli paketlerin listesini kopyalayıp kuruyoruz
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 4. Kodlarımızın tamamını kopyalıyoruz
COPY . .

# 5. FastAPI'nin çalışacağı portu açıp sunucuyu başlatıyoruz
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]