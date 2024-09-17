import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import heroImg from "../images/Hero.png";

function Hero() {
  const user = localStorage.getItem("user");

  return (
    <div className="container-fluid px-4 py-5 my-5 text-center">
      <div className="lc-block mb-4">
        <div editable="rich">
          <h2 className="display-2 fw-bold">
            Upload | Manage Certificates{" "}
            <span className="text-primary">Safely </span> &{" "}
            <span className="text-success">Easily</span>
          </h2>
        </div>
      </div>
      <div className="lc-block col-lg-6 mx-auto mb-5">
        <div editable="rich">
          <p className="lead">
            Quickly upload your certificates and manage them with ease
          </p>
          <p className="lead">
            No need to worry about losing your certificates anymore
          </p>
        </div>
      </div>

      <div className="lc-block d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
        {" "}
        {user ? (
          <Link
            className="btn btn-primary btn-lg px-4 gap-3"
            role="button"
            to="/certificates"
          >
            Upload Now
          </Link>
        ) : (
          ""
        )}
        <Link
          className="btn btn-outline-secondary btn-lg px-4"
          to="/about"
          role="button"
        >
          About
        </Link>
      </div>
      <div className="lc-block d-grid gap-2 d-sm-flex justify-content-sm-center">
        <img
          className="img-fluid"
          src={heroImg}
          width=""
          height="600"
          srcset=""
          sizes=""
          alt=""
        />
      </div>
    </div>
  );
}

export default Hero;
