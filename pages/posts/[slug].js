import Head from "next/head";
import { Fragment } from "react";

import PostContent from "../../components/posts/post-detail/post-content";
import { getPostData, getPostsFiles } from "../../lib/posts-util";

const PostDetailPage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>{props.post.title}</title>
        <meta name="description" content={props.post.excerpt}/>
      </Head>
      <PostContent post={props.post}/>
    </Fragment>
  );
};

export const getStaticProps = (context) => {
  const { params } = context; //to extract slug name from the path
  const { slug } = params;

  const postData = getPostData(slug);

  return {
    props: {
      post: postData
    }, 
    revalidate: 600
  };
}

export const getStaticPaths = () => {
  // this method works well only with less number of blog posts such as around 100
  const postFilenames = getPostsFiles(); //array of file names in the dir

  const slugs = postFilenames.map(filename => filename.replace(/\.md$/, ''));

  return {
    paths: slugs.map((slug) => ({ params: { slug: slug } })), //generates array of path objects
    fallback: false,
  }
}

export default PostDetailPage;

// slug human redable sentence

// And if we set revalidate to let's say 600 here, then we ensure, that if we ever updated a markdown file, without rebuilding the entire application, that then still, we do get that latest data, at least once every 10 minutes. So that we don't have to rebuild the entire application, just because we fixed a typo in one of our markdown files. We could do this here, because here, rebuilding after deployment, will be much faster than if we do it for the other pages, where we have to go through all the post files, which takes a bit longer. And therefor would slow down, some of the requests.

// ince this is a dynamic page, you'll learn that get static props can't work on its own. We need to pair it, with get static paths, to let Next know, which concrete slug values it should pre-generate. And therefore we need to export another function here. We need to export the get static paths function. This returns an object, with all the paths that should be prepared. So with all the concrete values for a slug that should be prepared. And that's an array full of objects, where we set params, to another nested object, and then provide our concrete slug values.

// fallback: true - renders something like loading while the data is being fetched. path is passed as path:[]
// fallback: blocking - hangs the page till the data is loaded. path is passed as path:[
// fallback: false - returns 404 if page is missing
