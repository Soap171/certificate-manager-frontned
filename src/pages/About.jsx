import React from "react";
import aboutImg from "../images/About.png";
function About() {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center align-items-center p-5">
        <div className=" col-md-6 text-center">
          <img src={aboutImg} className="img-fluid" alt="About us" />
        </div>
        <div className="col-md-6">
          <h2 className="text-muted mb-4">About E-Certificate Manager</h2>
          <p>
            Welcome to e-Certificate Manager! Our platform is designed to help
            you efficiently manage and organize your digital certificates.
            Whether you are an individual looking to keep track of your personal
            achievements or an organization managing certificates for employees
            or students, our tool provides a seamless and user-friendly
            experience.
          </p>
          <p>
            At e-Certificate Manager, we understand the importance of having a
            centralized system to store and access your certificates. Our
            platform allows you to upload, view, and download your certificates
            with ease. With features like secure storage, easy retrieval, and
            sharing options, you can ensure that your certificates are always at
            your fingertips.
          </p>
          <p>
            Our team is composed of dedicated professionals who are passionate
            about leveraging technology to simplify certificate management. We
            are committed to providing a reliable and efficient service that
            meets the needs of our users. Our goal is to make certificate
            management as straightforward and hassle-free as possible.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
