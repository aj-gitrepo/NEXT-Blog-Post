import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'; //for styling on server side

import classes from './post-content.module.css';
import PostHeader from './post-header';

const PostContent = (props) => {
  const { post } = props;
  const imagePath = `/images/posts/${post.slug}/${post.image}`;

  const customRenderers = {
    p({ node, ...props }) { //to prevent - warning of rendering image inside of the paragraph
      // console.log(node.children[0]);
      // if the paragraph has an image render it just as an image and not as paragraph
      if (node.children[0].tagName && node.children[0].tagName === 'img') {
        const image = node.children[0];
        return (
          <div className={classes.image}>
            {
              <Image
                src={`/images/posts/getting-started-with-nextjs/${image.properties.src}`}
                alt={image.properties.alt}
                width={600}
                height={300}
              />
            }
          </div>
        );
      }
      // if its not an image just return the paragraph
      return <p>{props.children}</p>;
    },

    code({node, className, children, ...props}) {
      const language = className.split('-')[1]; // that which is specified in markdown file after ```
      console.log(language); //returns js
      console.log(className); //returns language-js
      return (
        <SyntaxHighlighter 
          style={ atomDark }
          language={language}
          children={children}
        />
      );
    }
  };

  return (
    <article className={classes.content}>
      <PostHeader title={post.title} image={imagePath} />
      <ReactMarkdown components={customRenderers}>{post.content}</ReactMarkdown>
    </article>
  );
}

export default PostContent;

// image.properties.alt - from the [] in markdown file
// image.properties.src} - image file name inside () in markdown file

//  that's how we can override how certain elements are rendered. And the image was just one example because another popular use case could be code snippets.