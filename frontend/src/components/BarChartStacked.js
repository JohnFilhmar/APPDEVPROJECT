import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const defaultOptions = {
  plugins: {
    legend: false
  },
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

const generateRandomData = () => ({
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'Dataset 1',
      data: Array.from({ length: 12 }, () => faker.datatype.number({ min: -1000, max: 1000 })),
      backgroundColor: 'rgb(255, 99, 132)',
      stack: 'Stack 0',
    },
    {
      label: 'Dataset 2',
      data: Array.from({ length: 12 }, () => faker.datatype.number({ min: -1000, max: 1000 })),
      backgroundColor: 'rgb(75, 192, 192)',
      stack: 'Stack 1',
    },
    {
      label: 'Dataset 3',
      data: Array.from({ length: 12 }, () => faker.datatype.number({ min: -1000, max: 1000 })),
      backgroundColor: 'rgb(53, 162, 235)',
      stack: 'Stack 2',
    },
  ],
});

const Chart = ({ options = {}, data = generateRandomData(), ...rest }) => {
  const mergedOptions = { ...defaultOptions, ...options };

  return (
    <>
        <div className="grid grid-cols-1">
            <div className="col-span-1">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Sales</h2>
            </div>
        </div>
        <Bar options={mergedOptions} data={data} {...rest} />
    </>
  );
};

export default Chart;
