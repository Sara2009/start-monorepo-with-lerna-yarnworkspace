# start-monorepo-with-lerna-yarnworkspace
The skeleton of monorepo project with lerna and yarn workspace. 

## Prepare
Yarn is needed for managing the dependencies of this monorepo project. So prepare to install yarn before getting start. Refer to this [Installation Document](https://classic.yarnpkg.com/en/docs/install/).
```bash
# or use npm
npm install yarn -g
```


## Get Start
1. Clone this project as skeleton repo.
```bash
git clone git@github.com:Sara2009/start-monorepo-with-lerna-yarnworkspace.git
```
2. Install [Lerna](https://github.com/lerna/lerna) globally (recommend).
```
npm install -g lerna
```
3. Install dependencies.
The dependencies of the project will be installed at the repo root. So they're available to all packages.
```bash
# use npm
npm run bootstrap
# or use yarn
yarn install
```
Then the project is initialized successfully. 

## Create a package
Use `lerna create <package-name>` to create a new package. This is our project structure:
- src: source code.
- lib: the commonjs2 format code.
- es: the esm format code.
- dist: the umd format code.
```
.
├── node_modules
├── packages
│   ├── module1
│   │   ├── __tests__
│   │   ├── src
│   │   ├── lib
│   │   ├── es
│   │   ├── README.md
│   │   └── package.json
│   ├── module2
│   │   ├── __tests__
│   │   ├── src
│   │   ├── dist
│   │   ├── es
│   │   ├── README.md
│   │   └── package.json
│   └── ...
├── scripts
├── .eslintrc.js
├── .gitignore
├── .prettier
├── commitlint.config.js
├── lerna.json
├── LICENSE
└── package.json
```
## Add dependencies
### external dependencies
Run `yarn add <package-name> -W` to install external depenencies at the repo root. 

### local dependencies
If packages/module2 depends on the packages/module1, a symlink is needed. Lerna analyzes the packages and automatically creates the required npm links between them.
```bash
# use lerna
# Install module1 to module2
lerna add module1 --scope=module2
```
We can also use yarn to install local dependencies. But refer to this [issue](https://github.com/yarnpkg/yarn/issues/4878), `yarn workspace <workspace-name> add <package-name>` is failed unless specifying the exact version of the local package.
```bash
yarn workspace module2 add module1@0.0.0
``` 
Or just write the dependency in the package.json of module2.
```json
// packages/module2/package.json
{
    "dependencies": {
        "module1": "^0.0.0"
    }
}
```
Then run `yarn install` at the repo root.

## Git commit
Use `git-cz` to replace `git commit`. Execute `npm run commit` to submit. We use [commitlint](https://github.com/conventional-changelog/commitlint) to check if your commit messages meet the [conventional commit format](https://www.conventionalcommits.org/en/v1.0.0/).
```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

## Update version
```bash
npm run version
# or use lerna
lerna version
```
`lerna version` supports semver keyword.
## Publish
```bash
npm run publish
```
Lerna will automatically run `prepublish` script before it. So we can configure the build command with `npm run prepubish`.
## CI (TO DO)
Execute `npm run version` locally and then a git tag will be pushed. The CI will execute `npm run publish` after a git tag hook.




