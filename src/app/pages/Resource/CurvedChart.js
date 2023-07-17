import React from 'react';
import { Chart, CategoryScale, LineController, LineElement, PointElement, Filler, Title } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Box } from '@mui/material';

Chart.register(CategoryScale, LinearScale, LineController, LineElement, PointElement, Filler, Title);

const SplineAreaChart = () => {
  const data = [10, 20, 30, 40, 50, 60, 70]; // Example data for the spline area chart

  const chartData = {
    labels: Array.from({ length: data.length }, (_, i) => i + 1), // Generate labels based on data length
    datasets: [
      {
        data: data,
        borderColor: '#56A0C2', // Line color (red)
        backgroundColor: 'rgba(135, 206, 250, 0.4)', // Filled area color (light blue)
        tension: 0.4, // Curvature of the line
        borderWidth: 2, // Line width
        pointRadius: 0, // Hide data points
        fill: true, // Enable the area fill
        cubicInterpolationMode: 'monotone', // Make the line curved
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        display: false, // Hide x-axis
      },
      y: {
        display: false, // Hide y-axis
      },
    },
    plugins: {
      legend: {
        display: false, // Hide legend
      },
      tooltip: {
        enabled: false, // Disable tooltips
      },
      title: {
        display: true, // Show title
        text: 'Earnings', // Title text
        font: {
          size: 16, // Title font size
          weight: 'bold', // Title font weight
        },
        color: 'black', // Title color
        align: 'start', // Align title to the left side
        padding: {
          top: 10, // Top padding
          bottom: 0, // Bottom padding
        },
      },
      labels: {
        display: true, // Show labels
        render: (args) => {
          if (args.index === 0) return 'Average: $200'; // First label
          if (args.index === 1) return 'Savings: $500'; // Second label
          if (args.index === 2) return 'Monthly: $800'; // Third label
          if (args.index === 3) return 'Annual: $9600'; // Fourth label
          return ''; // Empty string for other labels
        },
        font: {
          size: 12, // Labels font size
        },
        color: '#333', // Labels color
        align: 'start', // Align labels to the left side
        padding: {
          top: 0, // Top padding
          bottom: 10, // Bottom padding
        },
      },
    },
  };

  return (
    <Box sx={{backgroundColor:'#FFFFFF', padding:'12px', height:'449px'}}>
         <Line data={chartData} options={chartOptions} />
    </Box>
  );
};

export default SplineAreaChart;
