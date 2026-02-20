import React, { useState } from 'react';
import { Search, MoreHorizontal, Edit, Send, Paperclip, Image, Smile } from 'lucide-react';

const Messaging = () => {
    const initialChats = [
        { id: 1, name: 'John Doe', lastMsg: 'Hey, are you interested in...', time: 'Oct 20', messages: [{ id: 101, type: 'received', text: 'Hey there! I saw your profile and wanted to connect.' }] },
        { id: 2, name: 'Sarah Smith', lastMsg: 'The project looks great!', time: 'Oct 19', messages: [{ id: 201, type: 'received', text: 'The project looks great! Can we discuss it?' }] },
        { id: 3, name: 'Alice Johnson', lastMsg: 'Can we schedule a call?', time: 'Oct 18', messages: [{ id: 301, type: 'received', text: 'Can we schedule a call for next week?' }] }
    ];

    const [chats, setChats] = useState(initialChats);
    const [activeChatId, setActiveChatId] = useState(1);
    const [newMessage, setNewMessage] = useState('');

    const activeChat = chats.find(c => c.id === activeChatId);

    const handleSendMessage = () => {
        if (!newMessage.trim()) return;

        const updatedChats = chats.map(chat => {
            if (chat.id === activeChatId) {
                return {
                    ...chat,
                    lastMsg: newMessage,
                    time: 'Now',
                    messages: [...chat.messages, { id: Date.now(), type: 'sent', text: newMessage }]
                };
            }
            return chat;
        });

        setChats(updatedChats);
        setNewMessage('');
    };

    return (
        <div className="messaging-container" style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '0', maxWidth: '1128px', height: 'calc(100vh - 100px)', margin: '0 auto', backgroundColor: 'white', border: '1px solid #eef3f8', borderRadius: '8px', overflow: 'hidden' }}>
            {/* Chat List */}
            <aside style={{ borderRight: '1px solid #eef3f8', display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eef3f8' }}>
                    <h2 style={{ margin: 0, fontSize: '16px' }}>Messaging</h2>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <MoreHorizontal size={20} color="#666" style={{ cursor: 'pointer' }} />
                        <Edit size={20} color="#666" style={{ cursor: 'pointer' }} />
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
                            onClick={() => setActiveChatId(chat.id)}
                            style={{
                                padding: '12px 16px',
                                display: 'flex',
                                gap: '12px',
                                cursor: 'pointer',
                                borderLeft: activeChatId === chat.id ? '4px solid #057642' : '4px solid transparent',
                                backgroundColor: activeChatId === chat.id ? '#f3f2ef' : 'transparent'
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
                    <div style={{ fontWeight: 600 }}>{activeChat?.name}</div>
                    <div style={{ fontSize: '12px', color: '#666' }}>Active now</div>
                </div>
                <div style={{ flexGrow: 1, padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', backgroundColor: '#f9f9f9', overflowY: 'auto' }}>
                    {activeChat?.messages.map((msg) => (
                        <div
                            key={msg.id}
                            style={{
                                alignSelf: msg.type === 'sent' ? 'flex-end' : 'flex-start',
                                backgroundColor: msg.type === 'sent' ? '#0a66c2' : 'white',
                                color: msg.type === 'sent' ? 'white' : 'black',
                                padding: '8px 12px',
                                borderRadius: msg.type === 'sent' ? '8px 0 8px 8px' : '0 8px 8px 8px',
                                maxWidth: '70%',
                                boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
                            }}
                        >
                            {msg.text}
                        </div>
                    ))}
                </div>
                <div style={{ padding: '12px 16px', borderTop: '1px solid #eef3f8' }}>
                    <textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSendMessage();
                            }
                        }}
                        placeholder="Write a message..."
                        style={{ width: '100%', height: '60px', border: 'none', resize: 'none', fontSize: '14px', outline: 'none' }}
                    ></textarea>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                        <div style={{ display: 'flex', gap: '16px' }}>
                            <Image size={20} color="#666" style={{ cursor: 'pointer' }} />
                            <Paperclip size={20} color="#666" style={{ cursor: 'pointer' }} />
                            <Smile size={20} color="#666" style={{ cursor: 'pointer' }} />
                        </div>
                        <button
                            onClick={handleSendMessage}
                            className="primary-btn" style={{ padding: '4px 16px' }}
                        >
                            Send
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Messaging;
