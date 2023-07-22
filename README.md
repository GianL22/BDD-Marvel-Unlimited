
![2e007c1a-724f-47a8-8e52-4164eed780ba](https://github.com/GianL22/BDD-Marvel-Unlimited/assets/110587636/22964178-5d4a-46bf-8b83-5ea9291e7d3c)
# Marvel United

A shell of a streaming platform for Marvel series, movies, and video games, where you can register, create profiles, browse your favorite media, among other things.

 ## Features

- Authentication
- Interfaces for creating, browsing, updating, and deleting most entities (characters, media, objects, powers, among others)
- Recommendations by profile based on their list of preferences
- Rating system

## Tech Stack
<p style="display:flex; align-content:center; justify-content:center; width: 100%">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
  <a href="https://docs.nestjs.com/graphql/quick-start" target="blank"><img src="https://upload.wikimedia.org/wikipedia/commons/1/17/GraphQL_Logo.svg" width="200" alt="GraphQL Logo" /></a>
  <a href="https://nextjs.org/" target="blank"><img src="https://cdn.worldvectorlogo.com/logos/next-js.svg" width="200" alt="Next Logo" /></a>
</p>


**FrontEnd:**
+ [Nextjs](https://nextjs.org/)
+ [Apollo Client](https://www.apollographql.com/docs/react)
+ [NextUI](https://nextui.org/)

**BackEnd:** 
+ [Nestjs](https://docs.nestjs.com/)
+ [GraphQL](https://graphql.org/)
+ [Apollo Server](https://www.apollographql.com/docs/apollo-server)
+ [TypeORM](https://typeorm.io/)

**Database**
+ [PostgresSQL](https://www.postgresql.org/)

## Installation

### 1. Clone the project
```bash
  git clone https://github.com/GianL22/BDD-Marvel-Unlimited.git
```

### 2. Go to the project directory
```bash
  cd BDD-Marvel-Unlimited
```

### 3. Install dependencies to the server
```bash
  cd backend
  npm install
```

### 4. Add `.env` file to the `backend`
In the `backend` folder, create a `.env` file and add the environment variables as shown in the `.env.example` file.

### 5. Install dependencies to the server
```bash
  cd ..
  cd frontend
  yarn
```
### 6. Add `.env` file to the `frontend`
In the `frontend` folder, create a `.env` file and add the environment variables as shown in the `.env.example` file.


## Run Locally
In the root directory, go to the `backend` folder

```bash
  cd backend
```

Run the backend
```bash
  npm run start:dev
```

Then run the frontend

```bash
  cd ..
  cd frontend
  yarn dev
```

## To do

- Add route protection
- Refactorization of forms for entity creation.
