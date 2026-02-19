import React, { useState } from 'react';
import { Image, Video, Calendar, Newspaper, X } from 'lucide-react';

const CreatePost = ({ onPost }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [content, setContent] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = () => {
        if (content.trim()) {
            // In a real app, we'd upload the file to a CDN first and get a URL.
            // For Airtable, we can send a URL if it's hosted, or handle base64 if small.
            // For this MVP, we'll just send the content and mock the attachment if local.
            onPost(content, imagePreview ? [{ url: imagePreview }] : []);
            setContent('');
            setImageFile(null);
            setImagePreview(null);
            setIsModalOpen(false);
        }
    };

    return (
        <>
            <div className="card create-post-box">
                <div className="create-post-top">
                    <div className="avatar"></div>
                    <button className="input-trigger" onClick={() => setIsModalOpen(true)}>
                        Start a post
                    </button>
                </div>
                <div className="create-post-actions">
                    <button className="action-btn" onClick={() => setIsModalOpen(true)}>
                        <Image size={20} color="#378fe9" />
                        <span>Media</span>
                    </button>
                    <button className="action-btn">
                        <Calendar size={20} color="#c37d16" />
                        <span>Event</span>
                    </button>
                    <button className="action-btn">
                        <Newspaper size={20} color="#e06847" />
                        <span>Write article</span>
                    </button>
                </div>
            </div>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>Create a post</h2>
                            <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
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
                            <textarea
                                placeholder="What do you want to talk about?"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                autoFocus
                            />
                            {imagePreview && (
                                <div style={{ position: 'relative', marginTop: '12px' }}>
                                    <img src={imagePreview} alt="Preview" style={{ width: '100%', borderRadius: '8px' }} />
                                    <button
                                        onClick={() => { setImageFile(null); setImagePreview(null); }}
                                        style={{ position: 'absolute', top: '8px', right: '8px', background: 'white', border: 'none', borderRadius: '50%', padding: '4px', cursor: 'pointer' }}
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            )}
                            <div style={{ marginTop: '12px' }}>
                                <label className="action-btn" style={{ width: 'fit-content', cursor: 'pointer' }}>
                                    <Image size={24} color="#666" />
                                    <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
                                </label>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                className="primary-btn"
                                disabled={!content.trim()}
                                onClick={handleSubmit}
                            >
                                Post
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CreatePost;
