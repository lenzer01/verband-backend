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

---

## Eintrag erstellen
```
POST /entry
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "kitId": "8e53b6aa-61c1-4f9b-9f6f-8d9f91d4d3e1",
  "occurredAt": "2026-02-12T08:30:00.000Z",
  "description": "Schnittverletzung am Finger in Werkstatt",
  "measures": "Wunde gereinigt und Pflaster angebracht"
}
```

**Antwort:**
```json
{
  "message": "Eintrag erfolgreich erstellt",
  "entry": {
    "id": "c6f4cf58-3c5d-4d18-a99d-0f8a9f84e59b",
    "occurredAt": "2026-02-12T08:30:00.000Z",
    "description": "Schnittverletzung am Finger in Werkstatt",
    "measures": "Wunde gereinigt und Pflaster angebracht",
    "createdAt": "2026-02-12T08:31:12.123Z"
  }
}
```

## Alle Eintraege abrufen
```
GET /entry
Authorization: Bearer <JWT_TOKEN>
```

## Einzelnen Eintrag abrufen
```
GET /entry/c6f4cf58-3c5d-4d18-a99d-0f8a9f84e59b
Authorization: Bearer <JWT_TOKEN>
```

## Eintrag aktualisieren
```
PUT /entry/c6f4cf58-3c5d-4d18-a99d-0f8a9f84e59b
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "description": "Schnittverletzung am Finger beim Schneiden",
  "measures": "Wunde gereinigt, desinfiziert und Pflaster angebracht"
}
```

## Eintrag loeschen
```
DELETE /entry/c6f4cf58-3c5d-4d18-a99d-0f8a9f84e59b
Authorization: Bearer <JWT_TOKEN>
```
