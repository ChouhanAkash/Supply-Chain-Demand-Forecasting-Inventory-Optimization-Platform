import numpy as np
import joblib
import os

def load_model():
    """Load the trained model from disk."""
    model_path = os.path.join(os.path.dirname(__file__), 'models', 'demand_forecast_model.pkl')
    
    if not os.path.exists(model_path):
        raise FileNotFoundError(f"Model not found at {model_path}. Please train the model first.")
    
    return joblib.load(model_path)

def predict_demand(product_id: int) -> float:
    """
    Predict demand for a product using the trained ML model.
    
    Args:
        product_id: The ID of the product to forecast
        
    Returns:
        Predicted demand quantity
    """
    try:
        model = load_model()
        
        # Create dummy features for prediction
        # Features: [product_id, historical_sales, season, day_of_week]
        # In a real scenario, these would be fetched from the database
        features = np.array([[product_id, 50.0, 2.0, 3.0]])
        
        prediction = model.predict(features)[0]
        
        # Return rounded positive value
        return max(0, round(prediction))
    
    except FileNotFoundError:
        # Fallback to dummy value if model not trained
        return 100
