# INSTRUCTIONS ON HOW TO INSTALL AND DEPLOY ELECTROPLAY

## 1. Getting Started
Step 1 - clone the repo with:
```sh
git clone https://github.com/shahenalgoo/hackathon-electroneum.git
```

Step 2 - install dependencies:
```sh
pnpm install
```

## 2. Setup Convex Backend
Go to https://www.convex.dev and create an account, come back to your command line and run:
```sh
npx convex dev
```
Documentation can be found here:
https://docs.convex.dev/quickstarts

You will have to log in and select the option to create a new project/database.
The code already has the schema so it will automatically create tables and all the fields required.

## 3. Setup Convex Backend Authentication
Auth documentation can be found here:
https://labs.convex.dev/auth/setup

But the code is already setup and all you will have to do is run this command to initiate private keys to your convex backend:
```sh
npx @convex-dev/auth
```

## 3. Setup Web3 - Thirdweb
1. Go to https://thirdweb.com/ and login to the dashboard
2. Create a new project and you will get your client and private keys

create an .env.local in the root folder and add your client key:
```sh
VITE_CONVEX_URL=
VITE_THIRDWEB_CLIENT_ID=
```

Note that these are the only keys you will need on the client.

## 4. Set private/secret keys on backend
Go to your project on convex > settings > env variables, insert these:
```sh
THIRDWEB_ADMIN_WALLETL=   **this is the private key of the admin wallet that controls eveything, it deploys smart contracts as well as update functions.
THIRDWEB_SECRET_KEY=   **secret key from Thirdweb to perform these actions mentioned above
```

## 5. Last step
Run the project:
```sh
pnpm run dev
```

The last thing left on the list is to create a cycle on the backend and everything will run by itself.
1. Go to the project on Convex
2. Click on the fn button on the bottom right corner
3. Select the createCycleWithPools and add the following:
```sh
gameLineup: {ballsort: true, matchtwo: true} - at least one must be true,
schedule: must be in iso format - check cycle scheduling on our litepaper - https://hackathon.electroplay.fun/litepaper
week: 0 or any number
```

Smart contracts will be automatically deployed and their addresses can be found in the "pools" table.
