import os
import sys
from pathlib import Path

os.environ.setdefault("POC_USE_SQLITE", "1")
os.environ["POC_SQLITE_PATH"] = str(
    Path(__file__).resolve().parents[1] / "poc03_test.db"
)

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
