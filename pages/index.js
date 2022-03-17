import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";
import { useState, useEffect } from "react";
// Head is used to put metadata for seo Purpose

// here the first page rendred is empty bcoz initially state is empty
function homePage(props) {
  // console.log("checking");
  // before using getStaticProps
  // const [loadedData, setLoadedData] = useState([]);
  // useEffect(() => {
  //   // fetch the data from backend
  //   setLoadedData(props.meets);
  // }, []);
  return (
    <>
    <Head>
      <title>MeetUp List</title>
      <meta name="description" content="Browse all the lists of meetup points"/>
    </Head>
      <MeetupList meetups={props.meets} />
    </>
  );
}

//  getStaticProps will run first b4 the component give props to component as it is a asunc function that will wait for response and then component will only run when it have props so in view source it is not empty and can be useful for SEO so it prerendred
export async function getStaticProps() {
  // fetch data from API
  const client = await MongoClient.connect(
    "mongodb+srv://92151552:kickassclub1!@cluster0.svnr0.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupCollection = db.collection("meetups");
  // contain all the meetUps which is converted to array
  const meetups = await meetupCollection.find().toArray();
  client.close();
  console.log("meetUps", meetups);
  return {
    props: {
      meets: meetups.map((val) => {
        return {
          title: val.title,
          address: val.address,
          image: val.image,
          id: val._id.toString(),
        };
      }),
    },
    revalidate: 1,
  };
}

// Other server side prerendering

// export async function  getServerSideProps() {
//   // fetch data from API
//   return {
//     props: {
//       meets: dummyProps,
//     },
//   };
// }
export default homePage;
