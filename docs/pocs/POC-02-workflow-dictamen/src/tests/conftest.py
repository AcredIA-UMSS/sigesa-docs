import os
import sys
from pathlib import Path

os.environ.setdefault("POC_USE_SQLITE", "1")

# Permite importar api.* desde src/
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
