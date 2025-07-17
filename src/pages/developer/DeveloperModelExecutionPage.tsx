import { Bell, FileBox, HelpCircle, Home, Settings, Search } from "lucide-react";
import Sidebar, { SidebarItem } from "../../components/Sidebar";
import type { Model, ModelStatus } from "../../types";
import { modelData } from "../../data/modelData";
import { useMemo, useState } from "react";
import ModelDetailModal from "../../components/modal/ModelDetailModal";

export default function DeveloperModelExecutionPage() {
    const [selectedModel, setSelectedModel] = useState<Model | null>(null);
    const [statusFilter, setStatusFilter] = useState<ModelStatus | 'All'>('All');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredModels = useMemo(() => {
        let filtered = modelData;

        // Filter by status
        if (statusFilter !== 'All') {
            filtered = filtered.filter(model => model.status === statusFilter);
        }

        // Filter by search term
        if (searchTerm.trim()) {
            filtered = filtered.filter(model =>
                model.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        return filtered;
    }, [statusFilter, searchTerm]);

    const getStatusColor = (status: ModelStatus): string => {
        switch (status) {
            case "Approved": return "bg-green-100 text-green-800";
            case "Requires Validation": return "bg-yellow-100 text-yellow-800";
            case "Requires Approval": return "bg-red-100 text-red-800";
            case "Retired": return "bg-gray-100 text-gray-800";
            default: return "bg-gray-100 text-gray-800";
        }
    };

    const getStatusDot = (status: ModelStatus | 'All'): string => {
        switch (status) {
            case "Approved": return "bg-green-500";
            case "Requires Validation": return "bg-yellow-500";
            case "Requires Approval": return "bg-red-500";
            case "Retired": return "bg-gray-500";
            default: return "bg-blue-500";
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
                    <div className="bg-white rounded-lg shadow-sm border overflow-hidden flex-1 flex flex-col">
                        {/* Search and Filter Section */}
                        <div className="p-4 border-b border-gray-200">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                {/* Search Bar */}
                                <div className="relative flex-1 max-w-md">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Search className="h-5 w-5 text-primary-2" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Search model name..."
                                        className="block w-full pl-10 pr-3 py-2 border border-primary-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-1 focus:border-primary-1 bg-white placeholder-gray-500"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>

                                {/* Status Filter */}
                                <div className="flex items-center gap-2">
                                    <label htmlFor="status-filter" className="text-sm font-medium text-primary-2">
                                        Filter by Status:
                                    </label>
                                    <div className="relative">
                                        <select
                                            id="status-filter"
                                            className="appearance-none px-3 py-2 pl-9 pr-8 border border-primary-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-1 focus:border-primary-1 bg-white text-primary-2 cursor-pointer"
                                            value={statusFilter}
                                            onChange={(e) => setStatusFilter(e.target.value as ModelStatus | 'All')}
                                        >
                                            <option value="All">All Statuses</option>
                                            <option value="Approved">Approved</option>
                                            <option value="Requires Validation">Requires Validation</option>
                                            <option value="Requires Approval">Requires Approval</option>
                                            <option value="Retired">Retired</option>
                                        </select>

                                        {/* Status Dot Indicator */}
                                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                            <div className={`w-3 h-3 rounded-full ${getStatusDot(statusFilter as ModelStatus | 'All')}`}></div>
                                        </div>

                                        {/* Dropdown Arrow */}
                                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                            <svg className="w-4 h-4 text-primary-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Results Info */}
                            <div className="mt-3 text-sm text-primary-2">
                                Showing <span className="font-medium text-primary-2">{filteredModels.length}</span> of <span className="font-medium text-primary-2">{modelData.length}</span> models
                                {searchTerm && (
                                    <span className="ml-2">
                                        for "<span className="font-medium text-primary-2">{searchTerm}</span>"
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="overflow-x-auto flex-1 min-h-0">
                            <table className="w-full">
                                <thead className="sticky top-0">
                                    <tr>
                                        <th className="px-3 md:px-6 py-3 text-left text-xs font-bold text-primary-2 uppercase tracking-wider">
                                            Model ID
                                        </th>
                                        <th className="px-3 md:px-6 py-3 text-left text-xs font-bold text-primary-2 uppercase tracking-wider">
                                            Model Name
                                        </th>
                                        <th className="px-3 md:px-6 py-3 text-left text-xs font-bold text-primary-2 uppercase tracking-wider hidden lg:table-cell">
                                            Description
                                        </th>
                                        <th className="px-3 md:px-6 py-3 text-left text-xs font-bold text-primary-2 uppercase tracking-wider hidden md:table-cell">
                                            Owner
                                        </th>
                                        <th className="px-3 md:px-6 py-3 text-left text-xs font-bold text-primary-2 uppercase tracking-wider hidden md:table-cell">
                                            Validator
                                        </th>
                                        <th className="px-3 md:px-6 py-3 text-left text-xs font-bold text-primary-2 uppercase tracking-wider hidden md:table-cell">
                                            Date Approved
                                        </th>
                                        <th className="px-3 md:px-6 py-3 text-left text-xs font-bold text-primary-2 uppercase tracking-wider">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredModels.map((model) => (
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