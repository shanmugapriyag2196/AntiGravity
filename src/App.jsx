import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import CreatePost from './components/CreatePost';
import Post from './components/Post';
import { airtableService } from './services/airtable';

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const data = await airtableService.fetchPosts();
      setPosts(data);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to load posts. Please check your Airtable configuration.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async (content, attachments) => {
    try {
      const newRecord = await airtableService.createPost(content, attachments);
      // Optimistic update or just reload
      const newPost = {
        id: newRecord.id,
        content,
        author: 'Anonymous',
        attachments,
        likes: 0,
        comments: [],
        createdTime: new Date().toISOString()
      };
      setPosts([newPost, ...posts]);
    } catch (err) {
      alert(`Failed to create post: ${err.message}`);
    }
  };

  const handleLike = async (id, currentLikes) => {
    try {
      const post = posts.find(p => p.id === id);
      // For simplicity, we don't track if user already liked, just toggle
      await airtableService.toggleLike(id, currentLikes, false);
      setPosts(posts.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
    } catch (err) {
      console.error(err);
    }
  };

  const handleComment = async (id, currentComments, text) => {
    try {
      const updatedComments = await airtableService.addComment(id, currentComments, text);
      setPosts(posts.map(p => p.id === id ? { ...p, comments: updatedComments } : p));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await airtableService.deletePost(id);
        setPosts(posts.filter(p => p.id !== id));
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleEdit = async (id, content) => {
    try {
      await airtableService.updatePost(id, content);
      setPosts(posts.map(p => p.id === id ? { ...p, content } : p));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="app-container">
      <Navbar />

      <main className="main-feed">
        <CreatePost onPost={handleCreatePost} />

        {loading ? (
          <div style={{ textAlign: 'center', padding: '20px' }}>Loading posts...</div>
        ) : error ? (
          <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>{error}</div>
        ) : (
          <div className="posts-container">
            {posts.map(post => (
              <Post
                key={post.id}
                post={post}
                onLike={handleLike}
                onComment={handleComment}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
