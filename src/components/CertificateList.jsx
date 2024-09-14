import React from "react";
import { FaEdit, FaTrash, FaDownload } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const CertificateList = ({ certificates, onUpdate, onDelete }) => {
  const location = useLocation().pathname;
  return (
    <div className="container mt-5 mb-5">
      <h3>Your Certificates</h3>
      {certificates.length === 0 ? (
        <p>No certificates available.</p>
      ) : (
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
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
                <div>
                  <h5>{certificate.certificateName}</h5>
                  <p>
                    Issued Date:{" "}
                    {new Date(certificate.issuedDate).toLocaleDateString()}
                  </p>
                  <p>Organization: {certificate.organization}</p>
                </div>
              </div>
              {location === "/" ? (
                ""
              ) : (
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
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CertificateList;
