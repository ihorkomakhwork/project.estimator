## Auth

### Base path

```plaintext
http://{api.example.com}/api/v1/auth
```

##### Resoursce description

This is couple of routes related with authenfication. Our authenfication strategy is jwt based on cookies. Include the JWT authentication token in the headers of your requests to operate with special private resources. Application uses single jwt token and HttpOnly cookies for for better security. 

##### Example authrized request

```http
GET /auth/refresh HTTP/1.1
Host: api.example.com
Cookie: access_token=<access_token>
```

### Endpoints

### `POST /auth/signup`
------------------------------------------------------------------

##### Description

Registration concerns `ONLY FOR CUSTOMERS`, admin should create another type of users such as: Employees, Admin should create by yourself with  [user endpoint](#Users).
                           
##### Request sample 

```http
GET /auth/signup HTTP/1.1
Host: api.example.com
... other headers
```

```json
{
 "name": "jhon",       
 "lastName": "due",  
 "middleName": "ivanovich",  
 "password": "$QwErtUs1234567890",
 "email": "jhonivanovich@sabaka.com",
 "country": "Ukraine",   
 "city": "Yalta",
 "address": "Petrovska str. 11b",
 "role": { 
    "type": "customer",
    "iban": "UA213223130000026007233566001",
    "license": "PE"
  }
}
```
##### Responce samples

```http
HTTP/1.1 201 Created
Location: /users/:123
Content-Type: application/json
... other headers
```
```json
{
  "status": 201,
  "message": "Registration was successful"
}
```

### `POST /auth/login`
------------------------------------------------------------------

##### Description
Login concerns for all type of users. It allow authenticat in sysytem.
                           
###### Example Request

```http
GET /auth/login HTTP/1.1
Content-Type: application/json
... other headers
```
```json
{
 "password": "$QwErtUs1234567890",
 "email": "jhonivanovich@sabaka.com"
}
```

###### Example Response

```http
HTTP/1.1 200 OK
Set-Cookie: access_token={ access_token }; HttpOnly
Content-Type: application/json
... other headers 
```
```json
{
  "status": 200,
  "message": "Registration was successful"
}
```

### `GET /auth/refresh`
------------------------------------------------------------------

##### Description

When token expired client should refresh access token to continue work.

###### Example Request

```http
GET /auth/refresh HTTP/1.1
Host: api.example.com
Cookie: access_token=<access_token>
```
###### Example Response

```http
HTTP/1.1 200 OK
Set-Cookie: access_token=<access_token>; HttpOnly
```

```json
{
  "status": 200,
  "message": "Token was succesufully refreshed",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTg3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.KK5gU5f2XwqqLVyWBbgyC_rQJSJqWaTPOesXG_hdDFk",
}
```

### `POST /auth/logout`

------------------------------------------------------------------

##### Description

Users can logout from their account with this endpoint


###### Example Request

```http
GET POST /auth/logout HTTP/1.1
Cookie: access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```
###### Example Response

```json
{
  "status": 200,
  "message": "user logout was successful",
}
```
