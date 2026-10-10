$ErrorActionPreference = 'Stop'
$repoRoot = Split-Path -Parent $PSScriptRoot
$webRoot = Join-Path $repoRoot 'herstyleai-client\apps\web'

$npm = Get-Command npm -ErrorAction SilentlyContinue
if (-not $npm) {
    throw 'npm was not found. Install Node.js 20+ and enable it in PATH.'
}

$frontendEnv = Join-Path $webRoot '.env.local'
if (-not (Test-Path $frontendEnv)) {
    # Copy-Item (Join-Path $webRoot '.env.example') $frontendEnv
    Write-Host 'Created apps/web/.env.local from .env.example.' -ForegroundColor Yellow
}

Set-Location $webRoot
if (-not (Test-Path (Join-Path $webRoot 'node_modules'))) {
    Write-Host 'Installing frontend dependencies ...' -ForegroundColor Cyan
    & $npm.Source install
    if ($LASTEXITCODE -ne 0) {
        throw 'npm install failed.'
    }
}

Write-Host 'Starting HerStyle AI web at http://localhost:3000 ...' -ForegroundColor Green
$lanAddresses = @(& node -e "const os=require('node:os'); for (const list of Object.values(os.networkInterfaces())) for (const item of list ?? []) if (item.family === 'IPv4' && !item.internal) console.log(item.address)")
foreach ($address in $lanAddresses) {
    Write-Host "Mobile (same Wi-Fi): http://${address}:3000" -ForegroundColor Cyan
}
& $npm.Source run dev -- --hostname 0.0.0.0
