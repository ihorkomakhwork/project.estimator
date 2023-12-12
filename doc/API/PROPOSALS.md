## Proposal

### Base path

```plaintext
http://{api.example.com}/api/v1/proposals
```

##### Resoursce description

The client creates a proposal for a project, forming a proposal entity. Subsequently, employees can review this proposal, initiating the time estimation process.

### Endpoints

### `GET /proposals`
------------------------------------------------------------------

##### Description

Get all proposals.

###### Example Request

```http
GET /proposals`HTTP/1.1
Host: api.example.com
Cookie: access_token=<access_token>
```
###### Optional query parameters

| Property    | Type   | Description                   |
|-------------|--------|-------------------------------|
| `status`    | string | We can get by status `resolved`, `pending` e.t.c |
| `customerId` | number | We can get by customer id |

###### Example Response

```http
HTTP/1.1 200 OK
Content-Type: application/json
```

```json
{
  "status": 200,
  "message": "OK",
  "proposals": [
    {
      "id": 1,
      "title": "Some automation APP",
      "customerId": 123,
      "state": "resolve",
      "content": "Some discription of ammazing app"
    },
    { 
      "id": 2,
      "title": "Pizzeria web-site",
      "customerId": 123,
      "state": "estimating",
      "content": "Some discription of ammazing app"
    },
    {
      "id": 3,
      "title": "Some bot",
      "customerId": 20, 
      "state": "reject",
      "content": "Some discription of ammazing app"
    },
    {
      "id": 4, 
      "title": "Some integration",
      "customerId": 20,
      "state": "processing",
      "content": "Some discription of ammazing app"
    }
  ],
  }
```
                          

### `GET /proposals/:id`
------------------------------------------------------------------

##### Description

Get proposal by id.

###### Example Request

```http
GET /proposals/1 HTTP/1.1
Host: api.example.com
Cookie: access_token=<access_token>
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
  "proposal": {
    "id": 1,
    "title": "Some automation APP",
    "customerId": 123,
    "state": "resolve",
    "content": "Some discription of ammazing app"
  }
}
```

### `POST /proposals`
------------------------------------------------------------------

##### Description

Create new proposal.

###### Example Request

```http
POST /proposals HTTP/1.1
Host: api.example.com
Cookie: access_token=<access_token>
```
```json
{
  "title": "Some automation APP",
  "customerId": 123,
  "state": "pending",
  "content": "Some discription of ammazing app"
}
```

###### Example Response

```http
HTTP/1.1 201 Created
Content-Type: application/json
```
```json
{
  "status": 201,
  "message": "Proposal was created",
  "proposal": {
    "id": 1,
    "title": "Some automation APP",
    "customerId": 123,
    "state": "resolve",
    "content": "Some discription of ammazing app"
  }
}
```

### `PATCH /proposals/:id`
------------------------------------------------------------------

##### Description

Update proposal by id.

###### Example Request

```http
PATCH /proposals/1 HTTP/1.1
Host: api.example.com
Cookie: access_token=<access_token>
```
###### Example Response

```http
HTTP/1.1 200 OK
Content-Type: application/json
```
```json
{
  "status": 200,
  "message": "Proposal was updated",
  "proposal": {
    "id": 1,
    "title": "Some automation APP",
    "customerId": 123,
    "state": "resolve",
    "content": "Some discription of ammazing app"
  }
}
```

### `DELETE /proposals/:id`

##### Description

Delete proposal by id.

###### Example Request

```http
DELETE /proposals/1 HTTP/1.1
Host: api.example.com
Cookie: access_token=<access_token>
```
###### Example Response

```http
HTTP/1.1 200 OK
Content-Type: application/json
```
```json
{
  "status": 200,
  "message": "Proposal was deleted",
  "proposal": {
    "id": 1,
    "title": "Some automation APP",
    "customerId": 123,
    "state": "resolve",
    "content": "Some discription of ammazing app"
  }
}
```
