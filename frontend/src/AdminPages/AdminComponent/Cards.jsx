
export const DashboardCard = ({data}) => {

    return (
        <div className="bg-white shadow-sm px-4 py-8 rounded-sm flex items-center gap-4">
            {
                data?.icon
            }
            <div>
                <h4 className="text-gray-500 text-sm">{data?.label}</h4>
                <p className="text-xl font-semibold">{data?.value}</p>
            </div>
        </div>
    )
}