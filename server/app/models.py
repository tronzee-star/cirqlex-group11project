from . import db, bcrypt
from datetime import datetime


class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(20), nullable=False, default='buyer')
    name = db.Column(db.String(100))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    products = db.relationship('Product', backref='owner', lazy=True)
    
    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'name': self.name,
            'role': self.role,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

    def is_admin(self) -> bool:
        return (self.role or '').lower() == 'admin'


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
            'image_url': self.image_url or "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
            'is_donation': self.is_donation,
            'owner_id': self.owner_id,
            'owner': self.owner.to_dict() if hasattr(self, "owner") and self.owner else None,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if hasattr(self, 'updated_at') and self.updated_at else None,
            'status': getattr(self, 'status', 'approved'),
            'verified': getattr(self, 'verified', True),
            'admin_notes': getattr(self, 'admin_notes', None),
            'co2_savings_per_purchase': round(self.co2_savings_per_purchase, 2),
        }

    @property
    def co2_savings_per_purchase(self) -> float:
        """Calculate CO2 savings for this product."""
        from .utils.sustainability import estimate_product_co2_per_purchase
        return estimate_product_co2_per_purchase(self)


class Order(db.Model):
    __tablename__ = 'orders'

    id = db.Column(db.Integer, primary_key=True)
    buyer_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
    price = db.Column(db.Float, nullable=False)
    purchased_at = db.Column(db.DateTime, default=datetime.utcnow)

    buyer = db.relationship('User', backref=db.backref('orders', lazy=True), foreign_keys=[buyer_id])
    product = db.relationship('Product', backref=db.backref('orders', lazy=True))

    def to_dict(self, include_product=False):
        data = {
            'id': self.id,
            'buyer_id': self.buyer_id,
            'product_id': self.product_id,
            'price': self.price,
            'purchased_at': self.purchased_at.isoformat() if self.purchased_at else None,
        }

        if include_product and self.product:
            owner_data = None
            if getattr(self.product, 'owner', None):
                owner = self.product.owner
                owner_data = {
                    'id': owner.id,
                    'name': owner.name,
                    'email': owner.email,
                }

            data['product'] = {
                'id': self.product.id,
                'title': self.product.title,
                'category': self.product.category,
                'price': self.product.price,
                'owner': owner_data,
                'image_url': self.product.image_url,
            }

        return data
class ChatMessage(db.Model):
    __tablename__ = 'chat_messages'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    role = db.Column(db.String(20), nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship('User', backref=db.backref('chat_messages', lazy=True))

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'role': self.role,
            'content': self.content,
            'created_at': self.created_at.isoformat() if self.created_at else None,
        }


# ---------------------------------------------------------------------------
# Sample data helpers (useful for manual testing or seeding utilities)
# ---------------------------------------------------------------------------

SAMPLE_USERS = [
    {
        "email": "bonfasogaro@gmail.com",
        "password": "password123",
        "name": "Bonfas",
        "role": "vendor",
    },
    {
        "email": "admin@gmail.com",
        "password": "password123",
        "name": "Circular Admin",
        "role": "admin",
    },
    {
        "email": "amina@cirqlex.com",
        "password": "password123",
        "name": "Amina Craft",
        "role": "vendor",
    },
    {
        "email": "daniel@cirqlex.com",
        "password": "password123",
        "name": "Daniel Maker",
        "role": "buyer",
    },
    {
        "email": "lucy@cirqlex.com",
        "password": "password123",
        "name": "Lucy Artisan",
        "role": "vendor",
    },
]


SAMPLE_PRODUCTS = [
    {
        "title": "Handcrafted Clay Mug",
        "description": "A kiln-fired clay mug with a reclaimed wood handle and matte glaze.",
        "price": 1800.0,
        "condition": "New",
        "category": "Home & Living",
        "location": "Nairobi",
        "is_donation": False,
        "owner_email": "bonfasogaro@gmail.com",
        "image_url": "https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&w=900&q=80",
    },
    {
        "title": "Reclaimed Teak Coffee Table",
        "description": "Mid-century inspired table handcrafted from reclaimed teak offcuts.",
        "price": 12500.0,
        "condition": "Used - Like New",
        "category": "Furniture",
        "location": "Nairobi",
        "is_donation": False,
        "owner_email": "bonfasogaro@gmail.com",
        "image_url": "https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=900&q=80",
    },
    {
        "title": "Zero-Waste Starter Kit",
        "description": "Bundle with bamboo cutlery, reusable produce bags, and beeswax wraps.",
        "price": 2800.0,
        "condition": "New",
        "category": "Lifestyle",
        "location": "Nakuru",
        "is_donation": False,
        "owner_email": "bonfasogaro@gmail.com",
        "image_url": "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=900&q=80",
    },
    {
        "title": "Organic Cotton Tee",
        "description": "GOTS-certified cotton crew neck in deep forest green.",
        "price": 2200.0,
        "condition": "Pre-loved",
        "category": "Clothing",
        "location": "Nairobi",
        "is_donation": False,
        "owner_email": "bonfasogaro@gmail.com",
        "image_url": "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
    },
    {
        "title": "Solar-Powered Lantern",
        "description": "Rechargeable lantern ideal for off-grid living and camping.",
        "price": 3200.0,
        "condition": "New",
        "category": "Electronics",
        "location": "Naivasha",
        "is_donation": False,
        "owner_email": "bonfasogaro@gmail.com",
        "image_url": "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80",
    },
    {
        "title": "Vintage Rattan Chair",
        "description": "Restored rattan lounge chair with new organic cotton cushions.",
        "price": 5400.0,
        "condition": "Used - Good",
        "category": "Furniture",
        "location": "Mombasa",
        "is_donation": False,
        "owner_email": "gloria@gmail.com",
        "image_url": "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=900&q=80",
    },
    {
        "title": "Recycled Glass Planter Set",
        "description": "Set of three planters blown from recycled glass bottles.",
        "price": 1900.0,
        "condition": "New",
        "category": "Home & Living",
        "location": "Kisumu",
        "is_donation": False,
        "owner_email": "gloria@gmail.com",
        "image_url": "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=80",
    },
    {
        "title": "Handwoven Sisal Basket",
        "description": "Vibrant handwoven basket perfect for storage or decor.",
        "price": 2100.0,
        "condition": "New",
        "category": "Home & Living",
        "location": "Nairobi",
        "is_donation": False,
        "owner_email": "lucy@cirqlex.com",
        "image_url": "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=900&q=80",
    },
    {
        "title": "Upcycled Denim Sneakers",
        "description": "Casual sneakers crafted from reclaimed denim with natural rubber soles.",
        "price": 2600.0,
        "condition": "Pre-loved",
        "category": "Footwear",
        "location": "Eldoret",
        "is_donation": False,
        "owner_email": "gloria@gmail.com",
        "image_url": "https://images.unsplash.com/photo-1523381294911-8d3cead13475?auto=format&fit=crop&w=900&q=80",
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


SAMPLE_ORDERS = [
    {
        "buyer_email": "bonfasogaro@gmail.com",
        "product_title": "Vintage Rattan Chair",
        "price": 5400.0,
        "purchased_at": "2024-07-20",
    },
    {
        "buyer_email": "bonfasogaro@gmail.com",
        "product_title": "Recycled Glass Planter Set",
        "price": 1900.0,
        "purchased_at": "2024-07-15",
    },
    {
        "buyer_email": "bonfasogaro@gmail.com",
        "product_title": "Handwoven Sisal Basket",
        "price": 2100.0,
        "purchased_at": "2024-07-10",
    },
    {
        "buyer_email": "gloria@gmail.com",
        "product_title": "Handcrafted Clay Mug",
        "price": 1800.0,
        "purchased_at": "2024-07-08",
    },
    {
        "buyer_email": "gloria@gmail.com",
        "product_title": "Zero-Waste Starter Kit",
        "price": 2800.0,
        "purchased_at": "2024-07-05",
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
            role=sample.get("role", "buyer"),
        )
        db.session.add(user)
        email_to_user[user.email] = user

    db.session.flush()

    title_to_product = {}
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
        db.session.flush()
        title_to_product[product.title] = product

    for sample in SAMPLE_ORDERS:
        buyer = email_to_user.get(sample["buyer_email"])
        product = title_to_product.get(sample["product_title"])
        if not buyer or not product:
            continue

        purchased_at = sample.get("purchased_at")
        if isinstance(purchased_at, str):
            purchased_at = datetime.fromisoformat(purchased_at)

        order = Order(
            buyer_id=buyer.id,
            product_id=product.id,
            price=sample.get("price", product.price),
            purchased_at=purchased_at,
        )
        db.session.add(order)

    db.session.commit()
