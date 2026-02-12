from pydantic import BaseModel
from typing import List


class AllocationItem(BaseModel):
    warehouse_id: int
    product_id: int
    allocated_quantity: int


class OptimizationResponse(BaseModel):
    allocations: List[AllocationItem]
    total_allocations: int
