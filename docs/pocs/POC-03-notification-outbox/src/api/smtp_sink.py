"""Sink SMTP simulado en memoria — deduplicación por idempotency_key."""
from __future__ import annotations

from threading import Lock

_lock = Lock()
_delivered_keys: set[str] = set()
_deliveries: list[dict[str, str]] = []


def reset_sink() -> None:
    with _lock:
        _delivered_keys.clear()
        _deliveries.clear()


def deliver(*, idempotency_key: str, recipient: str, event_type: str) -> bool:
    """Devuelve True si entregó; False si ya existía la key (duplicado)."""
    with _lock:
        if idempotency_key in _delivered_keys:
            return False
        _delivered_keys.add(idempotency_key)
        _deliveries.append(
            {
                "idempotency_key": idempotency_key,
                "recipient": recipient,
                "event_type": event_type,
            }
        )
        return True


def delivery_count() -> int:
    with _lock:
        return len(_deliveries)


def duplicate_attempts() -> int:
    """Aproximación: entregas totales - keys únicas (debe ser 0 en éxito)."""
    with _lock:
        return max(0, len(_deliveries) - len(_delivered_keys))
