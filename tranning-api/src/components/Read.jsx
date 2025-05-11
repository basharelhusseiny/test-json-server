import React from "react";
import useFetchUsers from "../hooks/useFetchUsers";
import { Link, useParams } from "react-router";

const Read = () => {
  const { usersData, loading, error } = useFetchUsers();
  const { id } = useParams();
  const user = usersData.find((user) => user.id === +id);

  if (loading) return <p>Loading......</p>;
  if (error) return <p>error.........</p>;

  return (
    <>
      <div className="p-10">
        <p>{user?.name}</p>
        <p>{user?.username}</p>
        <p>{user?.email}</p>
        <p>{user?.phone}</p>
      </div>
      <Link
        to={`/update/${user?.id}`}
        className="block w-fit mt-14 text-lg bg-gray-200 px-10 py-2 rounded-full font-medium pointer hover:bg-black hover:text-white duration-300"
      >
        Edit
      </Link>
      <Link
        to="/"
        className="block w-fit mt-14 text-lg bg-gray-200 px-10 py-2 rounded-full font-medium pointer hover:bg-black hover:text-white duration-300"
      >
        Return to Home
      </Link>
    </>
  );
};

export default Read;
