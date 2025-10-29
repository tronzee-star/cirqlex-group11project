from app import create_app, db

app = create_app()

if __name__ == '__main__':
    # Create tables if they don't exist
    with app.app_context():
        db.create_all()
        print("✅ Database tables ready")
    
    app.run(debug=True, host='0.0.0.0', port=5000, use_reloader=False)
