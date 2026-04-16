# Sentinel OS: Autonomous Document Processing

## Problem Statement
International trade and logistics are heavily bottlenecked by manual document verification. Customs officers manually review commercial invoices and bills of lading to extract data, assign Harmonized System (HS) codes, and validate compliance rules against specific country mandates.

## Solution
Sentinel OS is an **Autonomous Document Processing and Compliance Agent**. 
It utilizes a multi-agent orchestrated microservice environment to:
1. Extract data from uploaded logistic documents via OCR pipelines.
2. Classify items syntactically and predict their HS Code via NLP.
3. Validate payloads against country-specific compliance mandates (e.g., Hazmat detection).
4. Automatically compile structured Customs Declarations upon successful validation.

## Tech Stack
Our architecture was built aggressively focusing on high-scalability and parallel asynchronous task management.
- **Frontend**: React (Vite) + Tailwind CSS (Glassmorphism OS emulation)
- **Backend**: FastAPI (Python) adhering strictly to REST API Structure.
- **Message Broker**: Redis (Message Queue for distributed tasks)
- **Workers**: Celery (2 separate worker nodes running in docker to parallelize jobs)
- **Database**: PostgreSQL (Implemented with a strict Python Singleton connection pattern)
- **Security**: PII Encryption via Python `cryptography` (Fernet symmetric encryption) to ensure no raw user PII hits the Database instance directly.
- **Infrastructure**: Fully Dockerized (Single target network, discoverable services).

## How to Run
This project runs entirely inside a single containerized ecosystem. Ensure Docker Desktop is running before proceeding.

1. **Clone the Directory**
2. **Build and Spin Up Containers**
   Run the following terminal command from the root directory:
   ```bash
   docker-compose up --build
   ```
3. **Access Services**
   - **Frontend UI**: `http://localhost:5173`
   - **FastAPI Endpoints**: `http://localhost:8000/docs`
   - **Database**: Port `5432` 

## Architecture Map (Model View Controller Structure)
- `backend/app/main.py`: Core Router / View Layer.
- `backend/app/core/database.py`: Singleton Data Model connection and strict PII Encryption ruleset.
- `backend/app/tasks.py`: Controller / Service layer orchestrating atomic logic via Celery Workers.



![image alt](https://github.com/Yugesh-06/SentinalOS/blob/34a93f7b2040a56cc137dd1ab93836634762295c/Screenshot%202026-04-16%20171223.png)

![image alt](https://github.com/Yugesh-06/SentinalOS/blob/73635c0d629b1aa47709deae6a5c7d801711d6e2/Screenshot%202026-04-16%20171231.png)

![image alt](https://github.com/Yugesh-06/SentinalOS/blob/fd99e2e067f2fa5b4601442a8376559cbf50d7f5/Screenshot%202026-04-16%20171255.png)

![image alt](https://github.com/Yugesh-06/SentinalOS/blob/946eadee8bba8c60cd61718eabcf41b313a9b8c9/Screenshot%202026-04-16%20171305.png)

![image alt](https://github.com/Yugesh-06/SentinalOS/blob/57b498bca0a87f9df23d587b1bce0aa569dea146/Screenshot%202026-04-16%20171324.png)

![image alt](https://github.com/Yugesh-06/SentinalOS/blob/359bdb7a9fc8e93b9f66758a8c6d1af2caf693e7/Screenshot%202026-04-16%20171351.png)

![image alt](https://github.com/Yugesh-06/SentinalOS/blob/1c6b13b7b75ab4cc1eeda5e67317df372b097cd9/Screenshot%202026-04-16%20171404.png)
