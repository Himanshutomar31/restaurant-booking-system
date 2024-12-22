# Use an official Python runtime as the base image
FROM python:3.10-slim

# Set environment variables to prevent Python from writing .pyc files to disk and to buffer outputs
ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

# Set the working directory inside the container
WORKDIR /app

# Copy the requirements.txt file first (to leverage Docker cache during builds)
COPY requirements.txt /app/requirements.txt

# Install dependencies
RUN pip install --no-cache-dir -r /app/requirements.txt

# Copy the rest of the application code into the container
COPY . /app

# Expose the port Streamlit runs on (default: 8501)
EXPOSE 80

# Command to run the Streamlit app
CMD ["streamlit", "run", "app.py", "--server.port=80"]
