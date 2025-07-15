import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, type TooltipProps } from 'recharts';
import { type ValueType, type NameType } from 'recharts/types/component/DefaultTooltipContent';

const COLORS: { [key: string]: string } = {
    "Approved": "#22C55E",
    "Requires Validation": "#EAB308",
    "Requires Approval": "#EF4444",
    "Retired": "#6B7280"
};


const CustomTooltip = ({ active, payload }: TooltipProps<ValueType, NameType>) => {
    if (active && payload && payload.length) {
        return (
            <div className="p-2 bg-white border border-gray-200 rounded-md shadow-sm">
                <p className="font-semibold text-gray-800">{`${payload[0].name}`}</p>
                <p className="text-sm text-gray-600">{`Total: ${payload[0].value}`}</p>
            </div>
        );
    }

    return null;
};

interface DonutChartProps {
    data: {
        name: string;
        value: number;
    }[];
}

export default function DonutChart({ data }: DonutChartProps) {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Tooltip content={<CustomTooltip />} />
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={35}
                    outerRadius={55}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    nameKey="name"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[entry.name] ?? '#CCCCCC'} />
                    ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    );
}