import { useState } from "react";
import classes from "./contact-form.module.css";

const ContactForm = () => {

  // alternatively can also use refs to get the form values
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredName, setEnteredName] = useState('');
  const [enteredMessage, setEntereMessage] = useState('');

  const sendMessageHandler = (event) => {
    event.preventDefault();

    //optional: add client-side validation

    fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify({ //send json obj
        email: enteredEmail,
        name: enteredName,
        message: enteredMessage
      }),
      headers: { //telling the api that this req contains a json
        'Content-Type': 'application/json',
      },
    });
  }

  return (
    <section className={classes.contact}>
      <h1>How can I help you?</h1>
      <form className={classes.form} onSubmit={sendMessageHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input 
              type="email" 
              id="email" 
              required 
              value={enteredEmail}
              onChange={event => setEnteredEmail(event.target.value)}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="name">Your Name</label>
            <input 
              type="text" 
              id="name" 
              required 
              value={enteredName}
              onChange={event => setEnteredName(event.target.value)}
            />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="message">Your Message</label>
          <textarea 
            id="message" 
            rows="5"
            required
            value={enteredMessage}
            onChange={event => setEntereMessage(event.target.value)}
          >
          </textarea>
        </div>
        <div className={classes.actions}>
          <button>Send Message</button>
        </div>
      </form>
    </section>
  );
}

export default ContactForm;
