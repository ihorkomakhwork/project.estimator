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
  "message": "Ok",
  "positions": [
    {
      "id": 1,
      "area": "Development",
      "level": "Junior",
      "specialization": "Back-end",
    },
    {
      "id": 2,
      "area": "Management",
      "level": "Senior",
      "specialization": "Project Manager",
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
  "message": "Ok",
  "position": {
    {
      "id": 1,
      "area": "Development",
      "level": "Junior",
      "specialization": "Back-end",
    }
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
      "id": 1,
      "area": "Development",
      "level": "Junior",
      "specialization": "Back-end",
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
  "level": "Middle",
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