import MeetUpDetail from "../../components/meetups/MeetUpDetail";
import { ObjectId } from "mongodb";
import Head from "next/head";
import { MongoClient } from "mongodb";

function meetUpDetailPage(props) {
  // console.log("props", props.meetUpData);
  return (
    <>
    <Head>
      <title>{props.meetUpData.title}</title>
      <meta name="description" content={props.meetUpData.description}/>
    </Head>
      <MeetUpDetail
        image={props.meetUpData.image}
        title={props.meetUpData.title}
        description={props.meetUpData.description}
        address={props.meetUpData.address}
      />
    </>
  );
}
// so as we know getStatic page run during build time but these ids are generated dynamically so how would it know for which id it need to pregenerate the page for that in dynamic pages it is necessary to use getStaticPages and it have fallback key whose value if declare as false it means it have define all the dynamic value and if url found any other value can show 404 not found but if it is set to true that means that mostly used valued are defined here but if u find new value try to search it on server side rendering  and if not find show page among famous pages.Blocking is same as true
export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://92151552:kickassclub1!@cluster0.svnr0.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupCollection = db.collection("meetups");
  // should have all the documents but they should contain id
  const meetups = await meetupCollection.find({}, { _id: 1 }).toArray();
  client.close();
  return {
    fallback:"blocking",
    paths: meetups.map((val) => ({ params: { meetupId: val._id.toString() } })),
  };
}

// we need proper id to identify the data for that we can use useRouter query to get url data but it cant be used in getStaticProp function
export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  // need specific data from mongoDataBase
  const client = await MongoClient.connect(
    "mongodb+srv://92151552:kickassclub1!@cluster0.svnr0.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupCollection = db.collection("meetups");
  // here our meetupId is in string but in database its in object so we import objectId amd wrap meetupId around it
  const specificMeetUp = await meetupCollection.findOne({
    _id: ObjectId(meetupId),
  });
  console.log("specific", specificMeetUp);
  client.close();

  return {
    props: {
      meetUpData: {
        image: specificMeetUp.image,
        title: specificMeetUp.title,
        description: specificMeetUp.description,
        address: specificMeetUp.address,
        id: specificMeetUp._id.toString(),
      },
    },
  };
}
export default meetUpDetailPage;

// getStaticPath old return

// paths:[
//   {
//     params:{
//       meetupId:"m1"
//     }
//   },
//   {
//     params:{
//       meetupId:"m2"
//     }
//   },
// ]
