const handler = (req, res) => {
  if(req.method === 'POST') {
    const { email, name, message } = req.body;

    // client side validation can be tricked so using server side validation
    if(
      !email ||
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !message ||
      message.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid input.' });
      return;
    }

    // Store it in database
    const newMesssage = {
      email,
      name,
      message
    };

    console.log(newMesssage);

    res
      .status(201)
      .json({ message: 'Successfully stored message!', storedMesage: newMesssage });
  }
}

export default handler;
// this code is only on the server side never included on client side
// /api/contact