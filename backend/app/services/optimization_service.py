from typing import List, Dict
from app.optimization.optimizer import optimize_with_dummy_data


def optimize_inventory() -> List[Dict]:
    """
    Optimize inventory allocation across warehouses using linear programming.
    
    Returns:
        List of allocation dictionaries with warehouse and product assignments
    """
    # Use PuLP optimizer to solve allocation problem
    allocations = optimize_with_dummy_data()
    
    return allocations
