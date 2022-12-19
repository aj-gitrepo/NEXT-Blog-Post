import { Fragment } from "react";
import Head from "next/head";

import FeaturedPosts from "../components/homepage/featured-posts";
import Hero from "../components/homepage/hero";
import { getFeaturedPosts } from "../lib/posts-util";


const HomePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>Coder' Blog</title>
        <meta 
          name="description"
          content="I post about programming and web development."
        />
      </Head>
      <Hero/>
      <FeaturedPosts posts={props.posts}/>
    </Fragment>
  );
};

export const getStaticProps = () => {
  const featuredPosts = getFeaturedPosts();

  return {
    props: {
      posts: featuredPosts
    }
  }
}

export default HomePage;

// 1) Hero - present the product / ourselves
// 2) Featured posts

// We could also use useEffect inside of our component and send an HTTP request to some API. But that means that the pre-rendered page won't contain any content, which isn't great for search engines and in this specific website here, we would also have a problem. We have no API. Our posts are fetched from the file system. And we can therefore do that in any code that runs on the server side and has access to that file system but we can't do it from inside our components. Those don't have access to the file system and there, we also can't send a request to any API that grants that access because we have no such API here.

// getStaticProps will only be executed once outside of development, during development it will be executed for every request but outside of development, it will only be executed when we build the application for production and never thereafter. And I would say this is absolutely fine here for this scenario. (use getSeverProps for production)
