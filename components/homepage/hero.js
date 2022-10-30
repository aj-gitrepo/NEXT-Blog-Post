import Image from 'next/image'; //image is of reduced size

import classes from './hero.module.css';

const Hero = () => {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image src="/images/site/coder.jpg" alt="An image showing Coder" width={300} height={300} />
      </div>
      <h1>Hi, I'm Coder</h1>
      <p>
        I blog about web development - especially frontend frameworks like React or Typescript 
      </p>
    </section>
  );
}

export default Hero;
