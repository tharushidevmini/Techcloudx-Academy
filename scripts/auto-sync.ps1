<#
.SYNOPSIS
    TechCloudX Academy - Automated Git Sync Script (PowerShell)
.DESCRIPTION
    Automates staging, committing, and pushing code updates to GitHub origin/main.
.PARAMETER Message
    Commit message to accompany git commit. Defaults to "chore: automated sync update".
.EXAMPLE
    .\scripts\auto-sync.ps1 "feat: add user authentication API"
#>

[CmdletBinding()]
param (
    [Parameter(Position = 0, Mandatory = $false)]
    [string]$Message = "chore: automated sync update"
)

# Set UTF-8 output encoding
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

Write-Host "`n========================================================" -ForegroundColor Cyan
Write-Host "   TechCloudX Academy - Automated Git Sync (PowerShell)  " -ForegroundColor Cyan
Write-Host "========================================================`n" -ForegroundColor Cyan

# Locate repository root
$repoRoot = git rev-parse --show-toplevel 2>$null
if (-not $repoRoot) {
    Write-Host "[ERROR] Current directory is not inside a valid Git repository." -ForegroundColor Red
    exit 1
}

Set-Location $repoRoot

# Step 1: Stage all changes
Write-Host "[1/3] Staging all working directory changes..." -ForegroundColor Yellow
git add .
if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] Failed to stage changes with 'git add .'." -ForegroundColor Red
    exit $LASTEXITCODE
}

# Step 2: Check for uncommitted staged changes
$changes = git status --porcelain
if (-not $changes) {
    Write-Host "[INFO] Working tree is clean. No staged changes to commit." -ForegroundColor Green
    exit 0
}

Write-Host "`n[Staged Changes Summary]" -ForegroundColor DarkGray
git status --short

# Step 3: Commit changes
Write-Host "`n[2/3] Committing changes with message: '$Message'..." -ForegroundColor Yellow
git commit -m "$Message"
if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] Git commit failed." -ForegroundColor Red
    exit $LASTEXITCODE
}

# Step 4: Push to origin main
Write-Host "`n[3/3] Pushing commits to origin/main..." -ForegroundColor Yellow
git push origin main
if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] Git push failed. Verify remote permissions and network connection." -ForegroundColor Red
    exit $LASTEXITCODE
}

Write-Host "`n========================================================" -ForegroundColor Green
Write-Host " [SUCCESS] TechCloudX Academy changes synced to origin/main!" -ForegroundColor Green
Write-Host "========================================================`n" -ForegroundColor Green
