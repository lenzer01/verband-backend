# API-Beispiele

## Registrierung
```
POST /auth/register
Content-Type: application/json

{
  "name": "Max Mustermann",
  "email": "max@example.com",
  "password": "geheimesPasswort123"
}
```

## Login
```
POST /auth/login
Content-Type: application/json

{
  "email": "max@example.com",
  "password": "geheimesPasswort123"
}
```

**Antwort:**
```json
{
  "message": "Login erfolgreich",
  "user": {
    "id": 1,
    "name": "Max Mustermann",
    "email": "max@example.com",
    "role": "REPORTER"
  },
  "token": "<JWT_TOKEN>"
}
```

## Eigenen User abrufen
```
GET /user/1
Authorization: Bearer <JWT_TOKEN>
```

## Alle User abrufen (nur Admin)
```
GET /user
Authorization: Bearer <JWT_TOKEN>
```

## User löschen (nur Admin)
```
DELETE /user/1
Authorization: Bearer <JWT_TOKEN>
```
