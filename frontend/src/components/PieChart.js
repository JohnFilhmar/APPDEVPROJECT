import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({title,data}) => {
    const options = {
        plugins: {
            legend: false,
        }
    };
    return (
        <div className="grid grid-cols-1 text-center">
        <div className="col-span-1">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">{title}</h2>
        </div>
        <div className="chart">
            <Pie data={data} options={options}/>
        </div>
        </div>
    );
};

export default PieChart;
