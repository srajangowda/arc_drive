# 🔧 JENKINS COMPLETE SETUP GUIDE - STEP BY STEP

## 📋 TABLE OF CONTENTS

1. [Prerequisites Check](#prerequisites-check)
2. [Step 1: Install Jenkins](#step-1-install-jenkins)
3. [Step 2: Initial Jenkins Setup](#step-2-initial-jenkins-setup)
4. [Step 3: Install Required Plugins](#step-3-install-required-plugins)
5. [Step 4: Configure Global Tools](#step-4-configure-global-tools)
6. [Step 5: Create GitHub Personal Access Token](#step-5-create-github-personal-access-token)
7. [Step 6: Add GitHub Credentials to Jenkins](#step-6-add-github-credentials-to-jenkins)
8. [Step 7: Create Pipeline Job](#step-7-create-pipeline-job)
9. [Step 8: Configure GitHub Webhook](#step-8-configure-github-webhook)
10. [Step 9: Run First Build](#step-9-run-first-build)
11. [Step 10: Verify Deployment](#step-10-verify-deployment)
12. [Troubleshooting](#troubleshooting)

---

## ✅ PREREQUISITES CHECK

Before starting, verify you have:

- ✅ Windows 10/11 or Windows Server 2016+
- ✅ Administrator access
- ✅ Java 17 installed (already done: OpenJDK 17.0.15)
- ✅ Node.js installed (already done)
- ✅ Git installed (already done)
- ✅ GitHub account
- ✅ Your GitHub repo: https://github.com/samrudh04oct/a_r_c.git

**Verify Java:**
```powershell
java -version
# Should show: OpenJDK 17.0.15
```

✅ **You're ready! Continue below...**

---

## STEP 1: INSTALL JENKINS

### Method A: Using PowerShell Script (Recommended)

Open **PowerShell as Administrator** and run:

```powershell
# Navigate to your project
cd "C:\Users\SAMRUDH NAIK\Videos\arc drive devops\ARC-Drive"

# Run the auto-installer
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser -Force
.\scripts\Install-Jenkins.ps1
```

**What this does:**
- ✅ Checks Java installation
- ✅ Installs Chocolatey (if needed)
- ✅ Downloads and installs Jenkins
- ✅ Starts Jenkins service
- ✅ Waits for startup
- ✅ Shows initial admin password

**Expected Output:**
```
========================================
Jenkins Installation for ARC Drive
========================================

[ℹ] Step 1: Checking Chocolatey installation...
[✓] Chocolatey is already installed

[ℹ] Step 2: Checking Java installation...
[✓] Java is already installed
openjdk version "17.0.15" 2025-04-15

[ℹ] Step 3: Installing Jenkins...
[✓] Jenkins installed successfully

[ℹ] Step 4: Starting Jenkins service...
[✓] Jenkins service started

[ℹ] Step 5: Waiting for Jenkins to initialize...
[✓] Jenkins is ready!

[ℹ] Step 6: Retrieving initial admin password...
========================================
JENKINS INITIAL ADMIN PASSWORD
========================================
a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
========================================

Jenkins Dashboard: http://localhost:8080
```

### ⏱️ TIMING
- Download & Install: 3-5 minutes
- Jenkins Startup: 1-2 minutes
- **Total: 5-7 minutes**

### ✅ VERIFICATION
Jenkins is running when you see:
```
[✓] Jenkins is ready!
http://localhost:8080
```

---

## STEP 2: INITIAL JENKINS SETUP

### 2.1 Open Jenkins Dashboard

Open your browser and go to:
```
http://localhost:8080
```

### 2.2 Unlock Jenkins

You'll see the "Unlock Jenkins" page:

1. **Copy the password** from the PowerShell output (or from step 1)
2. **Paste it** into the "Administrator password" field
3. **Click "Continue"**

### 2.3 Select Plugin Installation

Jenkins will show: **"Customize Jenkins"**

**Choose:** ✅ **"Install suggested plugins"**

This will install:
- Pipeline
- Git
- GitHub Integration
- Email Extension
- And more...

⏱️ **Wait 5-10 minutes** for plugins to install. Jenkins will restart automatically.

### 2.4 Create First Admin User

After plugins finish installing, you'll see the "Create First Admin User" form:

**Fill in:**
```
Username:        admin
Password:        YourSecurePassword123!
Confirm:         YourSecurePassword123!
Full name:       Jenkins Administrator
Email address:   admin@arc-drive.local
```

✅ **Click: "Save and Create First Admin User"**

### 2.5 Configure Jenkins URL

You'll see: **"Instance Configuration"**

```
Jenkins URL: http://localhost:8080/
```

✅ **Click: "Save and Finish"**

### 2.6 Jenkins Ready!

You should see the Jenkins dashboard with:
- Job list (empty for now)
- Build history
- System information

**Success!** ✅ Jenkins is installed!

---

## STEP 3: INSTALL REQUIRED PLUGINS

### 3.1 Go to Manage Plugins

1. **Click:** Jenkins dashboard → **"Manage Jenkins"**
2. **Click:** **"Manage Plugins"**
3. **Go to:** **"Available"** tab

### 3.2 Search and Install Plugins

Search for each and **CHECK** the checkbox:

**Essential:**
- [ ] Pipeline
- [ ] Pipeline: Stage View
- [ ] Git
- [ ] GitHub Integration

**Recommended:**
- [ ] Email Extension Plugin
- [ ] Slack Notification Plugin
- [ ] AnsiColor Plugin
- [ ] Blue Ocean

### 3.3 Install

1. **Click:** **"Download now and install after restart"**
2. **Check:** ☑️ **"Restart Jenkins when installation is complete"**
3. **Wait** for plugins to install and Jenkins to restart (5-10 minutes)

**Verify:** You see the Jenkins dashboard again = Success! ✅

---

## STEP 4: CONFIGURE GLOBAL TOOLS

### 4.1 Go to Global Tool Configuration

1. **Click:** Jenkins dashboard → **"Manage Jenkins"**
2. **Click:** **"Global Tool Configuration"**

### 4.2 Configure NodeJS

Scroll down to find **"NodeJS"** section:

1. **Click:** **"Add NodeJS"**

**Enter:**
```
Name:           nodejs18
Version:        18.18.0 (or latest 18.x LTS)
☑ Install automatically
npm packages:   (leave empty)
```

2. **Click:** **"Apply"**
3. **Click:** **"Save"**

### 4.3 Configure Git (Optional)

If you see a **"Git"** section:

1. Click **"Add Git"**
2. Name: `Default`
3. Path: (auto-detected)
4. **Click Apply & Save**

**Done!** ✅

---

## STEP 5: CREATE GITHUB PERSONAL ACCESS TOKEN

### 5.1 Go to GitHub Settings

1. Open: https://github.com/settings/tokens
2. **Login** if needed

### 5.2 Generate New Token

1. **Click:** **"Generate new token"** → **"Generate new token (classic)"**

### 5.3 Configure Token

**Enter:**
```
Token name:           Jenkins-ARC-Drive
Expiration:           90 days
☑ repo                (Full control of private repositories)
☑ admin:repo_hook    (Full control of repository hooks)
☑ admin:org_hook     (Full control of organization hooks)
```

2. **Click:** **"Generate token"**

### 5.4 Copy Token

**Important:** ⚠️ Copy and save this token somewhere safe!

⚠️ **You won't see it again!**

Example:
```
ghp_1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p
```

**Keep this token handy for the next step!**

---

## STEP 6: ADD GITHUB CREDENTIALS TO JENKINS

### 6.1 Go to Manage Credentials

1. **Click:** Jenkins dashboard → **"Manage Jenkins"**
2. **Click:** **"Manage Credentials"**
3. **Click:** **"(global)"** under "Stores scoped to Jenkins"

### 6.2 Add New Credentials

1. **Click:** **"+ Add Credentials"** (top left)

### 6.3 Configure Credentials

**Select/Enter:**
```
Kind:                Username with password
Scope:               Global (Jenkins, nodes, items, ...)
Username:            samrudh04oct (your GitHub username)
Password:            ghp_1a2b3c4d... (paste your token)
ID:                  github-token
Description:         GitHub Personal Access Token
```

2. **Click:** **"Create"**

**Success!** ✅ Credentials added.

---

## STEP 7: CREATE PIPELINE JOB

### 7.1 Create New Item

1. **Click Jenkins dashboard:** **"+ New Item"**
2. **Enter job name:** `ARC-Drive-Deploy`
3. **Select:** **"Pipeline"**
4. **Click:** **"OK"**

### 7.2 Configure Job - General

Under **"General"** section:

```
Description:      ARC Drive - Automated Build & Deployment
☑ GitHub project
Repository URL:   https://github.com/samrudh04oct/a_r_c
```

### 7.3 Configure Job - Build Parameters

Click: **"✓ This project is parameterized"**

**Click:** **"Add Parameter"** → **"Choice Parameter"**

```
Name:           ENVIRONMENT
Choices:        local
                staging
                production
Description:    Select deployment environment
Default:        local
```

### 7.4 Configure Job - Pipeline Script

Scroll to **"Pipeline"** section:

**Select:**
```
Definition:          Pipeline script from SCM
SCM:                 Git
Repository URL:      https://github.com/samrudh04oct/a_r_c.git
Credentials:         github-token (the one you just created)
Branch:              */master
Script Path:         Jenkinsfile
```

### 7.5 Configure Job - Build Triggers

**Check one of these:**

**Option A: GitHub Webhook** (Auto-deploy on push)
```
☑ GitHub hook trigger for GITScm polling
```

**Option B: Poll SCM** (Check every 15 minutes)
```
☑ Poll SCM
Schedule:  H/15 * * * *
```

**Option C: Build periodically**
```
☑ Build periodically
Schedule:  H 0 * * *  (daily at midnight)
```

### 7.6 Save Job

**Click:** **"Save"**

**Success!** ✅ Pipeline job created!

---

## STEP 8: CONFIGURE GITHUB WEBHOOK

This makes Jenkins automatically build when you push code.

### 8.1 Go to GitHub Repository Settings

1. Open: https://github.com/samrudh04oct/a_r_c
2. **Click:** **"Settings"** (top right)
3. **Click:** **"Webhooks"** (left sidebar)

### 8.2 Add Webhook

**Click:** **"Add webhook"**

### 8.3 Configure Webhook

**Enter:**
```
Payload URL:        http://YOUR_IP:8080/github-webhook/
Content type:       application/json
Events:             ☑ Push events
                    ☑ Pull requests
Active:             ☑ Yes
```

⚠️ **Replace YOUR_IP with:**
- If on local machine: `http://localhost:8080/github-webhook/`
- If on network: `http://192.168.x.x:8080/github-webhook/` (your machine IP)
- To find your IP:
  ```powershell
  ipconfig
  # Look for "IPv4 Address: 192.168..."
  ```

### 8.4 Save Webhook

**Click:** **"Add webhook"**

GitHub will try to send a test payload. You should see:
```
✓ Recent Deliveries showing a successful delivery
```

**Success!** ✅ Webhook configured!

---

## STEP 9: RUN FIRST BUILD

### 9.1 Manual Test Build

1. **Go to:** Jenkins dashboard
2. **Click on:** **"ARC-Drive-Deploy"** job
3. **Click:** **"Build with Parameters"**

### 9.2 Select Parameters

```
ENVIRONMENT: local
```

### 9.3 Click Build

**Click:** **"Build"**

### 9.4 Monitor Build Progress

**Click on:** Build number (e.g., **"#1"**) that appeared

**Click:** **"Console Output"**

Watch the build execute:

```
Started by user admin
Running as SYSTEM
[Pipeline] Start of Pipeline
[Pipeline] node
Running on Jenkins in C:\Program Files\Jenkins\workspace\ARC-Drive-Deploy

[Pipeline] stage
[Pipeline] { (Checkout)
[Pipeline] checkout
Cloning into 'C:\Program Files\Jenkins\workspace\ARC-Drive-Deploy'...
Branch master set up to track remote branch master from origin.
Switched to a new branch 'master'
[Pipeline] }

[Pipeline] stage
[Pipeline] { (Install Dependencies)
npm install
(Installing 1471 packages...)
added X packages

[Pipeline] stage
[Pipeline] { (Build)
npm run build
> arc-drive-react@0.0.0 build
> vite build

vite v8.0.3 building for production...
✓ 1471 modules transformed.
✓ built in 2.50s

[Pipeline] stage
[Pipeline] { (Deploy to Local)
✓ Preview server started on http://localhost:4173/

[Pipeline] end of Pipeline
Finished: SUCCESS
```

### 9.5 Result

You should see:
```
✓ SUCCESS (green)
Build took 2 minutes 15 seconds
```

**Success!** ✅ First build complete!

---

## STEP 10: VERIFY DEPLOYMENT

### 10.1 Check Application

Open browser and visit:
```
http://localhost:4173/app.html
```

✅ You should see your ARC Drive application!

### 10.2 Check Jenkins Dashboard

**Click:** Jenkins dashboard → **"ARC-Drive-Deploy"**

You should see:
```
✓ Build #1 - Successful
  Environment: local
  Duration: 2 min 15 sec
  Archived artifacts
```

### 10.3 View Build Details

**Click:** Build **#1** → **"Full Log"** or **"Console Output"**

You'll see the complete build execution with all stages.

**Success!** ✅ Everything working!

---

## 🔄 TEST AUTO-DEPLOYMENT (Optional)

### Test GitHub Webhook

1. **Go to GitHub:** https://github.com/samrudh04oct/a_r_c
2. **Edit any file** (e.g., README.md)
3. **Commit changes**
4. **Push to master**

### Watch Jenkins

1. **Go to Jenkins dashboard**
2. **Watch ARC-Drive-Deploy job**
3. In 5-30 seconds, a new build **#2** should start automatically!

✅ **Auto-deployment working!**

---

## 📊 JENKINS DASHBOARD OVERVIEW

After setup, your Jenkins dashboard shows:

```
Jenkins Dashboard
├── New Item (create jobs)
├── Manage Jenkins (settings)
├── My Views
└── ARC-Drive-Deploy
    ├── Build History
    │   ├── #2 (Latest)
    │   └── #1 (First)
    ├── Stage View
    │   ├── Checkout ✓
    │   ├── Install ✓
    │   ├── Build ✓
    │   ├── Quality ✓
    │   ├── Deploy ✓
    │   └── Verify ✓
    └── Build Artifacts
        ├── dist/
        └── logs/
```

---

## ✅ VERIFICATION CHECKLIST

After completing all steps, verify:

| Item | Status | How to Check |
|------|--------|-------------|
| Jenkins running | ✅ | http://localhost:8080 loads |
| Plugins installed | ✅ | Manage Jenkins → Manage Plugins shows them |
| NodeJS configured | ✅ | Global Tool Config shows nodejs18 |
| GitHub credentials | ✅ | Manage Credentials shows github-token |
| Pipeline job created | ✅ | Dashboard shows "ARC-Drive-Deploy" |
| Webhook working | ✅ | GitHub Settings → Webhooks shows green check |
| Build successful | ✅ | Build #1 shows "SUCCESS" |
| App deployed | ✅ | http://localhost:4173/app.html loads |
| Auto-deploy working | ✅ | Push to GitHub triggers Build #2 |

---

## 🔧 TROUBLESHOOTING

### Problem: Jenkins won't start

```powershell
# Check logs
Get-Content "C:\Program Files\Jenkins\jenkins.log" -Tail 50

# Restart service
Restart-Service Jenkins

# Check status
Get-Service Jenkins
```

### Problem: "Cannot connect to repository"

**Solution:**
1. Verify GitHub credentials are correct
2. Test git clone manually:
   ```powershell
   git clone https://github.com/samrudh04oct/a_r_c.git test-clone
   ```
3. Check network connectivity
4. Verify token hasn't expired

### Problem: Build fails with "npm not found"

**Solution:**
1. Go to Global Tool Configuration
2. Add Node.js if missing
3. Configure path correctly
4. Recreate the job with proper Node.js settings

### Problem: Webhook not triggering builds

**Solution:**
1. Check GitHub Webhook delivery status:
   - Go to Repository → Settings → Webhooks
   - Click on webhook
   - Check "Recent Deliveries"
   - Look for green checkmarks (200 OK)

2. If red X (failed):
   - Verify Jenkins URL is accessible from GitHub
   - Check firewall settings
   - Test with `curl`:
     ```powershell
     curl http://localhost:8080/github-webhook/
     ```

3. If certificate errors:
   - GitHub may need to reach your Jenkins
   - Use ngrok for local tunneling:
     ```bash
     ngrok http 8080
     # Use ngrok URL in webhook: https://abc123.ngrok.io/github-webhook/
     ```

### Problem: "Git command not found"

**Solution:**
```powershell
# Check Git installation
git --version

# Add to PATH if needed
$env:Path += ";C:\Program Files\Git\cmd"

# Restart Jenkins
Restart-Service Jenkins
```

### Problem: Build takes too long

**Solution:**
1. Clean Jenkins workspace:
   ```powershell
   Remove-Item "C:\Program Files\Jenkins\workspace\*" -Recurse -Force
   ```

2. Enable caching in Jenkinsfile:
   ```groovy
   options {
       timestamps()
       timeout(time: 30, unit: 'MINUTES')
       buildDiscarder(logRotator(numToKeepStr: '10'))
   }
   ```

---

## 🎓 NEXT STEPS

After Jenkins setup:

1. **Setup Notifications:**
   - Email on build failure
   - Slack notifications
   - See JENKINS_SETUP.md for details

2. **Configure Production Deployment:**
   - Update deployment scripts with prod server
   - Add approval steps for production builds
   - See deployment.config for environments

3. **Monitor Builds:**
   - View Jenkins dashboard regularly
   - Check Blue Ocean UI for better visualization
   - Review build logs for issues

4. **Optimize Pipeline:**
   - Add unit tests
   - Add code coverage reports
   - Add security scanning
   - Add performance tests

---

## 📞 QUICK REFERENCE

### Important URLs
```
Jenkins Dashboard:   http://localhost:8080
ARC-Drive Job:       http://localhost:8080/job/ARC-Drive-Deploy
Build Console:       http://localhost:8080/job/ARC-Drive-Deploy/lastBuild/console
System Config:       http://localhost:8080/manage/
Plugin Manager:      http://localhost:8080/pluginManager/
Global Tool Config:  http://localhost:8080/configureTools/
GitHub Repo:         https://github.com/samrudh04oct/a_r_c
App URL:             http://localhost:4173/app.html
```

### Important Commands
```powershell
# Service management
Get-Service Jenkins                # Check status
Start-Service Jenkins              # Start
Stop-Service Jenkins               # Stop
Restart-Service Jenkins            # Restart

# View logs
Get-Content "C:\Program Files\Jenkins\jenkins.log" -Tail 100

# Check Java
java -version

# Check Git
git --version

# Trigger build via CLI
java -jar jenkins-cli.jar -s http://localhost:8080/ build ARC-Drive-Deploy
```

---

## 🎉 SUCCESS!

Once you complete all 10 steps, you have:

✅ Jenkins installed and running  
✅ CI/CD pipeline configured  
✅ GitHub repository connected  
✅ Webhook auto-deployment enabled  
✅ First build successful  
✅ Application deployed  
✅ Ready for production use  

Your ARC Drive is now fully automated! 🚀

---

**Estimated Total Time:** 45-60 minutes (including waiting for downloads and installs)

**Support:** See JENKINS_SETUP.md or JENKINS_INSTALLATION_GUIDE.md for additional help.

