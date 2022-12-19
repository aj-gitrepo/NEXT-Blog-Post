import { MongoClient } from 'mongodb'

import { mongopass } from '../../config';

const handler = async (req, res) => {
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

    let client;
    try {
      client = await MongoClient.connect(
        `mongodb+srv://ajdev:${mongopass}@next-blog-post.n1gfpyv.mongodb.net/my-site?retryWrites=true&w=majority`
        )
    } catch (err) {
      res.status(500).json({ message: 'Could not connect to database.' });
      return;
    }

    const db = client.db(); //passing in a db name in ('') connects to it

    try {
      //creates a collectn if it doesn't exist and inserts a document
      const result = await db.collection('messages').insertOne(newMesssage); 
      newMesssage.id = result.insertedId; //getting id from db and adding 
    } catch (err) {
      client.close();
      res.status(500).json({ message: 'Storing message failed' });
      return;
    }

    console.log(newMesssage);

    client.close();

    res
      .status(201)
      .json({ message: 'Successfully stored message!', storedMesage: newMesssage });
  }
}

export default handler;
// this code is only on the server side never included on client side
// /api/contact

// mongodb+srv://ajdev:<password>@next-blog-post.n1gfpyv.mongodb.net/?retryWrites=true&w=majority
// `mongodb+srv://ajdev:${mongopass}@next-blog-post.n1gfpyv.mongodb.net/my-site?retryWrites=true&w=majority`
// here my-site - databasename
