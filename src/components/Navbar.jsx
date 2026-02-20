import React from 'react';
import { Home, Users, Briefcase, MessageSquare, Bell, Search } from 'lucide-react';
import vgLogo from '../assets/Screenshot 2025-07-23 135549.png';

const Navbar = ({ activeTab, onTabChange }) => {
    const logoUrl = vgLogo;

    return (
        <nav className="navbar">
            <div className="navbar-content">
                <div className="logo" onClick={() => onTabChange('home')} style={{ cursor: 'pointer' }}>
                    <img src={logoUrl} alt="VG Logo" style={{ height: '34px', width: 'auto' }} />
                </div>

                <div style={{ flexGrow: 1, position: 'relative', maxWidth: '280px' }}>
                    <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#666' }} />
                    <input
                        type="text"
                        placeholder="Search"
                        style={{
                            width: '100%',
                            padding: '6px 12px 6px 40px',
                            borderRadius: '4px',
                            border: 'none',
                            backgroundColor: '#edf3f8',
                            fontSize: '14px'
                        }}
                    />
                </div>

                <div style={{ display: 'flex', gap: '24px', marginLeft: 'auto' }}>
                    <NavItem
                        icon={<Home size={24} />}
                        label="Home"
                        active={activeTab === 'home'}
                        onClick={() => onTabChange('home')}
                    />
                    <NavItem
                        icon={<Users size={24} />}
                        label="My Network"
                        active={activeTab === 'network'}
                        onClick={() => onTabChange('network')}
                    />
                    <NavItem
                        icon={<Briefcase size={24} />}
                        label="Jobs"
                        active={activeTab === 'jobs'}
                        onClick={() => onTabChange('jobs')}
                    />
                    <NavItem
                        icon={<MessageSquare size={24} />}
                        label="Messaging"
                        active={activeTab === 'messaging'}
                        onClick={() => onTabChange('messaging')}
                    />
                    <NavItem
                        icon={<Bell size={24} />}
                        label="Notifications"
                        active={activeTab === 'notifications'}
                        onClick={() => onTabChange('notifications')}
                    />
                </div>
            </div >
        </nav >
    );
};

const NavItem = ({ icon, label, active, onClick }) => (
    <div
        onClick={onClick}
        style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            cursor: 'pointer',
            color: active ? 'black' : '#666',
            borderBottom: active ? '2px solid black' : 'none',
            padding: '4px 0',
            minWidth: '80px'
        }}
    >
        {icon}
        <span style={{ fontSize: '12px', marginTop: '2px' }}>{label}</span>
    </div>
);

export default Navbar;
