# Supply Chain Management Platform - Render Deployment

This file contains instructions for deploying to Render.com

## Deployment Steps

### Step 1: Create Render Account
- Go to https://render.com
- Sign up with your GitHub account

### Step 2: Deploy Backend (FastAPI)

1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Configure settings:
   - **Name**: supply-chain-backend
   - **Runtime**: Python 3
   - **Build Command**: `pip install -r backend/requirements.txt`
   - **Start Command**: `cd backend && uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - **Plan**: Free

4. Click "Create Web Service"
5. Wait for deployment (5-10 minutes)
6. Copy your backend URL (e.g., https://supply-chain-backend.onrender.com)

### Step 3: Deploy Frontend (React + Vite)

1. Click "New +" → "Static Site"
2. Connect the same GitHub repository
3. Configure settings:
   - **Name**: supply-chain-frontend
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Publish Directory**: `frontend/dist`
   
4. Add Environment Variable:
   - **Key**: `VITE_API_URL`
   - **Value**: Your backend URL from Step 2 (e.g., https://supply-chain-backend.onrender.com)

5. Click "Create Static Site"
6. Wait for deployment (3-5 minutes)

### Step 4: Test Your Application

1. Open your frontend URL (e.g., https://supply-chain-frontend.onrender.com)
2. Navigate through all pages:
   - Dashboard
   - Products
   - Warehouses
   - Forecast
   - Optimization

## Important Notes

- **Free Tier**: Services spin down after 15 minutes of inactivity
- **First Load**: May take 30-60 seconds to wake up
- **Database**: SQLite database will reset on each deployment (use PostgreSQL for production)
- **ML Models**: Make sure pickle files are in the repository

## Troubleshooting

### Backend Issues
- Check logs in Render dashboard
- Verify requirements.txt has all dependencies
- Check that database initializes correctly

### Frontend Issues
- Verify VITE_API_URL environment variable is set correctly
- Check browser console for CORS errors
- Ensure build command completes successfully

## URLs After Deployment

Backend API: https://supply-chain-backend.onrender.com  
Frontend App: https://supply-chain-frontend.onrender.com  
API Docs: https://supply-chain-backend.onrender.com/docs
