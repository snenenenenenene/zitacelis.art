# Photography Portfolio Website

This is a portfolio website for showcasing photography work, built with Next.js 13, Stripe for donations and product purchases, Zustand as a state manager, Vercel for deployment, and Pocketbase as a database. The website is hosted at (https://www.zitacelis.art/)[https://www.zitacelis.art/].

## Features

- **Home page**: showcases a hero image with a call to action for visitors to view the portfolio, and displays the latest blog post.
- **About page**: provides a brief bio and introduction of the photographer.
- **Portfolio page**: displays a grid of photography work, which can be filtered by categories.
- **Product page**: displays a selection of prints that can be purchased through Stripe integration.
- **Donation page**: provides a form for visitors to donate to the photographer through Stripe integration.
- **Blog page**: displays a list of blog posts, with a read more button to view the full post.
- **Contact page**: provides a form for visitors to contact the photographer.
- **Authentication system**: allows the photographer to log in and edit the content of the website, including adding new blog posts, managing the portfolio, and adding/editing products.
- **State management**: Zustand is used as a state manager to handle the authentication state and the state of the shopping cart.
- **Database**: Pocketbase is used as a database to store the photography work and blog posts.

## Setting it up

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
