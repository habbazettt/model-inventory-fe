import { ChevronFirst, ChevronLast, ChevronsUpDown } from "lucide-react"
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

interface SidebarContextType {
    expanded: boolean;
}

const SidebarContext = createContext<SidebarContextType>({
    expanded: true
});

export default function Sidebar({ children }: { children: React.ReactNode }) {
    const [expanded, setExpanded] = useState(true);
    return (
        <div>
            <aside className="h-screen">
                <nav className="h-full inline-flex flex-col bg-white border-r shadow-sm">
                    <div className="p-4 pb-2 flex justify-between items-center">
                        <img
                            src="/baac-logo.png"
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


                    <div className="border-t flex p-3">
                        <img
                            src="https://ui-avatars.com/api/?background=ECF2D3&color=626F47&bold=true"
                            alt=""
                            className="w-10 h-10 rounded-md"
                        />
                        <div className={`
                        flex justify-between items-center 
                        overflow-hidden transition-all ${expanded ? 'w-52 ml-3' : 'w-0'}
                            `}>
                            <div>
                                <h4 className="font-semibold">Developer</h4>
                                <span className="text-xs text-gray-400">developer@baac.com</span>
                            </div>
                            <ChevronsUpDown size={20} />
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