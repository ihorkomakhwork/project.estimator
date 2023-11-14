## Participants

```plaintext
http://{estimations}/api/v1/task
```

Interfce for working with estimations. After creation propousal by user if the company wants to process it, they create an estimate for the project and start estimating process.

### `GET /participants`
------------------------------------------------------------------

##### Description

Get all participants.

###### Optional query parameters

| Property    | Type   | Description                   |
|-------------|--------|-------------------------------|
| `name`      | string | We can sort by name           |
| `lastName`  | string | We can sort by last name      |

###### Example Request

```http
GET /participants HTTP/1.1
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
    "message": "Ok",
    "participants": [
        {
            "employeeId": 1,
            "estimation": 1
        },
        {
            "employeeId": 2,
            "estimation": 1
        },
        {
            "employeeId": 3,
            "estimation": 1
        
        } 
    ]
}
```

### `GET /participants/:id`
------------------------------------------------------------------

##### Description

Get participant by id.

###### Example Request

```http
GET /participants/1 HTTP/1.1
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
    "message": "Ok",
    "participant": {
        "employeeId": 1,
        "estimation": 1
    }
}
```


### `POST /participants`
------------------------------------------------------------------

##### Description

Create new participant.

###### Example Request

```http
POST /participants HTTP/1.1
Host: api.example.com
Cookie: access_token=<access_token>
Content-Type: application/json
... other headers
```
```json
{
    "employeeId": 1,
    "estimation": 1
}
```
###### Example Response

```http
HTTP/1.1 200 OK
Content-Type: application/json
Location: /participants/1
... other headers
```
```json
{
    "status": 201,
    "message": "Participant was created"
}
```

### `PATCH /participants/:id`
------------------------------------------------------------------

##### Description

Update participant by id.

###### Example Request

```http
PATCH /participants/1 HTTP/1.1
Host: api.example.com
Cookie: access_token=<access_token>
Content-Type: application/json
... other headers
```
```json
{
    "employeeId": 1,
    "estimation": 2
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
    "message": "Participant was updated"
}
```

### `DELETE /participants/:id`
------------------------------------------------------------------

##### Description

Delete participant by id.

###### Example Request

```http
DELETE /participants/1 HTTP/1.1
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
    "message": "Participant was deleted"
}
```