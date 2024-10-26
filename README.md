# Description

**Newsletters K2** is a dynamic and interactive web application designed to present informative newsletters with sections such as **Vocabulary**, **Learning Topics**, **Notes for Parents**, **Social Skills**, and **Video Links**. Built with **Next.js** and **React**, it leverages **dynamic routing**, **server-side rendering**, and an **SEO-friendly architecture** to ensure optimal performance and an engaging user experience across all devices. The application features dynamic metadata generation and month-based header styling to enhance both usability and visual appeal.

# Development

Steps to start the app in development

1. Rename the .env.example to .env
2. Replace the enviroment variables
3. Execute the command:

```
npm install
```

4. Set up the db

```
docker-compose up -d
```

5. Execute these prisma commands:

```
npx prisma migrate dev; npx prisma generate
```

6. Execute SEED

```
npm run seed
```

7. Run server with command:

```
npm run dev
```

# Notes: default user

Default user data in the seed file

# Prisma commands

```
npx prisma init
npx prisma migrate dev
npx prisma generate
```
