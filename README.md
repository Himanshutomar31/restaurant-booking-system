# Restaurant Booking System

This project is a **Restaurant Booking System** that provides basic endpoints for managing restaurant reservations. The system consists of a frontend, a backend, and a PostgreSQL database, all deployed using Docker and Azure cloud services. Below are the detailed aspects of the project:

---

## Features
- **Backend**: Built using [Express.js](https://expressjs.com/) with [Sequelize ORM](https://sequelize.org/) for database management.
- **Frontend**: Developed with [Streamlit](https://streamlit.io/) for an intuitive user interface.
- **Database**: PostgreSQL database containerized using Docker.
- **Continuous Integration and Deployment**: Implemented using GitHub Actions.
- **Cloud Platform**: Containers deployed to Azure Linux Virtual Machine via Azure Container Registry.

---

## Database Schema
Here is the schema for the restaurant booking system (please replace this text with an image of the schema or describe it in detail):

![image](https://github.com/user-attachments/assets/a775e6e2-cde5-455e-a797-a89ed4658e52)


---

## Technologies Used
### Backend
- **Node.js**: For server-side development.
- **Express.js**: To build RESTful APIs.
- **Sequelize**: ORM for managing PostgreSQL database.

### Frontend
- **Streamlit**: A framework to build a user-friendly frontend interface.

### Database
- **PostgreSQL**: For reliable data storage and management.

### Containerization
- **Docker**: Containers for frontend, backend, and PostgreSQL.
- **Docker Compose**: To manage multi-container applications.

### Deployment
- **Azure Cloud**: Hosted on Azure Linux VM.
- **Azure Container Registry (ACR)**: Stores container images built during CI/CD.

### CI/CD
- **GitHub Actions**: Automates building and pushing Docker images to ACR on every commit.

---

## Project Structure
```plaintext
├── backend/              # Express.js backend source code
├── frontend/             # Streamlit frontend source code
├── docker-compose.yml    # Defines multi-container application
├── .github/workflows/    # GitHub Actions CI/CD workflows
├── README.md             # Project documentation

