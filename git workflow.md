🧠 Arcanum Primus Git Workflow Guide

Welcome, Dev! This guide explains how to contribute cleanly and safely to the Arcanum Primus Character Creator full-stack app.

Our goal is to build a D&D Beyond-style web platform for our custom TTRPG.To do that, we use a structured Git workflow:✅ You fork the repo, work on your own branch, and submit pull requests to the main project.

📁 1. Fork the Repository

Go to the official repo:🔗 https://github.com/djsodope/project_ap

Click “Fork” (top-right) to create your own copy under your GitHub account.

💻 2. Clone Your Fork to Local Machine

git clone https://github.com/your-username/project_ap.git
cd project_ap

🌿 3. Create a New Feature Branch

Always create a branch before making changes:

git checkout -b your-feature-name

Example branch names:

add-point-buy

refactor-sheet

fix-export-bug

🔄 4. Sync With the Main Repo (Upstream)

Keep your fork updated with the main repo (djsodope/project_ap):

git remote add upstream https://github.com/djsodope/project_ap.git
git pull upstream main

🛠 If there's a conflict, resolve it before continuing.

📂 5. Stage and Commit Your Changes

After you've made changes:

git add .
git commit -m "Clear and descriptive commit message"

✔ Keep commit messages meaningful and concise.

🚀 6. Push Your Branch to Your GitHub Fork

git push origin your-feature-name

🔁 7. Submit a Pull Request (PR)

Go to your GitHub fork

Click “Compare & pull request”

Set base repo: djsodope/project_ap

Set base branch: main

Title your PR clearly (e.g. Add stat point buy system)

Describe your changes, then submit the PR

✅ Best Practices for All Contributors

❌ Don’t commit directly to main

✅ Use branches for all new features or fixes

🧪 Test your changes before committing

🧹 Keep commits small and focused

🧠 Use GitHub Issues to suggest features or report bugs

🔐 Project Context

This is a full-stack app for the TTRPG Arcanum Primus. It will evolve into a full D&D Beyond-style toolkit.

Copilot and I have already built:

✅ React frontend

✅ PDF export (react-to-print)

✅ Point Buy stat system

✅ Working backend (Node.js + Express + MongoDB)

Future features include:

Character creation (roles, archetypes, stats, skills)

Full character sheet with level tracking and resources

Save/load characters to database (done but needs some reviewing)

Auth system (JWT or sessions) (done but needs some reviewing)


GM tools and FoundryVTT integration

Thank you for contributing to Arcanum Primus! 🌪️Let’s build something legendary together.