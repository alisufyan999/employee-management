import { useAuth } from '../features/auth/hooks/useAuth';

export function DashboardPage() {
    const { session, logout } = useAuth();

    if (!session) return null;

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <div className="header-left">
                    <span className="logo-icon">👥</span>
                    <h1>EmpManager</h1>
                </div>
                <div className="header-right">
                    <div className="user-pill">
                        <span className="user-avatar">
                            {session.user.name.charAt(0).toUpperCase()}
                        </span>
                        <span className="user-name">{session.user.name}</span>
                        <span className="user-role">{session.user.role}</span>
                    </div>
                    <button onClick={logout} className="btn-logout">
                        Logout
                    </button>
                </div>
            </header>

            <main className="dashboard-main">
                <section className="welcome-section">
                    <h2>Welcome back, {session.user.name}!</h2>
                    <p>Here&apos;s an overview of your organization.</p>
                </section>

                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-icon">👤</div>
                        <div className="stat-info">
                            <span className="stat-number">24</span>
                            <span className="stat-label">Employees</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">🏢</div>
                        <div className="stat-info">
                            <span className="stat-number">5</span>
                            <span className="stat-label">Departments</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">📋</div>
                        <div className="stat-info">
                            <span className="stat-number">12</span>
                            <span className="stat-label">Active Projects</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">✅</div>
                        <div className="stat-info">
                            <span className="stat-number">98%</span>
                            <span className="stat-label">Attendance</span>
                        </div>
                    </div>
                </div>

                <div className="info-card">
                    <h3>Your Profile</h3>
                    <div className="profile-grid">
                        <div className="profile-item">
                            <span className="profile-label">Name</span>
                            <span className="profile-value">{session.user.name}</span>
                        </div>
                        <div className="profile-item">
                            <span className="profile-label">Email</span>
                            <span className="profile-value">{session.user.email}</span>
                        </div>
                        <div className="profile-item">
                            <span className="profile-label">Role</span>
                            <span className="profile-value capitalize">{session.user.role}</span>
                        </div>
                        <div className="profile-item">
                            <span className="profile-label">User ID</span>
                            <span className="profile-value">{session.user.id}</span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
