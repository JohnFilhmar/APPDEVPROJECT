const AccountDetailsPage = () => {
    const userDetails = {
      username: 'john_doe',
      email: 'john.doe@example.com',
      usageCount: 25,
      orderCount: 10,
      points: 150,
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
              <span className="font-bold">Usage Count:</span> {userDetails.usageCount}
            </p>
          </div>
  
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Order Information</h2>
            <p className="text-gray-600 dark:text-gray-400">
              <span className="font-bold">Order Counts:</span> {userDetails.orderCount}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              <span className="font-bold">Return Counts:</span> {userDetails.orderCount}
            </p>
          </div>
  
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md col-span-3">
            <h2 className="text-xl font-semibold mb-4">Points</h2>
            <p className="text-gray-600 dark:text-gray-400">
              <span className="font-bold">Points:</span> {userDetails.points}
            </p>
          </div>
        </div>
      </div>
    );
  };
  
  export default AccountDetailsPage;
  