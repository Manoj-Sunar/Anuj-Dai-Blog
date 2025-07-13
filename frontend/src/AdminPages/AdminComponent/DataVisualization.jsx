import {
    XAxis, YAxis, Tooltip, ResponsiveContainer,
    LineChart, Line, CartesianGrid, PieChart, Pie, Cell, Legend
} from 'recharts';




export const LineChartDataVisualization = ({ LineChartData, title }) => {

    return (
        <div className="bg-white shadow-md p-4 rounded-2xl">
            <h3 className="text-lg font-semibold mb-4">{title}</h3>
            <ResponsiveContainer width="100%" height={200}>
                <LineChart data={LineChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="blogs" stroke="#8884d8" strokeWidth={3} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}



export const DonutChart = ({ data }) => {
    const COLORS = [
        '#8884d8', '#8dd1e1', '#82ca9d', '#ffc658', '#a4de6c',
        '#d0ed57', '#ff8042', '#ffbb28', '#ff6666', '#a28eff',
        '#66c2ff', '#ff9999', '#b2f0e6', '#f9cb9c', '#c27ba0'
    ];
    return (
        <div className="bg-white p-4 rounded-2xl shadow-md">
            <h3 className="text-lg font-semibold mb-4 text-center">Blogs by Category</h3>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={data?.slice(0,10)}
                        dataKey="count"
                        nameKey="category"
                        cx="50%"
                        cy="50%"
                        innerRadius={80}
                        outerRadius={120}
                        paddingAngle={3}
                        label
                    >
                        {data?.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};