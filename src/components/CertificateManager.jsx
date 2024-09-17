import React, { useState, useEffect, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchCertificates,
  deleteCertificate,
} from "../api/manageCertificateApi";
import { AuthContext } from "../context/authContext";
import CertificateList from "./CertificateList";
import UploadForm from "./UploadForm";
import { ref, deleteObject } from "firebase/storage";
import { imageDb } from "../services/firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CertificateManager = ({ showForm = true }) => {
  const [certificates, setCertificates] = useState([]);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const { user } = useContext(AuthContext);
  const userId = user?.user.id; // Ensure userId is correctly accessed
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

  useEffect(() => {
    if (fetchedCertificates) {
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

  const handleDelete = async (certificate) => {
    try {
      // Delete the image from Firebase Storage
      const imageRef = ref(imageDb, certificate.imageUrl);
      await deleteObject(imageRef);

      // Delete the certificate from the database
      deleteMutation.mutate(certificate.id);

      // Update the state to remove the deleted certificate
      setCertificates(certificates.filter((c) => c.id !== certificate.id));
      toast.success("Certificate deleted successfully!");
    } catch (error) {
      console.error("Error deleting certificate or image:", error);
      toast.error("Error deleting certificate!");
    }
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
    <div>
      <ToastContainer />
      {showForm && (
        <UploadForm onSubmit={handleSubmit} certificate={selectedCertificate} />
      )}
      {isLoading && <p>Loading...</p>}
      {isError && console.log(error)}
      <CertificateList
        certificates={certificates}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default CertificateManager;
