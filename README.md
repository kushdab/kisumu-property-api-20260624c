# Kisumu Property API 2026

A RESTful API for listing and filtering real estate properties specifically in the Lake Basin region (Kisumu and environs).

## Features
- List all properties
- Filter by Location (e.g., Milimani, Riat Hills)
- Filter by Maximum Price
- Filter by Type (e.g., Villa, Apartment, Land)
- View specific property details
- Add new listings

## Setup Instructions
1. Run `npm install` to install dependencies.
2. Run `npm start` to launch the server.
3. The API will be available at `http://localhost:3000`.

## API Endpoints

### GET `/api/properties`
Query Parameters:
- `location`: String
- `maxPrice`: Number
- `type`: String

### GET `/api/properties/:id`
Returns details of a specific property.

### POST `/api/properties`
Payload:
```json
{
  "title": "New Beach House",
  "location": "Dunga",
  "price": 12000000,
  "type": "Villa",
  "bedrooms": 4
}
```