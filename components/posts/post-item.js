import Link from "next/link";
import Image from "next/image";

import classes from "./post-item.module.css";    

const PostItem = (props) => {
  const { title, image, excerpt, date, slug } = props.post;

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const imagePath = `/images/posts/${slug}/${image}`;

  const linkPath = `/posts/${slug}`;

  return (
    <li className={classes.post}>
      <Link href={linkPath}>
        <a>
          <div className={classes.image}>
            <Image 
              src={imagePath} 
              alt={title} 
              width={300} 
              height={200} 
              layout='responsive'
            />
          </div>
          <div className={classes.content }>
            <h3>{title}</h3>
            <time>{date}</time>
            <p>{excerpt}</p>
          </div>
        </a>
      </Link>
    </li>
  );
}

export default PostItem;

// By setting layout='responsive', the image will fill out the entire surrounding container, this div in this case, which has certain CSS styles that control its width and height, and then it will shrink and grow together with that container.
