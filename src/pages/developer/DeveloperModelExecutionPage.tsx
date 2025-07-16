import { Bell, FileBox, HelpCircle, Home, Settings } from "lucide-react";
import Sidebar, { SidebarItem } from "../../components/Sidebar";
import type { Model, ModelStatus } from "../../types";
import { modelData } from "../../data/modelData";
import { useState } from "react";
import ModelDetailModal from "../../components/modal/ModelDetailModal";

export default function DeveloperModelExecutionPage() {
    const [selectedModel, setSelectedModel] = useState<Model | null>(null);

    const getStatusColor = (status: ModelStatus): string => {
        switch (status) {
            case "Approved": return "bg-green-100 text-green-800";
            case "Requires Validation": return "bg-yellow-100 text-yellow-800";
            case "Requires Approval": return "bg-red-100 text-red-800";
            case "Retired": return "bg-gray-100 text-gray-800";
            default: return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <main className="flex h-screen overflow-hidden">
            <Sidebar>
                <SidebarItem
                    icon={<Home size={20} />}
                    text="Home"
                    urlNavigate="/developer/home"
                />
                <SidebarItem
                    icon={<Bell size={20} />}
                    text={"Notifications"}
                    alert={true}
                    urlNavigate="/developer/notifications"
                />
                <SidebarItem
                    icon={<FileBox size={20} />}
                    text={"Model Execution"}
                    urlNavigate="/developer/model-execution"
                    active
                />
                <hr className="my-3" />
                <SidebarItem
                    icon={<Settings size={20} />}
                    text={"Settings"}
                    urlNavigate="/developer/settings"
                />
                <SidebarItem
                    icon={<HelpCircle size={20} />}
                    text={"Help"}
                    urlNavigate="/developer/help"
                />
            </Sidebar>

            <div className="flex-1 bg-gradient-to-br from-secondary-3 to-primary-3 overflow-auto min-w-0">
                <div className="h-full flex flex-col p-4 md:p-6 min-h-screen">
                    {/* Header */}
                    <div className="mb-4">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Model Execution</h1>
                    </div>

                    {/* Model Execution Table */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex-1 flex flex-col">
                        <div className="overflow-x-auto flex-1 min-h-0">
                            <table className="w-full">
                                <thead className="bg-gray-50 sticky top-0">
                                    <tr>
                                        <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Model ID
                                        </th>
                                        <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Model Name
                                        </th>
                                        <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                                            Description
                                        </th>
                                        <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                                            Owner
                                        </th>
                                        <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                                            Validator
                                        </th>
                                        <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                                            Date Approved
                                        </th>
                                        <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {modelData.map((model) => (
                                        <tr
                                            key={model.id} className="hover:bg-gray-50 hover:cursor-pointer"
                                            onClick={() => setSelectedModel(model)}
                                        >
                                            <td className="px-3 md:px-6 py-3 whitespace-nowrap text-xs md:text-sm font-medium text-gray-900">
                                                {model.id}
                                            </td>
                                            <td className="px-3 md:px-6 py-3 text-xs md:text-sm text-gray-900">
                                                <div className="max-w-xs truncate">{model.name}</div>
                                                <div className="md:hidden text-xs text-gray-500 mt-1">{model.owner}</div>
                                            </td>
                                            <td className="px-3 md:px-6 py-3 text-xs md:text-sm text-gray-600 max-w-md hidden lg:table-cell">
                                                <div className="line-clamp-2">{model.description}</div>
                                            </td>
                                            <td className="px-3 md:px-6 py-3 whitespace-nowrap text-xs md:text-sm text-gray-900 hidden md:table-cell">
                                                {model.owner}
                                            </td>
                                            <td className="px-3 md:px-6 py-3 whitespace-nowrap text-xs md:text-sm text-gray-900 hidden md:table-cell">
                                                {model.validator}
                                            </td>
                                            <td className="px-3 md:px-6 py-3 whitespace-nowrap text-xs md:text-sm text-gray-900 hidden md:table-cell">
                                                {model.date_approved}
                                            </td>
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