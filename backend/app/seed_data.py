"""
Database seeding script to populate initial dummy data
"""
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.product import Product
from app.models.warehouse import Warehouse


def seed_database():
    """Seed the database with initial dummy data"""
    db = SessionLocal()
    
    try:
        # Check if data already exists
        existing_products = db.query(Product).count()
        existing_warehouses = db.query(Warehouse).count()
        
        if existing_products >= 10 and existing_warehouses >= 5:
            print(f"Database already has sufficient data: {existing_products} products, {existing_warehouses} warehouses")
            return
        
        print("Seeding database with dummy data...")
        
        # Clear existing data if any
        if existing_products > 0:
            db.query(Product).delete()
        if existing_warehouses > 0:
            db.query(Warehouse).delete()
        db.commit()
        
        # Create dummy products
        products = [
            Product(name="Laptop Computer", price=999.99),
            Product(name="Wireless Mouse", price=29.99),
            Product(name="Mechanical Keyboard", price=89.99),
            Product(name="USB-C Monitor", price=349.99),
            Product(name="Desk Chair", price=199.99),
            Product(name="Standing Desk", price=499.99),
            Product(name="Webcam HD", price=79.99),
            Product(name="Headphones", price=149.99),
            Product(name="Phone Charger", price=24.99),
            Product(name="External SSD 1TB", price=119.99),
            Product(name="Docking Station", price=159.99),
            Product(name="Cable Management Kit", price=19.99),
            Product(name="LED Desk Lamp", price=45.99),
            Product(name="Portable Speaker", price=69.99),
            Product(name="Wireless Earbuds", price=129.99),
        ]
        
        for product in products:
            db.add(product)
        
        # Create dummy warehouses
        warehouses = [
            Warehouse(name="Central Warehouse", capacity=10000, storage_cost=50.0),
            Warehouse(name="North Distribution Center", capacity=7500, storage_cost=45.0),
            Warehouse(name="South Hub", capacity=5000, storage_cost=35.0),
            Warehouse(name="East Regional Warehouse", capacity=8000, storage_cost=42.0),
            Warehouse(name="West Coast Facility", capacity=6000, storage_cost=38.0),
        ]
        
        for warehouse in warehouses:
            db.add(warehouse)
        
        db.commit()
        
        print(f"✓ Successfully seeded {len(products)} products and {len(warehouses)} warehouses")
        
    except Exception as e:
        print(f"Error seeding database: {str(e)}")
        db.rollback()
    finally:
        db.close()


def force_reseed():
    """Force reseed the database - clear all data and add fresh dummy data"""
    db = SessionLocal()
    
    try:
        print("Force reseeding database...")
        
        # Clear all existing data
        db.query(Product).delete()
        db.query(Warehouse).delete()
        db.commit()
        print("✓ Cleared existing data")
        
        # Create dummy products
        products = [
            Product(name="Laptop Computer", price=999.99),
            Product(name="Wireless Mouse", price=29.99),
            Product(name="Mechanical Keyboard", price=89.99),
            Product(name="USB-C Monitor", price=349.99),
            Product(name="Desk Chair", price=199.99),
            Product(name="Standing Desk", price=499.99),
            Product(name="Webcam HD", price=79.99),
            Product(name="Headphones", price=149.99),
            Product(name="Phone Charger", price=24.99),
            Product(name="External SSD 1TB", price=119.99),
            Product(name="Docking Station", price=159.99),
            Product(name="Cable Management Kit", price=19.99),
            Product(name="LED Desk Lamp", price=45.99),
            Product(name="Portable Speaker", price=69.99),
            Product(name="Wireless Earbuds", price=129.99),
        ]
        
        for product in products:
            db.add(product)
        
        # Create dummy warehouses
        warehouses = [
            Warehouse(name="Central Warehouse", capacity=10000, storage_cost=50.0),
            Warehouse(name="North Distribution Center", capacity=7500, storage_cost=45.0),
            Warehouse(name="South Hub", capacity=5000, storage_cost=35.0),
            Warehouse(name="East Regional Warehouse", capacity=8000, storage_cost=42.0),
            Warehouse(name="West Coast Facility", capacity=6000, storage_cost=38.0),
        ]
        
        for warehouse in warehouses:
            db.add(warehouse)
        
        db.commit()
        
        print(f"✓ Successfully reseeded {len(products)} products and {len(warehouses)} warehouses")
        
    except Exception as e:
        print(f"Error reseeding database: {str(e)}")
        db.rollback()
    finally:
        db.close()


if __name__ == "__main__":
    import sys
    if len(sys.argv) > 1 and sys.argv[1] == "--force":
        force_reseed()
    else:
        seed_database()
