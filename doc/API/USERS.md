
## Users

### Base path

```plaintext
http://{api.example.com}/api/v1/auth
```

##### Resoursce description

This is couple of routes related with users. Access to this route can have only `ONLY ADMIN`.

### Endpoints

### `GET /users`

###### Optional query parameters

| Property    | Type   | Description                   |
|-------------|--------|-------------------------------|
| `role`    | string | We can sort by role `admin`, `employee` or `customer` |
| `positionId` | number | We can sort by speciality id |
| `email` | string | We can sort by email |
| `country` | string | We can sort by country |
| `name` | string | We can sort by name |
| `lastName` | string | We can  sort by last name |
| `email` | string | We can sort by email |

##### Description

Gets list of all users 

###### Example Request

```http
GET /auth/refresh HTTP/1.1
Host: api.example.com
Cookie: access_token=<access_token>
```
###### Example Response

```http
HTTP/1.1 200 OK
Content-Type: application/json
... other headers
```
```json
{
  "status": 200,
  "users": [
    {
      "id": 1,
      "name": "Gosha",       
      "lastName": "Rubchinskiy",  
      "middleName": "Olegovich",  
      "password": "$QwErtzzzz67890",
      "email": "gosha@sabaka.com",
      "country": "Bulgaria",   
      "city": "Sofia",
      "address": "ul. Vasil Levski 12",
      "role": "employee",
      "roleInfo": { 
        "positionId": 1,
        "salary": 10000
      }
    },
    {
      "id": 2,
      "name": "Khan",       
      "lastName": "Mahmed",    
      "password": "$QwErtzzzzsdc890",
      "email": "mahmed@korova.com",
      "country": "OAE",
      "city": "Dubai",
      "address": "Sheik Zayed Road 1",
      "role": "employee",
      "roleInfo": { 
        "type": "employee",
        "positionId": 2,
        "salary": 10000
      }
  },
  {
    "id": 3,
    "name": "ivan",       
    "lastName": "Sidorov",  
    "middleName": "Petrovich",  
    "password": "$QwErtzzzz67890",
    "email": "ivanovich@sabaka.com",
    "country": "Bulgaria",   
    "city": "Sofia",
    "address": "ul. Vasil Levski 12",
    "role": "admin",
    "roleInfo": { 
      "type": "admin",
      }
  },
  ] 
}
```
### `GET /users/:id`

##### Description

Get user by id.

###### Example Request

```http
GET /users/1 HTTP/1.1
Host: api.example.com
Cookie: access_token=<access_token>
```

###### Example Response

```http
HTTP/1.1 200 OK
Content-Type: application/json
... other headers
```
```json
{
 "name": "Gosha",       
 "lastName": "Rubchinskiy",  
 "middleName": "Olegovich",  
 "password": "$QwErtzzzz67890",
 "email": "gosha@sabaka.com",
 "country": "Bulgaria",   
 "city": "Sofia",
 "address": "ul. Vasil Levski 12",
 "role": "employee",

 "roleInfo": { 
    "available": true,
    "positionId": 1,
    "salary": 10000
  }
}
```

### `POST /users`
------------------------------------------------------------------

##### Description

Create new user.

###### Example Request

```http
POST /users HTTP/1.1
Host: api.example.com
Cookie: access_token=<access_token>
Content-Type: application/json
```

Creation Employee type with manager speciality.
```json
{
 "name": "Gosha",       
 "lastName": "Rubchinskiy",  
 "middleName": "Olegovich",  
 "password": "$QwErtzzzz67890",
 "email": "gosha@sabaka.com",
 "country": "Bulgaria",   
 "city": "Sofia",
 "address": "ul. Vasil Levski 12",
 "role": "employee",
 "roleInfo": { 
    "positionId": 1,
    "salary": 10000
  }
}
```
Creation Employee type with developer speciality.
```json
{
 "name": "Khan",       
 "lastName": "Mahmed",    
 "password": "$QwErtzzzzsdc890",
 "email": "mahmed@korova.com",
 "country": "OAE",
 "city": "Dubai",
 "address": "Sheik Zayed Road 1",
 "role": "employee",
 "roleInfo": { 
    "positionId": 2,
    "salary": 10000
  }
}
```
Creation Admin type.

```json
{
 "name": "ivan",       
 "lastName": "Sidorov",  
 "middleName": "Petrovich",  
 "password": "$QwErtzzzz67890",
 "email": "ivanovich@sabaka.com",
 "country": "Bulgaria",   
 "city": "Sofia",
 "address": "ul. Vasil Levski 12",
 "role": "employee",
 "roleInfo": {}
}
```


##### Responce samples

```http
HTTP/1.1 201 Created
Location: /users/:1
Content-Type: application/json
... other headers
```
```json
{
  "status": 201,
  "message": "User was created"
}
```

### `PATCH /users:id`
------------------------------------------------------------------

##### Description

Update user by id.

###### Example Request

```http
PATCH /users/1 HTTP/1.1
Host: api.example.com
Cookie: access_token=<access_token>
Content-Type: application/json
```
```json
{
 "salary": 20000
}
```

##### Responce samples

```http
HTTP/1.1 200 OK
Content-Type: application/json
... other headers
```
```json
{
  "status": 200,
  "message": "User was updated"
}
```

### `DELETE /users:id`
------------------------------------------------------------------

##### Description

Delete user by id.

###### Example Request

```http
DELETE /users/1 HTTP/1.1
Host: api.example.com
Cookie: access_token=<access_token>
```

##### Responce samples

```http
HTTP/1.1 200 OK
Content-Type: application/json
... other headers
```
```json
{
  "status": 200,
  "message": "User was deleted"
}
```