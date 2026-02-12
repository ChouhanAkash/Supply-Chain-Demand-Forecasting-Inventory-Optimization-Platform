from pulp import LpMinimize, LpProblem, LpVariable, lpSum, LpStatus, value
from typing import List, Dict


def solve_allocation_problem(
    products: List[Dict],
    warehouses: List[Dict],
    demand_forecasts: Dict[int, int]
) -> List[Dict]:
    """
    Solve inventory allocation problem using linear programming.
    
    Minimizes total storage cost while meeting demand constraints.
    
    Args:
        products: List of products with id, name, price
        warehouses: List of warehouses with id, capacity, storage_cost
        demand_forecasts: Dictionary mapping product_id to forecasted demand
        
    Returns:
        List of allocation dictionaries with warehouse_id, product_id, and allocated_quantity
    """
    # Create the optimization problem
    problem = LpProblem("Inventory_Allocation", LpMinimize)
    
    # Create decision variables
    # x[w, p] = quantity of product p allocated to warehouse w
    allocation_vars = {}
    for warehouse in warehouses:
        for product in products:
            w_id = warehouse['id']
            p_id = product['id']
            var_name = f"alloc_w{w_id}_p{p_id}"
            # Variable must be non-negative
            allocation_vars[(w_id, p_id)] = LpVariable(var_name, lowBound=0, cat='Integer')
    
    # Objective function: minimize total storage cost
    problem += lpSum([
        allocation_vars[(w['id'], p['id'])] * w['storage_cost']
        for w in warehouses
        for p in products
    ])
    
    # Constraint 1: Meet demand for each product
    for product in products:
        p_id = product['id']
        demand = demand_forecasts.get(p_id, 0)
        problem += lpSum([
            allocation_vars[(w['id'], p_id)]
            for w in warehouses
        ]) >= demand, f"Demand_Product_{p_id}"
    
    # Constraint 2: Warehouse capacity constraints
    for warehouse in warehouses:
        w_id = warehouse['id']
        problem += lpSum([
            allocation_vars[(w_id, p['id'])]
            for p in products
        ]) <= warehouse['capacity'], f"Capacity_Warehouse_{w_id}"
    
    # Solve the problem
    problem.solve()
    
    # Extract solution
    allocations = []
    if LpStatus[problem.status] == 'Optimal':
        for (w_id, p_id), var in allocation_vars.items():
            quantity = value(var)
            if quantity > 0:  # Only include non-zero allocations
                allocations.append({
                    'warehouse_id': w_id,
                    'product_id': p_id,
                    'allocated_quantity': int(quantity)
                })
    
    return allocations


def optimize_with_dummy_data() -> List[Dict]:
    """
    Run optimization with dummy data for testing.
    
    Returns:
        List of allocation dictionaries
    """
    # Dummy data
    products = [
        {'id': 1, 'name': 'Product A', 'price': 100.0},
        {'id': 2, 'name': 'Product B', 'price': 50.0}
    ]
    
    warehouses = [
        {'id': 1, 'name': 'Warehouse Central', 'capacity': 100, 'storage_cost': 10.0},
        {'id': 2, 'name': 'Warehouse North', 'capacity': 80, 'storage_cost': 8.0}
    ]
    
    demand_forecasts = {
        1: 60,  # Product 1 needs 60 units
        2: 40   # Product 2 needs 40 units
    }
    
    return solve_allocation_problem(products, warehouses, demand_forecasts)
