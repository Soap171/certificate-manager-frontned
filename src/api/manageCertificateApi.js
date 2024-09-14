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
