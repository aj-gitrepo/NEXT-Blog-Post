import { Fragment } from "react";
import FeaturedPosts from "../components/homepage/featured-posts";
import Hero from "../components/homepage/hero";

const DUMMY_POSTS = [
  { 
    slug: 'getting-started-with-nextjs', 
    title: 'Getting Started with NextJS', 
    image: 'getting-started-nextjs.png', 
    excerpt: 'NextJS is the React framework for production - it makes building fullstack React apps and site a breeze and ships with built-in SSR.', 
    date: '2022-02-10', 
  },
  { 
    slug: 'getting-started-with-nextjs2', 
    title: 'Getting Started with NextJS', 
    image: 'getting-started-nextjs.png', 
    excerpt: 'NextJS is the React framework for production - it makes building fullstack React apps and site a breeze and ships with built-in SSR.', 
    date: '2022-02-10', 
  },
  { 
    slug: 'getting-started-with-nextjs3', 
    title: 'Getting Started with NextJS', 
    image: 'getting-started-nextjs.png', 
    excerpt: 'NextJS is the React framework for production - it makes building fullstack React apps and site a breeze and ships with built-in SSR.', 
    date: '2022-02-10', 
  },
  { 
    slug: 'getting-started-with-nextjs4', 
    title: 'Getting Started with NextJS', 
    image: 'getting-started-nextjs.png', 
    excerpt: 'NextJS is the React framework for production - it makes building fullstack React apps and site a breeze and ships with built-in SSR.', 
    date: '2022-02-10', 
  },
];

const HomePage = () => {
  return (
    <Fragment>
      <Hero/>
      <FeaturedPosts posts={DUMMY_POSTS}/>
    </Fragment>
  );
};

export default HomePage;

// 1) Hero - present the product / ourselves
// 2) Featured posts
