import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { FcGraduationCap } from "react-icons/fc";
import { FcShare } from "react-icons/fc";

const CertificateList = ({ certificates, onUpdate, onDelete }) => {
  const location = useLocation().pathname;

  return (
    <div className="container mt-5 mb-5">
      <h3 className="text-center my-4 p-3 bg-light rounded shadow-sm">
        Your Valuable Achievements <FcGraduationCap size={40} />
      </h3>
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
                  {certificate.imageUrl ? (
                    <a
                      href={certificate.imageUrl}
                      download={`${
                        certificate.certificateName
                      }${certificate.imageUrl.substring(
                        certificate.imageUrl.lastIndexOf(".")
                      )}`} // Extract the file extension from the URL
                    >
                      <FcShare className="text-success" />
                    </a>
                  ) : (
                    <p>No image available for download</p>
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
