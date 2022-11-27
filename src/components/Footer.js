import React from "react";
import Uik from "@reef-defi/ui-kit";

function Footer() {
  return (
    <div
      style={{
        marginTop: "100px",
      }}
    >
      <footer className="footer__1" style={{ marginTop: "0", backgroundColor: "#f7f7f7" }}>
        <div
          className=""
          style={{
            padding: "4px",
            margin: "20px 0",
            background: "linear-gradient(90deg, #4B2BE9,#E70FD1, #F0F442)",
          }}
        >
          { }{" "}
        </div>
        <div className="row">
          <p className="copyright text-center" style={{ color: "black", fontSize: "20px", fontWeight: "400" }}>
            Copyright © 2022 QuickLance all rights reserved{" "}
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
