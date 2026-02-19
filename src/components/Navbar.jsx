import React from 'react';
import { Home, Users, Briefcase, MessageSquare, Bell, Search } from 'lucide-react';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-content">
                <div className="logo">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" width="24" height="24" focusable="false">
                        <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.25 6.5 1.75 1.75 0 016.5 8.25zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
                    </svg>
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
                    <NavItem icon={<Home size={24} />} label="Home" active onClick={() => console.log('Home')} />
                    <NavItem icon={<Users size={24} />} label="My Network" onClick={() => alert('My Network feature coming soon!')} />
                    <NavItem icon={<Briefcase size={24} />} label="Jobs" onClick={() => alert('Jobs feature coming soon!')} />
                    <NavItem icon={<MessageSquare size={24} />} label="Messaging" onClick={() => alert('Messaging feature coming soon!')} />
                    <NavItem icon={<Bell size={24} />} label="Notifications" onClick={() => alert('Notifications feature coming soon!')} />
                </div>
            </div>
        </nav>
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
