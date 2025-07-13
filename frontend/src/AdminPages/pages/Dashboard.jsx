
import { Users, FileText, MessageSquare } from 'lucide-react';
import { DashboardCard } from '../AdminComponent/Cards';
import {useState } from 'react';
import { useEffect } from 'react';
import {AdminGetBlogsOverTimeLineChart, AdminGetDashboardSummery, AdminGetDunutChart } from '../../actions/AdminApiC';
import { DonutChart, LineChartDataVisualization } from '../AdminComponent/DataVisualization';
import AdminTable from '../AdminComponent/AdminTable';




const Dashboard = () => {

    const [totalStats, setTotalStats] = useState();
    const [LineChartsData, setLineCharts] = useState([]);
    const [CategoryChartsData, setCategoryCharts] = useState();
   







    const CardData = [
        {
            label: 'Total Blogs',
            value: totalStats?.totalBlogs,
            icon: <FileText className="text-blue-600" />
        },
        {
            label: 'Total Users',
            value: totalStats?.totalUsers,
            icon: <Users className="text-green-600" />
        },

        {
            label: 'Total Comments',
            value: totalStats?.totalComments,
            icon: <MessageSquare className="text-orange-500" />
        },
        {
            label: 'Total Comments',
            value: totalStats?.totalLikes,
            icon: <MessageSquare className="text-orange-500" />
        },
    ]




    useEffect(() => {
        const fetchStats = async () => {
            const result = await AdminGetDashboardSummery();

            if (result?.status === true) {
                setTotalStats(result);
            }
        }

        fetchStats();
    }, [])





    useEffect(() => {

        const fetchLineChartsdata = async () => {

            const result = await AdminGetBlogsOverTimeLineChart();
            console.log(result);

            if (result?.status === true) {
                setLineCharts(result?.mapped);
            }
        }

        fetchLineChartsdata();
    }, [])


    

    useEffect(() => {
        const fetchBarChartdata = async () => {
            const result = await AdminGetDunutChart();
               console.log(result);
            if (result?.status === true) {
                setCategoryCharts(result?.result);
            }
        }

        fetchBarChartdata();
    }, [])




    return (
        <div className="grid gap-6">
            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                {
                    CardData?.map((item, index) => <DashboardCard data={item} key={index} />)
                }

            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Line Chart */}
                <LineChartDataVisualization LineChartData={LineChartsData} title={"Blogs Over Time"} />
                <DonutChart data={CategoryChartsData} title={"Blogs by Category"} />
            </div>

           <AdminTable/>


        </div>
    );
};

export default Dashboard;
