# 🚀 GitHub Setup Guide
## Push Your Project to GitHub (10 minutes)

---

## 📋 **What You Need**

1. GitHub account (create one at github.com if you don't have)
2. Git installed on your computer
3. Your project folder

---

## ⚡ **QUICK SETUP (Follow These Steps)**

### **STEP 1: Check if Git is Installed**

Open your terminal/command prompt in the project folder and run:

```bash
git --version
```

**If you see a version number** (like `git version 2.x.x`):
✅ Git is installed, proceed to Step 2

**If you see an error**:
❌ Download Git from: https://git-scm.com/downloads
Install it, then restart your terminal

---

### **STEP 2: Initialize Git Repository**

In your project folder (`kalakriti-react`), run these commands one by one:

```bash
git init
```

This creates a Git repository in your project.

---

### **STEP 3: Add All Files**

```bash
git add .
```

This stages all your files for commit.

---

### **STEP 4: Create First Commit**

```bash
git commit -m "Initial commit: Complete Kalakriti art marketplace project"
```

This creates your first commit with all files.

---

### **STEP 5: Create GitHub Repository**

1. Go to **github.com** and login
2. Click the **"+"** icon (top right)
3. Click **"New repository"**
4. Repository name: **`kalakriti-react`**
5. Description: **"Indian Art Marketplace - React Application"**
6. Keep it **Public** (so you can show it)
7. **DON'T** check "Initialize with README" (you already have files)
8. Click **"Create repository"**

---

### **STEP 6: Connect to GitHub**

GitHub will show you commands. Copy and run these (replace `YOUR-USERNAME` with your actual GitHub username):

```bash
git remote add origin https://github.com/YOUR-USERNAME/kalakriti-react.git
```

```bash
git branch -M main
```

```bash
git push -u origin main
```

**If it asks for username/password:**
- Username: Your GitHub username
- Password: Use a **Personal Access Token** (not your GitHub password)

---

### **STEP 7: Create Personal Access Token (If Needed)**

If GitHub asks for password:

1. Go to: https://github.com/settings/tokens
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Note: "Kalakriti Project"
4. Expiration: 30 days
5. Check: **repo** (all repo permissions)
6. Click **"Generate token"**
7. **COPY THE TOKEN** (you won't see it again!)
8. Use this token as your password when pushing

---

## ✅ **VERIFY IT WORKED**

1. Go to: `https://github.com/YOUR-USERNAME/kalakriti-react`
2. You should see all your files!
3. Copy this URL - you'll show it in viva

---

## 🎯 **FOR YOUR VIVA**

**When they ask about GitHub:**

✅ **Say**: "Yes, my project is on GitHub. Here's the repository."

✅ **Show**: Open the GitHub URL in browser

✅ **Point out**:
- "Here are all my files"
- "This is the commit history"
- "The project is well-organized"

---

## 📝 **ADDITIONAL COMMITS (Optional - If You Have Time)**

If you want to show multiple commits (looks better):

```bash
# Make a small change (like updating README)
git add .
git commit -m "Add documentation for viva"
git push
```

```bash
# Another commit
git add .
git commit -m "Final touches before evaluation"
git push
```

---

## 🚨 **TROUBLESHOOTING**

### **Problem: "git: command not found"**
**Solution**: Install Git from https://git-scm.com/downloads

### **Problem: "Permission denied"**
**Solution**: Use Personal Access Token instead of password

### **Problem: "Repository not found"**
**Solution**: Check the repository name matches exactly

### **Problem: "Failed to push"**
**Solution**: 
```bash
git pull origin main --allow-unrelated-histories
git push origin main
```

---

## 💡 **QUICK COMMANDS REFERENCE**

```bash
# Initialize Git
git init

# Add all files
git add .

# Commit with message
git commit -m "Your message here"

# Add remote repository
git remote add origin https://github.com/YOUR-USERNAME/kalakriti-react.git

# Push to GitHub
git push -u origin main

# Check status
git status

# View commit history
git log --oneline
```

---

## 🎯 **WHAT TO SHOW IN VIVA**

1. **GitHub Repository URL**: `https://github.com/YOUR-USERNAME/kalakriti-react`

2. **Point out**:
   - ✅ All files are there
   - ✅ Organized folder structure
   - ✅ Commit history
   - ✅ README documentation

3. **Say**:
   "My project is version controlled using Git and hosted on GitHub. This shows my code organization and development process."

---

## ✅ **CHECKLIST**

Before viva, make sure:
- [ ] Project is pushed to GitHub
- [ ] You can access the repository URL
- [ ] All files are visible on GitHub
- [ ] You have the URL ready to show

---

## 🌟 **YOU'RE ALMOST DONE!**

Once your project is on GitHub:
1. ✅ You can show it in viva
2. ✅ It looks professional
3. ✅ You demonstrate version control knowledge
4. ✅ You have a backup of your work

**Good luck! 🚀**
