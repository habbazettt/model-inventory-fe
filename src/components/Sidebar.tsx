import { ChevronFirst, ChevronLast, ChevronsUpDown, LogOut, Settings, User } from "lucide-react"
import { createContext, useContext, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { UserRole } from "../types";

interface SidebarContextType {
    expanded: boolean;
}

const SidebarContext = createContext<SidebarContextType>({
    expanded: true
});

const userInfo = {
    developer: {
        name: "Developer",
        email: "developer@baac.com",
        initials: "DV",
        color: "8EC5FC"
    },
    validator: {
        name: "Validator",
        email: "validator@baac.com",
        initials: "VD",
        color: "F9D423"
    },
    approver: {
        name: "Approver",
        email: "approver@baac.com",
        initials: "AP",
        color: "F38181"
    },
    superuser: {
        name: "Superuser",
        email: "superuser@baac.com",
        initials: "SU",
        color: "A8E063"
    },
    User: {
        name: "User",
        email: "user@baac.com",
        initials: "US",
        color: "ECF2D3"
    }
}

export default function Sidebar({ children }: { children: React.ReactNode }) {
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState(true);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const userMenuRef = useRef<HTMLDivElement>(null);

    const role = (localStorage.getItem('role') as UserRole);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
                setIsUserMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('role');
        navigate('/auth/login');
    }

    return (
        <div>
            <aside className="h-screen">
                <nav className="h-full inline-flex flex-col bg-white border-r shadow-sm">
                    <div className="p-4 pb-2 flex justify-between items-center">
                        <img
                            src="https://www.baac.or.th/images/baac-header.png"
                            alt=""
                            className={`overflow-hidden transition-all ${expanded ? 'w-48' : 'w-0'}`}
                        />
                        <button
                            className="pb-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
                            onClick={() => setExpanded(!expanded)}
                        >
                            {expanded ? <ChevronFirst /> : <ChevronLast />}
                        </button>
                    </div>

                    <SidebarContext.Provider value={{ expanded }}>
                        <ul className="flex-1 px-3">{children}</ul>
                    </SidebarContext.Provider>

                    <div className="border-t relative" ref={userMenuRef}>
                        {/* Popup Menu */}
                        {isUserMenuOpen && (
                            <div className="absolute left-full bottom-10 w-56 ml-2 bg-white border rounded-lg shadow-lg py-1">
                                <div className="px-3 py-2">
                                    <p className="font-semibold text-sm">{userInfo[role].name}</p>
                                    <p className="text-xs text-gray-500">{userInfo[role].email}</p>
                                </div>
                                <hr className="my-1" />
                                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                    <User size={16} /> Profile
                                </button>
                                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                    <Settings size={16} /> Settings
                                </button>
                                <hr className="my-1" />
                                <button
                                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                                    onClick={handleLogout}
                                >
                                    <LogOut size={16} /> Log Out
                                </button>
                            </div>
                        )}

                        {/* Trigger Button */}
                        <div
                            className="flex p-3 hover:bg-gray-100 cursor-pointer"
                            onClick={() => setIsUserMenuOpen(prev => !prev)}
                        >
                            <img
                                src={`https://ui-avatars.com/api/?name=${userInfo[role]?.initials || "US"}&background=${userInfo[role]?.color || "ECF2D3"}&color=626F47&bold=true`}
                                alt=""
                                className="w-10 h-10 rounded-md"
                            />
                            <div className={`
                                flex justify-between items-center 
                                overflow-hidden transition-all ${expanded ? 'w-52 ml-3' : 'w-0'}
                            `}>
                                <div className="flex flex-col">
                                    <h4 className="font-semibold">{userInfo[role].name}</h4>
                                    <span className="text-xs text-gray-400">{userInfo[role].email}</span>
                                </div>
                                <ChevronsUpDown size={20} className="text-black/40 hover:text-black transition-all" />
                            </div>
                        </div>
                    </div>
                </nav>
            </aside>
        </div>
    )
}

export function SidebarItem({ icon, text, active, alert, urlNavigate }: { icon: React.ReactNode, text: string, active?: boolean, alert?: boolean, urlNavigate?: string }) {
    const { expanded } = useContext(SidebarContext);
    const navigate = useNavigate();
    return (
        <li
            className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors ${active ? 'bg-gradient-to-tr from-primary-1 to-primary-3 text-white' : 'bg-white'} ${!active && 'hover:bg-gray-50'}`}
            onClick={() => urlNavigate && navigate(urlNavigate)}
        >
            {icon}
            <span
                className={`overflow-hidden transition-all ${expanded ? 'ml-3 w-52' : 'w-0'}`}
            >{text}</span>
            {alert && (
                <div
                    className={`absolute right-2 w-2 h-2 rounded ${active ? 'bg-white' : 'bg-primary-2'}
                        ${expanded ? 'top-4' : 'top-2'}
                        `}
                />
            )}
        </li>
    )
}