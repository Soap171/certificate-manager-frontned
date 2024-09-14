import React, { useState, useEffect } from "react";
import UploadForm from "./UploadForm";
import CertificateList from "./CertificateList";
import {
  deleteCertificate,
  fetchCertificates,
} from "../api/manageCertificateApi";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { AuthContext } from "../context/authContext";
import { useContext } from "react";

function CertificateManager() {
  const [certificates, setCertificates] = useState([]);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const queryClient = useQueryClient();
  const { user } = useContext(AuthContext);
  const userId = user?.user.id;

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
      // Filter certificates to only include those that belong to the current user
      const userCertificates = fetchedCertificates.filter(
        (certificate) => certificate.userId === userId
      );
      setCertificates(userCertificates);
    }
  }, [fetchedCertificates, userId]);

  const deleteMutation = useMutation({
    mutationFn: deleteCertificate,
    onSuccess: () => {
      queryClient.invalidateQueries(["certificates"]);
    },
    onError: (error) => {
      console.error("Error deleting certificate:", error);
    },
  });

  const handleDelete = (certificate) => {
    deleteMutation.mutate(certificate.id);
    setCertificates(certificates.filter((c) => c.id !== certificate.id));
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
    console.log(selectedCertificate);
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
