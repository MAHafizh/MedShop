import { useEffect, useState } from "react";
import axios from "axios";

interface User {
  uuid: string;
  name: string;
  email: string;
  phone: string;
  date_of_birth: string;
  image: string;
  image_link: string;
  role: string;
}

const useGetUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const response = await axios.get("http://localhost:5000/me", {
          withCredentials: true,
        });
        setUser(response.data);
      } catch (error) {
        setError(error as string);
      } finally {
        setLoading(false);
      }
    };
    fetchMe();
  }, []);
  return { user, loading, error };
};

export default useGetUser;