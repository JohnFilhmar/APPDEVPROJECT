import DashTable from "./DashTable";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-blue-500 p-4 text-white">
        {/* Your Navbar Content */}
      </nav>

      {/* Main Content */}
      <div className="container mx-auto p-4">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Column 1 */}
          <div className="col-span-1 bg-gray-200 p-4">
            {/* Your Chart Content */}
          </div>

          {/* Column 2 */}
          <div className="col-span-1 bg-gray-200 p-4">
            {/* Your Chart Content */}
          </div>

          {/* Column 3 */}
          <div className="col-span-1 bg-gray-200 p-4">
            {/* Your Chart Content */}
          </div>
        </div>

        {/* Table */}
        <div className="grid grid-cols-1">
          <div className="col-span-1 bg-white p-4">
            <DashTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
