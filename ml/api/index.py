import sys
import os

# Add the ml directory (parent of api) to Python path
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from app import app
