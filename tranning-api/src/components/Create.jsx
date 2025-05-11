import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";

const Create = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const userData = {
      name,
      username,
      email,
      phone,
      website,
    };
    try {
      await axios.post("http://localhost:3005/users", userData);
      console.log("User added:", userData);
      setName("");
      setUsername("");
      setEmail("");
      setPhone("");
      setWebsite("");
    } catch (error) {
      console.error("Error adding user:", error);
    } finally {
      setLoading(false);
      navigate("/");
    }
  };

  return (
    <div className="container mx-auto px-5">
      <div className="flex flex-col items-center mt-20">
        <h3 className="mb-8 text-2xl font-semibold">Add New User</h3>
        <form onSubmit={handleSubmit} className="w-[500px] flex flex-col gap-5">
          <input
            type="text"
            placeholder="Name"
            className="outline-0 bg-gray-200 py-2 px-5 rounded-2xl focus:placeholder:opacity-0 outline-gray-500 focus:outline-1 duration-300"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Username"
            className="outline-0 bg-gray-200 py-2 px-5 rounded-2xl focus:placeholder:opacity-0 outline-gray-500 focus:outline-1 duration-300"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="outline-0 bg-gray-200 py-2 px-5 rounded-2xl focus:placeholder:opacity-0 outline-gray-500 focus:outline-1 duration-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Phone"
            className="outline-0 bg-gray-200 py-2 px-5 rounded-2xl focus:placeholder:opacity-0 outline-gray-500 focus:outline-1 duration-300"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="text"
            placeholder="Website"
            className="outline-0 bg-gray-200 py-2 px-5 rounded-2xl focus:placeholder:opacity-0 outline-gray-500 focus:outline-1 duration-300"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
          <button
            type="submit"
            disabled={loading}
            className={`${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black hover:bg-black/80"
            } text-white text-lg font-medium duration-300 rounded-2xl py-2`}
          >
            {loading ? "Submitting..." : "Add User"}
          </button>
        </form>
        <Link
          to="/"
          className="block mt-14 text-lg bg-gray-200 px-10 py-2 rounded-full font-medium pointer hover:bg-black hover:text-white duration-300"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default Create;
