import React from "react";
import aboutImg from "../images/About.png";
function About() {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center align-items-center p-5">
        <div className=" col-md-6 text-center">
          <img src={aboutImg} className="img-fluid" alt="About us" />
        </div>
        <div className=" col-md-6">
          <h2 className="text-muted">About Us</h2>
          <p>
            Welcome to Task Reminder Telegram! Our mission is to help you stay
            organized and on top of your tasks with ease. We understand the
            importance of managing your time effectively, and our tool is
            designed to send you timely reminders directly through Telegram.
          </p>
          <p>
            Our team is composed of dedicated professionals who are passionate
            about productivity and technology. We strive to provide a seamless
            and user-friendly experience, ensuring that you never miss a
            deadline or forget an important task.
          </p>
          <p>
            Whether you're managing personal errands, work projects, or
            collaborative tasks, Task Reminder Telegram is here to support you.
            Join us on our journey to make task management simpler and more
            efficient.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
