from app.ml.predict import predict_demand


def forecast_demand(product_id: int) -> int:
    """
    Forecast demand for a product using ML model.
    
    Args:
        product_id: The ID of the product to forecast
        
    Returns:
        Forecasted demand quantity
    """
    prediction = predict_demand(product_id)
    return int(prediction)
