import React, { useState } from 'react';
import { Search, MoreHorizontal, Edit, Send, Paperclip, Image, Smile } from 'lucide-react';

const Messaging = () => {
    const [activeChat, setActiveChat] = useState(1);

    const chats = [
        { id: 1, name: 'John Doe', lastMsg: 'Hey, are you interested in...', time: 'Oct 20' },
        { id: 2, name: 'Sarah Smith', lastMsg: 'The project looks great!', time: 'Oct 19' },
        { id: 3, name: 'Alice Johnson', lastMsg: 'Can we schedule a call?', time: 'Oct 18' }
    ];

    return (
        <div className="messaging-container" style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '0', maxWidth: '1128px', height: 'calc(100vh - 100px)', margin: '0 auto', backgroundColor: 'white', border: '1px solid #eef3f8', borderRadius: '8px', overflow: 'hidden' }}>
            {/* Chat List */}
            <aside style={{ borderRight: '1px solid #eef3f8', display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eef3f8' }}>
                    <h2 style={{ margin: 0, fontSize: '16px' }}>Messaging</h2>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <MoreHorizontal size={20} color="#666" />
                        <Edit size={20} color="#666" />
                    </div>
                </div>
                <div style={{ padding: '8px 16px' }}>
                    <div style={{ position: 'relative' }}>
                        <Search size={16} style={{ position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)', color: '#666' }} />
                        <input type="text" placeholder="Search messages" style={{ width: '100%', padding: '6px 8px 6px 32px', borderRadius: '4px', border: '1px solid #eef3f8', backgroundColor: '#f3f2ef', fontSize: '14px' }} />
                    </div>
                </div>
                <div style={{ flexGrow: 1, overflowY: 'auto' }}>
                    {chats.map(chat => (
                        <div
                            key={chat.id}
                            onClick={() => setActiveChat(chat.id)}
                            style={{
                                padding: '12px 16px',
                                display: 'flex',
                                gap: '12px',
                                cursor: 'pointer',
                                borderLeft: activeChat === chat.id ? '4px solid #057642' : '4px solid transparent',
                                backgroundColor: activeChat === chat.id ? '#f3f2ef' : 'transparent'
                            }}
                        >
                            <div className="avatar" style={{ width: '48px', height: '48px' }}></div>
                            <div style={{ flexGrow: 1, overflow: 'hidden' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ fontWeight: 600, fontSize: '14px' }}>{chat.name}</span>
                                    <span style={{ fontSize: '12px', color: '#666' }}>{chat.time}</span>
                                </div>
                                <div style={{ fontSize: '14px', color: '#666', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{chat.lastMsg}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </aside>

            {/* Chat Window */}
            <main style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: '12px 16px', borderBottom: '1px solid #eef3f8' }}>
                    <div style={{ fontWeight: 600 }}>{chats.find(c => c.id === activeChat)?.name}</div>
                    <div style={{ fontSize: '12px', color: '#666' }}>Active now</div>
                </div>
                <div style={{ flexGrow: 1, padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', backgroundColor: '#f9f9f9' }}>
                    <div style={{ alignSelf: 'flex-start', backgroundColor: 'white', padding: '8px 12px', borderRadius: '0 8px 8px 8px', maxWidth: '70%', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
                        Hey there! I saw your profile and wanted to connect.
                    </div>
                    <div style={{ alignSelf: 'flex-end', backgroundColor: '#0a66c2', color: 'white', padding: '8px 12px', borderRadius: '8px 0 8px 8px', maxWidth: '70%', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
                        Hi! Thanks for reaching out. I'm definitely interested.
                    </div>
                </div>
                <div style={{ padding: '12px 16px', borderTop: '1px solid #eef3f8' }}>
                    <textarea placeholder="Write a message..." style={{ width: '100%', height: '60px', border: 'none', resize: 'none', fontSize: '14px', outline: 'none' }}></textarea>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                        <div style={{ display: 'flex', gap: '16px' }}>
                            <Image size={20} color="#666" style={{ cursor: 'pointer' }} />
                            <Paperclip size={20} color="#666" style={{ cursor: 'pointer' }} />
                            <Smile size={20} color="#666" style={{ cursor: 'pointer' }} />
                        </div>
                        <button className="primary-btn" style={{ padding: '4px 16px' }}>Send</button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Messaging;
