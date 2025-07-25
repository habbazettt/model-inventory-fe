import { Bell, HelpCircle, Home, Settings, Users, Plus, Search, Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import Sidebar, { SidebarItem } from "../../components/Sidebar";
import { AddNewUserModal } from "../../components/modal/AddNewUserModal";
import { EditUserModal } from "../../components/modal/EditUserModal";
import Button from "../../components/Button";

interface User {
    id: number;
    email: string;
    role: string;
    lastLogin: string;
}

export default function SuperuserAccessManagementPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterRole, setFilterRole] = useState("");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const [users, setUsers] = useState<User[]>([
        {
            id: 1,
            email: "developer@baac.th",
            role: "developer",
            lastLogin: "2 Hours Ago"
        },
        {
            id: 2,
            email: "validator@baac.th",
            role: "validator",
            lastLogin: "1 Day ago"
        },
        {
            id: 3,
            email: "approver@baac.th",
            role: "approver",
            lastLogin: "1 Week Ago"
        }
    ]);

    const getRoleDot = (role: string) => {
        switch (role) {
            case 'developer':
                return 'bg-blue-500';
            case 'validator':
                return 'bg-yellow-500';
            case 'approver':
                return 'bg-green-500';
            case 'admin':
                return 'bg-purple-500';
            default:
                return 'bg-gray-500';
        }
    };

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = filterRole === "" || user.role === filterRole;
        return matchesSearch && matchesRole;
    });

    const handleAddUser = (newUser: { email: string; role: string }) => {
        const user: User = {
            id: Date.now(),
            email: newUser.email,
            role: newUser.role,
            lastLogin: "Never"
        };
        setUsers([...users, user]);
        console.log("New user added:", { ...newUser, id: user.id });
    };

    const handleEditUser = (userId: number, updatedUser: { email: string; role: string }) => {
        setUsers(users.map(user =>
            user.id === userId
                ? { ...user, email: updatedUser.email, role: updatedUser.role }
                : user
        ));
        console.log("User updated:", { userId, ...updatedUser });
    };

    const handleEdit = (user: User) => {
        setSelectedUser(user);
        setIsEditModalOpen(true);
    };

    const handleDelete = (userId: number) => {
        if (confirm("Are you sure you want to delete this user?")) {
            setUsers(users.filter(user => user.id !== userId));
            console.log("User deleted:", userId);
        }
    };

    return (
        <main className="flex h-screen overflow-hidden">
            <Sidebar>
                <SidebarItem icon={<Home size={20} />} text="Home" urlNavigate="/superuser/home" />
                <SidebarItem icon={<Bell size={20} />} text={"Notifications"} alert={true} urlNavigate="/superuser/notifications" />
                <SidebarItem icon={<Users size={20} />} text={"Access Management"} active urlNavigate="/superuser/access-management" />
                <hr className="my-3 border-gray-200" />
                <SidebarItem icon={<Settings size={20} />} text={"Settings"} urlNavigate="/superuser/settings" />
                <SidebarItem icon={<HelpCircle size={20} />} text={"Help"} urlNavigate="/superuser/help" />
            </Sidebar>

            <div className="flex-1 bg-gradient-to-br from-secondary-3 to-primary-3 overflow-auto min-w-0">
                <div className="h-full flex flex-col p-4 md:p-6 min-h-screen">
                    <div className="mb-6">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Access Management</h1>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border overflow-hidden flex-1">
                        {/* Header with Add User button and Search/Filter */}
                        <div className="p-6 border-b bg-gray-50">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <Button
                                    variant="primary"
                                    type="button"
                                    onClick={() => setIsAddModalOpen(true)}
                                >
                                    <Plus size={16} />
                                    Add New User
                                </Button>

                                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                                    <div className="relative">
                                        <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder="Type to search..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent w-full sm:w-80"
                                        />
                                    </div>

                                    <div className="relative">
                                        <select
                                            id="role-filter"
                                            className="appearance-none px-3 py-2 pl-9 pr-8 border border-green-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white text-green-700 cursor-pointer"
                                            value={filterRole}
                                            onChange={(e) => setFilterRole(e.target.value)}
                                        >
                                            <option value="">All Roles</option>
                                            <option value="developer">Developer</option>
                                            <option value="validator">Validator</option>
                                            <option value="approver">Approver</option>
                                            <option value="admin">Superuser</option>
                                        </select>

                                        {/* Role Dot Indicator */}
                                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                            <div className={`w-3 h-3 rounded-full ${getRoleDot(filterRole)}`}></div>
                                        </div>

                                        {/* Dropdown Arrow */}
                                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                            <svg className="w-4 h-4 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* User Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Email</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Roles</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Last Login</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {filteredUsers.map((user) => (
                                        <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 text-sm text-gray-900">{user.email}</td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${user.role === 'developer' ? 'bg-blue-100 text-blue-800' :
                                                    user.role === 'validator' ? 'bg-yellow-100 text-yellow-800' :
                                                        user.role === 'approver' ? 'bg-green-100 text-green-800' :
                                                            user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                                                                'bg-gray-100 text-gray-800'
                                                    }`}>
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{user.lastLogin}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => handleEdit(user)}
                                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                        title="Edit User"
                                                    >
                                                        <Edit size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(user.id)}
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="Delete User"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Empty State */}
                        {filteredUsers.length === 0 && (
                            <div className="p-12 text-center">
                                <Users size={48} className="mx-auto text-gray-400 mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
                                <p className="text-gray-600">
                                    {searchTerm || filterRole ?
                                        "Try adjusting your search or filter criteria." :
                                        "Get started by adding your first user."
                                    }
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modals */}
            <AddNewUserModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onAddUser={handleAddUser}
            />

            <EditUserModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onEditUser={handleEditUser}
                user={selectedUser}
            />
        </main>
    );
}
