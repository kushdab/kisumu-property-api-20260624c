const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock Database for Lake Basin Region Properties
let properties = [
  { id: 1, title: 'Milimani Luxury Apartment', location: 'Milimani', price: 15000000, type: 'Apartment', bedrooms: 3 },
  { id: 2, title: 'Riat Hills Villa', location: 'Riat Hills', price: 45000000, type: 'Villa', bedrooms: 5 },
  { id: 3, title: 'Tom Mboya Family Home', location: 'Tom Mboya', price: 22000000, type: 'Townhouse', bedrooms: 4 },
  { id: 4, title: 'Kibos Industrial Plot', location: 'Kibos', price: 5000000, type: 'Land', bedrooms: 0 },
  { id: 5, title: 'Mamboleo Modern Studio', location: 'Mamboleo', price: 3500000, type: 'Studio', bedrooms: 1 },
  { id: 6, title: 'Lake View Residency', location: 'Dunga', price: 18500000, type: 'Apartment', bedrooms: 3 }
];

/**
 * @route GET /api/properties
 * @desc Fetch all properties with optional filtering
 */
app.get('/api/properties', (req, res) => {
  const { location, maxPrice, type } = req.query;
  let filteredResults = [...properties];

  if (location) {
    filteredResults = filteredResults.filter(p => 
      p.location.toLowerCase().includes(location.toString().toLowerCase())
    );
  }

  if (maxPrice) {
    filteredResults = filteredResults.filter(p => p.price <= parseInt(maxPrice));
  }

  if (type) {
    filteredResults = filteredResults.filter(p => 
      p.type.toLowerCase() === type.toString().toLowerCase()
    );
  }

  res.status(200).json({
    success: true,
    count: filteredResults.length,
    data: filteredResults
  });
});

/**
 * @route GET /api/properties/:id
 * @desc Get single property by ID
 */
app.get('/api/properties/:id', (req, res) => {
  const property = properties.find(p => p.id === parseInt(req.params.id));
  
  if (!property) {
    return res.status(4404).json({ success: false, message: 'Property not found' });
  }

  res.status(200).json({ success: true, data: property });
});

/**
 * @route POST /api/properties
 * @desc Add a new property listing
 */
app.post('/api/properties', (req, res) => {
  const { title, location, price, type, bedrooms } = req.body;

  if (!title || !location || !price) {
    return res.status(400).json({ success: false, message: 'Please provide title, location and price' });
  }

  const newProperty = {
    id: properties.length + 1,
    title,
    location,
    price: parseFloat(price),
    type: type || 'Other',
    bedrooms: parseInt(bedrooms) || 0
  };

  properties.push(newProperty);
  res.status(201).json({ success: true, data: newProperty });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Kisumu Property API running on http://localhost:${PORT}`);
  console.log('Available locations: Milimani, Riat Hills, Tom Mboya, Kibos, Mamboleo, Dunga');
});