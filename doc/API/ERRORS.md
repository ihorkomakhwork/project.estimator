## Typical errors

### 400 Bad Request

This error occurs when the request is malformed. The response body will contain a JSON object with a message property that describes the error.

```json
{
  "status": 400,
  "message": "Bad Request"
}
```

### 401 Unauthorized

This error occurs when the request does not contain valid authentication credentials. The response body will contain a JSON object with a message property that describes the error.

```json
{
  "status": 401,
  "message": "Unauthorized"
}
```

### 403 Forbidden

This error occurs when the request contains valid authentication credentials, but the credentials are not authorized to access the requested resource. The response body will contain a JSON object with a message property that describes the error.

```json
{
  "status": 403,
  "message": "Forbidden"
}
```

### 404 Not Found

This error occurs when the requested resource does not exist. The response body will contain a JSON object with a message property that describes the error.

```json
{
  "status": 404,
  "message": "Not Found"
}
```

### 500 Internal Server Error

This error occurs when the server encounters an unexpected condition that prevents it from fulfilling the request. The response body will contain a JSON object with a message property that describes the error.

```json
{
  "status": 500,
  "message": "Internal Server Error"
}
```

### 503 Service Unavailable

This error occurs when the server is unable to handle the request due to a temporary overloading or maintenance of the server. The response body will contain a JSON object with a message property that describes the error.

```json
{
  "status": 503,
  "message": "Service Unavailable"
}
```