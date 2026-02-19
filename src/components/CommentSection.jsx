import React, { useState } from 'react';

const CommentSection = ({ comments, onAddComment }) => {
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim()) {
            onAddComment(text);
            setText('');
        }
    };

    return (
        <div className="comment-section">
            <form onSubmit={handleSubmit} className="comment-input-area">
                <div className="avatar" style={{ width: '32px', height: '32px' }}></div>
                <input
                    type="text"
                    placeholder="Add a comment..."
                    className="comment-input"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
            </form>

            <div className="comment-list">
                {comments.map((comment) => (
                    <div key={comment.id} className="comment-item">
                        <div className="avatar" style={{ width: '32px', height: '32px' }}></div>
                        <div className="comment-bubble">
                            <div className="comment-author">{comment.author}</div>
                            <div className="comment-text">{comment.text}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommentSection;
