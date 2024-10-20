# Project Idea: Cloud-Based File Transfer Application

**Overview**: Simple, secure, fast file transfer application that allows users to upload and transfer files between different cloud storage providers (Google Drive, Dropbox, S3)using APis.

## Core Features

1. **Front-End(React + CSS)**
    - Clean UI to select files, cloud services for transfer and track progress
    - React for front-end for smooth and responsive design
    - Drag + Drop Functionality for file uploads

2. **Back-End (Python)**
    - Back-end API using Flask that handles logic for cloud integration(Authenticating Cloud Services, Initiaitng File Transfers)
    - Integrate cloud Storage APIs (AWS S3, Google Drive, Dropbox) for file uploads and downloads

3. **DevOps:**
    - Deploy on AWS using Docker Containers, showing understanding of DevOps Principles
    - Include setup for CI to automate testing and deployment

4. **Database**
    - Use Postgres or MongoDB for storing file metadata such as file size, user information, and transfer status.
    - Implement a basic system for tracking file transfer history, allowing users to reviw past file movements.

5. **Security and API**
   - Token based authentication using JWT (JSON Web Tokens) to protect the API endpoints
   - Use APIs to connect to cloud services, ensuring secure data transfer.

6. **Documentation**
    - Clear concise documentation on setup and use the app focusing on simplicity and ease of use.

7. **Bonus Features**
    - **Integration with SFTP** to allow secure transfer files between cloud services and an SFTP server.
    - **Monitoring and Error Tracking** Include simple logging and monitoring to track transfer errors and ensure smooth operations.
    - **Real-Time Updates** Use Websockets or similar to give real-time feedback on transfer progress.

---

# Cloud-based File Transfer Application Stack

## Front-end
- **React**: JavaScript library for building user interfaces.
- **CSS**: For responsive design and styling.
- **Netlify/Vercel**: Free-tier hosting for static websites with continuous deployment from GitHub.

## Back-end
- **Flask (Python)**: Lightweight Python framework for building web APIs.
- **Heroku**: Free-tier hosting for deploying Flask applications (alternative: Render).
- **Docker**: Containerize your application for easier deployment and scalability.
- **GitHub Actions**: CI/CD pipeline for automated testing and deployment.

## Cloud Storage and APIs
- **AWS S3**: Free-tier storage for handling file uploads/downloads (5GB free).
- **Google Drive API**: Integration for uploading and managing files on Google Drive.
- **Dropbox API**: Free-tier integration to allow file transfer to/from Dropbox.

## Databases
- **PostgreSQL (ElephantSQL/Heroku Postgres)**: Free-tier relational database for storing file metadata (20MB/1000 rows).
- **MongoDB Atlas**: Free-tier NoSQL database (512MB) for file metadata or user information.

## DevOps and Hosting
- **AWS EC2**: Free-tier virtual machine for running your back-end (750 hours/month).
- **AWS Lambda**: Serverless functions for handling API calls and file transfers.
- **AWS Elastic Container Service (ECS)**: Free-tier container orchestration for Docker containers.
- **Heroku**: Deployment of Flask app with Postgres (free-tier hosting).

## SFTP and Networking
- **OpenSSH (EC2 Instance)**: Simulate SFTP transfers using OpenSSH on an AWS EC2 instance.
- **FileZilla (Local Server)**: Free SFTP server for testing file transfers locally.

## Monitoring and Logging
- **Sentry**: Free-tier error tracking and monitoring.
- **LogDNA**: Free-tier centralized logging.

## Version Control and Collaboration
- **GitHub**: For code versioning and collaboration.
- **GitHub Pages**: Option for hosting documentation or landing page.

## Tools
- **Visual Studio Code (VSCode)**: Code editor with Flask, Python, and React extensions.
- **Postman**: For testing API endpoints.
- **Docker Hub**: For storing and sharing Docker images.

---

# 5-Day Project Plan for Cloud-based File Transfer Application

## Day 1: Project Setup and Front-end Development
### Tasks:
- Set up GitHub repository for version control.
- Create the **React** front-end structure.
  - Set up components for file upload form, file history, and transfer progress.
  - Use **CSS** for basic styling and responsiveness.
- Deploy the front-end to **Netlify** or **Vercel**.
  - Set up continuous deployment linked to GitHub.

### Learning Topic: **React and CSS**
- Refresh React component architecture, hooks, and state management.
- Review CSS for responsive layouts and modern design techniques (Flexbox/Grid).
- Optional: Review **Vercel** or **Netlify** deployment processes.

---

## Day 2: Flask Back-end and API Design
### Tasks:
- Set up **Flask** back-end.
  - Create basic API structure for handling file uploads.
  - Connect Flask to a database (PostgreSQL or MongoDB).
- Set up routes for:
  - Uploading files.
  - Fetching file history (metadata).
  - Handling errors and exceptions in the API.
- Set up **PostgreSQL** or **MongoDB** (using ElephantSQL, Heroku Postgres, or MongoDB Atlas).

### Learning Topic: **Flask and RESTful API Design**
- Review how Flask handles routes, requests, and responses.
- Explore best practices for building RESTful APIs with Flask.
- Review Flask database integration with **SQLAlchemy** for Postgres or **PyMongo** for MongoDB.

---

## Day 3: Cloud Integrations (AWS S3, Google Drive, Dropbox APIs)
### Tasks:
- Integrate **AWS S3** to allow file uploads from the back-end.
  - Set up an S3 bucket, IAM user, and necessary permissions.
  - Implement file upload API in Flask to upload files to S3.
- Add integration for **Google Drive API** and/or **Dropbox API**.
  - Implement file upload and download for Google Drive or Dropbox.
- Create API endpoints for file transfer between cloud storage services.

### Learning Topic: **Cloud Storage APIs (AWS S3, Google Drive, Dropbox)**
- Review AWS S3 fundamentals, including uploading, permissions, and access control.
- Refresh knowledge of Google Drive API and Dropbox API for file handling.

---

## Day 4: DevOps and Deployment (AWS, Docker, Heroku)
### Tasks:
- Containerize your Flask application using **Docker**.
  - Create a `Dockerfile` for both the back-end and front-end.
  - Test the application locally using Docker.
- Deploy the back-end to **AWS (EC2)** or **Heroku**.
  - Set up environment variables for secure API keys and credentials.
- Set up **GitHub Actions** for CI/CD (automated testing and deployment).

### Learning Topic: **DevOps (AWS, Docker, CI/CD)**
- Review Docker fundamentals, including creating and running containers.
- Explore **AWS EC2** or **Heroku** deployment strategies for Flask apps.
- Refresh knowledge on **GitHub Actions** for setting up automated pipelines.

---

## Day 5: Testing, Error Handling, and Documentation
### Tasks:
- Write unit and integration tests for the Flask API using **pytest**.
  - Test file uploads, cloud integrations, and error handling.
- Implement logging and monitoring using **Sentry** or **LogDNA** for the application.
- Write documentation for:
  - API usage (for developers).
  - Application usage (for users).
  - Deployment instructions.
- Final deployment to production (Netlify for front-end, AWS/Heroku for back-end).
- Clean up code, ensure all components are functioning properly, and review.

### Learning Topic: **Testing and Documentation**
- Review testing strategies for Flask applications, including **pytest** and testing APIs.
- Explore best practices for writing clean, user-friendly documentation.
- Refresh how to implement logging and error tracking using Sentry or LogDNA.

---

## Additional Notes:
- **Daily Learning Time**: Aim to spend 1–2 hours reviewing and practicing the learning topic each day before jumping into project tasks.
- **Focus on Simplicity**: Keep the app simple and functional, showcasing key skills in **React, Flask, APIs, Cloud Integrations**, and **DevOps**.
- **Project Documentation**: Regularly update your documentation to ensure clarity, especially for deployment and API usage.

By the end of Day 5, you should have a fully functioning **Cloud-based File Transfer Application** deployed and ready to showcase in your portfolio, demonstrating skills in React, Flask, DevOps, cloud storage integrations, and APIs—all highly relevant to the job requirements at Couchdrop.

