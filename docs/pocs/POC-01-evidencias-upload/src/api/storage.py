"""Adaptador almacenamiento objeto — MinIO/S3 o disco local (POC sin Docker)."""
from __future__ import annotations

import os
from pathlib import Path

import boto3
from botocore.client import Config

S3_ENDPOINT = os.getenv("S3_ENDPOINT", "http://localhost:9000")
S3_ACCESS_KEY = os.getenv("S3_ACCESS_KEY", "minioadmin")
S3_SECRET_KEY = os.getenv("S3_SECRET_KEY", "minioadmin")
S3_BUCKET = os.getenv("S3_BUCKET", "test-sigesa-evidencias")
LOCAL_ROOT = Path(os.getenv("POC_LOCAL_STORAGE", ""))


def use_local() -> bool:
    return bool(os.getenv("POC_LOCAL_STORAGE"))


def put_object(key: str, body: bytes, content_type: str) -> None:
    if use_local():
        path = LOCAL_ROOT / S3_BUCKET / key
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_bytes(body)
        return
    client = boto3.client(
        "s3",
        endpoint_url=S3_ENDPOINT,
        aws_access_key_id=S3_ACCESS_KEY,
        aws_secret_access_key=S3_SECRET_KEY,
        config=Config(signature_version="s3v4"),
        region_name="us-east-1",
    )
    client.put_object(Bucket=S3_BUCKET, Key=key, Body=body, ContentType=content_type)


def delete_object(key: str) -> None:
    if use_local():
        path = LOCAL_ROOT / S3_BUCKET / key
        if path.exists():
            path.unlink()
        return
    boto3.client(
        "s3",
        endpoint_url=S3_ENDPOINT,
        aws_access_key_id=S3_ACCESS_KEY,
        aws_secret_access_key=S3_SECRET_KEY,
        config=Config(signature_version="s3v4"),
        region_name="us-east-1",
    ).delete_object(Bucket=S3_BUCKET, Key=key)


def read_object_hash_path(key: str) -> Path | None:
    if use_local():
        p = LOCAL_ROOT / S3_BUCKET / key
        return p if p.exists() else None
    return None


def ensure_bucket() -> None:
    if use_local():
        (LOCAL_ROOT / S3_BUCKET).mkdir(parents=True, exist_ok=True)
        return
    client = boto3.client(
        "s3",
        endpoint_url=S3_ENDPOINT,
        aws_access_key_id=S3_ACCESS_KEY,
        aws_secret_access_key=S3_SECRET_KEY,
        config=Config(signature_version="s3v4"),
        region_name="us-east-1",
    )
    try:
        client.head_bucket(Bucket=S3_BUCKET)
    except Exception:
        client.create_bucket(Bucket=S3_BUCKET)
