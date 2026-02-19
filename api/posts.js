import Airtable from 'airtable';

const API_KEY = process.env.VITE_AIRTABLE_API_KEY || process.env.AIRTABLE_API_KEY;
const BASE_ID = process.env.VITE_AIRTABLE_BASE_ID || process.env.AIRTABLE_BASE_ID;
const TABLE_ID = process.env.VITE_AIRTABLE_TABLE_ID || process.env.AIRTABLE_TABLE_ID || 'Posts';

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

    if (req.method === 'GET') {
        try {
            const records = await table.select({
                view: 'Grid view',
                sort: [{ field: 'CreatedTime', direction: 'desc' }]
            }).all();

            const posts = records.map(record => ({
                id: record.id,
                content: record.get('Content'),
                author: record.get('Author') || 'Anonymous',
                attachments: record.get('Attachments') || [],
                likes: record.get('Likes') || 0,
                comments: record.get('Comments') ? JSON.parse(record.get('Comments')) : [],
                createdTime: record.get('CreatedTime') || record._rawJson.createdTime,
            }));

            return res.status(200).json(posts);
        } catch (error) {
            console.error('Error fetching posts:', error);
            return res.status(500).json({ error: 'Error fetching posts' });
        }
    }

    if (req.method === 'POST') {
        const { content, attachments, author } = req.body;
        try {
            const records = await table.create([
                {
                    fields: {
                        Content: content,
                        Author: author || 'Anonymous',
                        Attachments: attachments || [],
                        Likes: 0,
                        Comments: JSON.stringify([]),
                        CreatedTime: new Date().toISOString()
                    }
                }
            ]);
            return res.status(201).json(records[0]);
        } catch (error) {
            console.error('Error creating post:', error);
            return res.status(500).json({ error: 'Error creating post' });
        }
    }

    res.status(405).json({ error: 'Method not allowed' });
}
