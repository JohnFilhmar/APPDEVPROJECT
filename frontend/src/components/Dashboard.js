import DashTable from "./DashTable";
import BarChartStacked from './BarChartStacked';
import PieChart from './PieChart';
import LineChart from './LineChart';

const Dashboard = () => {
  const daily = {
    labels: ['Income', 'Loss'],
    datasets: [
      {
        data: [66.5,33.5],
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
  const monthly = {
    labels: ['Income', 'Loss'],
    datasets: [
      {
        data: [33.5,66.5],
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
  const yearly = {
    labels: ['Income', 'Loss'],
    datasets: [
      {
        data: [23,77],
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
  // <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b-4">
  //   {/* First row, first column */}
  //   <div className="col-span-1 p-4 text-center" style={{ height: '400px' }}>
  //     <BarChartStacked />
  //   </div>
  //   <div className="col-span-1 p-4 text-center">
  //     <LineChart />
  //   </div>
  // </div>
  return (
    <>
      <div className="min-h-screen bg-gray-100">
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
        {/* Header */}
        <div className="grid grid-cols-1 mb-4">
          <div className="col-span-1 bg-gray-200 p-4">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Sales</h2>
          </div>
        </div>
        <div className="p-4 border-x-4">

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b-4">
            {/* Second row, first column */}
            <div className="col-span-1 p-4 text-center">
              <PieChart title="Daily Sales" data={daily}/>
            </div>

            {/* Second row, second column */}
            <div className="col-span-1 p-4 text-center">
              <PieChart title="Monthly Sales" data={monthly}/>
            </div>

            {/* Second row, third column */}
            <div className="col-span-1 p-4 text-center">
              <PieChart title="Yearly Sales" data={yearly}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
