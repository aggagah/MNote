# MNote

MNote is a web-based application created to help record food orders at a restaurant

## Tech Stack

**Client:**

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

**Server:**

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)

![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

## USER MANUAL

**Pre-Requisites**

Make sure your computer already install all of this

> [Git](https://git-scm.com/downloads)

> [NodeJs](https://nodejs.org/en/download/)

> [Yarn Package Manager](https://yarnpkg.com/getting-started/install)

**Installation**

Clone the project

```bash
  git clone https://github.com/aggagah/MNote.git
```

Go to the project directory

```bash
  cd MNote
```

Copy the `api` folder to `client\src`

**Environment Variables**

Create file called `.env` inside `server` folder and copy all content of `envExample.txt` into `.env`

Install client dependencies

```bash
  cd client
  yarn
```

Navigate back to MNote directory

```bash
  cd ..
```

Install server dependencies

```bash
  cd server
  yarn
```

Navigate back to main project directory

```bash
  cd ..
```

Create another terminal

on the first terminal, run the server

```bash
  cd server
  yarn start
```

on the second terminal, run the client

```bash
  cd client
  yarn start
```

To indicate if the server is running, you will see something like this on your server terminal

```
  Server is running on port 5000...
```

To indicate if the client is running, yu will see something like this on your client terminal

```
Compiled successfully!

You can now view client in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://[your ip address]:3000

Note that the development build is not optimized.
To create a production build, use yarn build.

webpack compiled successfully
```

It will automatically open a browser page with address http://localhost:3000

## Authors

-   [@aggagah](http://github.com/aggagah)
-   [@lyudhistira](https://github.com/lyudhistira)
-   [@rnldmhrd](https://github.com/rnldmhrd)
-   [@SyahdanNaufal](https://github.com/SyahdanNaufal)
-   [@salmasydneey](https://github.com/salmasydneey)

## Notes

Make sure you have internet connection, this program **will not work** if you use **mobile hotspot** for your computer
