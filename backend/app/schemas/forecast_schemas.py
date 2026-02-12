from pydantic import BaseModel


class ForecastRequest(BaseModel):
    product_id: int


class ForecastResponse(BaseModel):
    product_id: int
    forecasted_demand: int
