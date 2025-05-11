import { Link } from "react-router";
import useFetchUsers from "../hooks/useFetchUsers";
import axios from "axios";

const Home = () => {
  const { setUsersData, usersData, loading, error } = useFetchUsers();

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3005/users/${id}`);
      setUsersData(usersData.filter((user) => user.id !== id));
    } catch (err) {
      console.error("Failed to delete user", err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="overflow-x-auto">
      <div className="container mx-auto px-5">
        <div className="w-full flex justify-center my-12">
          <div className="w-[90%] py-5 shadow-2xl">
            <h1 className="w-fit pb-1 mx-auto mb-5 text-3xl font-semibold capitalize border-b-2 border-gray-400">
              List of users
            </h1>
            <div className="flex justify-end mb-4">
              <Link
                to="/create"
                className="text-white mr-5 font-medium text-lg px-4 py-[2px] rounded bg-green-500 border-2 border-green-500 hover:bg-white hover:text-green-600 cursor-pointer duration-300"
              >
                Add +
              </Link>
            </div>
            <table className="min-w-full divide-y-2 divide-gray-200">
              <thead className="ltr:text-left rtl:text-right">
                <tr className="*:font-medium *:text-gray-900">
                  <th className="px-3 py-2 whitespace-nowrap">ID</th>
                  <th className="px-3 py-2 whitespace-nowrap">Name</th>
                  <th className="px-3 py-2 whitespace-nowrap">Username</th>
                  <th className="px-3 py-2 whitespace-nowrap">Email</th>
                  <th className="px-3 py-2 whitespace-nowrap">Phone</th>
                  <th className="px-3 py-2 whitespace-nowrap">Website</th>
                  <th className="px-3 py-2 whitespace-nowrap">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 *:even:bg-gray-50">
                {usersData.map((user) => {
                  return (
                    <tr
                      key={user.id}
                      className="*:text-gray-900 *:first:font-medium"
                    >
                      <td className="px-3 py-2 whitespace-nowrap">{user.id}</td>
                      <td className="px-3 py-2 whitespace-nowrap">
                        {user.name}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap">
                        {user.username}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap">
                        {user.email}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap">
                        {user.phone}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap">
                        {user.website}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap">
                        <Link
                          to={`/read/${user.id}`}
                          className="bg-sky-400 text-white cursor-pointer border-2 border-sky-500 hover:bg-white hover:text-sky-600 m-1 px-3 py-[2px] rounded-lg duration-300"
                        >
                          Read
                        </Link>
                        <Link
                          to={`/update/${user.id}`}
                          className="bg-blue-500 text-white cursor-pointer border-2 border-blue-500 hover:bg-white hover:text-blue-700 m-1 px-3 py-[2px] rounded-lg duration-300"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="bg-red-500 text-white cursor-pointer border-2 border-red-500 hover:bg-white hover:text-red-700 m-1 px-3 py-[2px] rounded-lg duration-300"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
