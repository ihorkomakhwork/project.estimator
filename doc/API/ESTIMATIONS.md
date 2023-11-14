## Estimations

### Base path

```plaintext
http://{api.example.com}/api/v1/esimations
```

##### Resoursce description

This is couple of routes related with estimations. Access to this route can have only `MANAGERS` of company. or
`CUSTOMER` who created this estimation.

### Endpoints

### `GET /estimations`
------------------------------------------------------------------

##### Description

Gets list of all estimations

###### Example Request

```http
GET /estimations HTTP/1.1
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
  "estimations": [
    {
      "id": 1,
      "title": "Some automation APP",
      "responsibleEmployeeId": 1,
      "proposalId": 1,
      "state": "processing",
      "message": "Some message to customer",
    },
    {
      "id": 2,
      "title": "Pizzeria web-site",
      "responsibleEmployeeId": 1,
      "proposalId": 1,
      "state": "processing",
      "message": "Some message to customer",
    },
    {
      "id": 3,
      "title": "Some bot",
      "responsibleEmployeeId": 1,
      "proposalId": 1,
      "state": "processing",
      "message": "Some message to customer",
    }
  ] 
}
```
### `GET /estimations/:id`
------------------------------------------------------------------

##### Description

Get estimation by id.

###### Example Request

```http
GET /estimations/1 HTTP/1.1
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
  "estimation": {
    "id": 1,
    "title": "Some automation APP",
    "responsibleEmployeeId": 1,
    "proposalId": 1,
    "state": "processing",
    "message": "Some message to customer",
  }
}
```

### `POST /estimations`
------------------------------------------------------------------

##### Description

Create new estimation.

###### Example Request

```http
POST /estimations HTTP/1.1
Host: api.example.com
Cookie: access_token=<access_token>
Content-Type: application/json
```
```json
{
  "title": "Some automation APP",
  "responsibleEmployeeId": 1,
  "proposalId": 1,
  "state": "processing",
  "message": "Some message to customer",
}
```

##### Responce samples

```http
HTTP/1.1 201 Created
Location: /estimations/:123
Content-Type: application/json
... other headers
```
```json
{
  "status": 201,
  "message": "Estimation was created"
}
```

### `PATCH /estimations/:id`
------------------------------------------------------------------

##### Description

Update estimation.

###### Example Request

```http
PATCH /estimations/:1 HTTP/1.1
Host: api.example.com
Cookie: access_token=<access_token>
Content-Type: application/json
```
```json
{
  "state": "processing",
  "message": "Some message to customer",
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
  "message": "Estimation was updated"
}
```

### `DELETE /estimations/:id`
------------------------------------------------------------------

##### Description

Delete estimation.

###### Example Request

```http
DELETE /estimations/:1 HTTP/1.1
Host: api.example.com
Cookie: access_token=<access_token>
Content-Type: application/json
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
  "message": "Estimation was deleted"
}
```