# 1. Navigate to the Evangadi folder on Desktop

cd ~/Desktop/Evangadi

# 2. Create BashPractice folder

mkdir BashPractice

# 3. Create BashTest subfolder inside BashPractice

mkdir BashPractice/BashTest

# 4. Create myTextFile.txt inside BashPractice

touch BashPractice/myTextFile.txt

# 5. Add Hello bash to the file using echo

echo Hello bash > BashPractice/myTextFile.txt

# 6. Rename myTextFile.txt to myTextPractice.txt

mv BashPractice/myTextFile.txt BashPractice/myTextPractice.txt

# 7. Change permission to 776

chmod 776 BashPractice/myTextPractice.txt

# 8. Delete the BashTest folder and everything inside it

rm -rf BashPractice/BashTest

<!-

1. echo "Hello bash" > file.txt overwrites the file with that line. If you wanted to append instead of overwrite, you'd use >>. Since the file was just created empty, either works the same here.
2. chmod 776 means: owner = read/write/execute (7), group = read/write/execute (7), others = read/write (6).
3. rm -rf removes a folder and its contents recursively (-r) without confirmation prompts (-f) — use carefully.
   -->

# Question 2) Group Activity on Git

# 1. Setting up a Repository, Cloning, and Collaborating

# Steps 1–2: Repo setup and cloning

# These are done through the GitHub website (creating the repo, inviting collaborators) and then each member runs:

cd ~/Desktop/Evangadi
git clone https://github.com/<leader_username>/appleClone.git
e.g git clone https://github.com/sisaynegashmengistu/appleClone.git
cd appleClone

# Step 3: Branching and working on your task

# Create and switch to your task branch

git checkout -b header # example: branch name matches your task eg. header

# ... make your changes to the files ...

# Stage your changes

git add .

# or stage a specific file:

git add index.html

# Commit with a descriptive message

git commit -m "header section with navigation links task completed"

# must done before pushing

# Before pushing, pull the latest changes from main to avoid conflicts

git checkout main
git pull origin main
git checkout header
git merge main # or: git rebase main

# Push your branch to GitHub

git push -u origin header

# Step 4: Pull Request and merge

1. Open a PR on GitHub from your branch into main.
2. The leader/team reviews, comments, and requests changes if needed.
3. Once approved, the leader merges the PR (usually via "Merge" or "Squash and merge" on GitHub).
