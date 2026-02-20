import React, { useState } from 'react';
import { Image, Video, Calendar, Newspaper, X } from 'lucide-react';
import { airtableService } from '../services/airtable';

const CreatePost = ({ onPost }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeModal, setActiveModal] = useState('post'); // 'post', 'event', 'article'
    const [content, setContent] = useState('');
    const [imagePreview, setImagePreview] = useState(null);

    // Event specific state
    const [eventTitle, setEventTitle] = useState('');
    const [eventDate, setEventDate] = useState('');

    // Article specific state
    const [articleTitle, setArticleTitle] = useState('');

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new window.Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    let width = img.width;
                    let height = img.height;
                    const max_size = 800;

                    if (width > height) {
                        if (width > max_size) {
                            height *= max_size / width;
                            width = max_size;
                        }
                    } else {
                        if (height > max_size) {
                            width *= max_size / height;
                            height = max_size;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);
                    const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
                    setImagePreview(dataUrl);
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async () => {
        if (activeModal === 'post' && content.trim()) {
            onPost(content, imagePreview ? [{ url: imagePreview }] : [], 'post');
            resetState();
        } else if (activeModal === 'event' && eventTitle.trim()) {
            // 1. Create dedicated Event record
            try {
                await airtableService.createEvent({
                    name: eventTitle,
                    date: eventDate,
                    description: content,
                    author: 'Anonymous',
                    imageData: imagePreview || ''
                });
                // 2. Also create a post notification in the feed (optional, based on requirement)
                onPost(content, [], 'event', eventTitle);
                resetState();
            } catch (err) {
                alert(`Failed to save event: ${err.message}`);
            }
        } else if (activeModal === 'article' && articleTitle.trim()) {
            onPost(content, [], 'article', articleTitle);
            resetState();
        }
    };

    const resetState = () => {
        setContent('');
        setImagePreview(null);
        setEventTitle('');
        setEventDate('');
        setArticleTitle('');
        setIsModalOpen(false);
        setActiveModal('post');
    };

    const openModal = (type) => {
        setActiveModal(type);
        setIsModalOpen(true);
    };

    return (
        <>
            <div className="card create-post-box">
                <div className="create-post-top">
                    <div className="avatar"></div>
                    <button className="input-trigger" onClick={() => openModal('post')}>
                        Start a post
                    </button>
                </div>
                <div className="create-post-actions">
                    <button className="action-btn" onClick={() => openModal('post')}>
                        <Image size={20} color="#378fe9" />
                        <span>Media</span>
                    </button>
                    <button className="action-btn" onClick={() => openModal('event')}>
                        <Calendar size={20} color="#c37d16" />
                        <span>Event</span>
                    </button>
                    <button className="action-btn" onClick={() => openModal('article')}>
                        <Newspaper size={20} color="#e06847" />
                        <span>Write article</span>
                    </button>
                </div>
            </div>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>{activeModal === 'event' ? 'Create an Event' : activeModal === 'article' ? 'Write Article' : 'Create a post'}</h2>
                            <button onClick={resetState} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                                <X size={24} />
                            </button>
                        </div>
                        <div className="modal-body">
                            <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                                <div className="avatar"></div>
                                <div>
                                    <div style={{ fontWeight: 600 }}>Anonymous User</div>
                                    <div style={{ fontSize: '12px', color: '#666', border: '1px solid #666', borderRadius: '15px', padding: '0 8px', width: 'fit-content' }}>Anyone</div>
                                </div>
                            </div>

                            {activeModal === 'event' && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '12px' }}>
                                    <input
                                        type="text"
                                        placeholder="Event Name"
                                        value={eventTitle}
                                        onChange={(e) => setEventTitle(e.target.value)}
                                        style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                                    />
                                    <input
                                        type="date"
                                        value={eventDate}
                                        onChange={(e) => setEventDate(e.target.value)}
                                        style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                                    />
                                </div>
                            )}

                            {activeModal === 'article' && (
                                <input
                                    type="text"
                                    placeholder="Headline"
                                    value={articleTitle}
                                    onChange={(e) => setArticleTitle(e.target.value)}
                                    style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', marginBottom: '12px', fontSize: '18px', fontWeight: 600 }}
                                />
                            )}

                            <textarea
                                placeholder={activeModal === 'article' ? "Write your article here..." : "What do you want to talk about?"}
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                autoFocus
                                style={{ width: '100%', minHeight: '150px', border: 'none', resize: 'none', outline: 'none' }}
                            />

                            {activeModal === 'post' && imagePreview && (
                                <div style={{ position: 'relative', marginTop: '12px', textAlign: 'center' }}>
                                    <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '300px', objectFit: 'contain', borderRadius: '8px', border: '1px solid #eee' }} />
                                    <button
                                        onClick={() => { setImagePreview(null); }}
                                        style={{ position: 'absolute', top: '8px', right: '8px', background: 'white', border: '1px solid #ccc', borderRadius: '50%', padding: '4px', cursor: 'pointer', display: 'flex', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            )}

                            {activeModal === 'post' && (
                                <div style={{ marginTop: '12px' }}>
                                    <label className="action-btn" style={{ width: 'fit-content', cursor: 'pointer' }}>
                                        <Image size={24} color="#666" />
                                        <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
                                    </label>
                                </div>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button
                                className="primary-btn"
                                disabled={
                                    (activeModal === 'post' && !content.trim()) ||
                                    (activeModal === 'event' && !eventTitle.trim()) ||
                                    (activeModal === 'article' && !articleTitle.trim())
                                }
                                onClick={handleSubmit}
                            >
                                {activeModal === 'post' ? 'Post' : activeModal === 'event' ? 'Create Event' : 'Publish Article'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CreatePost;
