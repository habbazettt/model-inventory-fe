import { Bell, Check, FileBox, HelpCircle, Home, Reply, Settings } from "lucide-react";
import Sidebar, { SidebarItem } from "../../components/Sidebar";
import { useState } from "react";

export default function DeveloperNotificationsPage() {
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            modelId: "MOD-02",
            validatorId: "Gregorius01",
            reviewNotes: "One MEV does not pass stationarity testing - 10Y Gov. Bond Yield",
            reviewDate: "24-Jun-25",
            isResolved: false
        },
        {
            id: 2,
            modelId: "MOD-02",
            validatorId: "Gregorius01",
            reviewNotes: "Variance Inflation Factor shows there still might be auto-correlation among variables",
            reviewDate: "22-Jun-25",
            isResolved: false
        }
    ]);

    const handleMarkAsResolved = (id: number) => {
        setNotifications(notifications.map(notification =>
            notification.id === id
                ? { ...notification, isResolved: true }
                : notification
        ));
    };

    const handleReply = (id: number) => {
        console.log(`Reply to notification ${id}`);
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
                    active
                    urlNavigate="/developer/notifications"
                />
                <SidebarItem icon={<FileBox size={20} />} text={"Model Execution"} urlNavigate="/developer/model-execution" />
                <hr className="my-3" />
                <SidebarItem icon={<Settings size={20} />} text={"Settings"} urlNavigate="/developer/settings" />
                <SidebarItem icon={<HelpCircle size={20} />} text={"Help"} urlNavigate="/developer/help" />
            </Sidebar>

            <div className="flex-1 bg-gradient-to-br from-[#F0F0F0] to-primary-3 overflow-auto min-w-0">
                <div className="h-full flex flex-col p-4 md:p-6 min-h-screen">
                    {/* Header */}
                    <div className="mb-4">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Notifications</h1>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                                            Model ID
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                                            Validator ID
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                                            Review Notes
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                                            Review Date
                                        </th>
                                        <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                                            Mark as Resolved
                                        </th>
                                        <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                                            Reply
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {notifications.map((notification) => (
                                        <tr key={notification.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                                {notification.modelId}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-700">
                                                {notification.validatorId}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-700 max-w-md">
                                                {notification.reviewNotes}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-700">
                                                {notification.reviewDate}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <button
                                                    onClick={() => handleMarkAsResolved(notification.id)}
                                                    disabled={notification.isResolved}
                                                    className={`p-2 rounded-lg transition-colors ${notification.isResolved
                                                        ? 'bg-green-100 text-green-600 cursor-not-allowed'
                                                        : 'bg-gray-100 hover:bg-green-100 text-gray-600 hover:text-green-600'
                                                        }`}
                                                    title={notification.isResolved ? 'Already resolved' : 'Mark as resolved'}
                                                >
                                                    <Check size={16} />
                                                </button>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <button
                                                    onClick={() => handleReply(notification.id)}
                                                    className="p-2 rounded-lg bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-600 transition-colors"
                                                    title="Reply to notification"
                                                >
                                                    <Reply size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Empty State */}
                        {notifications.length === 0 && (
                            <div className="text-center py-12">
                                <Bell className="mx-auto h-12 w-12 text-gray-400" />
                                <h3 className="mt-2 text-sm font-medium text-gray-900">No notifications</h3>
                                <p className="mt-1 text-sm text-gray-500">You're all caught up!</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}