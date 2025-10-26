#!/usr/bin/env python
"""Seed database with sample data for CircularShop."""
from app import create_app, db, bcrypt
from app.models import User, Product

app = create_app()

with app.app_context():
    # Create tables
    db.create_all()
    print("✅ Database tables created.")

    # Check if data exists
    if User.query.first():
        print("⚠️  Database already has users. Skipping seed.")
    else:
        # Create sample users
        users = [
            User(
                email="alice@example.com",
                password_hash=bcrypt.generate_password_hash("password123").decode('utf-8'),
                name="Alice Green"
            ),
            User(
                email="bob@example.com",
                password_hash=bcrypt.generate_password_hash("password123").decode('utf-8'),
                name="Bob Eco"
            ),
        ]
        db.session.add_all(users)
        db.session.commit()
        print(f"✅ Created {len(users)} sample users.")

        # Create sample products
        products = [
            Product(
                title="Organic Cotton T-Shirt",
                description="Pre-loved organic cotton t-shirt in excellent condition. Size M.",
                price=2000.0,
                condition="Used - Like New",
                category="Clothing",
                location="Nairobi",
                is_donation=False,
                owner_id=users[0].id,
            ),
            Product(
                title="Bamboo Toothbrush Set",
                description="Eco-friendly bamboo toothbrushes, pack of 4. Never opened.",
                price=200.0,
                condition="New",
                category="Home & Living",
                location="Mombasa",
                is_donation=False,
                owner_id=users[0].id,
            ),
            Product(
                title="Reusable Coffee Cup",
                description="Insulated stainless steel coffee cup with lid. Perfect for on-the-go.",
                price=1000.0,
                condition="Used - Good",
                category="Accessories",
                location="Nairobi",
                is_donation=False,
                owner_id=users[1].id,
            ),
            Product(
                title="Recycled Polyester Jacket",
                description="Warm winter jacket made from recycled materials. Size L.",
                price=2500.0,
                condition="Used - Like New",
                category="Clothing",
                location="Kisumu",
                is_donation=False,
                owner_id=users[1].id,
            ),
            Product(
                title="Eco-Friendly Candles",
                description="Soy wax candles with natural essential oils. Set of 3.",
                price=700.0,
                condition="New",
                category="Home & Living",
                location="Nairobi",
                is_donation=False,
                owner_id=users[0].id,
            ),
            Product(
                title="Upcycled Furniture - Coffee Table",
                description="Beautiful coffee table made from reclaimed wood. Handcrafted.",
                price=5000.0,
                condition="Used - Good",
                category="Furniture",
                location="Nairobi",
                is_donation=False,
                owner_id=users[1].id,
            ),
            Product(
                title="Vintage Leather Bag",
                description="Classic leather messenger bag. Well-maintained, minor wear.",
                price=1500.0,
                condition="Used - Good",
                category="Accessories",
                location="Mombasa",
                is_donation=False,
                owner_id=users[0].id,
            ),
            Product(
                title="Plant-Based Cleaning Kit",
                description="Complete set of plant-based, biodegradable cleaning products.",
                price=800.0,
                condition="New",
                category="Home & Living",
                location="Kisumu",
                is_donation=True,
                owner_id=users[1].id,
            ),
        ]
        db.session.add_all(products)
        db.session.commit()
        print(f"✅ Created {len(products)} sample products.")

    print("\n🎉 Seeding complete!")
    print("\nTest credentials:")
    print("  Email: alice@example.com")
    print("  Password: password123")
    print("  ---")
    print("  Email: bob@example.com")
    print("  Password: password123")
    