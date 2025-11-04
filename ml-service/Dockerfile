# Use Python 3.9 as base image
FROM python:3.9-slim

# Set working directory inside container
WORKDIR /app

# Copy requirements first for faster caching
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the app files
COPY . .

# Expose the port your Flask app runs on
EXPOSE 5001

# Command to run the Flask service
CMD ["python", "app.py"]