import DashTable from "./DashTable";
import BarChartStacked from './BarChartStacked';
import PieChart from './PieChart';
import LineChart from './LineChart';

const Dashboard = () => {
  const piedata = {
    labels: ['Income', 'Loss'],
    datasets: [
      {
        data: [75.4,24.6],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="min-h-screen bg-gray-100">

      {/* Main Content */}
      <div className="container mx-auto p-4">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* First row, first column */}
          <div className="col-span-1 p-4" style={{ height: '400px' }}>
            <BarChartStacked />
          </div>

          {/* First row, second column */}
          <div className="col-span-1 p-4">
            <LineChart />
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Second row, first column */}
          <div className="col-span-1 p-4">
            <PieChart title="Daily Sales" data={piedata}/>
          </div>

          {/* Second row, second column */}
          <div className="col-span-1 p-4">
            <PieChart title="Monthly Sales" data={piedata}/>
          </div>

          {/* Second row, third column */}
          <div className="col-span-1 p-4">
            <PieChart title="Monthly Sales" data={piedata}/>
          </div>
        </div>

        {/* Table */}
        <div className="grid grid-cols-1 mt-5">
          <div className="col-span-1 bg-white p-4">
            {/* Header */}
            <div className="grid grid-cols-1 mb-4">
              <div className="col-span-1 bg-gray-200 p-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Inventory</h2>
              </div>
            </div>
            <DashTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
