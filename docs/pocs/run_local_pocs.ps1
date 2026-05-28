# Ejecuta POC-01 y POC-02 en modo local (sin Docker)
$ErrorActionPreference = "Stop"
$root = $PSScriptRoot

function Setup-Venv($pocSrc) {
    Push-Location $pocSrc
    if (-not (Test-Path ".venv")) {
        python -m venv .venv
    }
    & .\.venv\Scripts\pip install -q -r requirements.txt
    Pop-Location
}

$env:POC_USE_SQLITE = "1"
$env:POC_LOCAL_STORAGE = Join-Path $root ".local-storage"

Write-Host "=== POC-01 ===" -ForegroundColor Cyan
Setup-Venv (Join-Path $root "POC-01-evidencias-upload\src")
$poc1 = Join-Path $root "POC-01-evidencias-upload\src"
$job1 = Start-Job -ScriptBlock {
    param($dir)
    Set-Location $dir
    $env:POC_USE_SQLITE = "1"
    $env:POC_LOCAL_STORAGE = Join-Path (Split-Path $dir -Parent) "..\..\.local-storage"
    & .\.venv\Scripts\python -m uvicorn api.main:app --port 8001
} -ArgumentList $poc1
Start-Sleep -Seconds 4
Set-Location $poc1
& .\.venv\Scripts\python scripts\run_poc01.py
$poc1Exit = $LASTEXITCODE
Stop-Job $job1 -ErrorAction SilentlyContinue
Remove-Job $job1 -Force -ErrorAction SilentlyContinue

Write-Host "=== POC-02 ===" -ForegroundColor Cyan
Setup-Venv (Join-Path $root "POC-02-workflow-dictamen\src")
$poc2 = Join-Path $root "POC-02-workflow-dictamen\src"
Set-Location $poc2
& .\.venv\Scripts\python scripts\run_poc02.py
$poc2Exit = $LASTEXITCODE

Write-Host "=== POC-03 ===" -ForegroundColor Cyan
Setup-Venv (Join-Path $root "POC-03-notification-outbox\src")
$poc3 = Join-Path $root "POC-03-notification-outbox\src"
Set-Location $poc3
& .\.venv\Scripts\python scripts\run_poc03.py
$poc3Exit = $LASTEXITCODE

Write-Host "=== POC-04 ===" -ForegroundColor Cyan
Setup-Venv (Join-Path $root "POC-04-audit-log-query\src")
$poc4 = Join-Path $root "POC-04-audit-log-query\src"
Set-Location $poc4
& .\.venv\Scripts\python scripts\run_poc04.py
$poc4Exit = $LASTEXITCODE

if ($poc1Exit -ne 0 -or $poc2Exit -ne 0 -or $poc3Exit -ne 0 -or $poc4Exit -ne 0) { exit 1 }
Write-Host "POCs completadas." -ForegroundColor Green
