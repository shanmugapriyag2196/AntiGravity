import React from 'react';
import { Bell, MoreHorizontal, Settings } from 'lucide-react';

const Notifications = () => {
    const notifications = [
        { id: 1, type: 'view', user: 'John Doe', text: 'viewed your profile', time: '2h' },
        { id: 2, type: 'reaction', user: 'Sarah Smith', text: 'liked your post', time: '5h' },
        { id: 3, type: 'post', user: 'Alice Johnson', text: 'posted: "New opportunities in React..."', time: '1d' },
        { id: 4, type: 'view', user: 'Recruiter at Google', text: 'viewed your profile', time: '2d' }
    ];

    return (
        <div className="notifications-container" style={{ display: 'grid', gridTemplateColumns: '250px 1fr 250px', gap: '24px', maxWidth: '1128px', margin: '0 auto', padding: '24px' }}>
            <aside>
                <div className="card" style={{ padding: '16px' }}>
                    <h3 style={{ fontSize: '16px', margin: '0 0 12px' }}>Notifications</h3>
                    <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>You're all caught up!</div>
                    <div style={{ fontSize: '12px', color: '#0a66c2', fontWeight: 600, cursor: 'pointer' }}>Improve your notifications</div>
                </div>
            </aside>

            <main>
                <section className="card" style={{ padding: '0' }}>
                    <div>
                        {notifications.map(notif => (
                            <div key={notif.id} style={{ padding: '16px', display: 'flex', gap: '12px', borderBottom: '1px solid #eef3f8', cursor: 'pointer' }}>
                                <div className="avatar" style={{ width: '48px', height: '48px' }}></div>
                                <div style={{ flexGrow: 1 }}>
                                    <span style={{ fontWeight: 600 }}>{notif.user}</span> {notif.text}
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                                    <span style={{ fontSize: '12px', color: '#666' }}>{notif.time}</span>
                                    <MoreHorizontal size={16} color="#666" />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            <aside>
                <div className="card" style={{ padding: '16px' }}>
                    <h3 style={{ fontSize: '14px', margin: '0 0 12px' }}>Settings</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                        <Settings size={16} color="#666" />
                        <span style={{ fontSize: '14px' }}>Configure notifications</span>
                    </div>
                </div>
            </aside>
        </div>
    );
};

export default Notifications;
