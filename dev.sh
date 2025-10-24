#!/bin/bash

# Start development servers for reactango

echo "Starting Reactango development environment..."
echo "=============================================="

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "Error: Python 3 is not installed"
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed"
    exit 1
fi

# Start Django backend
echo "Starting Django backend on port 8000..."
cd backend
if [ ! -d "venv" ]; then
    echo "Creating Python virtual environment..."
    python3 -m venv venv
fi
source venv/bin/activate
pip install -r requirements.txt > /dev/null 2>&1
python manage.py migrate
python manage.py runserver &
BACKEND_PID=$!
cd ..

# Start React frontend
echo "Starting React frontend on port 5173..."
cd frontend
npm install > /dev/null 2>&1
npm run dev &
FRONTEND_PID=$!
cd ..

echo ""
echo "=============================================="
echo "Reactango is running!"
echo "Backend:  http://localhost:8000"
echo "Frontend: http://localhost:5173"
echo "API:      http://localhost:8000/api/"
echo "=============================================="
echo "Press Ctrl+C to stop all servers"

# Wait for user interrupt
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait
