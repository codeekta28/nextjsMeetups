

// url=>api/new-meetup
// Open api folder in pages folder where whatever js file u will create will work as API router and function inside it are named as handler that take two parameter req(request),res(response) these function get triggered with incoming request

// In mongoDb data is stored in form of documents and document is nothing but an object or JSON Format
// Steps for mongoAtlas
// 1.sign up and create cluster sandBox for free
// 2. define usename and password for database and connect ur local pc to database with ip address
// 3.click connect and npm install mongo db
// 4.import { MongoClient } from "mongodb";
// 5. mongoclient.connect with the link given to use in mongo atlas in which write ur password and database name

import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    // const { title, src, address, discription } = data;
    const client = await MongoClient.connect(
      "mongodb+srv://92151552:kickassclub1!@cluster0.svnr0.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const db = client.db();
    // u can write any name of the collection here i wrote meetups
    const meetupCollection = db.collection("meetups");
    // as we know data is an object with title,image,address,discription so we put it directly
     const result=await meetupCollection.insertOne(data);
     console.log("result",result);

    //  close the database once we get the result
     client.close()

    //  response (  this is nodejs kind of response,201 means all ok inserted successfully)
    res.status(201).json({message:'MeetUp inserted'})

  }
}

export default handler