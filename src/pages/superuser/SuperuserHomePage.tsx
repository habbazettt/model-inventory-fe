import { Bell, HelpCircle, Home, Settings, Users } from "lucide-react";
import Sidebar, { SidebarItem } from "../../components/Sidebar";
import type { Model, ModelStatus } from "../../types";
import { modelData } from "../../data/modelData";
import { useMemo, useState } from "react";
import { getStatusColor } from "../../utils/statusUtils";
import ModelDetailModal from "../../components/modal/ModelDetailModal";
import DonutChart from "../../components/DonutChart";
import { useNavigate } from "react-router-dom";
import { useCheckRole } from "../../utils/checkRole";

export default function SuperuserHomePage() {
    useCheckRole("superuser");

    const navigate = useNavigate();
    const [selectedModel, setSelectedModel] = useState<Model | null>(null);

    const chartData = useMemo(() => {
        const statusCounts = modelData.reduce((acc: { [key in ModelStatus]?: number }, model) => {
            acc[model.status] = (acc[model.status] || 0) + 1;
            return acc;
        }, {});

        return Object.keys(statusCounts).map(status => ({
            name: status,
            value: statusCounts[status as ModelStatus]!
        }));
    }, []);

    const totalModels = modelData.length;
    const inValidation = chartData.find(d => d.name === "Requires Validation")?.value || 0;
    const requiresApproval = chartData.find(d => d.name === "Requires Approval")?.value || 0;
    const readyToUse = chartData.find(d => d.name === "Approved")?.value || 0;

    const statusColors: { [key in ModelStatus]: string } = {
        "Approved": "bg-green-500",
        "Requires Validation": "bg-yellow-500",
        "Requires Approval": "bg-red-500",
        "Retired": "bg-gray-500"
    };

    return (
        <main className="flex h-screen overflow-hidden">
            <Sidebar>
                <SidebarItem icon={<Home size={20} />} text="Home" active urlNavigate="/superuser/home" />
                <SidebarItem icon={<Bell size={20} />} text={"Notifications"} alert={true} urlNavigate="/superuser/notifications" />
                <SidebarItem icon={<Users size={20} />} text={"Access Management"} urlNavigate="/superuser/access-management" />
                <hr className="my-3" />
                <SidebarItem icon={<Settings size={20} />} text={"Settings"} urlNavigate="/superuser/settings" />
                <SidebarItem icon={<HelpCircle size={20} />} text={"Help"} urlNavigate="/superuser/help" />
            </Sidebar>

            <div className="flex-1 bg-gradient-to-br from-secondary-3 to-primary-3 overflow-auto min-w-0">
                <div className="h-full flex flex-col p-4 md:p-6 min-h-screen">
                    <div className="mb-4">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Dashboard</h1>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-4 flex-shrink-0">
                        <div className="space-y-3">
                            <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                                    <div>
                                        <p className="text-xs md:text-sm text-gray-600">Total Models</p>
                                        <p className="text-xl md:text-2xl font-bold text-gray-900">{totalModels}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                                    <div>
                                        <p className="text-xs md:text-sm text-gray-600">In Validation</p>
                                        <p className="text-xl md:text-2xl font-bold text-gray-900">{inValidation}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                                    <div>
                                        <p className="text-xs md:text-sm text-gray-600">Requires Approval</p>
                                        <p className="text-xl md:text-2xl font-bold text-gray-900">{requiresApproval}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                                    <div>
                                        <p className="text-xs md:text-sm text-gray-600">Ready to Use (Approved)</p>
                                        <p className="text-xl md:text-2xl font-bold text-gray-900">{readyToUse}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col">
                            <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">Model Distribution</h3>
                            <div className="flex-grow h-32 md:h-40">
                                <DonutChart data={chartData} />
                            </div>
                            <div className="mt-3 space-y-1">
                                {chartData.map((entry) => (
                                    <div key={entry.name} className="flex items-center text-xs">
                                        <div className={`w-2 h-2 ${statusColors[entry.name as ModelStatus]} rounded-full mr-2`}></div>
                                        <span className="text-gray-600">{entry.name}</span>
                                        <span className="ml-auto font-medium text-gray-700">{entry.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-base md:text-lg font-semibold text-gray-900">Notifications</h3>
                                <button onClick={() => navigate("/validator/notifications")} className="text-xs text-blue-600 hover:text-blue-800">see all</button>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-start space-x-3">
                                    <Bell className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                    <div className="min-w-0 flex-1">
                                        <p className="font-medium text-gray-900 text-sm">MOD-02</p>
                                        <p className="text-xs text-gray-600 break-words">One MEV does not pass stationarity testing - 10Y Gov. Bond Yield</p>
                                        <p className="text-xs text-gray-500 mt-1">16:30</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex-1 flex flex-col">
                        <div className="p-4 border-b border-gray-200 flex-shrink-0">
                            <h3 className="text-base md:text-lg font-semibold text-gray-900">Models</h3>
                        </div>
                        <div className="overflow-x-auto flex-1 min-h-0">
                            <table className="w-full">
                                <thead className="bg-gray-50 sticky top-0">
                                    <tr>
                                        <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Model ID</th>
                                        <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Model Name</th>
                                        <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Description</th>
                                        <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Initiator</th>
                                        <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {modelData.map((model) => (
                                        <tr
                                            key={model.id}
                                            className="hover:bg-gray-100 hover:cursor-pointer"
                                            onClick={() => setSelectedModel(model)}
                                        >
                                            <td className="px-3 md:px-6 py-3 whitespace-nowrap text-xs md:text-sm font-medium text-gray-900">{model.id}</td>
                                            <td className="px-3 md:px-6 py-3 text-xs md:text-sm text-gray-900">
                                                <div className="max-w-xs truncate">{model.name}</div>
                                                <div className="md:hidden text-xs text-gray-500 mt-1">{model.initiator}</div>
                                            </td>
                                            <td className="px-3 md:px-6 py-3 text-xs md:text-sm text-gray-600 max-w-md hidden lg:table-cell">
                                                <div className="line-clamp-2">{model.description}</div>
                                            </td>
                                            <td className="px-3 md:px-6 py-3 whitespace-nowrap text-xs md:text-sm text-gray-900 hidden md:table-cell">{model.initiator}</td>
                                            <td className="px-3 md:px-6 py-3 whitespace-nowrap">
                                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(model.status)}`}>
                                                    <span className="hidden sm:inline">{model.status}</span>
                                                    <span className="sm:hidden">
                                                        {model.status === "Approved" ? "✓" :
                                                            model.status === "Requires Validation" ? "⚠" :
                                                                model.status === "Requires Approval" ? "!" : "×"}
                                                    </span>
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <ModelDetailModal
                model={selectedModel}
                onClose={() => setSelectedModel(null)}
            />
        </main>
    );
}