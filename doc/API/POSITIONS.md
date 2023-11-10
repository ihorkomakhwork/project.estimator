## Positions

### Base path

```plaintext
http://{api.example.com}/api/v1/positions
```

##### Resoursce description

This is couple of routes related with positions. Access to manipulating data of this route can have only `ADMINS` of company.

### Endpoints

### `GET /positions`

------------------------------------------------------------------

##### Description

Gets list of all positions

###### Example Request

```http
GET /positions HTTP/1.1
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
  "MESSAGE": "OK",
  "positions": [
    {
      "id": 1,
      "areaID": 1,
      "levelId": 2,
      "specializationId": 1,
    },
    {
      "id": 2,
      "areaID": 2,
      "levelId": 4,
      "specializationId": 4,
    },
  ],
}
```

### `GET /positions/:id`
------------------------------------------------------------------

##### Description

Get position by id.

###### Example Request

```http
GET /positions/1 HTTP/1.1
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
  "message": "OK",
  "position": {
    "id": 1,
    "areaID": 1,
    "levelId": 2,
    "specializationId": 1,
  }
}
```

### `POST /positions`
------------------------------------------------------------------

##### Description

Create new position.

###### Example Request

```http
POST /positions HTTP/1.1
Host: api.example.com
Cookie: access_token=<access_token>
Content-Type: application/json
... other headers
```
```json
{
  "areaID": 1,
  "levelId": 2,
  "specializationId": 1,
}
```

###### Example Response

```http
HTTP/1.1 200 OK
Content-Type: application/json
Location: /positions/3
... other headers
```
```json
{
  "status": 201,
  "message": "Position was created",
}
```

### `PATCH /positions/:id`

------------------------------------------------------------------

##### Description

Update position by id.

###### Example Request

```http
PATCH /positions/1 HTTP/1.1
Host: api.example.com
Cookie: access_token=<access_token>
Content-Type: application/json
... other headers
```
```json
{
  "areaID": 1,
  "levelId": 2,
  "specializationId": 1,
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
  "message": "Position was updated",
}
```

### `DELETE /positions/:id`
------------------------------------------------------------------

##### Description

Delete position by id.

###### Example Request

```http
DELETE /positions/1 HTTP/1.1
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
  "message": "Position was deleted",
}
```

### `GET /positions/areas`
------------------------------------------------------------------

##### Description

Get list of all areas.

###### Example Request

```http
GET /positions/areas HTTP/1.1
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
  "message": "Ok",
  "areas": [
    {
      "id": 1,
      "type": "Management",
    },
    {
      "id": 2,
      "name": "Development",
    },
  ],
}
```

### `GET /positions/levels`
------------------------------------------------------------------

##### Description

Get area by id.

###### Example Request

```http
GET /positions/levels HTTP/1.1
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
  "message": "Ok",
  "levels": [
    {
     "id": 1,
        "name": "Trainee",   
    },
    {
      "id": 2,
      "name": "Junior",
    },
    {
      "id": 3,
      "name": "Middle",
    },
    {
        "id": 4,
        "name": "Senior",
    },
    {
        "id": 5,
        "name": "Lead",
    },
    {
        "id": 6,
        "name": "C-Level",
    }
  ]
}
```

### `GET /positions/specializations`
------------------------------------------------------------------

##### Description

Get list of all specializations.

###### Example Request

```http
GET /positions/specializations HTTP/1.1
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
  "message": "Ok",
  "specializations": [
    {
      "id": 1,
      "name": "Frontend",
    },
    {
      "id": 2,
      "name": "Backend",
    },
    {
      "id": 3,
      "name": "Fullstack",
    },
    {
      "id": 4,
      "name": "QA",
    },
    {
      "id": 5,
      "name": "DevOps",
    },
    {
      "id": 6,
      "name": "UI/UX",
    },
    {
      "id": 7,
      "name": "Project Manager",
    },
    {
      "id": 8,
      "name": "Business Analyst",
    },
    {
      "id": 9,
      "name": "Sales Manager",
    },
    {
      "id": 10,
      "name": "HR",
    },
    {
      "id": 11,
      "name": "Marketing",
    },
    {
      "id": 12,
      "name": "CEO",
    }
  ]
}
```

