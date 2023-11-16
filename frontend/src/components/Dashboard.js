import DashTable from "./DashTable";
import BarChartStacked from './BarChartStacked';
import PieChart from './PieChart';
import LineChart from './LineChart';
import { Footer } from 'flowbite-react';
import { BsFacebook, BsGithub } from 'react-icons/bs';
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Dashboard = () => {
  const piedata = {
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
  return (
    <>
      <div className="min-h-screen bg-gray-100">
        {/* Main Content */}
        <div className="container mx-auto p-4 border-x-4">
          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b-4">
            {/* First row, first column */}
            <div className="col-span-1 p-4 text-center" style={{ height: '400px' }}>
              <BarChartStacked />
            </div>

            {/* First row, second column */}
            <div className="col-span-1 p-4 text-center">
              <LineChart />
            </div>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b-4">
            {/* Second row, first column */}
            <div className="col-span-1 p-4 text-center">
              <PieChart title="Daily Sales" data={piedata}/>
            </div>

            {/* Second row, second column */}
            <div className="col-span-1 p-4 text-center">
              <PieChart title="Monthly Sales" data={piedata}/>
            </div>

            {/* Second row, third column */}
            <div className="col-span-1 p-4 text-center">
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
      <Footer container>
        <div className="w-full">
          <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
            <div>
              <Footer.Brand
                as={Link}
                href="#"
                src="jms.svg"
                alt="JMS Logo"
                name="Multi-Hub System"
                style={{position:"static", width:'7vw',height:'7vh'}}
              />
            </div>
            <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
              <div>
                <Footer.Title title="about" />
                <Footer.LinkGroup col>
                  <Footer.Link as={Link} to="#">Canubing I Main Branch</Footer.Link>
                  <Footer.Link as={Link} to="#">Canubing I.2 Branch</Footer.Link>
                  <Footer.Link as={Link} to="#">Bayanan II Branch</Footer.Link>
                  <Footer.Link as={Link} to="#">Malinao Branch</Footer.Link>
                </Footer.LinkGroup>
              </div>
              <div>
                <Footer.Title title="Follow us" />
                <Footer.LinkGroup col>
                  <Footer.Link as={Link} href="https://www.facebook.com/JoemarMotorpartsAndServices" target="_blank">Facebook</Footer.Link>
                </Footer.LinkGroup>
              </div>
              <div>
                <Footer.Title title="Legal" />
                <Footer.LinkGroup col>
                  <Footer.Link as={Link} to="#">Privacy Policy</Footer.Link>
                  <Footer.Link as={Link} to="#">Terms &amp; Conditions</Footer.Link>
                </Footer.LinkGroup>
              </div>
            </div>
          </div>
          <Footer.Divider />
          <div className="w-full sm:flex sm:items-center sm:justify-between">
            <Footer.Copyright as={Link} to="#" by="AmpelDev™" year={2023} />
            <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
              <Footer.Icon as={Link} href="https://www.facebook.com/JoemarMotorpartsAndServices" target="_blank" icon={BsFacebook} />
              <Footer.Icon as={Link} href="https://github.com/JohnFilhmar" target="_blank" icon={BsGithub} />
            </div>
          </div>
        </div>
      </Footer>
    </>
  );
};

export default Dashboard;
