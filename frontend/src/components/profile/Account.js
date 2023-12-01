import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Loading from '../Loading';
import PromptError from '../PromptError';
import useGetCheckOut from './useGetCheckout';
import useGetUsers from './useGetSpecificUser';
import { useEffect } from 'react';

const AccountDetailsPage = () => {
  const { response: checkoutResponse, error, loading } = useGetCheckOut();
  const { response: usersResponse, error: userError, loading: userLoading, fetchData } = useGetUsers();
  
  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (userLoading || loading){
    <Loading />
  }

  if (userError || error) {
    <PromptError />
  }
  const userDetails = {
    username: usersResponse.userName,
    email: usersResponse.userEmail || (
      <span>
        No email. <br/><Link to="/edit" className="hover:text-red-900 text-red-500">Add an email</Link>
      </span>
    ),
    dateCreated: usersResponse.datetime_added,
    dateModified: usersResponse.date_updated || usersResponse.datetime_added ,
    orderCount: checkoutResponse && JSON.stringify(checkoutResponse.length),
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-5 text-gray-800 dark:text-white">Account Details</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">User Information</h2>
          <p className="text-gray-600 dark:text-gray-400">
            <span className="font-bold">Username:</span> {userDetails.username}
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            <span className="font-bold">Email:</span> {userDetails.email}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Usage Information</h2>
          <p className="text-gray-600 dark:text-gray-400">
            <span className="font-bold">Date Created:</span><br/> {userDetails.dateCreated}
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            <span className="font-bold">Last Date Modified:</span> {userDetails.dateModified}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Order Information</h2>
          <p className="text-gray-600 dark:text-gray-400">
            <span className="font-bold">Order Counts:</span> {userDetails.orderCount}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccountDetailsPage;
