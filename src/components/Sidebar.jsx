import React from 'react';

const Sidebar = () => {
    const logoUrl = "data:image/png;base64,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./S225morecharacters>";

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
