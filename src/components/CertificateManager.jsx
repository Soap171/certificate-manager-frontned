import React, { useState, useEffect } from "react";
import UploadForm from "./UploadForm";
import CertificateList from "./CertificateList";
import { fetchCertificates } from "../api/manageCertificateApi";
import { useQueryClient, useQuery } from "@tanstack/react-query";

function CertificateManager() {
  const [certificates, setCertificates] = useState([]);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const queryClient = useQueryClient();

  const {
    isLoading,
    isError,
    data: fetchedCertificates,
    error,
  } = useQuery({
    queryKey: ["certificates"],
    queryFn: fetchCertificates,
  });

  // This effect runs after the data is fetched
  useEffect(() => {
    if (fetchedCertificates) {
      setCertificates(fetchedCertificates);
    }
  }, [fetchedCertificates]);

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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

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
