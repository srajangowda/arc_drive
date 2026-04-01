# 🚀 JENKINS INSTALLATION - MANUAL SETUP GUIDE

## ⚠️ IMPORTANT: Must Run as Administrator

The Jenkins installation script requires **Administrator privileges** to install services and software.

---

## 📍 HOW TO RUN THE INSTALLER

### Step 1: Open PowerShell as Administrator

**Method 1: Right-click PowerShell**
1. Press `Win + X`
2. Select **"Windows PowerShell (Admin)"** or **"Terminal (Admin)"**
3. Click **"Yes"** if prompted by User Account Control

**Method 2: Search for PowerShell**
1. Press `Win + S`
2. Type: `powershell`
3. Right-click `Windows PowerShell`
4. Select **"Run as Administrator"**
5. Click **"Yes"**

### Step 2: Navigate to Your Project

```powershell
cd "C:\Users\SAMRUDH NAIK\Videos\arc drive devops\ARC-Drive"
```

### Step 3: Allow Script Execution

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser -Force
```

### Step 4: Run the Jenkins Installer

**Use the simplified installer (recommended):**

```powershell
.\scripts\jenkins-install-simple.ps1
```

**Or the detailed installer (with more options):**

```powershell
.\scripts\Install-Jenkins.ps1
```

---

## 📋 WHAT THE INSTALLER DOES

The script will automatically:

✅ Check if Java is installed (OpenJDK 17)  
✅ Install Java if needed  
✅ Check if Chocolatey is installed  
✅ Install Chocolatey if needed  
✅ Download and install Jenkins  
✅ Start the Jenkins service  
✅ Wait for Jenkins to initialize  
✅ Retrieve and display the admin password  

**Estimated time:** 10-15 minutes

---

## ⏱️ EXPECTED INSTALLER OUTPUT

When you run the script, you should see:

```
========================================
Jenkins Installation - ARC Drive
========================================

[Step 1] Checking Java...
[OK] Java is installed
openjdk version "17.0.15" 2025-04-15

[Step 2] Checking Chocolatey...
[OK] Chocolatey is installed

[Step 3] Installing Jenkins...
[!] This may take 5-10 minutes. Please wait...
[OK] Jenkins installed

[Step 4] Starting Jenkins Service...
[OK] Jenkins service started

[Step 5] Waiting for Jenkins initialization...
[OK] Jenkins is ready at http://localhost:8080

[Step 6] Retrieving Initial Admin Password...
========================================
JENKINS INITIAL ADMIN PASSWORD
========================================
a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
========================================

NEXT STEPS:
1. Open browser: http://localhost:8080
2. Paste the admin password shown above
3. Click Continue
4. Click 'Install suggested plugins'
5. Create First Admin User
6. Configure Jenkins URL and Save
```

⚠️ **Copy and save the admin password!** You'll need it in the next step.

---

## 🌐 AFTER INSTALLATION: COMPLETE SETUP IN BROWSER

Once the installer finishes, open your browser:

```
http://localhost:8080
```

### 1️⃣ UNLOCK JENKINS
- **You'll see:** "Unlock Jenkins" page
- **Do this:** Paste the admin password from the installer
- **Click:** "Continue"

### 2️⃣ PLUGIN INSTALLATION
- **You'll see:** "Customize Jenkins" page
- **Click:** "Install suggested plugins"
- **Wait:** 5-10 minutes for plugins to install
- Jenkins will restart automatically

### 3️⃣ CREATE FIRST ADMIN USER
- **You'll see:** "Create First Admin User" form
- **Fill in:**
  ```
  Username:        admin
  Password:        YourSecurePassword123!
  Confirm:         YourSecurePassword123!
  Full name:       Jenkins Administrator
  Email address:   your.email@example.com
  ```
- **Click:** "Save and Create First Admin User"

### 4️⃣ INSTANCE CONFIGURATION
- **You'll see:** "Instance Configuration"
- **Jenkins URL should be:**
  ```
  http://localhost:8080/
  ```
- **Click:** "Save and Finish"

### 5️⃣ SUCCESS! 🎉
- You should see the Jenkins dashboard
- **If empty:** That's normal - no jobs created yet

---

## 📖 NEXT STEPS: CONFIGURE PIPELINE

After Jenkins is installed, open **JENKINS_DETAILED_SETUP.md** and follow:

- **Step 3:** Install Required Plugins
- **Step 4:** Configure Global Tools (NodeJS)
- **Step 5:** Create GitHub Personal Access Token
- **Step 6:** Add GitHub Credentials to Jenkins
- **Step 7:** Create Pipeline Job
- **Step 8:** Configure GitHub Webhook
- **Step 9:** Run First Build
- **Step 10:** Verify Deployment

---

## 🔧 TROUBLESHOOTING INSTALLATION

### Issue: "Must run as Administrator"

**Solution:**
- Close PowerShell
- Open PowerShell as Administrator (see "How to Run" section above)
- Run the script again

### Issue: "Jenkins is already installed"

**Solution 1: Use existing installation**
```powershell
Start-Service Jenkins
```
Then open: http://localhost:8080

**Solution 2: Reinstall Jenkins**
```powershell
choco uninstall jenkins -y
# Wait 10 seconds
.\scripts\jenkins-install-simple.ps1
```

### Issue: "Chocolatey command not found"

**Solution:**
```powershell
# Refresh environment
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

# Try installer again
.\scripts\jenkins-install-simple.ps1
```

### Issue: Installation hangs / doesn't progress

**Solution:**
1. **Press Ctrl+C** to stop the script
2. **Check Jenkins service:**
   ```powershell
   Get-Service Jenkins
   ```
3. **Check what's running:**
   ```powershell
   Get-Process | grep -i jenkins
   ```
4. **Restart service:**
   ```powershell
   Restart-Service Jenkins
   ```
5. **Try again:**
   ```powershell
   .\scripts\jenkins-install-simple.ps1
   ```

### Issue: "Cannot connect to http://localhost:8080"

**Solution:**
1. **Check if Jenkins is running:**
   ```powershell
   Get-Service Jenkins
   # Should show: Running
   ```

2. **If stopped, start it:**
   ```powershell
   Start-Service Jenkins
   ```

3. **Check Jenkins logs:**
   ```powershell
   Get-Content "C:\ProgramData\Jenkins\.jenkins\jenkins.log" -Tail 50
   ```

4. **Wait 60 seconds** - Jenkins takes time to initialize
5. **Try again:** http://localhost:8080

### Issue: Forgot admin password

**Solution:**
```powershell
# Stop Jenkins
Stop-Service Jenkins

# Remove config
Remove-Item "C:\ProgramData\Jenkins\.jenkins\secrets\initialAdminPassword"

# Start Jenkins
Start-Service Jenkins

# Wait 30 seconds, then open http://localhost:8080
# A new password will be generated in the logs
```

---

## 🎯 VERIFY INSTALLATION IS WORKING

After setup, test each component:

### Test 1: Jenkins Running
```powershell
curl http://localhost:8080
# Should return HTTP 200 and Jenkins HTML
```

### Test 2: Jenkins Service Status
```powershell
Get-Service Jenkins
# Should show: Running
```

### Test 3: Java Installed
```powershell
java -version
# Should show: OpenJDK 17.0.15
```

### Test 4: Node.js Installed
```powershell
node --version
npm --version
# Should show versions
```

---

## 📊 JENKINS DIRECTORY STRUCTURE

After installation, you'll have:

```
C:\Program Files\Jenkins\                    # Jenkins installation
C:\ProgramData\Jenkins\.jenkins\             # Jenkins home (configs, jobs, logs)
  ├── jobs/                                  # Job directories
  ├── plugins/                               # Installed plugins
  ├── secrets/                               # Security credentials
  ├── workspace/                             # Build workspaces
  ├── jenkins.log                            # Main log file
  └── config.xml                             # Global configuration
```

---

## 📝 IMPORTANT NOTES

⚠️ **Administrator Requirement:**
- Jenkins service installation requires Administrator privileges
- If you're not admin on your machine, ask your IT department

⚠️ **Port 8080:**
- Jenkins uses port 8080 by default
- If port 8080 is in use, set a different port:
  ```powershell
  .\scripts\jenkins-install-simple.ps1 -JenkinsPort 9090
  ```
  Then access at: http://localhost:9090

⚠️ **Firewall:**
- If Jenkins won't start, check Windows Firewall
- Allow Jenkins through:
  ```powershell
  # In elevated PowerShell
  netsh advfirewall firewall add rule name="Jenkins" dir=in action=allow program="C:\Program Files\Jenkins\jenkins.exe" enable=yes
  ```

---

## ✅ CHECKLIST

After completing Jenkins installation:

- [ ] Opened PowerShell as Administrator
- [ ] Ran jenkins-install-simple.ps1 script
- [ ] Copied the admin password
- [ ] Opened http://localhost:8080
- [ ] Pasted admin password in Unlock Jenkins
- [ ] Installed suggested plugins (5-10 min wait)
- [ ] Created first admin user
- [ ] Configured Jenkins URL (http://localhost:8080/)
- [ ] Saw Jenkins dashboard (no jobs yet)

**Next:** Open JENKINS_DETAILED_SETUP.md and continue with Steps 3-10

---

## 🎓 QUICK REFERENCE COMMANDS

```powershell
# Check Jenkins status
Get-Service Jenkins

# Start Jenkins
Start-Service Jenkins

# Stop Jenkins
Stop-Service Jenkins

# Restart Jenkins
Restart-Service Jenkins

# View recent logs
Get-Content "C:\ProgramData\Jenkins\.jenkins\jenkins.log" -Tail 50

# Check port 8080
netstat -ano | findstr :8080

# Kill process on port 8080
taskkill /PID <PID> /F

# Test connectivity
curl http://localhost:8080

# Full Jenkins URL
Write-Host "http://localhost:8080"
```

---

## 📞 SUPPORT

If you get stuck:

1. **Check JENKINS_DETAILED_SETUP.md** - Complete step-by-step guide
2. **Check JENKINS_INSTALLATION_GUIDE.md** - Detailed troubleshooting (20+ issues)
3. **Check JENKINS_SETUP.md** - Configuration instructions
4. **Check Jenkins logs:**
   ```powershell
   Get-Content "C:\ProgramData\Jenkins\.jenkins\jenkins.log" -Tail 100
   ```

---

**Ready to install? Open PowerShell as Administrator and run:**

```powershell
cd "C:\Users\SAMRUDH NAIK\Videos\arc drive devops\ARC-Drive"
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser -Force
.\scripts\jenkins-install-simple.ps1
```

Let's go! 🚀
