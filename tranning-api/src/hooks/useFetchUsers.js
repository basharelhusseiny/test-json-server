import axios from "axios";
import { useEffect, useState } from "react";

const useFetchUsers = () => {
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("http://localhost:3005/users");
        setUsersData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  return { usersData, setUsersData, loading, error };
};

export default useFetchUsers;
