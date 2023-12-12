## Task

```plaintext
http://{estimations}/api/v1/task
```

Interfce for working with estimations. After creation propousal by user if the company wants to process it, they create an estimate for the project and start estimating process. Access to this route can have only `MANAGER` role. 
 
### `GET /tasks`
------------------------------------------------------------------

##### Description

Get all tasks.

###### Optional query parameters

| Property    | Type   | Description                   |
|-------------|--------|-------------------------------|
| `title`     | string | We can sort by title          |
| `employeeId` | number | We can sort by employee id   | 


###### Example Request

```http
GET /tasks HTTP/1.1
Host: api.example.com
Cookie: access_token=<access_token>
... other headers
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
  "message": "OK",
  "tasks": [
    {
       "id": 1,
       "title": "Authorization",
       "employeeId": 3,
       "projecEstimationId": 1,
       "estimate" : "06:00:00",
        "description": "JWT authorization with access 1 token",
    },
    {
       "id": 2,
       "title": "Logo design",
       "employeeId": 3,
       "projecEstimationId": 1,
       "estimate" : "06:00:00",
       "description": "Logo design for new app",
    },
  
  ],
  }
```

### `GET /tasks/:id`
------------------------------------------------------------------

##### Description

Get task by id.

###### Example Request

```http
GET /tasks/1 HTTP/1.1
Host: api.example.com
Cookie: access_token=<access_token>
... other headers
```

###### Example Response

```http
HTTP/1.1 200 OK
Content-Type: application/json
```
```json
{
  "status": 200,
  "message": "OK",
  "task": {
       "id": 1,
       "title": "Authorization",
       "employeeId": 3,
       "projecEstimationId": 1,
       "estimate" : "06:00:00",
        "description": "JWT authorization with access 1 token",
    },
  }
```

### `POST /tasks`
------------------------------------------------------------------

##### Description

Create new task.

###### Example Request

```http
POST /tasks HTTP/1.1
Host: api.example.com
Cookie: access_token=<access_token>
Content-Type: application/json
... other headers

```
```json
{
  "title": "Authorization",
  "customerId": 20,
  "projecEstimationId": 1,
  "estimate" : "6 d",
  "description": "JWT authorization with access 1 token",
}
```
##### Responce samples

```http
HTTP/1.1 201 Created
Location: /task/:1
Content-Type: application/json
... other headers
```
```json
{
  "status": 201,
  "message": "Task was created"
}
```

### `PATCH /tasks/:id`
------------------------------------------------------------------

##### Description

Update task by id.

###### Example Request

```http
PATCH /tasks/1 HTTP/1.1
Host: api.example.com
Cookie: access_token=<access_token>
Content-Type: application/json
... other headers
```
```json
{
  "employeeId": 3,
}
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
  "message": "Task was updated"
}
```


### `DELETE /tasks/:id`
------------------------------------------------------------------

##### Description

Delete task by id.

###### Example Request

```http
DELETE /tasks/1 HTTP/1.1
Host: api.example.com
Cookie: access_token=<access_token>
... other headers
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
  "message": "Task was deleted"
}
```
