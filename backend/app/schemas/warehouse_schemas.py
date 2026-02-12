from pydantic import BaseModel


class WarehouseBase(BaseModel):
    name: str
    capacity: int
    storage_cost: float


class WarehouseCreate(WarehouseBase):
    pass


class Warehouse(WarehouseBase):
    id: int

    class Config:
        from_attributes = True
