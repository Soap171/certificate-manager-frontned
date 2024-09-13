import React, { useState } from "react";
import UploadForm from "./UploadForm";
import CertificateList from "./CertificateList";

function CertificateManager() {
  const [certificates, setCertificates] = useState([
    {
      file: null,
      name: "React Certification",
      issuedDate: "2022-01-01",
      organization: "Coursera",
      imageUrl:
        "https://images.pexels.com/photos/13202066/pexels-photo-13202066.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", // Sample image URL
    },
    {
      file: null,
      name: "JavaScript Mastery",
      issuedDate: "2021-12-15",
      organization: "Udemy",
      imageUrl:
        "https://images.pexels.com/photos/13202066/pexels-photo-13202066.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", // Sample image URL
    },
  ]);
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  const handleDelete = (certificate) => {
    setCertificates(certificates.filter((c) => c !== certificate));
  };

  const handleSubmit = (newCertificate) => {
    if (selectedCertificate) {
      setCertificates(
        certificates.map((c) =>
          c === selectedCertificate ? newCertificate : c
        )
      );
      setSelectedCertificate(null);
    } else {
      setCertificates([...certificates, newCertificate]);
    }
  };

  const handleUpdate = (certificate) => {
    setSelectedCertificate(certificate);
  };

  return (
    <div className="container">
      <UploadForm onSubmit={handleSubmit} certificate={selectedCertificate} />
      <CertificateList
        certificates={certificates}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default CertificateManager;
