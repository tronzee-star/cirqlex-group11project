from . import db, bcrypt
from datetime import datetime


class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    name = db.Column(db.String(100))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    products = db.relationship('Product', backref='owner', lazy=True)
    
    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'name': self.name,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }


class Product(db.Model):
    __tablename__ = 'products'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    price = db.Column(db.Float, default=0.0)
    condition = db.Column(db.String(50))
    category = db.Column(db.String(100))
    location = db.Column(db.String(100))
    image_url = db.Column(db.String(500))
    is_donation = db.Column(db.Boolean, default=False)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'price': self.price,
            'condition': self.condition,
            'category': self.category,
            'location': self.location,
            'image_url': self.image_url,
            'is_donation': self.is_donation,
            'owner_id': self.owner_id,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }


# ---------------------------------------------------------------------------
# Sample data helpers (useful for manual testing or seeding utilities)
# ---------------------------------------------------------------------------

SAMPLE_USERS = [
    {
        "email": "bonfasogaro@gmail.com",
        "password": "password123",
        "name": "Bonfas",
    },
    {
        "email": "gloria@gmail.com",
        "password": "password123",
        "name": "Gloria",
    },
    {
        "email": "amina@cirqlex.com",
        "password": "password123",
        "name": "Amina Craft",
    },
    {
        "email": "daniel@cirqlex.com",
        "password": "password123",
        "name": "Daniel Maker",
    },
    {
        "email": "lucy@cirqlex.com",
        "password": "password123",
        "name": "Lucy Artisan",
    },
]


SAMPLE_PRODUCTS = [
    {
        "title": "Organic Cotton T-Shirt",
        "description": "Pre-loved organic cotton t-shirt in excellent condition. Size M.",
        "price": 2000.0,
        "condition": "Used - Like New",
        "category": "Clothing",
        "location": "Nairobi",
        "is_donation": False,
        "owner_email": "alice@example.com",
        "image_url": "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80",
    },
    {
        "title": "Bamboo Toothbrush Set",
        "description": "Eco-friendly bamboo toothbrushes, pack of 4. Never opened.",
        "price": 200.0,
        "condition": "New",
        "category": "Home & Living",
        "location": "Mombasa",
        "is_donation": False,
        "owner_email": "alice@example.com",
        "image_url": "https://images.unsplash.com/photo-1601000938259-9ad9eedfcc60?auto=format&fit=crop&w=900&q=80",
    },
    {
        "title": "Reusable Coffee Cup",
        "description": "Insulated stainless steel coffee cup with lid. Perfect for on-the-go.",
        "price": 1000.0,
        "condition": "Used - Good",
        "category": "Accessories",
        "location": "Nairobi",
        "is_donation": False,
        "owner_email": "bob@example.com",
        "image_url": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80",
    },
    {
        "title": "Recycled Polyester Jacket",
        "description": "Warm winter jacket made from recycled materials. Size L.",
        "price": 2500.0,
        "condition": "Used - Like New",
        "category": "Clothing",
        "location": "Kisumu",
        "is_donation": False,
        "owner_email": "bob@example.com",
        "image_url": "https://images.unsplash.com/photo-1525171254930-643fc658b64e?auto=format&fit=crop&w=900&q=80",
    },
    {
        "title": "Handwoven Sisal Basket",
        "description": "Vibrant handwoven basket perfect for storage or decor.",
        "price": 1800.0,
        "condition": "New",
        "category": "Home & Living",
        "location": "Nairobi",
        "is_donation": False,
        "owner_email": "amina@cirqlex.com",
        "image_url": "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=900&q=80",
    },
    {
        "title": "Solar-Powered Lantern",
        "description": "Rechargeable lantern ideal for off-grid living and camping.",
        "price": 3200.0,
        "condition": "New",
        "category": "Electronics",
        "location": "Naivasha",
        "is_donation": False,
        "owner_email": "daniel@cirqlex.com",
        "image_url": "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=900&q=80",
    },
    {
        "title": "Upcycled Denim Backpack",
        "description": "Stylish backpack made from reclaimed denim and leather accents.",
        "price": 2600.0,
        "condition": "Pre-loved",
        "category": "Accessories",
        "location": "Eldoret",
        "is_donation": False,
        "owner_email": "lucy@cirqlex.com",
        "image_url": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
    },
    {
        "title": "Organic Soap Collection",
        "description": "Set of six handmade soaps infused with essential oils.",
        "price": 900.0,
        "condition": "New",
        "category": "Beauty",
        "location": "Mombasa",
        "is_donation": False,
        "owner_email": "gloria@gmail.com",
        "image_url": "https://images.unsplash.com/photo-1512499617640-c2f999098c01?auto=format&fit=crop&w=900&q=80",
    },
    {
        "title": "Community Library Starter Pack",
        "description": "Bundle of pre-loved books donated to kickstart a neighborhood library.",
        "price": 0.0,
        "condition": "Used",
        "category": "Education",
        "location": "Kisii",
        "is_donation": True,
        "owner_email": "bonfasogaro@gmail.com",
        "image_url": "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80",
    },
]


def ensure_sample_data():
    """Create sample users/products if database is empty."""
    if User.query.first():
        return

    email_to_user = {}
    for sample in SAMPLE_USERS:
        user = User(
            email=sample["email"],
            name=sample.get("name"),
            password_hash=bcrypt.generate_password_hash(sample["password"]).decode("utf-8"),
        )
        db.session.add(user)
        email_to_user[user.email] = user

    db.session.flush()

    for sample in SAMPLE_PRODUCTS:
        owner = email_to_user.get(sample["owner_email"])
        if not owner:
            continue
        product = Product(
            title=sample["title"],
            description=sample.get("description"),
            price=sample.get("price", 0.0),
            condition=sample.get("condition"),
            category=sample.get("category"),
            location=sample.get("location"),
            image_url=sample.get("image_url"),
            is_donation=sample.get("is_donation", False),
            owner_id=owner.id,
        )
        db.session.add(product)

    db.session.commit()
