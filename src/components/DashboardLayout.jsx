import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useState } from "react";
import { useLocation } from "react-router-dom";


function DashboardLayout() {
    const [isOpen, setIsOpen] = useState(true);

    const location = useLocation();
    const isDashboardHome = location.pathname === "/dashboard";


    return (
        <div style={styles.layout}>
            <Sidebar isOpen={isOpen} />

            <div style={styles.main}>
                {/* Top Header */}
                <div style={styles.header}>
                    <button
                        style={styles.menuBtn}
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        ☰
                    </button>
                    <span>Dashboard</span>
                </div>

                <div style={styles.content}>
                    {isDashboardHome && (
                        <div style={styles.welcomeBox}>
                            <h2>Welcome to Dashboard 👋</h2>
                            {/* <p>
                                This is your admin panel. You can manage users, menus and
                                other application features from the sidebar.
                            </p> */}
                        </div>
                    )}
                    <Outlet />
                </div>

            </div>
        </div>
    );
}

const styles = {
    layout: {
        display: "flex",
        minHeight: "100vh",
        background: "#f1f5f9"
    },
    main: {
        flex: 1,
        display: "flex",
        flexDirection: "column"
    },
    header: {
        height: "60px",
        background: "#ffffff",
        display: "flex",
        alignItems: "center",
        padding: "0 20px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
    },
    menuBtn: {
        fontSize: "20px",
        marginRight: "15px",
        background: "none",
        border: "none",
        cursor: "pointer"
    },
    content: {
        padding: "25px"
    },
    welcomeBox: {
        background: "#ffffff",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
    }

};

export default DashboardLayout;
