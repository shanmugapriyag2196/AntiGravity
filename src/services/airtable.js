const API_URL = '/api';

export const airtableService = {
    async fetchPosts() {
        try {
            const response = await fetch(`${API_URL}/posts`);
            if (!response.ok) throw new Error('Failed to fetch posts');
            return await response.json();
        } catch (error) {
            console.error('Error fetching posts:', error);
            throw error;
        }
    },

    async createPost(content, attachments = [], author = 'User') {
        try {
            const response = await fetch(`${API_URL}/posts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content, attachments, author }),
            });
            if (!response.ok) throw new Error('Failed to create post');
            return await response.json();
        } catch (error) {
            console.error('Error creating post:', error);
            throw error;
        }
    },

    async updatePost(id, content) {
        try {
            const response = await fetch(`${API_URL}/post-actions/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content }),
            });
            if (!response.ok) throw new Error('Failed to update post');
            return await response.json();
        } catch (error) {
            console.error('Error updating post:', error);
            throw error;
        }
    },

    async deletePost(id) {
        try {
            const response = await fetch(`${API_URL}/post-actions/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Failed to delete post');
            return await response.json();
        } catch (error) {
            console.error('Error deleting post:', error);
            throw error;
        }
    },

    async toggleLike(id, currentLikes, isLiked) {
        try {
            const response = await fetch(`${API_URL}/post-actions/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'like',
                    currentLikes,
                    isLiked
                }),
            });
            if (!response.ok) throw new Error('Failed to toggle like');
            return await response.json();
        } catch (error) {
            console.error('Error toggling like:', error);
            throw error;
        }
    },

    async addComment(id, currentComments, commentText, author = 'User') {
        try {
            const response = await fetch(`${API_URL}/post-actions/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'comment',
                    currentComments,
                    commentText,
                    author
                }),
            });
            if (!response.ok) throw new Error('Failed to add comment');
            return await response.json();
        } catch (error) {
            console.error('Error adding comment:', error);
            throw error;
        }
    }
};
