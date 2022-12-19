import { useState, useEffect } from "react";

import classes from "./contact-form.module.css";
import Notification from "../ui/notifiation";

const ContactForm = () => {

  // alternatively can also use refs to get the form values
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredName, setEnteredName] = useState('');
  const [enteredMessage, setEntereMessage] = useState('');
  const [requestStatus, setRequestStatus] = useState(); //'pending', 'sucess', 'error'
  const [requestError, setRequestError] = useState();

  const sendContactData = async(contactDetails) => {
    const response = await fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify(contactDetails),
      headers: { //telling the api that this req contains a json
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if(!response.ok) {
      throw new Error(data.message || 'Something went wrong!');
    }

    //can also return data here and parse it but its not needed in this case
  }

  const sendMessageHandler = async(event) => {
    event.preventDefault();
    //optional: add client-side validation

    setRequestStatus('pending');

    try {
      await sendContactData({
        email: enteredEmail,
        name: enteredName,
        message: enteredMessage
      });
      setRequestStatus('success');

      // clearing user input after success
      setEnteredEmail('');
      setEnteredName('');
      setEntereMessage('');
    } catch (error) {
      setRequestError(error.message);
      setRequestStatus('error');
    }
  }

  let notification;

  if(requestStatus === 'pending') {
    notification = {
      status: 'pending',
      title: 'Sending message...',
      message: 'Your message is on its way'
    };
  }

  if(requestStatus === 'success') {
    notification = {
      status: 'success',
      title: 'Success!',
      message: 'Message sent successfully'
    };
  }

  if(requestStatus === 'error') {
    notification = {
      status: 'error',
      title: 'Error!!',
      message: requestError
    };
  }

  useEffect(() => {
    // to clear the notification after 3 secs
    if(requestStatus === 'success' || requestStatus === 'error') {
      const timer = setTimeout(() => {
        setRequestStatus(null);
        setRequestError(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

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
      {notification && (
        <Notification 
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
    </section>
  );
}

export default ContactForm;
