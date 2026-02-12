import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Products API
export const getProducts = async () => {
  try {
    const response = await api.get('/products/');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const createProduct = async (productData) => {
  try {
    const response = await api.post('/products/', productData);
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

// Warehouses API
export const getWarehouses = async () => {
  try {
    const response = await api.get('/warehouses/');
    return response.data;
  } catch (error) {
    console.error('Error fetching warehouses:', error);
    throw error;
  }
};

export const createWarehouse = async (warehouseData) => {
  try {
    const response = await api.post('/warehouses/', warehouseData);
    return response.data;
  } catch (error) {
    console.error('Error creating warehouse:', error);
    throw error;
  }
};

// Forecast API
export const forecastDemand = async (productId) => {
  try {
    const response = await api.post('/forecast-demand/', { product_id: productId });
    return response.data;
  } catch (error) {
    console.error('Error forecasting demand:', error);
    throw error;
  }
};

// Optimization API
export const optimizeInventory = async () => {
  try {
    const response = await api.post('/optimize-inventory/');
    return response.data;
  } catch (error) {
    console.error('Error optimizing inventory:', error);
    throw error;
  }
};

export default api;
