import { Bell, FileBox, HelpCircle, Home, Settings, ArrowLeft } from "lucide-react";
import Sidebar, { SidebarItem } from "../../components/Sidebar"
import { useCheckRole } from "../../utils/checkRole";
import { useParams, useNavigate } from "react-router-dom";
import { modelData } from "../../data/modelData";
import type { Model } from "../../types";
import Button from "../../components/Button";
import { useState } from "react";
import AuditLogsModal from "../../components/modal/AuditLogsModal";
import { logsData } from "../../data/logsData";

export default function ApproverModelResultsPage() {
    useCheckRole("approver");

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [comment, setComment] = useState("");
    const [subjects, setSubjects] = useState<{ id: number; value: string }[]>([]);

    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const selectedModel: Model | undefined = modelData?.find(model => model.id == id);

    const handleAddSubject = () => {
        setSubjects(prevSubjects => [
            ...prevSubjects,
            { id: Date.now(), value: "" }
        ]);
    };

    const handleSubjectChange = (id: number, event: React.ChangeEvent<HTMLInputElement>) => {
        setSubjects(prevSubjects =>
            prevSubjects.map(subject =>
                subject.id === id ? { ...subject, value: event.target.value } : subject
            )
        );
    };

    return (
        <main className="flex h-screen overflow-hidden">
            <Sidebar>
                <SidebarItem
                    icon={<Home size={20} />}
                    text="Home"
                    urlNavigate="/approver/home"
                />
                <SidebarItem
                    icon={<Bell size={20} />}
                    text={"Notifications"}
                    alert={true}
                    urlNavigate="/approver/notifications"
                />
                <SidebarItem
                    icon={<FileBox size={20} />}
                    text={"Model Approval"}
                    urlNavigate="/approver/model-approval"
                    active
                />
                <hr className="my-3" />
                <SidebarItem
                    icon={<Settings size={20} />}
                    text={"Settings"}
                    urlNavigate="/approver/settings"
                />
                <SidebarItem
                    icon={<HelpCircle size={20} />}
                    text={"Help"}
                    urlNavigate="/approver/help"
                />
            </Sidebar>

            <div className="flex-1 bg-gradient-to-br from-secondary-3 to-primary-3 overflow-auto min-w-0">
                <div className="h-full flex flex-col p-4 md:p-6">
                    {/* Header with Back Button */}
                    <div className="mb-6">
                        <div className="flex items-center gap-4 mb-4">
                            <button
                                onClick={() => navigate(`/approver/model/${selectedModel?.id}`)}
                                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                            >
                                <ArrowLeft size={20} />
                                <h1 className="text-sm font-medium">Back to Model Details</h1>
                            </button>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                            {selectedModel ? `Model Result - ${selectedModel.name}` : "Model Not Found"}
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
                                        <h2 className="text-xl font-semibold text-gray-900">Model Result</h2>
                                        <div className="flex items-center gap-2">
                                            <Button
                                                type="button"
                                                variant="secondary"
                                                onClick={() => setIsModalOpen(true)}
                                            >
                                                View Logs
                                            </Button>
                                            <Button
                                                onClick={() => { }}
                                                type="button"
                                                variant="primary"
                                            >
                                                Export Results
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="mt-4 border-t border-gray-200 pt-4 flex flex-col items-center">
                                        <h1 className="text-lg font-semibold text-gray-900">Model Summary</h1>
                                        <img
                                            src="/model_summary.svg"
                                            alt=""
                                            className="w-full h-[400px] mt-4 rounded-lg shadow-sm"
                                        />
                                    </div>

                                    <div className="mt-6 border-t border-gray-200 pt-4 flex flex-col items-center">
                                        <h1 className="text-lg font-semibold text-gray-900">Stationarity Testing</h1>
                                        <img
                                            src="/stationarity_test.svg"
                                            alt=""
                                            className="w-full object-cover mt-4 rounded-lg shadow-sm"
                                        />
                                    </div>

                                    <div className="mt-6 border-t border-gray-200 pt-4">
                                        <h1 className="text-lg font-semibold text-gray-900">Validation Metrics</h1>
                                        <ol className="list-decimal list-inside mt-2 text-gray-700">
                                            <li className="mb-2"><span className="font-semibold">Mean Squared Error (MSE)</span> : 0.001593381</li>
                                            <li className="mb-2"><span className="font-semibold">Root Mean Squared Error (RMSE)</span> : 0.03991717</li>
                                            <li className="mb-2"><span className="font-semibold">Mean Absolute Percentage Squared Error (MAPE)</span> : 22.9057%</li>
                                        </ol>
                                    </div>

                                    <div className="mt-6 border-t border-gray-200 pt-4 flex flex-col items-center">
                                        <h1 className="text-lg font-semibold text-gray-900">Out-Sample vs. In-Sample Testing</h1>
                                        <img
                                            src="/testing_graph.svg"
                                            alt=""
                                            className="max-w-[900px] object-cover mt-4 rounded-lg shadow-sm"
                                        />
                                    </div>

                                    <div className="mt-6 border-t border-gray-200 pt-4 flex flex-col items-center">
                                        <h1 className="text-lg font-semibold text-gray-900">Model Entity Relationship Diagram</h1>
                                        <img
                                            src="/erd.svg"
                                            alt=""
                                            className="max-w-[900px] object-cover mt-4 rounded-lg shadow-sm"
                                        />
                                    </div>

                                    <div className="mt-6 border-t border-gray-200 pt-4 flex flex-col items-start w-full">
                                        <h1 className="text-lg font-semibold text-gray-900">Comments</h1>

                                        <input
                                            type="text"
                                            className="border border-gray-300 rounded-md p-2 mt-2 w-full"
                                            placeholder="Add Text Here"
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                        />

                                        <div className="w-full space-y-2 mt-2">
                                            {subjects.map(subject => (
                                                <input
                                                    key={subject.id}
                                                    type="text"
                                                    className="border border-gray-300 rounded-md p-2 w-full"
                                                    placeholder="Add Text Here"
                                                    value={subject.value}
                                                    onChange={(e) => handleSubjectChange(subject.id, e)}
                                                />
                                            ))}
                                        </div>

                                        <div className="mt-3 flex justify-between w-full">
                                            <button onClick={handleAddSubject} className="text-primary-2 hover:underline font-medium">
                                                Add Subjects
                                            </button>
                                            <Button
                                                type="button"
                                                variant="primary"
                                                onClick={() => {
                                                    console.log("Comment:", comment);
                                                    console.log("Subjects:", subjects);
                                                }}
                                            >
                                                Submit Comment
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="mt-10 border-t border-gray-200 pt-4 flex justify-start items-center gap-4">
                                        <Button
                                            type="button"
                                            variant="primary"
                                            onClick={() => { }}
                                        >
                                            Mark as Rejected
                                        </Button>

                                        <Button
                                            type="button"
                                            variant="primary"
                                            onClick={() => { }}
                                        >
                                            Mark as Approved
                                        </Button>
                                    </div>
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
                                    onClick={() => navigate("/approver/model-validation")}
                                    className="bg-primary-2 hover:bg-primary-2/90 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                                >
                                    Back to Model Approval
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {isModalOpen && (
                <AuditLogsModal
                    model={selectedModel}
                    logs={logsData}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </main>
    );
}