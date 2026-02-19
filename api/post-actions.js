import Airtable from 'airtable';

const API_KEY = process.env.VITE_AIRTABLE_API_KEY;
const BASE_ID = process.env.VITE_AIRTABLE_BASE_ID;
const TABLE_ID = process.env.VITE_AIRTABLE_TABLE_ID || 'Posts';

const base = new Airtable({ apiKey: API_KEY }).base(BASE_ID);
const table = base(TABLE_ID);

export default async function handler(req, res) {
    // Add CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    const { id } = req.query;

    if (!id) {
        return res.status(400).json({ error: 'Post ID is required' });
    }

    if (req.method === 'PUT') {
        const { content } = req.body;
        try {
            const record = await table.update(id, {
                Content: content
            });
            return res.status(200).json(record);
        } catch (error) {
            console.error('Error updating post:', error);
            return res.status(500).json({ error: 'Error updating post' });
        }
    }

    if (req.method === 'DELETE') {
        try {
            await table.destroy(id);
            return res.status(200).json({ success: true });
        } catch (error) {
            console.error('Error deleting post:', error);
            return res.status(500).json({ error: 'Error deleting post' });
        }
    }

    if (req.method === 'PATCH') {
        const { action, currentLikes, isLiked, currentComments, commentText, author } = req.body;

        try {
            if (action === 'like') {
                const newLikes = isLiked ? Math.max(0, currentLikes - 1) : currentLikes + 1;
                const record = await table.update(id, {
                    Likes: newLikes
                });
                return res.status(200).json(record);
            }

            if (action === 'comment') {
                const newComment = {
                    id: Math.random().toString(36).substr(2, 9),
                    text: commentText,
                    author: author || 'User',
                    timestamp: new Date().toISOString()
                };
                const updatedComments = [...(currentComments || []), newComment];
                const record = await table.update(id, {
                    Comments: JSON.stringify(updatedComments)
                });
                return res.status(200).json(updatedComments);
            }
        } catch (error) {
            console.error('Error processing post action:', error);
            return res.status(500).json({ error: 'Error processing action' });
        }
    }

    res.status(405).json({ error: 'Method not allowed' });
}
