//Any of the commands can be open a documentation by using --help
//Eg:	git commit --help


git init
	// Initializes a repository. This is done on a folder

git add <filenames>
	//	Add files to the staging area. We could use just a dot to add all the changed and untracked files,
	// 	or select individual files seperated by space, like so:
	//		git add index.html style.css script.js		( Add 3 files)
	//
	//	Also we could use wildcard selector * as so:
	//		git add *.txt 		(which adds all txt files)

git rm
	//	Removes files from staging area (Maybe we want to commit in different groups?)

git status
	//	To check the status of the working tree of current branch.
	
git log
	//	To see the logs of commits made in the past on the current branch (Different branch will have different logs).
	//	Most importantly it shows the hashcode which we can use to go back into previous versions.

git commit 
	//	Commit changes
	// 	A handy shortform is to use git commit -m 'Message here'
	
git remote
	//	Default use to list the remote repository
	//	We could use this command to add a new remote repository as well as remove etc..

git push 
	//	Pushes the commit changes into the remote repository. Long version is
	//		git push <remoterepo Name> <remote branchName>

git pull 
	//	To pull changes to local repository. Any changes on remote repository will be download and applied on local repository

git clone
	//	Clones a repository into local repository. By default will create a new folder of repository for you

git branch
	//	By default shows the branches we are on, and other branches available
	//		git branch <branchName>	will create us a new branch from current one
	
git checkout <branch>
	//	To move the head (Current position) to the specified branch.
	//		git checkout <hashCode>			will bring us back into previous commits where hashCode is viewed from git log
	
git merge <branchName>
	//	To merge the current branch with the specified branchName

