"""
WSGI entry point.

Run app.py instead for dev; this for production deployment.
"""

from cloudy_logic import app

if __name__ == "__main__":
    app.run()
