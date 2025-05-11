import React, { useEffect, useState } from "react";
import useFetchUsers from "../hooks/useFetchUsers";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router";

const Update = () => {
  const { usersData, loading, error } = useFetchUsers();
  const { id } = useParams();
  const user = usersData.find((user) => user.id === +id);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setUsername(user.username);
      setEmail(user.email);
      setPhone(user.phone);
      setWebsite(user.website);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      await axios.put(`https://rust-concrete-duchess.glitch.me/users/${id}`, {
        name,
        username,
        email,
        phone,
        website,
      });
    } catch (err) {
      console.error("Error updating user:", err);
    } finally {
      setUpdating(false);
      navigate("/");
    }
  };

  if (loading) return <p>Loading......</p>;
  if (error) return <p>Error.........</p>;

  return (
    <div className="container mx-auto px-5">
      <div className="flex flex-col items-center mt-20">
        <h3 className="mb-8 text-2xl font-semibold">Update User</h3>
        <form onSubmit={handleSubmit} className="w-[500px] flex flex-col gap-5">
          <input
            type="text"
            placeholder="Name"
            className="outline-0 bg-gray-200 py-2 px-5 rounded-2xl"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Username"
            className="outline-0 bg-gray-200 py-2 px-5 rounded-2xl"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="outline-0 bg-gray-200 py-2 px-5 rounded-2xl"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Phone"
            className="outline-0 bg-gray-200 py-2 px-5 rounded-2xl"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="text"
            placeholder="Website"
            className="outline-0 bg-gray-200 py-2 px-5 rounded-2xl"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
          <button
            type="submit"
            disabled={updating}
            className={`${
              updating
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black hover:bg-black/80"
            } text-white text-lg font-medium duration-300 rounded-2xl py-2`}
          >
            {updating ? "Updating..." : "Update User"}
          </button>
        </form>
        <Link
          to="/"
          className="block mt-14 text-lg bg-gray-200 px-10 py-2 rounded-full font-medium hover:bg-black hover:text-white duration-300"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default Update;
