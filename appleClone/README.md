# Apple Clone Project

A front-end clone of the Apple website homepage, built as a group learning exercise to practice **Git collaboration** (branching, pull requests, code review) and core **HTML/CSS** skills.

## 📋 Project Overview

This project recreates key sections of the Apple homepage, including:

- Header with navigation
- Hero banners (16-inch MacBook Pro, iPhone 11 Pro, iPhone 11)
- Product highlight sections (Watch Series 5, Card, TV+, AirPods Pro, MacBook Pro, iPad)
- Footer

Each team member was responsible for one section, worked on their own branch, and merged their work via pull request after review.

## 🗂️ Folder Structure

```
appleClone/
├── index.html
├── style.css
├── images/
│   └── (all image assets used in the page)
└── README.md
```

## 🚀 Getting Started (Local Setup)

1. **Clone the repository**

   ```bash
   git clone https://github.com/SisayNegashMengistu/appleClone
   cd appleClone
   ```

2. **Open the project**
   - Open `index.html` directly in your browser, **or**
   - Use a live server (recommended) so CSS changes reload automatically:
     - VS Code: install the "Live Server" extension → right-click `index.html` → "Open with Live Server"

3. **Make changes on your own branch**

   ```bash
   git checkout -b <your-task-branch>
   # e.g. git checkout -b header
   ```

4. **Stage, commit, and push your work**

   ```bash
   git add .
   git commit -m "Add header section with navigation links"
   git pull origin main
   git push -u origin <your-task-branch>
   ```

5. **Open a Pull Request** on GitHub, request a review, and merge once approved.

## 🌱 Branch Naming Convention

Branches are named after the section they implement, for clarity (e.g. `header`, `footer`, `banner-macbook-pro`, `airpods-section`).

## 🤝 Contributing (Team Workflow)

1. Pull the latest `main` before starting new work.
2. Work only within your assigned section to avoid conflicts.
3. Commit frequently with clear, descriptive messages.
4. Open a PR and request review before merging.
5. Resolve merge conflicts collaboratively — discuss with whoever touched the same file.

## 🛠️ Built With

- HTML5
- CSS3
- Git & GitHub (version control and collaboration)

## 👥 Team

| Section              | Contributor |
| -------------------- | ----------- |
| Header               | _name_      |
| Footer               | _name_      |
| MacBook Pro banner   | _name_      |
| iPhone 11 Pro banner | _name_      |
| iPhone 11 banner     | _name_      |
| Watch Series 5       | _name_      |
| Apple Card           | _name_      |
| Apple TV+            | _name_      |
| AirPods Pro          | _name_      |
| MacBook Pro (bottom) | _name_      |
| iPad                 | _name_      |

## 📄 License

This project is for educational purposes only (Evangadi Bootcamp practice exercise).
