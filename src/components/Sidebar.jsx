import React from 'react';
import vgLogo from '../assets/Screenshot 2025-07-23 135549.png';

const Sidebar = () => {
    const logoUrl = vgLogo;

    return (
        <div className="sidebar" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* Logo Card */}
            <div className="card" style={{ padding: '20px 12px', textAlign: 'center', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 0 0 1px rgba(0,0,0,0.08)', marginBottom: '4px' }}>
                <div style={{ fontSize: '11px', color: 'rgba(0,0,0,0.6)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: 700 }}>Powered By</div>
                <div style={{ display: 'inline-block' }}>
                    <img src={logoUrl} alt="VG Logo" style={{ width: '100%', height: 'auto', maxWidth: '120px', display: 'block' }} />
                </div>
            </div>

            {/* Profile Card */}
            <div className="card" style={{ padding: '0', overflow: 'hidden', borderRadius: '10px' }}>
                <div style={{ height: '54px', background: 'linear-gradient(to right, #a0b4b7, #d9e2ec)' }}></div>
                <div style={{ padding: '0 12px 16px', marginTop: '-30px', textAlign: 'center' }}>
                    <div className="avatar" style={{
                        margin: '0 auto 12px',
                        border: '2px solid white',
                        width: '72px',
                        height: '72px',
                        backgroundColor: '#ccc',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}></div>
                    <div style={{ fontWeight: 600, fontSize: '16px', color: 'rgba(0,0,0,0.9)' }}>Anonymous User</div>
                    <div style={{ fontSize: '12px', color: 'rgba(0,0,0,0.6)', borderBottom: '1px solid rgba(0,0,0,0.08)', paddingBottom: '12px', marginBottom: '12px' }}>
                        Software Engineer at VG Tech
                    </div>

                    <div style={{ textAlign: 'left', fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: 'rgba(0,0,0,0.6)', fontWeight: 600 }}>Connection</span>
                            <span style={{ color: '#0a66c2', fontWeight: 600 }}>1,250</span>
                        </div>
                        <div style={{ fontWeight: 600, color: 'rgba(0,0,0,0.9)' }}>Grow your network</div>
                    </div>
                </div>
            </div>

            {/* Recent Section */}
            <div className="card" style={{ padding: '12px', borderRadius: '8px' }}>
                <div style={{ fontSize: '12px', fontWeight: 600, marginBottom: '12px', color: 'rgba(0,0,0,0.9)' }}>Recent</div>
                <ul style={{ listStyle: 'none', padding: '0', fontSize: '12px', color: 'rgba(0,0,0,0.6)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <li style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                        <span style={{ marginRight: '8px' }}>#</span>
                        <span style={{ fontWeight: 600 }}>reactjs</span>
                    </li>
                    <li style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                        <span style={{ marginRight: '8px' }}>#</span>
                        <span style={{ fontWeight: 600 }}>webdevelopment</span>
                    </li>
                    <li style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                        <span style={{ marginRight: '8px' }}>#</span>
                        <span style={{ fontWeight: 600 }}>javascript</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
