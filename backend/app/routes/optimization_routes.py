from fastapi import APIRouter

from app.schemas.optimization_schemas import OptimizationResponse, AllocationItem
from app.services.optimization_service import optimize_inventory

router = APIRouter(prefix="/optimize-inventory", tags=["optimization"])


@router.post("/", response_model=OptimizationResponse)
def create_optimization():
    """
    Optimize inventory allocation across warehouses.
    Currently returns dummy allocation.
    """
    allocations = optimize_inventory()
    
    # Convert to Pydantic models
    allocation_items = [AllocationItem(**item) for item in allocations]
    
    return OptimizationResponse(
        allocations=allocation_items,
        total_allocations=len(allocation_items)
    )
