import React, { useState, useEffect } from 'react';
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, BarElement } from 'chart.js';
import { FaShoppingCart, FaUsers, FaBoxOpen, FaChartLine, FaSpinner } from 'react-icons/fa';
import axios from 'axios';
import summmryApi from '../common';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, BarElement);

const Dashboard = () => {
  const [stats, setStats] = useState({});
  const [orderData, setOrderData] = useState([]);
  const [orderStatus, setOrderStatus] = useState({});
  const [categorySales, setCategorySales] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(summmryApi.getDashboardData.url,{withCredentials:true}); 
        if (response.data.success) {
          const data = response.data.data;
          setStats({
            totalUsers: data.totalUsers,
            totalProducts: data.totalProducts,
            totalOrders: data.totalOrders,
            TotalRevenue: data.totalRevenue,
          });
          setOrderData(data.orderData);
          setOrderStatus(data.orderStatus);
          setCategorySales(data.categorySales);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <FaSpinner className="animate-spin text-4xl text-primary" />
        <p className="ml-3 text-xl text-primary font-medium">Loading Graphs...</p>
      </div>
    );

  // Chart Data
  const salesData = {
    labels: orderData?.map(order => order.date),
    datasets: [
      {
        label: 'Revenue',
        data: orderData?.map(order => order.revenue),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const orderStatusData = {
    labels: Object?.keys(orderStatus),
    datasets: [
      {
        data: Object?.values(orderStatus),
        backgroundColor: ['#059000', '#FF5733', '#36A2EB', '#FFCE56'],
        hoverOffset: 4,
      },
    ],
  };

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

  const productCategoryData = {
    labels: Object.keys(categorySales),
    datasets: [
      {
        data: Object.values(categorySales),
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40',
          '#66FF66', '#FF66B2', '#33CCFF', '#FF4444', '#AA66CC', '#FFCC00',
          '#0099CC', '#9933CC', '#00CC99', '#FF9933', '#FF5733', '#C70039',
          '#900C3F', '#DAF7A6', '#581845', '#FFC300', '#28B463', '#8E44AD',
          '#1F618D', '#117A65', '#D35400', '#7D3C98', '#E67E22', '#2ECC71',
          '#F1C40F', '#3498DB', '#E74C3C', '#9B59B6', '#16A085', '#34495E',
          '#2C3E50', '#F39C12', '#D5DBDB', '#7FB3D5', '#76D7C4', '#F7DC6F',
          '#A569BD', '#F5B7B1', '#82E0AA'
        ]
        
      },
    ],
  };


  return (
    <div className="flex flex-col items-center p-1 bg-gray-100 min-h-screen ">
      {/* Main Dashboard Content */}
      <div className="w-full p-1 h-[calc(100vh-3rem)] scrollbar-none overflow-y-scroll">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
           <div className='relative'>
           <FaShoppingCart  className="text-5xl font-bold text-blue-600 mr-4" />
            <div className=' text-white p-1 flex items-center justify-center w-5 h-5 rounded-full top-2 right-6 absolute'>
                <p className='text-sm'>{stats.totalOrders}</p>
              </div>
           </div>
            <div>
              <h3 className="text-xl font-semibold">Total Orders</h3>
              <p className="text-lg">{ Object.values(orderStatus).reduce((acc, val) => acc + val, 0)}</p>
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
              <h3 className="text-xl font-semibold">Total Revenue</h3>
              <p className="text-lg">₹ {stats.TotalRevenue}</p>
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
          <div className="bg-white p-4 rounded-lg shadow-md mb-6 ">
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
