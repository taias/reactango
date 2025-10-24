#!/bin/bash

# Database migration helper script for reactango

cd backend

echo "Reactango - Database Migration Helper"
echo "======================================"

# Check if venv exists
if [ ! -d "venv" ]; then
    echo "Creating Python virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
source venv/bin/activate

# Install requirements
pip install -r requirements.txt > /dev/null 2>&1

# Run migrations
echo "Running database migrations..."
python manage.py makemigrations
python manage.py migrate

echo "======================================"
echo "Migration complete!"

# Optionally create superuser
read -p "Would you like to create a superuser? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    python manage.py createsuperuser
fi

deactivate
cd ..
