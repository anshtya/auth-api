# auth-api
An Express framework project which returns a token upon successful authentication.

## 🖥️Installation

1. Clone the project.
2. Install [Docker](https://docker.com).
3. Create an `.env` file and provide the following variables:
```
PGPASSWORD=your_password  # Password for Postgresql
ACCESS_TOKEN=your_access_token
```
5. Start the Docker container. Provide `-d` if you want to run the container in background.
```
docker compose up
```
6. To stop the container
```
docker compose stop

# If you want to stop and delete the container at the same time, run this instead
docker compose down
```

## 🧪 Testing with Postman

1. Install and open [Postman](https://postman.com).
2. Create a new request.
3. Set the request type (GET, POST, etc.) and enter the API endpoint you want to test e.g., `http://localhost:3000/api/endpoint`.
4. Add the required parameters.
5. Send the request and view the response.
