import { Users, UserPlus, BookOpen, Hash, Briefcase, ChevronRight, Calendar } from 'lucide-react';

const MyNetwork = () => {
    const connectionsCount = 1250;

    const invitations = [
        { id: 1, name: 'John Doe', title: 'Software Engineer at TechCorp', mutual: 12 },
        { id: 2, name: 'Sarah Smith', title: 'Product Manager at Innovate', mutual: 5 }
    ];

    const suggestions = [
        { id: 3, name: 'Alice Johnson', title: 'Full Stack Developer', company: 'StartupX' },
        { id: 4, name: 'Bob Wilson', title: 'UX Designer', company: 'DesignCo' },
        { id: 5, name: 'Charlie Brown', title: 'Data Scientist', company: 'DataFlow' }
    ];

    return (
        <div className="my-network-container" style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '24px', maxWidth: '1128px', margin: '0 auto', padding: '24px' }}>
            {/* Sidebar */}
            <aside className="network-sidebar">
                <div className="card" style={{ padding: '0' }}>
                    <div style={{ padding: '16px', borderBottom: '1px solid #eef3f8', fontWeight: 600 }}>Manage my network</div>
                    <ul style={{ listStyle: 'none', padding: '0' }}>
                        <li className="sidebar-item" style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', cursor: 'pointer' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <Users size={20} color="#666" />
                                <span>Connections</span>
                            </div>
                            <span>{connectionsCount}</span>
                        </li>
                        <li className="sidebar-item" style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', cursor: 'pointer' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <UserPlus size={20} color="#666" />
                                <span>Contacts</span>
                            </div>
                        </li>
                        <li className="sidebar-item" style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', cursor: 'pointer' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <Users size={20} color="#666" />
                                <span>Following & followers</span>
                            </div>
                        </li>
                        <li className="sidebar-item" style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', cursor: 'pointer' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <BookOpen size={20} color="#666" />
                                <span>Groups</span>
                            </div>
                        </li>
                        <li className="sidebar-item" style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', cursor: 'pointer' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <Calendar size={20} color="#666" />
                                <span>Events</span>
                            </div>
                        </li>
                        <li className="sidebar-item" style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', cursor: 'pointer' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <Hash size={20} color="#666" />
                                <span>Hashtags</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </aside>

            {/* Main Content */}
            <main className="network-main">
                {/* Invitations */}
                <section className="card" style={{ marginBottom: '24px' }}>
                    <div style={{ padding: '16px', borderBottom: '1px solid #eef3f8', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3 style={{ margin: 0, fontSize: '16px' }}>Invitations</h3>
                        <button className="input-trigger" style={{ padding: '4px 8px', border: 'none' }}>See all</button>
                    </div>
                    <div>
                        {invitations.map(invite => (
                            <div key={invite.id} style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eef3f8' }}>
                                <div style={{ display: 'flex', gap: '12px' }}>
                                    <div className="avatar" style={{ width: '56px', height: '56px' }}></div>
                                    <div>
                                        <div style={{ fontWeight: 600 }}>{invite.name}</div>
                                        <div style={{ fontSize: '14px', color: '#666' }}>{invite.title}</div>
                                        <div style={{ fontSize: '12px', color: '#666' }}>{invite.mutual} mutual connections</div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '12px' }}>
                                    <button style={{ background: 'none', border: 'none', color: '#666', fontWeight: 600, cursor: 'pointer' }}>Ignore</button>
                                    <button className="primary-btn" style={{ padding: '4px 16px' }}>Accept</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Suggestions */}
                <section className="card">
                    <div style={{ padding: '16px', borderBottom: '1px solid #eef3f8' }}>
                        <h3 style={{ margin: 0, fontSize: '16px' }}>People you may know</h3>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '12px', padding: '16px' }}>
                        {suggestions.map(person => (
                            <div key={person.id} className="suggestion-card" style={{ border: '1px solid #eef3f8', borderRadius: '8px', padding: '12px', textAlign: 'center' }}>
                                <div className="avatar" style={{ width: '72px', height: '72px', margin: '0 auto 12px' }}></div>
                                <div style={{ fontWeight: 600, fontSize: '16px' }}>{person.name}</div>
                                <div style={{ fontSize: '12px', color: '#666', height: '32px', overflow: 'hidden', margin: '4px 0' }}>{person.title}</div>
                                <div style={{ fontSize: '12px', color: '#666', marginBottom: '12px' }}>At {person.company}</div>
                                <button className="input-trigger" style={{ width: '100%', borderColor: '#0a66c2', color: '#0a66c2' }}>Connect</button>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default MyNetwork;
