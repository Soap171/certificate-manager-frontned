import React from "react";
import { FaEdit, FaTrash, FaDownload } from "react-icons/fa";

const CertificateList = ({ certificates, onUpdate, onDelete }) => {
  return (
    <div className="container mt-5">
      <h3>Certificates</h3>
      <ul className="list-group">
        {certificates.map((certificate, index) => (
          <li
            key={index}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div className="d-flex align-items-center">
              <img
                src={certificate.imageUrl}
                alt="certificate"
                className="img-thumbnail me-3"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
              <div>
                <h5>{certificate.certificateName}</h5>
                <p>Issued Date: {certificate.issuedDate}</p>
                <p>Organization: {certificate.organization}</p>
              </div>
            </div>
            <div>
              <FaEdit
                className="text-primary me-3"
                onClick={() => onUpdate(certificate)}
              />
              <FaTrash
                className="text-danger me-3"
                onClick={() => onDelete(certificate)}
              />
              {certificate.file && (
                <a
                  href={URL.createObjectURL(certificate.file)}
                  download={certificate.name}
                >
                  <FaDownload className="text-success" />
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CertificateList;
