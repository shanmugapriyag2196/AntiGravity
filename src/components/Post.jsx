import React, { useState } from 'react';
import { ThumbsUp, MessageSquare, Share2, Send, MoreHorizontal, Trash2, Edit2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import CommentSection from './CommentSection';

const Post = ({ post, onLike, onComment, onDelete, onEdit }) => {
    const [showComments, setShowComments] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState(post.content);
    const [showMenu, setShowMenu] = useState(false);

    const handleEditSubmit = () => {
        onEdit(post.id, editContent);
        setIsEditing(false);
        setShowMenu(false);
    };

    return (
        <div className="card post">
            <div className="post-header">
                <div className="post-author-info">
                    <div className="avatar"></div>
                    <div>
                        <span className="author-name">{post.author}</span>
                        <span className="author-meta">{formatDistanceToNow(new Date(post.createdTime))} ago</span>
                    </div>
                </div>
                <div style={{ position: 'relative' }}>
                    <button className="action-btn" onClick={() => setShowMenu(!showMenu)}>
                        <MoreHorizontal size={20} />
                    </button>
                    {showMenu && (
                        <div style={{
                            position: 'absolute',
                            right: 0,
                            top: '100%',
                            backgroundColor: 'white',
                            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                            borderRadius: '4px',
                            zIndex: 10,
                            padding: '4px 0',
                            minWidth: '120px'
                        }}>
                            <button
                                className="action-btn"
                                style={{ width: '100%', justifyContent: 'flex-start', padding: '8px 16px' }}
                                onClick={() => { setIsEditing(true); setShowMenu(false); }}
                            >
                                <Edit2 size={16} /> <span style={{ marginLeft: '8px' }}>Edit</span>
                            </button>
                            <button
                                className="action-btn"
                                style={{ width: '100%', justifyContent: 'flex-start', padding: '8px 16px', color: '#d11124' }}
                                onClick={() => onDelete(post.id)}
                            >
                                <Trash2 size={16} /> <span style={{ marginLeft: '8px' }}>Delete</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="post-content">
                {isEditing ? (
                    <div>
                        <textarea
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                            className="comment-input"
                            style={{ width: '100%', borderRadius: '4px', minHeight: '80px', marginBottom: '8px' }}
                        />
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                            <button className="action-btn" onClick={() => setIsEditing(false)}>Cancel</button>
                            <button className="primary-btn" onClick={handleEditSubmit}>Save</button>
                        </div>
                    </div>
                ) : (
                    post.content
                )}
            </div>

            {post.attachments && post.attachments.length > 0 && (
                <img src={post.attachments[0].url} alt="Post attachment" className="post-image" />
            )}

            <div className="post-stats">
                <span>{post.likes} likes</span>
                <span>{post.comments.length} comments</span>
            </div>

            <div className="post-actions">
                <button
                    className="action-btn"
                    onClick={() => onLike(post.id, post.likes)}
                >
                    <ThumbsUp size={20} />
                    <span>Like</span>
                </button>
                <button className="action-btn" onClick={() => setShowComments(!showComments)}>
                    <MessageSquare size={20} />
                    <span>Comment</span>
                </button>
                <button className="action-btn" onClick={() => alert('Shared successfully!')}>
                    <Share2 size={20} />
                    <span>Share</span>
                </button>
                <button className="action-btn" onClick={() => alert('Post sent to connections!')}>
                    <Send size={20} />
                    <span>Send</span>
                </button>
            </div>

            {showComments && (
                <CommentSection
                    comments={post.comments}
                    onAddComment={(text) => onComment(post.id, post.comments, text)}
                />
            )}
        </div>
    );
};

export default Post;
