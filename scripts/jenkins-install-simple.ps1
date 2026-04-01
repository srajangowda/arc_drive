# Simple Jenkins Installation Script for Windows PowerShell
# Run as Administrator

Clear-Host
Write-Host "========================================" -ForegroundColor Green
Write-Host "Jenkins Installation - ARC Drive" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

# Check Admin
$isAdmin = [bool]([Security.Principal.WindowsIdentity]::GetCurrent().Groups -Match 'S-1-5-32-544')
if (-not $isAdmin) {
    Write-Host "[X] ERROR: Must run as Administrator!" -ForegroundColor Red
    Write-Host "[i] Right-click PowerShell and select 'Run as Administrator'" -ForegroundColor Yellow
    pause
    exit 1
}

# Step 1: Check Java
Write-Host "[Step 1] Checking Java..." -ForegroundColor Cyan
$java = java -version 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "[OK] Java is installed" -ForegroundColor Green
    Write-Host $java -ForegroundColor Gray
} else {
    Write-Host "[!] Java not found. Installing OpenJDK 17..." -ForegroundColor Yellow
    choco install openjdk17 -y
    Write-Host "[OK] Java installed" -ForegroundColor Green
}
Write-Host ""

# Step 2: Check Chocolatey
Write-Host "[Step 2] Checking Chocolatey..." -ForegroundColor Cyan
$choco = Get-Command choco -ErrorAction SilentlyContinue
if ($choco) {
    Write-Host "[OK] Chocolatey is installed" -ForegroundColor Green
} else {
    Write-Host "[!] Installing Chocolatey..." -ForegroundColor Yellow
    [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
    iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
    Write-Host "[OK] Chocolatey installed" -ForegroundColor Green
}
Write-Host ""

# Step 3: Install Jenkins
Write-Host "[Step 3] Installing Jenkins..." -ForegroundColor Cyan
Write-Host "[!] This may take 5-10 minutes. Please wait..." -ForegroundColor Yellow
choco install jenkins -y
Write-Host "[OK] Jenkins installed" -ForegroundColor Green
Write-Host ""

# Step 4: Start Jenkins Service
Write-Host "[Step 4] Starting Jenkins Service..." -ForegroundColor Cyan
Start-Service Jenkins
Write-Host "[OK] Jenkins service started" -ForegroundColor Green
Write-Host ""

# Step 5: Wait for Jenkins to initialize
Write-Host "[Step 5] Waiting for Jenkins initialization..." -ForegroundColor Cyan
$timeout = 0
$maxTimeout = 60
while ($timeout -lt $maxTimeout) {
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:8080" -ErrorAction SilentlyContinue
        if ($response.StatusCode -eq 200) {
            Write-Host "[OK] Jenkins is ready at http://localhost:8080" -ForegroundColor Green
            break
        }
    } catch {
        Write-Host "." -NoNewline -ForegroundColor Gray
        Start-Sleep -Seconds 1
        $timeout++
    }
}
Write-Host ""
Write-Host ""

# Step 6: Get Initial Admin Password
Write-Host "[Step 6] Retrieving Initial Admin Password..." -ForegroundColor Cyan
$jenkinsHome = "C:\ProgramData\Jenkins\.jenkins"
$secretsFile = "$jenkinsHome\secrets\initialAdminPassword"

$timeout = 0
while ($timeout -lt 30 -and -not (Test-Path $secretsFile)) {
    Write-Host "." -NoNewline -ForegroundColor Gray
    Start-Sleep -Seconds 1
    $timeout++
}
Write-Host ""

if (Test-Path $secretsFile) {
    $adminPassword = Get-Content $secretsFile
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "JENKINS INITIAL ADMIN PASSWORD" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host $adminPassword -ForegroundColor Yellow
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
} else {
    Write-Host "[!] Could not find password file. Checking Jenkins logs..." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "NEXT STEPS:" -ForegroundColor Cyan
Write-Host "1. Open browser: http://localhost:8080" -ForegroundColor Gray
Write-Host "2. Paste the admin password shown above" -ForegroundColor Gray
Write-Host "3. Click Continue" -ForegroundColor Gray
Write-Host "4. Click 'Install suggested plugins'" -ForegroundColor Gray
Write-Host "5. Create First Admin User" -ForegroundColor Gray
Write-Host "6. Configure Jenkins URL and Save" -ForegroundColor Gray
Write-Host ""
Write-Host "DETAILED GUIDE:" -ForegroundColor Cyan
Write-Host "► See JENKINS_DETAILED_SETUP.md for complete step-by-step instructions" -ForegroundColor White
Write-Host ""
Write-Host "SERVICE COMMANDS:" -ForegroundColor Cyan
Write-Host "  Restart:   Restart-Service Jenkins" -ForegroundColor Gray
Write-Host "  Stop:      Stop-Service Jenkins" -ForegroundColor Gray
Write-Host "  Start:     Start-Service Jenkins" -ForegroundColor Gray
Write-Host ""

pause
