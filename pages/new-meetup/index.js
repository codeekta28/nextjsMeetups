import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

function newMeetupPage() {
  const route=useRouter();
  async function meetUpHandler(formDetails) {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(formDetails),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data=await response.json();
    console.log("data",data);
    route.push("/")

  }
  return (
    <>
    <Head>
      <title>Add New Meetup</title>
      <meta name="description" content="add new meetUp u will always like it"/>
    </Head>
      <NewMeetupForm onAddMeetup={meetUpHandler} />
    </>
  );
}

export default newMeetupPage;
