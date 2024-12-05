# 🌿 **Green Shadow Crop Management System API**

Welcome to the **Green Shadow Crop Management System**, a robust backend API crafted to streamline farm operations for **Green Shadow (Pvt) Ltd.**. This system supports efficient management of fields, crops, staff, and resources, enabling scalability for farms expanding nationally and globally.

---

![Green Shadow](/img.png)

---

## 📋 **Table of Contents**

1. [✨ Features](#-features)
2. [🛠 Tech Stack](#-tech-stack)
3. [🚀 Getting Started](#-getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
4. [📂 Project Structure](#-project-structure)
5. [📜 API Documentation](#-api-documentation)
6. [🌐 Frontend Repository](#-frontend-repository)
7. [📄 License](#-license)
8. [📞 Contact](#-contact)

---

## ✨ **Features**

- 🌾 **Field Management**: Monitor and manage fields, locations, and activities.
- 🌱 **Crop Management**: Record details of crops, including growth seasons and imagery.
- 👥 **Staff Profiles**: Manage roles and responsibilities within the farm.
- 📋 **Operations Logging**: Maintain logs for effective monitoring and operations.
- 🚜 **Vehicle & Equipment Tracking**: Track and optimize resource utilization.
- 🔒 **Secure Authentication**: Powered by Spring Security and JWT.
- 💾 **Robust CRUD Operations**: Comprehensive management features for all modules.
- 🌍 **Scalable Architecture**: Built for farms of all sizes, ready for expansion.

---

## 🛠 **Tech Stack**

| **Component**   | **Technology**      |
|------------------|---------------------|
| **Framework**    | Spring Boot         |
| **Database**     | MySQL + Hibernate   |
| **Security**     | Spring Security + JWT |
| **API Design**   | RESTful APIs        |
| **Utilities**    | ModelMapper for DTO Mapping |
| **Deployment**   | Local & Production Ready |

---

## 🚀 **Getting Started**

### 🖥 Prerequisites

Ensure you have the following tools installed:

- **Java 17** or higher
- **Maven**
- **MySQL**
- An IDE such as IntelliJ IDEA or Eclipse

### 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/pesala-x/Green-shadow-Crop-monitoring-system.git
   ```
2. Configure the database settings in `application.properties`.
3. Build the project using Maven:
   ```bash
   mvn clean install
   ```
4. Run the application:
   ```bash
   mvn spring-boot:run
   ```

---

## 📂 **Project Structure**

```plaintext
├── src
│   ├── main
│   │   ├── java
│   │   │   ├── com.greenshadow
│   │   │   │   ├── controllers
│   │   │   │   ├── services
│   │   │   │   ├── repositories
│   │   │   │   ├── dtos
│   │   │   │   └── entities
│   │   ├── resources
│   │       └── application.properties
├── pom.xml
└── README.md
```

---

## 📜 **API Documentation**

Explore the API specifications and examples [here](https://documenter.getpostman.com/view/).

---

## 🌐 **Frontend Repository**

The frontend application is available at the following link:  
[Green Shadow Frontend](https://github.com/pesala-x/Green-shadow-Crop-monitoring-system/tree/master/crop-monitor-frontend)

---

## 📄 **License**

This project is licensed under the MIT License. For more details, view the [License File](LICENSE).

---

## 📞 **Contact**

For support or inquiries, feel free to reach out:

- **Name**: Pesala Winodith
- **Email**: [gkpesalawinodith@gmail.com](mailto:gkpesalawinodith@gmail.com)
- **GitHub**: [pesala-x](https://github.com/pesala-x)

---
