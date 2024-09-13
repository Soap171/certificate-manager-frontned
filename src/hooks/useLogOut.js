import useAuthContext from "./useAuthContext";

export const useLogOut = () => {
  const { dispatch } = useAuthContext();

  const logout = async () => {
    try {
      const response = await fetch("http://localhost:8080/auth/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Clear user from local storage
        localStorage.removeItem("user");

        // Dispatch logout action
        dispatch({ type: "LOGOUT" });
      } else {
        console.error("Failed to log out");
      }
    } catch (error) {
      console.error("An error occurred while logging out:", error);
    }
  };

  return { logout };
};
