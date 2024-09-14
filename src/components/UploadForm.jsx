import React, { useState, useEffect, useContext } from "react";
import { imageDb } from "../services/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { postCertificate } from "../api/manageCertificateApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../context/authContext";

function UploadForm({ onSubmit, certificate }) {
  const [file, setFile] = useState(null);
  const [certificateName, setCertificateName] = useState("");
  const [issuedDate, setIssuedDate] = useState("");
  const [organization, setOrganization] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const { user } = useContext(AuthContext);
  const userId = user?.user.id; // Ensure userId is correctly accessed
  console.log(userId);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: postCertificate,
    onSuccess: () => {
      queryClient.invalidateQueries(["certificates"]);
    },
    onError: (error) => {
      console.error("Error creating certificate:", error);
    },
  });

  useEffect(() => {
    if (certificate) {
      setCertificateName(certificate.name);
      setIssuedDate(certificate.issuedDate);
      setOrganization(certificate.organization);
      setFile(certificate.file);
    }
  }, [certificate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Upload the file to Firebase Storage
      const storageRef = ref(imageDb, `certificates/${v4()}`);
      await uploadBytes(storageRef, file);

      // Get the download URL
      const fileUrl = await getDownloadURL(storageRef);
      console.log(fileUrl);
      setFileUrl(fileUrl);

      const newCertificate = {
        imageUrl: fileUrl, // Use the download URL instead of the file
        certificateName: certificateName,
        issuedDate,
        organization,
        userId: userId, // Include userId from AuthContext
      };

      mutation.mutate(newCertificate);
    } catch (error) {
      console.log(error);
    }

    const newCertificate = {
      file,
      name: certificateName,
      issuedDate,
      organization,
      userId: userId,
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
