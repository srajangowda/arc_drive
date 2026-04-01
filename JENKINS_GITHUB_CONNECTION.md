# 🔗 CONNECTING JENKINS TO YOUR GITHUB REPOSITORY

## Overview

After Jenkins installation, we need to:
1. ✅ Install plugins (Git, GitHub)
2. ✅ Configure GitHub credentials
3. ✅ Create the pipeline job
4. ✅ Set up GitHub webhook
5. ✅ Run first build

**Estimated time:** 20-30 minutes

---

## 📋 PRE-REQUISITES

Before starting, you must have:

- ✅ Jenkins installed and running (see JENKINS_MANUAL_INSTALLER.md)
- ✅ Logged in to Jenkins dashboard (http://localhost:8080)
- ✅ GitHub account
- ✅ Your GitHub repo: https://github.com/samrudh04oct/a_r_c

---

## STEP 1: INSTALL REQUIRED PLUGINS

### 1.1 Go to Manage Plugins

1. **Click:** Jenkins icon → **"Manage Jenkins"** (left sidebar)
2. **Click:** **"Manage Plugins"**
3. Go to **"Available"** tab

### 1.2 Search for Required Plugins

In the **"Search"** box, search for each plugin and **CHECK** the box:

**Essential Plugins (MUST HAVE):**
- [ ] **Pipeline** - For pipeline jobs
- [ ] **Git** - For GitHub integration  
- [ ] **GitHub Integration** - For GitHub webhooks

**Recommended (SHOULD HAVE):**
- [ ] **Pipeline: Stage View** - Better visualization
- [ ] **Email Extension Plugin** - Error notifications
- [ ] **AnsiColor Plugin** - Colored log output
- [ ] **Blue Ocean** - Modern UI

### 1.3 Install Plugins

1. After checking all plugins
2. **Scroll to bottom**
3. **Click:** "**Download now and install after restart**"
4. **CHECK:** ☑️ "**Restart Jenkins when installation is complete**"
5. **Wait 5-10 minutes** for installation and restart

**Success!** ✅ Plugins installed and Jenkins restarted.

---

## STEP 2: CONFIGURE GLOBAL TOOLS

### 2.1 Go to Global Tool Configuration

1. **Click:** Jenkins icon → **"Manage Jenkins"**
2. **Click:** **"Global Tool Configuration"**

### 2.2 Find and Configure NodeJS

**Scroll down** to find **"NodeJS"** section:

1. **Click:** **"Add NodeJS"**

**Enter these values:**
```
Name:               nodejs18
Version:            18.18.0 (or latest 18.x)
☑ Install automatically
npm packages:       (leave blank)
```

2. **Click:** **"Apply"**
3. **Click:** **"Save"**

**Success!** ✅ NodeJS configured for Jenkinsfile

---

## STEP 3: CREATE GITHUB PERSONAL ACCESS TOKEN

### 3.1 Go to GitHub Token Settings

1. Open: https://github.com/settings/tokens
2. **Login** if needed

### 3.2 Generate New Token

Click: **"Generate new token"** → **"Generate new token (classic)"**

### 3.3 Configure Token Permissions

**Fill in these fields:**

```
Token name:     Jenkins-ARC-Drive
Expiration:     90 days
☑ repo                (Full control of private repositories)
☑ admin:repo_hook    (Full control of repository hooks)
☑ admin:org_hook     (Full control of organization hooks)
☑ workflow           (Update GitHub Actions)
```

### 3.4 Generate and Copy

1. **Click:** **"Generate token"**
2. **COPY** the token (starts with `ghp_`)
3. **SAVE** in safe place - you won't see it again!

Example token (NOT real):
```
ghp_1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6pqrst
```

---

## STEP 4: ADD GITHUB CREDENTIALS TO JENKINS

### 4.1 Go to Manage Credentials

1. **Click:** Jenkins icon → **"Manage Jenkins"**
2. **Click:** **"Manage Credentials"**
3. **Click:** **"(global)"** under "Stores scoped to Jenkins"

### 4.2 Add New Credentials

**Click:** **"+ Add Credentials"** (top-left)

### 4.3 Configure Credentials

**In the form, enter:**

```
Kind:                         Username with password
Scope:                        Global (Jenkins, nodes, items, ...)
Username:                     samrudh04oct
Password:                     (paste your GitHub token here)
ID:                           github-token
Description:                  GitHub Personal Access Token for ARC Drive
```

### 4.4 Save Credentials

**Click:** **"Create"**

**Success!** ✅ GitHub token stored securely

---

## STEP 5: CREATE PIPELINE JOB

### 5.1 Create New Item

1. **Click:** Jenkins dashboard
2. Click: **"+ New Item"** (or "Create a job")

### 5.2 Enter Job Details

**Enter:**
```
Job name:     ARC-Drive-Deploy
```

**Select:** **"Pipeline"**

**Click:** **"OK"**

### 5.3 Configure Job - General Tab

**In the "General" section:**

```
Description:     ARC Drive - Automated CI/CD Pipeline

☑ GitHub project
Repository URL:  https://github.com/samrudh04oct/a_r_c
```

### 5.4 Configure Job - Parameters

**Check:** ☑️ "**This project is parameterized**"

**Click:** **"Add Parameter"** → **"Choice Parameter"**

**Enter:**
```
Name:        ENVIRONMENT
Choices:     local
             staging
             production
Description: Select deployment environment
Default:     local
```

### 5.5 Configure Job - Pipeline Script

**Scroll to "Pipeline" section:**

**Select:**
```
Definition:          Pipeline script from SCM
SCM:                 Git
Repository URL:      https://github.com/samrudh04oct/a_r_c.git
Credentials:         github-token (from dropdown)
Branch:              */master
Script Path:         Jenkinsfile
```

### 5.6 Configure Job - Build Triggers

**Choose ONE:**

**Option A: Automatic (Recommended)**
```
☑ GitHub hook trigger for GITScm polling
```
(Jenkins builds automatically when you push to GitHub)

**Option B: Manual + Scheduled**
```
☑ Poll SCM
Schedule: H/15 * * * *
```
(Checks every 15 minutes)

### 5.7 Save Job

**Click:** **"Save"**

**Success!** ✅ Pipeline job created!

---

## STEP 6: CONFIGURE GITHUB WEBHOOK

This makes Jenkins build automatically when you push code to GitHub.

### 6.1 Go to GitHub Repository Settings

1. Open: https://github.com/samrudh04oct/a_r_c
2. **Click:** **"Settings"** (top-right, after "Code" tab)
3. **Click:** **"Webhooks"** (left sidebar)

### 6.2 Add New Webhook

**Click:** **"Add webhook"**

### 6.3 Configure Webhook

**Fill in these fields:**

```
Payload URL:     http://localhost:8080/github-webhook/
Content type:    application/json

Which events:    ☑ Push events
                 ☑ Pull requests
                 ☑ Releases

Active:          ☑ Yes
```

⚠️ **Important - Payload URL:**

- **If testing locally:** 
  ```
  http://localhost:8080/github-webhook/
  ```

- **If on network/server:**
  ```
  http://192.168.x.x:8080/github-webhook/
  ```
  (Replace 192.168.x.x with your IP)

- **To find your IP:**
  ```powershell
  ipconfig
  # Look for "IPv4 Address"
  ```

### 6.4 Save Webhook

**Click:** **"Add webhook"**

### 6.5 Verify Webhook

GitHub will send a test payload. You should see:

```
✓ Recent Deliveries
  └─ Green checkmark = successful (200 OK)
```

**Success!** ✅ Webhook configured!

---

## STEP 7: RUN FIRST BUILD

### 7.1 Trigger Build Manually

1. **Go to:** Jenkins dashboard
2. **Click:** **"ARC-Drive-Deploy"** job
3. **Click:** **"Build with Parameters"**

### 7.2 Select Environment

```
ENVIRONMENT: local
```

### 7.3 Click Build

**Click:** **"Build"**

A new build (#1) should appear in the build history.

### 7.4 Monitor Build Progress

**Click on:** Build **"#1"** that appeared

**Click:** **"Console Output"**

Watch the build execute. You should see:

```
Started by user admin
Running as SYSTEM

[Pipeline] Start of Pipeline
[Pipeline] node
[Pipeline] { (Declarative)
[Pipeline] checkout
Cloning into workspace...

[Pipeline] sh
npm install
added 1471 packages

[Pipeline] sh
npm run build  
✓ 1471 modules transformed
built in 2.50s

[Pipeline] }
Finished: SUCCESS ✅
```

**Success!** ✅ First build completed!

---

## STEP 8: VERIFY DEPLOYMENT

### 8.1 Check Application

Open your browser:
```
http://localhost:4173/app.html
```

✅ You should see your ARC Drive app!

### 8.2 Check Build Details

1. **Go to:** Jenkins dashboard
2. **Click:** "ARC-Drive-Deploy"
3. **Click:** Build "#1"
4. Check the following:
   - ✅ Console Output (all green)
   - ✅ Build Artifacts (dist/ folder)
   - ✅ Timestamps (build duration)

### 8.3 Test Auto-Deployment

Make a small change and test webhook:

1. **Go to:** GitHub repo: https://github.com/samrudh04oct/a_r_c
2. **Edit a file** (e.g., README.md)
3. **Commit and push** to master
4. **Watch Jenkins dashboard** - Build #2 should start in 5-30 seconds!

---

## 🎯 FINAL VERIFICATION CHECKLIST

After completing all steps, verify:

| ✓ | Check | How to Verify |
|---|-------|----------------|
| [ ] | Jenkins running | http://localhost:8080 loads |
| [ ] | Required plugins installed | Manage Plugins shows Pipeline, Git, GitHub |
| [ ] | NodeJS configured | Global Tool Config shows nodejs18 |
| [ ] | GitHub token stored | Manage Credentials shows github-token |
| [ ] | Pipeline job created | Dashboard shows "ARC-Drive-Deploy" |
| [ ] | Job parameterized | Click "Build with Parameters" works |
| [ ] | Build trigger configured | Copy webhook URL from task step 6.3 |
| [ ] | Github webhook added | GitHub Settings → Webhooks shows green ✓ |
| [ ] | First build successful | Build #1 shows SUCCESS (green) |
| [ ] | App deployed | http://localhost:4173/app.html loads |
| [ ] | Auto-deploy working | Push to GitHub triggers Build #2 |

**ALL CHECKED? 🎉 YOU'RE DONE!**

---

## 🔄 TESTING AUTO-DEPLOYMENT

### Verify Webhook Works

1. **Go to GitHub:** https://github.com/samrudh04oct/a_r_c
2. **Edit README.md** (or any file)
3. **Add a line:** `# Updated on $(date)`
4. **Commit and push** to master branch
5. **Go to Jenkins** dashboard
6. **Watch for new build #2** to start automatically

Expected: Build #2 starts within 30 seconds of push

---

## 🚀 NEXT STEPS

After setup:

1. **Configure notifications** - See JENKINS_SETUP.md
2. **Setup production deployment** - See deployment.config
3. **Add more stages** - Extend Jenkinsfile with tests
4. **Monitor builds** - Check Jenkins dashboard regularly
5. **Document process** - Share settings with team

---

## 🆘 TROUBLESHOOTING

### Build Fails: "Cannot clone repository"

**Solution:**
1. Check credentials: Manage Jenkins → Credentials → github-token
2. Test token: Open GitHub Settings → Personal Access Tokens
3. Verify token has: `repo` and `admin:repo_hook` permissions
4. If expired, generate new token and update credentials

### Build Fails: "npm: command not found"

**Solution:**
1. Go to Global Tool Configuration
2. Add NodeJS (see Step 2.2 above)
3. Verify "Install automatically" is checked
4. Recreate job with correct NodeJS

### Webhook Not Triggering

**Solution:**
1. Go to GitHub: Settings → Webhooks
2. Click on webhook
3. Check "Recent Deliveries"
4. If red X: 
   - Verify Jenkins URL is reachable
   - Check Windows Firewall
   - Try ngrok for local tunneling

### Build Takes Forever

**Solution:**
```powershell
# Clean workspace
Remove-Item "C:\Program Files\Jenkins\workspace\*" -Recurse -Force

# Restart Jenkins
Restart-Service Jenkins
```

---

## 📚 REFERENCE GUIDE

### Important URLs
```
Jenkins Dashboard:    http://localhost:8080
ARC-Drive Job:        http://localhost:8080/job/ARC-Drive-Deploy
Build #1 Console:     http://localhost:8080/job/ARC-Drive-Deploy/1/console
Credentials:          http://localhost:8080/credentials/
Manage Plugins:       http://localhost:8080/manage/pluginManager/
Global Tools:         http://localhost:8080/configureTools/
GitHub Repo:          https://github.com/samrudh04oct/a_r_c
App URL:              http://localhost:4173/app.html
```

### Jenkins Commands
```powershell
# Service management
Restart-Service Jenkins
Stop-Service Jenkins
Start-Service Jenkins
Get-Service Jenkins

# Check logs
Get-Content "C:\ProgramData\Jenkins\.jenkins\jenkins.log" -Tail 50

# Test connection
curl http://localhost:8080
```

---

**Ready to connect? Follow Steps 1-8 above!** ✅

For more help, see other documentation files:
- **JENKINS_DETAILED_SETUP.md** - Complete illustrated guide
- **JENKINS_INSTALLATION_GUIDE.md** - Installation troubleshooting
- **JENKINS_SETUP.md** - Configuration details
