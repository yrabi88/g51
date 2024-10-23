### TODO: LEARN
- [next config.js | output](https://nextjs.org/docs/pages/api-reference/next-config-js/output)
- nextjs caching + data fetching + dynamic routes
- how to write tests for frontend
- nextjs SSR + streaming
- authentication with iam

### TODO
- infra: dockerfile todos
- infra: pass .env file to image. See: [docker | env_file](https://docs.docker.com/compose/how-tos/environment-variables/set-environment-variables/#use-the-env_file-attribute)
- infra: use service account without key

providing service-account key to local dev server:
https://cloud.google.com/docs/authentication/provide-credentials-adc#local-key

key path:
/Users/yakir/mydev/maftehot/garage51-d47fb3e0f17d.json

firestore:

database ID: garage51-db
region: europe-west1

rules:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

Firestore roles here:
https://cloud.google.com/firestore/docs/security/iam

service account
roles:
  - roles/datastore.user

```
// build image:
docker build -t gta .

// run container:
INNER_PORT=3000 && docker run \
--name gta-ctr1 \
-d \
-p 3001:$INNER_PORT \
-e PORT=$INNER_PORT \
gta

// run "idle" container (override entrypoint)
docker run -d --name gta-idle1 --entrypoint sh gta -c "tail -f /dev/null"
docker exec -it gta-ctr /bin/sh

// stop and remove container
CTRNAME=gta-ctr1 && docker stop $CTRNAME && docker rm $CTRNAME

// flag for cloud platform
--platform linux/amd64
```

endpoint:
https://garage51-368097635893.europe-west1.run.app

# Apps Todo
* goodstuff - recommend movies, music, tv shows
* watchlist
* shmoney - expense manager

# Notes

### Region
```
[20] europe-west3
To make this the default region, run `gcloud config set run/region europe-west3`.
To unset:, run `gcloud config unset run/region`.
```

g51 - firestore
https://console.cloud.google.com/firestore/databases/-default-/data/panel/cats/siamo?project=garage51&inv=1&invt=AbeDiA

g51 - shmoney local
http://localhost:3000/shmoney

links:
- https://www.npmjs.com/package/clsx
- https://cloud.google.com/run/docs/quickstarts/frameworks/deploy-nextjs-service
- https://firebase.google.com/codelabs/firebase-nextjs#1
- https://daily.dev/blog/next-js-graphql-integration-basics#creating-graphql-server-optional
- https://firebase.google.com/docs/projects/learn-more#project-id
- https://firebase.google.com/docs/firestore/security/get-started


This project was setup using this guide:

https://cloud.google.com/run/docs/quickstarts/frameworks/deploy-nextjs-service

project ID: garage51
project Number: 368097635893

Ran the following commands:

```
// enable apis
gcloud services enable run.googleapis.com \
    cloudbuild.googleapis.com

// add iam policy
gcloud projects add-iam-policy-binding garage51 \
    --member=serviceAccount:368097635893-compute@developer.gserviceaccount.com \
    --role=roles/cloudbuild.builds.builder

// create nextjs app (see full nextjs setup below)
npx create-next-app@latest g51-nextjs --use-yarn
```

```
// Full nextjs setup:
$ sudo npx create-next-app@latest g51-nextjs --use-yarn

✔ Would you like to use TypeScript? … Yes
✔ Would you like to use ESLint? … Yes
✔ Would you like to use Tailwind CSS? … Yes
✔ Would you like to use `src/` directory? … No
✔ Would you like to use App Router? (recommended) … Yes
✔ Would you like to customize the default import alias (@/*)? … No
Creating a new Next.js app in /Users/yakir/mydev/garage51/g51-nextjs.

Using yarn.

Initializing project with template: app-tw 


Installing dependencies:
- react
- react-dom
- next

Installing devDependencies:
- typescript
- @types/node
- @types/react
- @types/react-dom
- postcss
- tailwindcss
- eslint
- eslint-config-next

yarn install v1.22.22
info No lockfile found.
[1/4] 🔍  Resolving packages...
warning eslint@8.57.1: This version is no longer supported. Please see https://eslint.org/version-support for other options.
warning eslint > @humanwhocodes/config-array@0.13.0: Use @eslint/config-array instead
warning eslint > file-entry-cache > flat-cache > rimraf@3.0.2: Rimraf versions prior to v4 are no longer supported
warning eslint > file-entry-cache > flat-cache > rimraf > glob@7.2.3: Glob versions prior to v9 are no longer supported
warning eslint > file-entry-cache > flat-cache > rimraf > glob > inflight@1.0.6: This module is not supported, and leaks memory. Do not use it. Check out lru-cache
 if you want a good and tested way to coalesce async requests by a key value, which is much more comprehensive and powerful.                                       warning eslint > @humanwhocodes/config-array > @humanwhocodes/object-schema@2.0.3: Use @eslint/object-schema instead
[2/4] 🚚  Fetching packages...
[3/4] 🔗  Linking dependencies...
[4/4] 🔨  Building fresh packages...
success Saved lockfile.
✨  Done in 18.92s.
Success! Created g51-nextjs at /Users/yakir/mydev/garage51/g51-nextjs

```





```
// Bug to report

 $ npx create-next-app@latest g51-nextjs    



Success! Created g51-nextjs at /Users/yakir/mydev/garage51/g51-nextjs


Aborting installation.
Unexpected error. Please report it as a bug:
 Error: EACCES: permission denied, open '/Users/yakir/Library/Preferences/create-next-app-nodejs/config.json.tmp-8141468725083514'
    at openSync (node:fs:581:18)
    at attempt (/Users/yakir/.npm/_npx/cc2145a2fe1558fa/node_modules/create-next-app/dist/index.js:8:43165)
    at Object.writeFileSync (/Users/yakir/.npm/_npx/cc2145a2fe1558fa/node_modules/create-next-app/dist/index.js:8:38664)
    at Conf._write (/Users/yakir/.npm/_npx/cc2145a2fe1558fa/node_modules/create-next-app/dist/index.js:8:74912)
    at set store [as store] (/Users/yakir/.npm/_npx/cc2145a2fe1558fa/node_modules/create-next-app/dist/index.js:8:73358)
    at Conf.set (/Users/yakir/.npm/_npx/cc2145a2fe1558fa/node_modules/create-next-app/dist/index.js:8:71962)
    at run (/Users/yakir/.npm/_npx/cc2145a2fe1558fa/node_modules/create-next-app/dist/index.js:74:51323)
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5) {
  errno: -13,
  code: 'EACCES',
  syscall: 'open',
  path: '/Users/yakir/Library/Preferences/create-next-app-nodejs/config.json.tmp-8141468725083514'
}
```

----

## How to: Pull image using docker

### Step1: Setup auth for docker (Only once)
`gcloud auth configure-docker europe-west3-docker.pkg.dev`
`gcloud auth configure-docker europe-west1-docker.pkg.dev`

```
Adding credentials for: europe-west3-docker.pkg.dev
After update, the following will be written to your Docker config file located at [/Users/yakir/.docker/config.json]:
 {
  "credHelpers": {
    "europe-west3-docker.pkg.dev": "gcloud"
  }
}

Do you want to continue (Y/n)?  Y

Docker configuration file updated.
```

Your credentials are saved in your user home directory.

Linux: $HOME/.docker/config.json


### Step 2: get the name of the image

Run this command:
```
gcloud run services describe g51-nextjs --format='value(image)'
gcloud run services describe g51-nextjs-prod --format='value(image)'
```
Result:
```
europe-west3-docker.pkg.dev/garage51/cloud-run-source-deploy/g51-nextjs@sha256:913809bd061550662c853d5b9f1c30801109ffa302ae93cc4315640ba5b785bf
```

### Step 3: Pull the image from GCP's Artifact Registry

```
docker pull europe-west3-docker.pkg.dev/garage51/cloud-run-source-deploy/g51-nextjs@sha256:913809bd061550662c853d5b9f1c30801109ffa302ae93cc4315640ba5b785bf
```

```
docker pull europe-west1-docker.pkg.dev/garage51/cloud-run-source-deploy/garage51/g51-nextjs-prod:8b61702a1499c355af04a552fc0ce87488c2458d
```

### Step 4: View the image using docker:
```
docker images ls
```

```
REPOSITORY                                                                TAG       IMAGE ID       CREATED        SIZE
europe-west3-docker.pkg.dev/garage51/cloud-run-source-deploy/g51-nextjs   <none>    913809bd0615   44 years ago   1.22GB
```
