import React from "react";
import Uik from "@reef-defi/ui-kit";
import "../styles/gettingstarted.css";

const GettingStarted = () => {
  return (
    <>
      <Uik.Container vertical className="container gettingStartedDiv">
      <Uik.Text
          className="title"
          text="Overview Of QuickLance"
          type="title"
        />
        <Uik.Text
          className="textDiv"
          type="light"
          text={
            <>
              <span>
                {" "}
                Quicklance is the first decentralized platform for freelancers
                when they can find projects <br /> and work on them safely and
                get payments securly.
              </span>
            </>
          }
        />
        <Uik.Text
          className="textDiv"
          type="light"
          text={
            <>
              <span>
                {" "}
                Powered by <Uik.Tag color="pink" text="Reef" />
              </span>
            </>
          }
        />
        <br/>
        <Uik.Text
          className="title"
          text="Find The Best Work For You 🎉"
          type="title"
        />
        <Uik.Text
          text="Explore quicklance and grab a project which excites you"
          type="light"
        />
        <br />
        <Uik.Text
          type="light"
          text={
            <>
              <a target="_blank" rel="noreferrer" href="/createproject">
                Create Project:
              </a>
              <span> Create a project request if you are a user</span>
            </>
          }
        />
        <Uik.Text
          type="light"
          text={
            <>
              <a target="_blank" rel="noreferrer" href="/activeprojects">
                Active Projects:
              </a>
              <span>
                {" "}
                Explore active projects and find the best opportunity for you
              </span>
            </>
          }
        />
        <Uik.Text
          type="light"
          text={
            <>
              <a target="_blank" rel="noreferrer" href="/freelancers">
                Freelancers:
              </a>
              <span>
                {" "}
                If you are an user looking for a direct freelancers just explore
                this page
              </span>
            </>
          }
        />
        <br />
        <Uik.Text
          text={
            <>
              Click the <Uik.Tag>Connect Wallet</Uik.Tag> button to get started
              🚀
            </>
          }
          type="light"
        />
      </Uik.Container>
    </>
  );
};

export default GettingStarted;
