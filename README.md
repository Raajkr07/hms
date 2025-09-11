> **NOTICE**
>
> This repository is for contribution and code review purposes only.
> **Cloning, forking, or redistributing the codebase without explicit written permission from the maintainer is NOT allowed.**
>
> Please propose any changes via pull requests or contact the maintainer for collaboration. Unauthorized duplication or distribution is strictly prohibited.


# HopeMeds: A Modern Medicine Donation & Healthcare Platform

![HopeMeds](https://drive.google.com/uc?export=view&id=1lruveH1Gj9Q9jQ52OTQhEwCitURLw_pX)

## Overview

**HopeMeds** is a comprehensive platform enabling **medicine and money donations, healthcare access, and social impact** using a state-of-the-art **microservices architecture**. Built with Spring Boot microservices and a modern React + Vite frontend, HopeMeds empowers donors, patients, doctors, and administrators to collaborate for social good.

---

## Table of Contents

- [Features](#features)
- [Microservices Architecture](#microservices-architecture)
- [Tech Stack](#tech-stack)
- [System Requirements](#system-requirements)
- [API & Integrations](#api--integrations)
- [Screenshots](#screenshots)
- [Contributing](#contributing)

---

## Features

- 🧑‍🤝‍🧑 **Role-Based Access**: Supports Users, Doctors, Admins.
- 💳 **Money & Medicine Donations**: Secure payments with Razorpay; track your donations.
- 🏥 **Appointments & Verification**: Book and manage doctor appointments; doctors verify prescriptions and donated medicines.
- 🌍 **Location Services**: Find nearby hospitals, pharmacies, and partner NGOs.
- 🛡️ **Authentication & Authorization**: OAuth2, JWT. Secure login & APIs.
- ✉️ **Email & OTP Notifications**: For verification, donation receipts, and status updates.
- 📊 **Impact Dashboard**: Visualize statistics & social impact in real time.
- 🛠 **Admin Console**: Moderate platform, manage logistics, and oversee operations.
- 🔜 **Extendable**: Designed for easy addition of new microservices and features (pluggable architecture).
  
---

## Microservices Architecture

- **admin-service**: Admin dashboard, verification, and logistics management.
- **auth-service**: Handles OAuth2, JWT issuance, and access controls.
- **doctor-service**: Manages doctor profiles, medicine verification, appointments.
- **location-service**: Exposes endpoints for searching hospitals, pharmacies, and NGOs spatially.
- **medicine-service**: Handles inventory, donation, and requests of medicines.
- **notification-service**: Responsible for all emails (SMTP) and SMS/OTP notifications.
- **payment-service**: Secure Razorpay payment integration, tracks all financial donations and receipts.
- **user-service**: Registers and manages user accounts, roles, and profiles.

---

## Tech Stack

- **Backend:** Spring Boot (Microservices), Java 17, Spring Security
- **Frontend:** React + Vite, Tailwind CSS, Mantine UI, React Router, Axios, Framer Motion, Recharts
- **Databases:** MySQL, MongoDB
- **External Services:** Razorpay (donations), SMTP (notifications), Netlify (frontend hosting), AWS (microservice hosting)
- **Containerization & Deployment:** Docker (optional), AWS, Netlify

---

## System Requirements

- **Java 17+**
- **Node.js 18+** (for React frontend)
- **MySQL 8+**
- **MongoDB** (for document-based storage)
- **Maven 3.5+**
- **Razorpay, AWS, Netlify accounts** (for deploying and going live)

---

## API & Integrations

- **Authentication:** OAuth2, JWT (stateless, microservices secured via API Gateway/Auth service)
- **Payments:** Integrated with [Razorpay](https://razorpay.com) for secure donation processing
- **Notifications:** Email/OTP via notification service
- **Frontend-Backend communication:** REST, secured endpoints
- **Location APIs:** Map/search nearby partners

---

## Screenshots

*Add your screenshots here! Example structure below:*

| Landing Page                  | Donation Page                | Admin Dashboard    |
|-------------------------------|------------------------------|-------------------|
| ![Landing]((https://drive.google.com/drive/folders/1TK0zG3EjJaoQe_QozGFcFYu8oBoE180f?usp=drive_link)) | ![Donation]((https://drive.google.com/drive/folders/1TK0zG3EjJaoQe_QozGFcFYu8oBoE180f?usp=drive_link)) | ![Admin]((https://drive.google.com/drive/folders/1TK0zG3EjJaoQe_QozGFcFYu8oBoE180f?usp=drive_link)) |

<!-- I will add more images later! -->

---

## Contributing

We welcome contributions! Please read guidelines or open an issue/pull request.

---

*Made with ❤️ by Raajkr07.*
