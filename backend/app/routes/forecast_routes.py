from fastapi import APIRouter

from app.schemas.forecast_schemas import ForecastRequest, ForecastResponse
from app.services.forecast_service import forecast_demand

router = APIRouter(prefix="/forecast-demand", tags=["forecast"])


@router.post("/", response_model=ForecastResponse)
def create_forecast(request: ForecastRequest):
    """
    Forecast demand for a product.
    Currently returns dummy prediction.
    """
    forecasted_value = forecast_demand(request.product_id)
    return ForecastResponse(
        product_id=request.product_id,
        forecasted_demand=forecasted_value
    )
