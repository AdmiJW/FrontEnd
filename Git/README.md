![Git](https://git-scm.com/images/logo@2x.png)

This is a note on git, as a reference for my future self, or for anyone that wants to use this.

<br>


# 1. VERSION CONTROL

* __Version control system (VSC)__ are softwares that help control (manage) the different versions of files, usually (but not limited to) source codes.

* Some common Version control systems:
    * __Git__
    * __Subversion__
    * __Mercurial__

* Version control systems can be categorized into 2:
    * __Centralized Model__
    * __Distributed Model__

* __Centralized model__ - All actions must go through the central computer/server. All users connect to central, master repository.

* __Distributed model__ - All clients will have complete copy of the project on their computer. This enables the ability to work offline or at remote areas, without connecting to the central server.

* Differences between Git and Github:
    * Git is a Version Control Tool, a VSC
    * Github is a service (by Microsoft) that host git projects

---

<br /><br /><br />

# 2. Terminologies

* __Version Control System (VCS) / Source Code Manager (SCM)__
    * Tool that manages different versions of source code (or files in general).
    * Git is a SCM, and therefore it is a VCS

* __Commit__
    * Everytime you perform commit, git takes a 'snapshot' of what the files look like at the moment, and stores the reference to that snapshot (so we can revert the changes later)

* __Repo (Short for Repository)__
    * Directory (folder) that contains all project work, as well as files that are used to communicate with git (.git folder)

* __Working Directory__
    * Files that we see in our computer system. In other words, it is what we can see in our current file system. This is in contrast with the files saved as commits in the repository

* __Checkout__
    * When contents in repository is copied to the working directory, it is called checkout. This is especially common in branches. When we checkout a branch, it is basically taking that branch's commit out and put into working directory

* __Staging Area/ Staging Index/ Index__
    * A file in the git directory, which stores information about what shall go into the next commit. It is ike the preparation table that Git will take all the stuffs on it into the next commit.

* __SHA (Secure Hash Algorithm)__
    * ID number for each commit. Calculated based on the contents of a file or directory along with the timestamp and directory structure in Git, using some hashing algorithm. SHA is usually 20 hexadecimal literals long, but for simplicity's sake, git usually only show, and we usually only use the 7 first characters.

* __Branch__
    * New line of development created that diverges from the main line of development

---

<br /><br /><br />

# 3. Creating Repositories

## __Basic Command Line Commands__

* First let's learn some cmd commands first:

|   Commands    |   Description     |
| ------------- | ----------------- |
| `ls`          | List files and directories in the current working directory of the cmd (Not working directory of git!) |
| `mkdir`       | Creates a new directory based on the name provided |
| `cd`          | Change directory. Use Relative path `./path` or absolute path `/D/My Desktop` is applicable |
| `rm`          | Removes file and directories |
| `pwd`         | Print working directory   |

<br /><br /><br />

## __Creating Repository from Scratch__

* To create a repository, we use 
    ```git
        git init
    ```
    It sets up all the necessary files and directories that Git will use to keep track of the changes. They are in the *.git* directory, which contains the whole git repository (Hidden by file explorer by default)

* Inside the *.git* directory (Our repository), we can see:

| File | Description |
| ---- | ----------- |
| *config* | Project specific configuration settings, like our email and username |
| *description* | Used by GitWeb only. We can ignore it |
| *hooks* | Place client-side or server-side scripts that serves to hook Git into different lifecycle events |
| *info* | Global excludes file |
| *objects* | Stores all the commits we made. The actual folder that stores the changes |
| *ref* | Holds the pointers to the commits, both branches and tags |

<br /><br /><br />

## __Cloning a Repostiory__

* To clone a git repository instead of creating a new empty one, use
    ```git
        git clone <url>
    ```
    It clones the directory in the url into the current working directory. It is going to create a single directory consisting of the repository. __Remember we can't have nested Git repositories!__

* Instead of using the name of repository cloned, we can specify our own name for the cloned repository by
    ```git
        git clone <url> <name>
    ```

<br /><br /><br />

## __Checking Status of Git__

* A most important command of git is the one that checks and gives information about current state:
    ```git
        git status
    ```
    It tells us about the state of our repository, displaying information about the working directory, staging area and the repository itself.

```git
    on branch masater
    Your branch is up-to-date with 'origin/master'
    nothing to commit, working directory clean
    Initial commit
```

| Status | Description |
| -------| ----------- |
| `on branch master` | We are currently on the master branch |
| `Your branch is up-to-date with 'origin/master'` | This is only seen when our repository is cloned or we had setup remote repository. This means the local repository is currently in sync with the remote repository |
| `nothing to commit, working directory clean` | There is nothing in the staging area. No changes (untracked files) as well in the working directory |
| `Initial commit` | There are no past commits in the repository |

---

<br /><br /><br />

# 4. Repository's History

* Each commit entry has a
    * Date / Timestamp
    * Content changes (Exactly what is changed)
    * Heading (Description that we give. Like the title of the commit)

* To display information about past commits, we use either
    * `git log`
    * `git show`


<br /><br /><br />


## __Basic Git Log__

* `git log` shows the following information:
    * Secure Hash Algorithm (SHA) of the commit
    * Author - Username and email
    * Date / Timestamp
    * Description and Header (Title) of commit

* Git bash uses the *terminal pager program* called __less__. When we use `git log` and there is more information than the cmd window can fit, we will have to scroll it using __less__ controls. A colon sign `:` at the bottom left of the bash indicates there is more log entries to show.

* Pager - A program to page through content. The command line equivalent way to scrolling.
    * Use J or down Arrow to scroll down
    * Use K or up Arrow to scroll up
    * Use Q key to quit back to the cmd prompt

* A __flag__ is an indicator we use to alter how a program shall function. Usually double dash is used for full form, and single dash is used for short form. For example, `--all` and `-a` are the same thing

  
* We can use a flag to change how a git command displays information.
    * Eg: `ls` lists all the files and directories. By adding a `-l` flag after it, `ls -l` will list the files and directories in longer version.

* ```git
    git log --oneline
  ```
  will display each commit in one line only (Simplified version). It will only display the SHA (front 7 literals) along with its description.

* `git log` will only show basic messages. It will not show any detailed information about the commit itself. To make it show, we have to use the flag `--stat` (short for statistics)
    ```git 
        git log --stat
    ```
    It will show the summary of the files changed: 

    * How many files are involved in this change
    * How many insertions and deletions in overall among all files

    Here's an example of an output line:

    ```git
        index.html | 118 +++++++++-----------
    ```

    Means 118 lines are either added or deleted in the index.html


<br><br><br>

## __More on Git Log__

* To dig deeper into `git log` to see exactly what content is added or deleted, this is done by using the flag `-p` or `--patch`
    ```git
        git log -p
        git log --patch
    ```

* Remember: git track file changes by lines. If I make some change to a line, it is equivalent to:
    * Removing that original line
    * Add the modified line

* Let's see a sample `git log -p` output:
    ```git
        diff --git  a/index.html b/index.html
        index d55f412..a312753
        --- a/index.html
        +++ b/index.html

        @@ -15, 83  +15, 85  @@
        - lorem ipsum
        + Lorem Ipsum
    ```

    | Sample | Description |
    | ------ | ----------- |
    | `diff --git a/index.html b/index.html` | shows the file before and after the commit. Usually it is the same file if it was just editing. `a` and `b` is just the before and after put by Git |
    | `index d55f412..a312753` | Hash of the first and second version of the file |
    | `--- a/index.html +++ b/index.html` | Shows the old and current version of the file |
    | `@@ -15, 83  +15, 85 @@` | It shows which lines were modified. `-15, 83` means the old version starts at line 15, and has 83 lines. `+15, 85` shows the new version starts at line 15, and has 85 lines. |
    | `- lorem ipsum + Lorem Ipsum` | Shows the exact changes in the file. Those preceded with - are deletions. Those preceded with + are additions. |

* To prevent scrolling very far to find a particular commit, we can companion the `-p` flag with the [first 7 characters] SHA of the commit itself, which is easily found using `git log --oneline`
    ```git
        git log -p <SHA>
    ```

<br><br><br>

## __Git show__

* `git show` is very similar to `git log`, except it only shows one particular commit.
* If it is used by itself, it will show the most recent commit details, same format as `git log -p`
* We can provide it a SHA argument to show the details of that particular SHA commit
```git
    git show <SHA>
```

* Here are some flags that can be used
    * `--stat`  to show count of files changed, count of lines added or removed
    * `-p / --patch`. It is the default, but needs to be applied when used with `--stat` to show details
    * `-w` to ignore whitespace changes

---

<br><br><br>

# Adding Commits to Repository

## Git add

* When we first initializes our git repository or make changes to the existing repository, the files are untracked by git. We need to move the file into the __stagging index / staging area__ to tell git to track the changes we've made.

* For this purpose, `git add` is used to move files from the working directory (Both untracked & modified) into the staging index

```git
    git add <filename> <filename2> ...
```

* After adding files into the staging area, running `git status` will show:
    ```git
        Changes to be committed:
            ...
    ```
    This shows exactly what files are in the staging area, which will be committed if we perform a commit

* We could use a period `.` sign as a wildcard, moving all files (Both modified or untracked) into the staging area.
    ```git
        git add .
    ```

    We could also use asterisk `*` sign as a wildcard. For example, moving all files with the same extension into the staging area.
    ```git
        git add *.html
    ```


* Bonus: git also shows how to remove files from staging area back into working directory. Done via:
    ```git
        git rm --cached <filename> <filename>...
    ```

<br><br><br>

## __Git Commit__

* We use `git commit` to push files from the staging area into the repository, creating a snapshot.
    ```git
        git commit
    ```
    using this command will cause the text editor to pop up and waiting for us to done typing in the description message. We need to save the message then close the editor window to commit

* To bypass the whole 'opening text editor and typing message' part, we could use the `-m` flag which let's us type the message directly after the flag itself
    ```git
        git commit -m <message>
    ```

* A commit shall have a __single__ focus only. It shall record a single unit change, like *'Added Header'* or *'Changed Background color'*. It shall not include any unrelated changes or complex changes (2 or more changes that are unrelated), like *'Reworded Footer AND changing sidebar'*. These 2 changes are unrelated, and shall be seperated into 2 different commits. The reason for this practice is so that if we need to undo a change, we won't affect the other change. __Think: If this commit is erased, it shall only erase only one change!__


<br><br><br>

## __Commit Messages__

* Always keep commit messages short (<60 words)
* Always explain briefly __WHAT__ the commit does

<br>

* __DON'T__ explain why the change is applied (Do that in description part!)
* __DON'T__ explain how the change is applied (This is done via `git log -p`)
* __DON'T__ use the keyword __AND__ (Eg: 'Added footer AND changed background')

<br>

* WHen we edit the commit message in text editor, we put the header message (The title), then we place a blank line, then only it is the place for us to put the detailed description (The __WHY__ of this change is applied)

```git
    feature: Added a section to show the products on Home Page

    I've added a section which displays the product image, product
    name and product prices. At the end of this section, it also
    has a large button and text which serves as Call To Action to
    the visitors
```


<br><br><br>

## __Git Diff__

* `git log` is useful to see and compare differences in commits. However, what if we haven't commit a change, and want to see the differences between the files currently in Staging Area and the last commit?
    ```git
        git diff
    ```

*   `git diff` shows all the differences between the last commit with the files currently in the Staging Area. It will show in the exact same format as `git log -p`


<br><br><br>

## __Git Ignore__

* `.gitignore` is not a git command. Instead, it is a text file that we put in the same directory as the one with the `.git` repository to tell git to ignore certain files, such that git does not and never track those files.

* If we have many files to include in gitignore, which shares certain common properties (Like they are all in same folder, or same file extension like .docx), we will need to use __globbing__. __Globbing__ specifies special characters in the file name to match for pattern / characters.
    *   Blank lines are used for spacing, and ignored in gitignore
    *   `#` are used for comments
    *   `*` matches 0 or more characters
    *   `?` matches exactly 1 characters
    *   `[abc]` matches a, b or c
    *   `**` matches any nested directories. Eg: `a/**/z` will match all `a/z`, `a/b/z`, and `a/b/c/z`

```git
    toDoList.docx

    Resources/Image
    Resources/Video/*.mp4
    Resources/**/*.jpg
```

---

<br><br><br>

# Tagging, Branching, Merging and Rebasing

## __Git Tag__

* Git tag is a special kind of message for a particular commit, indicating some special information about this commit, something like *This is v1.0 release*

```git
    git tag -a <tagname>
```

* A good practice is to use the `-a` flag. This creates a annotated tag, which includes some extra information 
    * Author of the tag
    * Timestamp of the tag
    * Message

* If no `-a` tag is applied, it makes a lightweight tag, without those above information. 

* Upon calling the above command, the code editor will open, and we will type in the tag description (message)

* To see all the existing tags on this branch, use
    ```git
        git tag
    ```

* In the `git log` command, it is defaulted to always show the tags. On the older versions of git, we would use the `--decorate` flag to see tags in logs
    ```git
        git log --decorate
    ```
    The tag will be displayed at the end of the Secure Hash Algorithm (SHA) itself

* To delete a tag, just include the `-d` flag
    ```git
        git tag -d <tagname>
        git tag --delete <tagname>
    ```

* We might want to apply tags to the past commits, not on the most recent one. In that case just specify the SHA hashcode of that commit
    ```git
        git tag -a <tagname> <SHA>
    ```

<br><br><br>

## __Git Branch__

* A tag is a permanent pointer that points to a particular commit, and never moves.

* A branch, on the other hand, is a pointer that points to the most recent commit made on the active branch. When a commit is made on that branch, the branch pointer moves to the newest commit

* Inside a git repository, We have one and only one __HEAD__ pointer, which points to the current active branch. All the files in the working directory is the files in the branch that the HEAD pointer is pointing to. Upon commit, changes will only be applied to the branch that the HEAD pointer is pointing to. Other branches will not be affected.

* ```git
    git branch
    ```
    shows all the existing branches in the repository. The one branch with the asterisk sign * shows the current active branch, pointed by the HEAD pointer. By default we only have one branch which is `master` (or `main`) branch

* ```git
    git branch <branchName>
    ```
    will create a new branch from the most recent commit in the current active branch.

* ```git
    git checkout <branchName>
    ```

    will switch us to another branch. It basically moves the HEAD pointer to the most recent commit of another branch. What this does is basically:
        
    1. Remove all the files that are currently in Working Directory (By remove it doesn't mean the files are gone. They are in the repository remember?)
    1. Pull out the files and directories from the repository belonging to that branch, and put those into the working directory

* Similar to creating tags, if we want to create a branch off a past commit, not the most recent one, specify the SHA
    ```git
        git branch <branchName> <SHA>
    ```

* To delete a branch, use the `-d` flag
    ```git
        git branch -d <branchName>
    ```

* Above deletion command only works if the branch has no individual commits. If it does, we have to force deletion by capitalize the flag
    ```git
        git branch -D <branchName>
    ```

* Wouldn't it be nice if we are able to see all the commits of all the branches in nice representation? Use the `--graph` and `--all` flag in `git log`
    ```git
        git log --oneline --graph --all
    ```

    * `--graph` adds bullets and lines to the left part of output, such that it looks like a actual graph
    * `--all` tells `git log` to show all the branches, not just the current active branch.

<br><br><br>

## __Git Merge__

* Combining branches is called __merging__

* There are two types of merges:
    1. Regular merge
    1. Fast-forward merge

* Merging will affect the current active branch (The branch that we are working on, the one pointed by HEAD pointer). The other branch will not be affected.

* A fast forward merge is a special kind (and simplest) kind of merge. Say we just have a branch that is ahead of the active branch. Something like this:
    ```
             ( )---( )---( ) another branch which is ahead
            /                of active branch
        ( ) master branch
    ```
    Now merging the ahead-branch in the master branch will __just move the pointer of master branch to the most recent commit in the ahead-branch__. No new commits will be made. 

* A regular merge works by __creating a new merge commit__, which the changes in both master branch and another branch is included.

    ```
           ( )---( )---( )  sub branch
          /               \
        ( )---( )---( ) >>> (!) <- Merging will make a new commit
    ```

* To undo a merge, simply use
    ```git
        git reset --hard HEAD^
    ```
    (Will be covered in later section)

* Now, to perform a merge, first set the current active branch, then
    ```git
        git merge <branchName>
    ```
    What happens is:
    1. Git will look at the branches that it will be merging
    1. Look back at the branch's history to find the single commit that both have in common (The splitting part)
    1. Combine lines of code that are changed on the seperate branches, together
    1. Makes a commit for the change

<br><br><br>


## __Git Rebase__

* When we want to include the changes from another branch into our current active branch, we primarily have 2 choices:

    1. `git merge`
    1. `git rebase`

* Imagine we are working on a large project with many collaborators. We are working on the `feature` branch, and there are frequent commits to the `master` branch made by other collaborators. We want to include the updates from the `master` branch into our `feature` branch. 

    ```
    master ( M1 ) - ( M2 ) - ( M3 ) - ( M4 ) - ( M5 ) - ( M6 )
                \
    feature     ( F1 ) - ( F2 )
    ```

* In that case, we can use `git merge master` from the `feature` branch. This will create a new commit:
  
    ```
    master ( M1 ) - ( M2 ) - ( M3 ) - ( M4 ) - ( M5 ) - ( M6 )
                \                                            \ 
    feature     ( F1 ) - ( F2 ) ---------------------------- ( MERGE )
    ```

    However, if the `master` branch is updated frequently, this can easily result in a lot of __merge commits__, polluting our commit history. Some developers might find this annoying and unfavorable.

* Therefore, `git rebase` can also achieve the same result - to include the changes from the `master` branch into our `feature` branch, without creating merge commits, __by rewriting the commit history__.

    __Before `git rebase master`__
    
    ```
    master ( M1 ) - ( M2 ) - ( M3 ) - ( M4 ) - ( M5 ) - ( M6 )
                \
    feature     ( F1 ) - ( F2 )
    ```

    __After `git rebase master`__
    
    ```
    master ( M1 ) - ( M2 ) - ( M3 ) - ( M4 ) - ( M5 ) - ( M6 )
                                                            \
    feature                                                 ( F1 ) - ( F2 )
    ```

* Essentially, git will perform the following:

    1. Undoes all the commits from the `feature` branch ( F1 and F2 )
    2. Performs the commits of the `master` branch ( M2, M3, M4, M5, M6 )
    3. Tries to redo the commits from the `feature` branch ( F1 and F2 ). If merge conflicts occur, you will have to resolve them manually.

* Due to this reason, commits has a new SHA after rebasing. The commits are rewritten with a new base.

* Therefore, `rebase` should only be used when you are sure that the commits in the branch you are rebasing is not shared with other collaborators. This is because rewriting the commit history will cause the SHA to change.


# Merge Conflicts

* Merge conflict occurs when git is unable to perform a merge
* Git track files by lines. When the exact same line(s) are changed in seperate branches, when we run `git merge <branch>` we will see the conflict and merge will end up failing
    ```
            change header to 'Info of me'
             ( ) ----
            /        \      Conflict occurs!
        ( ) --- ( ) --( ! )
             change header to 'About me'
    ```

* When we ran into merge conflicts, we would do `git status` first, to see the unmerged files.
    ```
        You have unmerged path
            (fix conflicts and run "git commit")
            (use git merge --abort to abort the merge)
        Unmerged Paths:
            (use git add <file>... to mark resolution)

            both modified: index.html
    ```
    We can see that `index.html` is the one file that causes merge conflict. We would now open `index.html` in code editor to fix the conflict

* Merge conflict indicators (Shown in the source code once conflict occurs):

    | Indicators | Description |
    |------------|-------------|
    | <<<<<HEAD | Everything below this line until next indicator is what the original lines looks like in current active branch |
    | \| \| \| \|merged common ancestors \<SHA\> | Everything below this line until next indicator is what the original lines looks like in the common ancestor commit (The one commit before branching occurs) |
    | ======== | End of original lines. Everything below shall be the lines of the sub branch we are merging |
    | >>>>>>\<branch-name\> | Ending indicator. Above this is the lines that are in the branch that are being merged |

    Example of changes in `index.html`:

    ``` 
                    <h1>Quest</h1>
         ------------------- (  )------------------
        /           <h1>Crusade</h1>                \
    ( ) ---------------------(  ) --------------------( ! )
    <h1>Adventure</h1>
    ```
    Example of the `index.html` lines after merging:
    ```git
        <<<<<HEAD
            <h1>Quest</h1>
        ||||||||| merged common ancestors
            <h1>Adventure</h1>
        ============
            <h1>Crusade</h1>
        >>>>>>>>>>> heading-update
    ```

* To resolve the conflict, just
    * Choose which lines to keep
    * Remove unwanted lines, including the indicators. __If indicators aren't removed, they will be added in the next commit!__


<br><br><br>

---

# Git Stash

> `git stash` temporarily shelves (or stashes) changes you've made to your working copy so you can work on something else, and then come back and re-apply them later on.

* `git stash` works like a Stack - in Last in First out order.

* To see the list (stack) of the stash, use `git stash list`

* To save our changes to the stash, we can use `git stash push <message>` or `git stash save <message>`

* To apply the changes from the stash, we can use `git stash apply <stash@{n}>`. This does not remove the stash from the stack. 

* To apply the changes of the most recent (top of stack) stash, use `git stash pop`. Note that this will remove the topmost stash from the stack.

* To remove a stash and discard the changes that are made, use `git stash drop <stash@{n}>`

* To entirely clear the stash, use `git stash clear`


---
<br><br><br>


# Undoing Changes

## __Modify Last Commit__

* Using git commit with `--amend` flag, we can alter the most recent commit
    ```git
        git commit --amend
    ```

* Changing git messages is easy. Type the above command, and the code editor will pop up, letting us type the message for that commit.

* Let's say we forgot to include certain changes in our last commit. We will make the changes in current working directory, add them to the staging index and then run `git commit --amend` to include this change in the most recent commit.

<br><br><br>

## __Reverting Commit__

* If you are simply looking to review the working directory's state in previous commits, you simply have to use the familiar `checkout` option.
```
    git checkout <SHA>
```

* Then, if you want to go back to the current commit where the HEAD pointer is, simply use:

```
    git checkout main   
```

* __Reverting__ a commit is undoing the changes, but a new commit is created. In other words, a commit is made to revert the changes done in the last or previous commit.

```git
    git revert <SHA>
```

<br><br><br>

## __Resetting A Commit__

* __Reverting__ a commit creates a new commit that reverts the previous commit

* __Resetting__ erases actual commits from the repository itself, so it is potentially dangerous

* First, let's see about __Relative Commit References__. Relative commit references are a way to reference a particular commit other than using SHA itself. We can reference commits based on the current commit pointer (the HEAD pointer), using __ancenstry references__.
    | Symbol | Description |
    |--------|-------------|
    | `HEAD` | The head pointer |
    | `^`    | Parent commit |
    | `~`    | First parent commit |
    | `^2`   | Second parent commit (Used on merged pointers) |

    ```git
            (B)----(C)   < When merging, C is the active branch
        /           \
        (A)             (F)----(G)----(H) < HEAD
        \           /
            (D)----(E)
    ```
    | Commit | How to reference |
    |--------|------------------|
    | G | `HEAD^`, `HEAD~`, `HEAD~1` |
    | F | `HEAD^^`, `HEAD~2`, `HEAD~^` etc |
    | C | `HEAD^^^`, `HEAD~3`, `HEAD~2^` etc|
    | B | `HEAD^^^^`, `HEAD~4`, `HEAD~3^` etc |
    | E | `HEAD^^^2`, `HEAD~2^2` etc |
    | D | `HEAD~2^2~`, `HEAD~2^2^` etc |


* Now that we know about relative commit references, we can perform reset commands with those references.
* Resetting will have 3 types of flags:
    * `--mixed`
    * `--soft`
    * `--hard`
    ```git
        git reset <flag> <destinationCommit>
    ```

* All 3 of above resets will move the HEAD pointer and current branch pointer back until the destinationCommit specified using relative commit reference

* `--mixed` is the default (If flag isn't specified), will erase the commit, but the changes of that erase commit will still be in the working directory. If we perform `git status`, it will show those changes as `modified`

* `--soft` is very similar to `--mixed`, except that instead of the changes being in working directory, it will be already in the staging area, ready to be committed.
* `--hard` will directly throw those commits into trash. Our files in the working directory will revert back to the state of the destinationCommit. Basically all changes are discarded.
