import * as React from "react";
import { getUsersService } from "../services/user";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

interface IUser {
  address: {
    street: string;
    city: string;
    zipcode: string;
    suite: string;
  };
  email: string;
  id: number;
  name: string;
  website: string;
}
function Home() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  const [users, setUsers] = React.useState<IUser[]>([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [usersPerPage] = React.useState(4);
  const [currentUsers, setCurrentUsers] = React.useState<IUser[]>([]);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  const getUsers = async () => {
    setIsLoading(true);
    try {
      const data = await getUsersService();
      setUsers(data);
      console.log(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const onUserClick = (userId: number) => {
    navigate(`/posts/${userId}`);
  };

  React.useEffect(() => {
    getUsers();
  }, []);
  React.useEffect(() => {
    setCurrentUsers(users.slice(indexOfFirstUser, indexOfLastUser));
  }, [currentPage, indexOfFirstUser, indexOfLastUser, users]);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <div className="container mx-auto mt-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">User List</h1>
            <table className="table-auto w-full border-gray-300 border">
              <thead>
                <tr>
                  <th className="border px-4 py-2 text-gray-800">No.</th>
                  <th className="border px-4 py-2 text-gray-800">Name</th>
                  <th className="border px-4 py-2 text-gray-800">Email</th>
                  <th className="border px-4 py-2 text-gray-800">Address</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user, index) => (
                  <tr key={user.id} onClick={() => onUserClick(user.id)} className="hover:cursor-pointer hover:text-gray-400">
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">{user.name}</td>
                    <td className="border px-4 py-2">{user.email}</td>
                    <td className="border px-4 py-2">
                      {user.address.street} {user.address.suite}{" "}
                      {user.address.city} {user.address.zipcode}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center mt-4">
            <div className="flex justify-center mt-4">
              {Array.from({ length: Math.ceil(users.length / usersPerPage) })
                .map((_, i) => i + 1)
                .map((pageNumber) => (
                  <button
                    key={pageNumber}
                    onClick={() => paginate(pageNumber)}
                    className={`mx-2 px-4 py-2 ${
                      pageNumber === currentPage
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-400"
                    }`}
                  >
                    {pageNumber}
                  </button>
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
