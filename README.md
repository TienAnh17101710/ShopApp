# Key Product Shop - Spring Boot Application

A Spring Boot RESTful API application for managing and selling digital key products with MySQL database integration.

## Project Features

- **Product Management**: Create, read, update, and delete products
- **Product Search**: Search products by name
- **Active/Inactive Management**: Activate or deactivate products
- **Database Integration**: MySQL database at localhost:3306
- **RESTful API**: Complete REST endpoints for product operations
- **Data Validation**: Input validation using Jakarta Validation
- **Error Handling**: Comprehensive error responses

## Technology Stack

- **Framework**: Spring Boot 3.1.5
- **Language**: Java 17
- **Build Tool**: Maven
- **Database**: MySQL 8.0
- **ORM**: Spring Data JPA with Hibernate
- **API Documentation**: RESTful endpoints

## Prerequisites

- Java 17 or higher
- Maven 3.6 or higher
- MySQL Server 8.0+ running on localhost:3306
- VS Code or any Java IDE

## Setup Instructions

### 1. Database Setup

Create the database before running the application:

```sql
CREATE DATABASE shopapp_db;
USE shopapp_db;
```

Or the application will auto-create tables on first run with `spring.jpa.hibernate.ddl-auto=update`

### 2. MySQL Connection Configuration

Edit `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/shopapp_db
spring.datasource.username=root
spring.datasource.password=your_password
```

Update the password if your MySQL has a password set.

### 3. Build the Project

```bash
mvn clean install
```

### 4. Run the Application

```bash
mvn spring-boot:run
```

The application will start on `http://localhost:8080/api`

## API Endpoints

### Create Product
- **POST** `/api/products/create`
- **Body**:
```json
{
  "productCode": "KEY001",
  "productName": "Premium Key",
  "description": "High-quality product key",
  "price": 29.99,
  "quantity": 100
}
```

### Get All Products
- **GET** `/api/products/all`

### Get Active Products
- **GET** `/api/products/active/list`

### Get Product by ID
- **GET** `/api/products/{id}`

### Search Products
- **GET** `/api/products/search?productName=Premium`

### Update Product
- **PUT** `/api/products/update/{id}`

### Deactivate Product
- **PUT** `/api/products/deactivate/{id}`

### Delete Product
- **DELETE** `/api/products/delete/{id}`

## Project Structure

```
ShopApp/
├── src/main/java/com/shopapp/
│   ├── ShopAppApplication.java       # Main application class
│   ├── controller/
│   │   └── ProductController.java    # REST endpoints
│   ├── service/
│   │   └── ProductService.java       # Business logic
│   ├── repository/
│   │   └── ProductRepository.java    # Database operations
│   ├── model/
│   │   └── Product.java              # Entity model
│   └── dto/
│       └── ProductDTO.java           # Data Transfer Object
├── src/main/resources/
│   └── application.properties        # Configuration
└── pom.xml                           # Maven configuration
```

## Troubleshooting

### Connection Error to MySQL
- Ensure MySQL is running on port 3306
- Verify database credentials in `application.properties`
- Check if database `shopapp_db` exists

### Port Already in Use
- Change `server.port` in `application.properties`

### Build Issues
- Run `mvn clean` to remove build artifacts
- Ensure Java 17 is installed: `java -version`

## Testing the API

Use tools like:
- **Postman** - Import REST endpoints and test
- **cURL** - Command line testing
- **VS Code REST Client Extension** - Create `.http` files

## Next Steps

1. Implement user authentication/authorization
2. Add order management functionality
3. Integrate payment gateway
4. Add product categories
5. Implement inventory tracking
