const API_URL = '/api';

const handleResponse = async (response) => {
    const contentType = response.headers.get('content-type');
    if (!response.ok) {
        let errorMessage = `Request failed with status ${response.status}`;
        if (contentType && contentType.includes('application/json')) {
            const errorData = await response.json().catch(() => ({}));
            errorMessage = errorData.error || errorMessage;
        }
        throw new Error(errorMessage);
    }

    if (contentType && contentType.includes('application/json')) {
        return response.json();
    }

    const text = await response.text();
    if (text.trim().startsWith('<!doctype html')) {
        throw new Error('Server returned HTML instead of JSON. This usually indicates a routing issue or 404 on the API endpoint.');
    }
    return text;
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

    async createPost(content, attachments = [], author = 'User', type = 'post', title = '') {
        try {
            const response = await fetch(`${API_URL}/posts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content, attachments, author, type, title }),
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
    },

    async fetchEvents() {
        try {
            const response = await fetch(`${API_URL}/events`);
            return await handleResponse(response);
        } catch (error) {
            console.error('Error fetching events:', error);
            throw error;
        }
    },

    async createEvent(eventData) {
        try {
            const response = await fetch(`${API_URL}/events`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(eventData),
            });
            return await handleResponse(response);
        } catch (error) {
            console.error('Error creating event:', error);
            throw error;
        }
    }
};
