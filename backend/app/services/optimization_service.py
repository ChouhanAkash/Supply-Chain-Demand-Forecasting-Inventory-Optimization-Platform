from typing import List, Dict


def optimize_inventory() -> List[Dict]:
    """
    Optimize inventory allocation across warehouses.
    Currently returns dummy allocation.
    
    Returns:
        List of allocation dictionaries with warehouse and product assignments
    """
    # TODO: Implement actual optimization logic
    dummy_allocation = [
        {
            "warehouse_id": 1,
            "product_id": 1,
            "allocated_quantity": 50
        },
        {
            "warehouse_id": 2,
            "product_id": 1,
            "allocated_quantity": 30
        },
        {
            "warehouse_id": 1,
            "product_id": 2,
            "allocated_quantity": 20
        }
    ]
    
    return dummy_allocation
