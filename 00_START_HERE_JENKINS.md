# 🎯 JENKINS COMPLETE SETUP - START HERE

## 📌 WHAT YOU NEED TO DO

You have a **complete ARC Drive CI/CD pipeline** ready. Jenkins just needs to be installed and connected to GitHub.

### Total Time to Complete: **45-60 minutes**

---

## ✨ WHAT YOU'LL HAVE AT THE END

✅ **Fully Automated CI/CD Pipeline**
- Jenkins running on http://localhost:8080
- Connected to GitHub repository
- Automatic builds on push
- App deployed at http://localhost:4173

✅ **Production Ready**
- 5 deployment scripts (Windows, Linux, etc.)
- Multi-environment support (local, staging, production)
- Build optimization (GZIP, minification)
- Health checks included

✅ **Team Ready**
- All documentation in GitHub
- Easy for teammates to clone and run
- Webhooks configured for automatic deployments

---

## 🚀 FOLLOW THIS 3-STEP PROCESS

### STEP 1️⃣: INSTALL JENKINS (10-15 minutes)

**Read this first:**
📄 [JENKINS_MANUAL_INSTALLER.md](JENKINS_MANUAL_INSTALLER.md)

**Then do this:**

Open **PowerShell as Administrator** and run:

```powershell
cd "C:\Users\SAMRUDH NAIK\Videos\arc drive devops\ARC-Drive"
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser -Force
.\scripts\jenkins-install-simple.ps1
```

**What happens:**
- ✅ System checks for Java, Chocolatey, Node.js
- ✅ Installs Jenkins automatically
- ✅ Starts Jenkins service
- ✅ Shows you the admin password
- ✅ Jenkins ready at http://localhost:8080

**Expected output:**
```
========================================
Jenkins Installation - ARC Drive
========================================
[OK] Java is installed
[OK] Chocolatey is installed  
[OK] Jenkins installed
[OK] Jenkins service started
[OK] Jenkins is ready at http://localhost:8080

========================================
JENKINS INITIAL ADMIN PASSWORD
========================================
a1b2c3d4e5f6g7h8i9j0k (YOUR ACTUAL PASSWORD)
========================================
```

⚠️ **Copy and save that password above!**

---

### STEP 2️⃣: COMPLETE JENKINS SETUP WIZARD (10 minutes)

**Do this in your browser:**

1. **Open:** http://localhost:8080

2. **Unlock Jenkins**
   - Paste the password from Step 1
   - Click "Continue"

3. **Install Plugins**
   - Click "Install suggested plugins"
   - Wait 5-10 minutes (Jenkins will download plugins)
   - Jenkins will restart automatically

4. **Create First Admin User**
   - Username: `admin`
   - Password: `YourSecurePassword123!` (use something secure)
   - Full name: `Jenkins Administrator`
   - Email: `your.email@example.com`
   - Click "Save and Create First Admin User"

5. **Instance Configuration**
   - Jenkins URL: `http://localhost:8080/`
   - Click "Save and Finish"

**Success!** ✅ Jenkins dashboard appears

---

### STEP 3️⃣: CONNECT TO GITHUB (15-20 minutes)

**Read this:**
📄 [JENKINS_GITHUB_CONNECTION.md](JENKINS_GITHUB_CONNECTION.md)

**Then follow these steps in order:**

#### Step 3.1: Install Required Plugins (5 minutes)

In Jenkins dashboard:
1. Click "Manage Jenkins" → "Manage Plugins" → "Available"
2. Search and check: **Pipeline**, **Git**, **GitHub Integration**
3. Click "Download now and install after restart"
4. Check "Restart Jenkins when installation is complete"
5. Wait for restart (5 minutes)

#### Step 3.2: Configure NodeJS (2 minutes)

In Jenkins dashboard:
1. Click "Manage Jenkins" → "Global Tool Configuration"
2. Find **"NodeJS"** section
3. Click "Add NodeJS"
   - Name: `nodejs18`
   - Version: `18.18.0`
   - ✓ Install automatically
4. Click Apply → Save

#### Step 3.3: Create GitHub Token (5 minutes)

Go to: https://github.com/settings/tokens

1. Click "Generate new token" → "classic"
2. Token name: `Jenkins-ARC-Drive`
3. Expiration: `90 days`
4. Check these: `repo`, `admin:repo_hook`, `admin:org_hook`
5. Click "Generate token"
6. **COPY AND SAVE** the token (you won't see it again!)

#### Step 3.4: Add Token to Jenkins (2 minutes)

In Jenkins dashboard:
1. Click "Manage Jenkins" → "Manage Credentials"
2. Click "(global)" under Stores
3. Click "+ Add Credentials"
4. Fill in:
   - Kind: `Username with password`
   - Username: `samrudh04oct` (your GitHub username)
   - Password: Paste your GitHub token here
   - ID: `github-token`
5. Click "Create"

#### Step 3.5: Create Pipeline Job (3 minutes)

In Jenkins dashboard:
1. Click "+ New Item"
2. Job name: `ARC-Drive-Deploy`
3. Select: **Pipeline**
4. Click OK

**In the job configuration:**

- **Description:** `ARC Drive - Automated CI/CD Pipeline`
- **GitHub project:** ✓ checked
- **Repository URL:** `https://github.com/samrudh04oct/a_r_c`

Add Parameter:
- Click "✓ This project is parameterized"
- Click "Add Parameter" → "Choice Parameter"
- Name: `ENVIRONMENT`
- Choices: `local`, `staging`, `production`

Configure Pipeline:
- Definition: `Pipeline script from SCM`
- SCM: `Git`
- Repository URL: `https://github.com/samrudh04oct/a_r_c.git`
- Credentials: `github-token`
- Branch: `*/master`
- Script Path: `Jenkinsfile`

Build Triggers:
- Check: `GitHub hook trigger for GITScm polling`

5. Click "Save"

#### Step 3.6: Add GitHub Webhook (3 minutes)

Go to: https://github.com/samrudh04oct/a_r_c

1. Click "Settings" → "Webhooks"
2. Click "Add webhook"
3. Fill in:
   - Payload URL: `http://localhost:8080/github-webhook/`
   - Content type: `application/json`
   - Events: Check "Push events" and "Pull requests"
4. Click "Add webhook"

**Verify:** You should see a green ✓ checkmark in "Recent Deliveries"

#### Step 3.7: Run First Build (2 minutes)

In Jenkins:
1. Click "ARC-Drive-Deploy" job
2. Click "Build with Parameters"
3. ENVIRONMENT: `local`
4. Click "Build"

Watch the build:
1. Click Build "#1" that appeared
2. Click "Console Output"
3. Watch it execute (should take 2-3 minutes)
4. Should end with: **"Finished: SUCCESS"** ✅

#### Step 3.8: Verify Deployment (1 minute)

Open your browser: http://localhost:4173/app.html

✅ You should see your ARC Drive app!

---

## ✅ FINAL CHECKLIST

Mark off as you complete each step:

### Installation (Step 1)
- [ ] Opened PowerShell as Administrator
- [ ] Ran jenkins-install-simple.ps1
- [ ] Copied the admin password
- [ ] Jenkins accessible at http://localhost:8080

### Wizard (Step 2)
- [ ] Unlocked Jenkins
- [ ] Installed plugins (waited 5-10 min)
- [ ] Created admin user
- [ ] Configured Jenkins URL
- [ ] Saw Jenkins dashboard

### GitHub Connection (Step 3)
- [ ] Installed required plugins
- [ ] Configured NodeJS
- [ ] Created GitHub token
- [ ] Added token to Jenkins credentials
- [ ] Created ARC-Drive-Deploy job
- [ ] Added GitHub webhook
- [ ] Ran first build successfully
- [ ] App loads at http://localhost:4173/app.html

**EVERYTHING CHECKED? 🎉 YOU'RE DONE!**

---

## 🔄 TEST AUTO-DEPLOYMENT

**Verify that Jenkins auto-deploys on push:**

1. Go to GitHub: https://github.com/samrudh04oct/a_r_c
2. Edit any file (like README.md)
3. Make a small change
4. Commit and push to master
5. Go back to Jenkins dashboard
6. Watch for Build #2 to start automatically ⏰

**Expected:** Build #2 starts within 30 seconds

✅ **If it does - Jenkins is fully working!**

---

## 📚 ADDITIONAL GUIDES (If you need help)

| Situation | Read This |
|-----------|-----------|
| Need detailed step-by-step | JENKINS_DETAILED_SETUP.md |
| Installation is failing | JENKINS_INSTALLATION_GUIDE.md |
| Want to understand architecture | JENKINS_CI_CD_README.md |
| Need advanced configuration | JENKINS_SETUP.md |
| Want to see what's complete | JENKINS_CI_CD_STATUS_REPORT.md |
| Need a roadmap | JENKINS_ROADMAP.md |

---

## 🆘 QUICK TROUBLESHOOTING

**Jenkins won't start?**
```powershell
# Check status
Get-Service Jenkins

# Restart
Restart-Service Jenkins
```

**Forgot admin password?**
```powershell
# Stop Jenkins
Stop-Service Jenkins

# Delete password file
Remove-Item "C:\ProgramData\Jenkins\.jenkins\secrets\initialAdminPassword"

# Start Jenkins
Start-Service Jenkins

# Wait 30 sec, open http://localhost:8080 for new setup
```

**Build failing?**
1. Click Build → "Console Output"
2. Look for red error text
3. Most issues are in JENKINS_INSTALLATION_GUIDE.md

**Webhook not working?**
1. Go to GitHub Settings → Webhooks
2. Click webhook
3. Check "Recent Deliveries" for red ✗ or green ✓
4. Click on failed delivery to see error

---

## 🎁 WHAT YOU NOW HAVE

After completing all steps:

```
Your Jenkins Setup
├── Jenkins running at http://localhost:8080
├── ARC-Drive-Deploy pipeline job
├── GitHub integration with webhooks
├── Auto-deployment on push
├── 5 deployment scripts ready
├── 10+ documentation guides
├── Jenkinsfile with 7-stage pipeline
├── deployment.config for environments
└── Full team-ready CI/CD system ✅
```

---

## 🚀 NEXT STEPS (Optional - After everything works)

After you have Jenkins running and building successfully:

1. **Setup notifications**
   - Email alerts on failure
   - Slack integration
   - See JENKINS_SETUP.md

2. **Configure production**
   - Update deployment scripts
   - Setup production server
   - Add approval steps

3. **Monitor builds**
   - Check Jenkins dashboard regularly
   - Review build logs
   - Monitor performance

4. **Team sharing**
   - Everyone clones the GitHub repo
   - Instructions are in README.md
   - All tools and scripts included

---

## 📞 STILL NEED HELP?

**If something isn't working:**

1. Check the error in Jenkins Console Output
2. Search for that error in JENKINS_INSTALLATION_GUIDE.md (20+ issues covered)
3. Follow the solution steps
4. Try again

**If still stuck:**
- Restart Jenkins: `Restart-Service Jenkins`
- Clear workspace: `Remove-Item "C:\Program Files\Jenkins\workspace\*" -Recurse -Force`
- Restart computer (last resort)

---

## 🎉 YOU'RE READY!

**Everything is prepared. All you need to do is:**

1. Open PowerShell as Administrator
2. Run: `cd "C:\Users\SAMRUDH NAIK\Videos\arc drive devops\ARC-Drive"`
3. Run: `.\scripts\jenkins-install-simple.ps1`
4. Follow the on-screen instructions

**That's it!** The rest is copying and pasting in your browser following JENKINS_GITHUB_CONNECTION.md

---

**Let's go! 🚀 45 minutes and you'll have full CI/CD!**

Need to start? Go to Step 1️⃣ above and run the installer script.

---

**Repository:** https://github.com/samrudh04oct/a_r_c  
**Status:** Ready for Jenkins Installation ✅  
**Last Updated:** April 1, 2026

