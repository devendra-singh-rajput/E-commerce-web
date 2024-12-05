import React, { useState, useEffect } from 'react';
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, BarElement } from 'chart.js';
import { FaShoppingCart, FaUsers, FaBoxOpen, FaChartLine } from 'react-icons/fa';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, BarElement);

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalSales: 200000,
    totalOrders: 1250,
    totalUsers: 1500,
    totalProducts: 300,
    pendingOrders: 120,
    revenueToday: 5000,
  });

  const [orderData, setOrderData] = useState([
    { date: '2024-12-01', revenue: 2000 },
    { date: '2024-12-02', revenue: 3000 },
    { date: '2024-12-03', revenue: 1500 },
    { date: '2024-12-04', revenue: 5000 },
    { date: '2024-12-05', revenue: 2500 },
  ]);

  const [orderStatus, setOrderStatus] = useState({
    "deliverd":500,
    "Shipped": 1000,
    "Pending": 150,
    "Canceled": 100,
  });

  const [categorySales, setCategorySales] = useState({
    "Electronics": 50000,
    "Clothing": 30000,
    "Books": 20000,
    "Home Appliances": 10000,
    "Toys": 15000,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, []);

  // Total Sales by Day (Line Chart)
  const salesData = {
    labels: orderData.map(order => order.date),
    datasets: [
      {
        label: 'Revenue',
        data: orderData.map(order => order.revenue),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // Order Status Distribution (Pie Chart)
  const orderStatusData = {
    labels: Object.keys(orderStatus),
    datasets: [
      {
        data: Object.values(orderStatus),
        backgroundColor: ['#098000','#36A2EB', '#FFCE56', '#FF5733'],
        hoverOffset: 4,
      },
    ],
  };

  // Revenue by Category (Bar Chart)
  const categorySalesData = {
    labels: Object.keys(categorySales),
    datasets: [
      {
        label: 'Revenue by Category',
        data: Object.values(categorySales),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Product Category Distribution (Doughnut Chart)
  const productCategoryData = {
    labels: Object.keys(categorySales),
    datasets: [
      {
        data: Object.values(categorySales),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      },
    ],
  };

  return (
    <div className="flex flex-col items-center p-1 bg-gray-100 min-h-screen ">
      {/* Main Dashboard Content */}
      <div className="w-full p-1">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
            <FaShoppingCart className="text-4xl text-blue-600 mr-4" />
            <div>
              <h3 className="text-xl font-semibold">Total Orders</h3>
              <p className="text-lg">{stats.totalOrders}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
            <FaUsers className="text-4xl text-green-600 mr-4" />
            <div>
              <h3 className="text-xl font-semibold">Total Users</h3>
              <p className="text-lg">{stats.totalUsers}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
            <FaChartLine className="text-4xl text-yellow-600 mr-4" />
            <div>
              <h3 className="text-xl font-semibold">Revenue Today</h3>
              <p className="text-lg">₹{stats.revenueToday}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
            <FaBoxOpen className="text-4xl text-red-600 mr-4" />
            <div>
              <h3 className="text-xl font-semibold">Total Products</h3>
              <p className="text-lg">{stats.totalProducts}</p>
            </div>
          </div>
        </div>

        {/* Graphs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
  {/* Line Chart: Sales by Day */}
  <div className="bg-white p-4 rounded-lg shadow-md mb-6 h-[410px]">
    <h3 className="text-xl font-semibold mb-4">Total Sales by Day</h3>
    <Line 
      data={salesData} 
      
      options={{
        responsive: true,
        animation: {
          duration: 1500,
          easing: 'easeInOutQuad',
        },
        plugins: {
          title: {
            display: true,
            text: 'Revenue Over Time',
          },
        },
      }} 
    />
  </div>

  {/* Bar Chart: Revenue by Category */}
  <div className="bg-white p-4 rounded-lg shadow-md mb-6 h-[410px]">
    <h3 className="text-xl font-semibold mb-4">Revenue by Category</h3>
    <Bar 
      data={categorySalesData} 
      options={{
        responsive: true,
        animation: {
          duration: 1500,
          easing: 'easeInOutQuad',
        },
        plugins: {
          title: {
            display: true,
            text: 'Revenue by Category',
          },
        },
      }} 
    />
  </div>
</div>

        {/* Second Row of Graphs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 ">
          {/* Pie Chart: Order Status */}
          <div className="bg-white p-4 rounded-lg shadow-md mb-6">
            <h3 className="text-xl font-semibold mb-4">Order Status</h3>
            <Pie 
              data={orderStatusData} 
              options={{
                responsive: true,
                animation: {
                  duration: 1500,
                  easing: 'easeInOutQuad',
                },
                plugins: {
                  title: {
                    display: true,
                    text: 'Order Status Distribution',
                  },
                },
              }} 
            />
          </div>

          {/* Doughnut Chart: Product Category Distribution */}
          <div className="bg-white p-4 rounded-lg shadow-md mb-6">
            <h3 className="text-xl font-semibold mb-4">Product Category Distribution</h3>
            <Doughnut 
              data={productCategoryData} 
              options={{
                responsive: true,
                animation: {
                  duration: 2000,
                  easing: 'easeInOutQuad',
                },
                plugins: {
                  title: {
                    display: true,
                    text: 'Product Category Distribution',
                  },
                },
              }} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
