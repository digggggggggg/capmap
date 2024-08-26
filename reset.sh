gh run list --json databaseId  -q '.[].databaseId' |
  xargs -IID gh api \
    "repos/$(gh repo view --json nameWithOwner -q .nameWithOwner)/actions/runs/ID" \
    -X DELETE
	
echo Resetting the repository...
rm -rf .git && git init && git add . && git commit -m "Initial commit" && git remote add origin git@github.com:diegoaltoworks/capmap.git && git push -u --force origin main

echo Initialising pristine dev branch...
git checkout -b dev && git push -f -u origin dev