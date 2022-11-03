import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

export const getPostsFiles = () => {
  return fs.readdirSync(postsDirectory); //array of file names in the dir
}

export const getPostData = (postIdentifier) => {

  const postSlug = postIdentifier.replace(/\.md$/, ''); //removes file extension

  const filePath = path.join(postsDirectory, `${postSlug}.md`);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  const postData = {
    slug: postSlug,
    ...data,
    content,
  };

  return postData;
  
}

export const getAllPosts = () => {
  const postFiles = getPostsFiles(); //array of file names in the dir

  const allPosts = postFiles.map((postFile) => {
    return getPostData(postFile); //array of objs
  });

  // sorting so that the recent posts are at top
  const sortedPosts = allPosts.sort((postA, postB) => postA.date > postB.date ? -1 : 1);

  return sortedPosts;
}

export const getFeaturedPosts = () => {
  const allPosts = getAllPosts();
  const featuredPosts = allPosts.filter(post => post.isFeatured);

  return featuredPosts;
}

// readdirSync will read all the contents synchronously.

// matter() - matter is simply a function which we can call here to which we pass a string. And our file content is just a string. It's the content of a file as text. So we pass the file content to matter, and matter will then return an object with two properties, with a data property for the metadata. So a data property, which contains the metadata as a JavaScript object and a content property which contains the actual content, the markdown text as a string. 

// to get featured post alternatively use jdon file to maintain the data (in case of large database)

// `${postSlug}.md` - to make it flexible to accept filename with or without extension(incase of slug without extension)
