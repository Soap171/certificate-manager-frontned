import React, { useState, useEffect, useContext } from "react";
import { imageDb } from "../services/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import {
  postCertificate,
  updateCertificate,
} from "../api/manageCertificateApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../context/authContext";

function UploadForm({ onSubmit, certificate }) {
  const [file, setFile] = useState(null);
  const [certificateName, setCertificateName] = useState("");
  const [issuedDate, setIssuedDate] = useState("");
  const [organization, setOrganization] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [validated, setValidated] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const userId = user?.user.id; // Ensure userId is correctly accessed
  console.log(userId);

  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: postCertificate,
    onSuccess: () => {
      queryClient.invalidateQueries(["certificates"]);
      clearForm();
    },
    onError: (error) => {
      console.error("Error creating certificate:", error);
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateCertificate,
    onSuccess: () => {
      queryClient.invalidateQueries(["certificates"]);
      clearForm();
    },
    onError: (error) => {
      console.error("Error updating certificate:", error);
    },
  });

  const clearForm = () => {
    setFile(null);
    setCertificateName("");
    setIssuedDate("");
    setOrganization("");
    setFileUrl("");
    setValidated(false);
    setIsUpdateMode(false);
  };

  useEffect(() => {
    if (certificate) {
      setCertificateName(certificate.certificateName);
      setIssuedDate(
        certificate.issuedDate
          ? new Date(certificate.issuedDate).toISOString().split("T")[0]
          : ""
      );
      setOrganization(certificate.organization);
      setFileUrl(certificate.imageUrl); // Set the existing image URL
      setIsUpdateMode(true);
    } else {
      clearForm();
    }
  }, [certificate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    setIsLoading(true);

    if (
      form.checkValidity() === false ||
      certificateName.trim() === "" ||
      !issuedDate
    ) {
      e.stopPropagation();
      setValidated(true);
      setIsLoading(false);
      return;
    }

    let imageUrl = fileUrl; // Use the existing image URL by default

    try {
      if (file) {
        // Upload the new file to Firebase Storage
        const storageRef = ref(imageDb, `certificates/${v4()}`);
        await uploadBytes(storageRef, file);

        // Get the download URL
        imageUrl = await getDownloadURL(storageRef);
        console.log(imageUrl);
        setFileUrl(imageUrl);
      }

      const newCertificate = {
        imageUrl, // Use the new or existing image URL
        certificateName,
        issuedDate,
        organization,
        userId, // Include userId from AuthContext
      };

      if (isUpdateMode) {
        updateMutation.mutate({ ...newCertificate, id: certificate.id });
        console.log("update certificate");
      } else {
        createMutation.mutate(newCertificate);
        console.log("create certificate");
      }

      onSubmit(newCertificate);
      clearForm();
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <form
        className={`row g-3 needs-validation ${
          validated ? "was-validated" : ""
        }`}
        noValidate
        onSubmit={handleSubmit}
      >
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
            className={`form-control ${
              validated && certificateName.trim() === "" ? "is-invalid" : ""
            }`}
            id="certificateName"
            placeholder="Enter certificate name"
            value={certificateName}
            onChange={(e) => setCertificateName(e.target.value)}
            required
          />
          <div className="invalid-feedback">
            Please enter the certificate name.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="issuedDate" className="form-label">
            Issued Date
          </label>
          <input
            type="date"
            className={`form-control ${
              validated && !issuedDate ? "is-invalid" : ""
            }`}
            id="issuedDate"
            value={issuedDate}
            onChange={(e) => setIssuedDate(e.target.value)}
            required
          />
          <div className="invalid-feedback">Please select the issued date.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="organization" className="form-label">
            Organization
          </label>
          <input
            type="text"
            className={`form-control ${
              validated && organization.trim() === "" ? "is-invalid" : ""
            }`}
            id="organization"
            placeholder="Enter organization name"
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
            required
          />
          <div className="invalid-feedback">
            Please enter the organization name.
          </div>
        </div>
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isUpdateMode ? "Update Certificate" : "Submit Certificate"}
          {isLoading && (
            <span
              className="spinner-border spinner-border-sm ms-2"
              role="status"
              aria-hidden="true"
            ></span>
          )}
        </button>
      </form>
    </div>
  );
}

export default UploadForm;
