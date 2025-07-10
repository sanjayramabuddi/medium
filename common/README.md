# @kiddo/medium-common

Shared Zod schemas and types for the Medium clone project.

## Steps to Initialize

### 1. Create a new folder and initialize a TypeScript project

```bash
mkdir common
cd common
npm init -y
npx tsc --init
```

### 2. Update tsconfig.json

```
{
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist",
    "declaration": true
  }
}
```

### 3. Sign up or log in to npmjs.com

```
npm login
```

### 4. Update package.json

```
{
  "name": "@kiddo/medium-common",
  "version": "1.0.0",
  "description": "",
  "main": "dist/index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

### 5. Create .npmignore and add:

```
src
```

### 6. Install Zod

```
npm i zod
```

### 7. Add all types and schemas in src/index.ts

* signupInput / SignupInput
* signinInput / SigninInput
* createPostInput / CreatePostInput
* updatePostInput / UpdatePostInput

### 8. Build the project

```
tsc -b
```

### 9. Publish to NPM

```
npm publish --access public
```