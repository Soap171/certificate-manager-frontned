const serverUrl = "http://localhost:8080";

export const postCertificate = async (certificate) => {
  try {
    const response = await fetch(`${serverUrl}/api/certificates`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(certificate),
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const fetchCertificates = async () => {
  try {
    const response = await fetch(`${serverUrl}/api/certificates`, {
      method: "GET",
      credentials: "include",
    });
    const fetchedCertificates = await response.json();
    return fetchedCertificates;
  } catch (error) {
    console.log(error);
  }
};

export const updateCertificate = async (certificate) => {
  try {
    const response = await fetch(
      `${serverUrl}/api/certificates/${certificate.id}`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(certificate),
      }
    );
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const deleteCertificate = async (certificateId) => {
  const response = await fetch(`/api/certificates/${certificateId}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to delete certificate");
  }

  try {
    const data = await response.json();
    return data;
  } catch (error) {
    if (response.status === 204) {
      return null;
    } else {
      throw error;
    }
  }
};
