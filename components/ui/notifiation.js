import ReactDOM from "react-dom";

import classes from "./notification.module.css";

const Notification = (props) => {
  const { title, message, status } = props;

  let statusClasses = '';

  if (status === 'success') {
    statusClasses = classes.success;
  }

  if (status === 'error') {
    statusClasses = classes.error;
  }

  const cssClasses = `${classes.notification} ${statusClasses}`;

  return ReactDOM.createPortal((
    <div className={cssClasses}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
    ), document.getElementById('notifications')
  );
}

export default Notification;

// this feature called React portals which allows us to render a component anywhere in our component tree. for example in the contact form JSX code as we do it now, but technically injected in a different place in the actual Dom tree. And that's then better for semantics and accessibility.
