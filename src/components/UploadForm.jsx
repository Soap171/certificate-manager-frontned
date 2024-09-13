import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function UploadForm({ onSubmit, certificate }) {
  const [file, setFile] = useState(null);
  const [certificateName, setCertificateName] = useState("");
  const [issuedDate, setIssuedDate] = useState("");
  const [organization, setOrganization] = useState("");

  useEffect(() => {
    if (certificate) {
      setCertificateName(certificate.name);
      setIssuedDate(certificate.issuedDate);
      setOrganization(certificate.organization);
      setFile(certificate.file);
    }
  }, [certificate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCertificate = {
      file,
      name: certificateName,
      issuedDate,
      organization,
    };
    onSubmit(newCertificate);
    setFile(null);
    setCertificateName("");
    setIssuedDate("");
    setOrganization("");
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="fileInput" className="form-label">
            Upload File (Image or PDF)
          </label>
          <input
            type="file"
            className="form-control"
            id="fileInput"
            accept="image/*,application/pdf"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="certificateName" className="form-label">
            Certificate Name
          </label>
          <input
            type="text"
            className="form-control"
            id="certificateName"
            placeholder="Enter certificate name"
            value={certificateName}
            onChange={(e) => setCertificateName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="issuedDate" className="form-label">
            Issued Date
          </label>
          <input
            type="date"
            className="form-control"
            id="issuedDate"
            value={issuedDate}
            onChange={(e) => setIssuedDate(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="organization" className="form-label">
            Organization
          </label>
          <input
            type="text"
            className="form-control"
            id="organization"
            placeholder="Enter organization name"
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default UploadForm;
