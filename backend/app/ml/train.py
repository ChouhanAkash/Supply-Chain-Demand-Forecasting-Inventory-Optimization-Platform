import numpy as np
from sklearn.ensemble import RandomForestRegressor
import joblib
import os

def train_model():
    """
    Train a Random Forest model using dummy data.
    Saves the trained model to disk.
    """
    # Create dummy training data
    # Features: [product_id, historical_sales, season, day_of_week]
    np.random.seed(42)
    X_train = np.random.rand(100, 4) * 100  # 100 samples, 4 features
    
    # Target: demand (simulated as a function of features with some noise)
    y_train = (X_train[:, 1] * 0.8 + X_train[:, 2] * 0.5 + 
               X_train[:, 3] * 0.3 + np.random.randn(100) * 10)
    
    # Initialize and train the model
    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    
    # Save the model
    model_dir = os.path.join(os.path.dirname(__file__), 'models')
    os.makedirs(model_dir, exist_ok=True)
    model_path = os.path.join(model_dir, 'demand_forecast_model.pkl')
    
    joblib.dump(model, model_path)
    print(f"Model trained and saved to {model_path}")
    
    return model_path

if __name__ == "__main__":
    train_model()
