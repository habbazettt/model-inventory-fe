import { Bell, FileBox, HelpCircle, Home, Settings, ArrowLeft, User, CheckCircle, AlertCircle, XCircle, Clock, CalendarPlus, CalendarSearch, CalendarCheck2 } from "lucide-react";
import Sidebar, { SidebarItem } from "../../components/Sidebar"
import { useCheckRole } from "../../utils/checkRole";
import { useParams, useNavigate } from "react-router-dom";
import { modelData } from "../../data/modelData";
import type { Model, ModelStatus } from "../../types";
import { getStatusColor } from "../../utils/statusUtils";
import Button from "../../components/Button";

export default function DeveloperModelDetailsPage() {
    useCheckRole("developer");

    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const selectedModel: Model | undefined = modelData?.find(model => model.id == id);

    const getStatusIcon = (status: ModelStatus) => {
        switch (status) {
            case "Approved": return <CheckCircle className="w-4 h-4 text-green-600" />;
            case "Requires Validation": return <AlertCircle className="w-4 h-4 text-yellow-600" />;
            case "Requires Approval": return <XCircle className="w-4 h-4 text-red-600" />;
            case "Retired": return <Clock className="w-4 h-4 text-gray-600" />;
            default: return <Clock className="w-4 h-4 text-gray-600" />;
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
                    {/* Header with Back Button */}
                    <div className="mb-6">
                        <div className="flex items-center gap-4 mb-4">
                            <button
                                onClick={() => navigate("/developer/model-execution")}
                                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                            >
                                <ArrowLeft size={20} />
                                <span className="text-sm font-medium">Back to Model Execution</span>
                            </button>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                            {selectedModel ? `Model Details - ${selectedModel.name}` : "Model Not Found"}
                        </h1>
                        {selectedModel && (
                            <p className="text-lg text-gray-600 mt-2">Model ID: {selectedModel.id}</p>
                        )}
                    </div>

                    {selectedModel ? (
                        <div className="space-y-6">
                            {/* Status Card */}
                            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                                <div className="p-6">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-xl font-semibold text-gray-900">Status Overview</h2>
                                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${getStatusColor(selectedModel.status)}`}>
                                            {getStatusIcon(selectedModel.status)}
                                            <span className="font-semibold">{selectedModel.status}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Main Information Grid */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Model Information Card */}
                                <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                                    <div className="p-6">
                                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Model Information</h2>
                                        <div className="space-y-4">
                                            <div className="flex flex-col">
                                                <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Model Name</label>
                                                <p className="mt-1 text-lg font-medium text-gray-900">{selectedModel.name}</p>
                                            </div>
                                            <div className="flex flex-col">
                                                <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Model ID</label>
                                                <p className="mt-1 text-lg font-mono text-gray-900 bg-gray-50 px-3 py-2 rounded-md inline-block">{selectedModel.id}</p>
                                            </div>
                                            <div className="flex flex-col">
                                                <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Description</label>
                                                <p className="mt-1 text-gray-900 leading-relaxed">{selectedModel.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Team Information Card */}
                                <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                                    <div className="p-6">
                                        <h2 className="text-xl font-semibold text-gray-900 mb-6">Team & Timeline</h2>
                                        <div className="space-y-6">
                                            {/* Initiator & Date Initiated Row */}
                                            {selectedModel.initiator && selectedModel.date_initiated && (
                                                <div className="grid grid-cols-2 items-center gap-4 md:gap-8">
                                                    <div className="flex items-center gap-3">
                                                        <div className="p-2 bg-blue-100 rounded-lg">
                                                            <User className="w-5 h-5 text-blue-600" />
                                                        </div>
                                                        <div>
                                                            <label className="text-sm font-medium text-gray-500">Initiator</label>
                                                            <p className="text-lg font-medium text-gray-900">{selectedModel.initiator}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <div className="p-2 bg-red-100 rounded-lg">
                                                            <CalendarPlus className="w-5 h-5 text-red-500" />
                                                        </div>
                                                        <div>
                                                            <label className="text-sm font-medium text-gray-500">Date Initiated</label>
                                                            <p className="text-lg font-medium text-gray-900">{selectedModel.date_initiated}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Validator & Date Validated Row */}
                                            {selectedModel.validator && selectedModel.date_validated && (
                                                <div className="grid grid-cols-2 items-center gap-4 md:gap-8">
                                                    <div className="flex items-center gap-3">
                                                        <div className="p-2 bg-yellow-100 rounded-lg">
                                                            <CheckCircle className="w-5 h-5 text-yellow-600" />
                                                        </div>
                                                        <div>
                                                            <label className="text-sm font-medium text-gray-500">Validator</label>
                                                            <p className="text-lg font-medium text-gray-900">{selectedModel.validator}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <div className="p-2 bg-yellow-100 rounded-lg">
                                                            <CalendarSearch className="w-5 h-5 text-yellow-500" />
                                                        </div>
                                                        <div>
                                                            <label className="text-sm font-medium text-gray-500">Date Validated</label>
                                                            <p className="text-lg font-medium text-gray-900">{selectedModel.date_validated}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Approver & Date Approved Row */}
                                            {selectedModel.approver && selectedModel.date_approved && (
                                                <div className="grid grid-cols-2 items-center gap-4 md:gap-8">
                                                    <div className="flex items-center gap-3">
                                                        <div className="p-2 bg-green-100 rounded-lg">
                                                            <CheckCircle className="w-5 h-5 text-green-600" />
                                                        </div>
                                                        <div>
                                                            <label className="text-sm font-medium text-gray-500">Approver</label>
                                                            <p className="text-lg font-medium text-gray-900">{selectedModel.approver}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <div className="p-2 bg-purple-100 rounded-lg">
                                                            <CalendarCheck2 className="w-5 h-5 text-purple-600" />
                                                        </div>
                                                        <div>
                                                            <label className="text-sm font-medium text-gray-500">Date Approved</label>
                                                            <p className="text-lg font-medium text-gray-900">{selectedModel.date_approved}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Details Card */}
                            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                                <div className="p-6">
                                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Formula</h2>
                                    <img src="/dummy-formula.svg" alt="Model Formula" className="w-[500px]" />
                                </div>

                                <div className="p-6 border-t border-gray-200">
                                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Upload Account Level Data</h2>

                                </div>

                                {/* Execute Model Button */}
                                <div className="flex justify-end p-6 bg-gray-50">
                                    <Button type="button" onClick={() => navigate(`/developer/model/${selectedModel.id}/results`)}>
                                        Execute Model
                                    </Button>
                                </div>
                            </div>

                        </div>
                    ) : (
                        <div className="flex-1 flex items-center justify-center">
                            <div className="text-center">
                                <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                    <FileBox className="w-12 h-12 text-gray-400" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Model Not Found</h2>
                                <p className="text-gray-600 mb-6">The model you're looking for doesn't exist or has been removed.</p>
                                <button
                                    onClick={() => navigate("/developer/model-execution")}
                                    className="bg-primary-2 hover:bg-primary-2/90 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                                >
                                    Back to Model Execution
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}