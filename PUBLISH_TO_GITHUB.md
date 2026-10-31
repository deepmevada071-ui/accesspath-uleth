# Publish this repository to GitHub

This folder is the publishable project root. It includes `dist/`, documentation, screenshots and video files. Do not upload only `dist/` if you want the report and README in the repository.

## Using GitHub CLI after signing in

From this folder, after `gh auth login`:

```sh
gh repo create accesspath-uleth --private --source . --remote origin --push
```

This creates a private repository first. To publish publicly, select public visibility when creating the repository, or review the repository's visibility setting afterwards. Public code and data distribution should preserve the source notices.

## Using an empty repository created on GitHub

Create a repository named `accesspath-uleth`. Leave the initial README, licence and gitignore options unchecked because these files already exist here. Copy the repository HTTPS URL from GitHub, then run from this folder:

```sh
git remote add origin YOUR_REPOSITORY_HTTPS_URL
git push -u origin main
```

Replace the placeholder with the URL GitHub provides. Authenticate through GitHub's normal sign-in or credential-manager flow; never put a token into a command or project file.

The README links to the report and media already committed under `docs/`. No additional attachment upload is required. Optional GitHub Pages instructions are in the README.
