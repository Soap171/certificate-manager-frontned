import React from "react";
import Hero from "../components/Hero";
import CertificateManager from "../components/CertificateManager";
function Home() {
  return (
    <div>
      <Hero />
      <CertificateManager showForm={false} />
    </div>
  );
}

export default Home;
