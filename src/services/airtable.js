const API_URL = '/api';

const handleResponse = async (response) => {
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Request failed with status ${response.status}`);
    }
    return response.json();
};

export const airtableService = {
    async fetchPosts() {
        try {
            const response = await fetch(`${API_URL}/posts`);
            return await handleResponse(response);
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
            return await handleResponse(response);
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
            return await handleResponse(response);
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
            return await handleResponse(response);
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
            return await handleResponse(response);
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
            return await handleResponse(response);
        } catch (error) {
            console.error('Error adding comment:', error);
            throw error;
        }
    }
};
