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
            if (!API_KEY || !BASE_ID) {
                return res.status(500).json({
                    error: 'Airtable configuration missing. Please set AIRTABLE_API_KEY and AIRTABLE_BASE_ID in Vercel settings.'
                });
            }

            // Try to fetch records. If 'Grid view' or 'CreatedTime' don't exist, this might fail.
            // We'll try a simpler select if it fails.
            let records;
            try {
                records = await table.select({
                    view: 'Grid view',
                    sort: [{ field: 'CreatedTime', direction: 'desc' }]
                }).all();
            } catch (selectError) {
                console.warn('Advanced select failed, falling back to simple select:', selectError.message);
                records = await table.select().all();
            }

            const posts = records.map(record => ({
                id: record.id,
                content: record.get('Content') || '',
                author: record.get('Author') || 'Anonymous',
                imageData: record.get('ImageData') || '',
                likes: record.get('Likes') || 0,
                comments: record.get('Comments') ? JSON.parse(record.get('Comments')) : [],
                createdTime: record.get('CreatedTime') || record._rawJson.createdTime,
            }));

            return res.status(200).json(posts);
        } catch (error) {
            console.error('Error fetching posts:', error);
            return res.status(500).json({
                error: `Error fetching posts: ${error.message}`,
                details: error.toString()
            });
        }
    }

    if (req.method === 'POST') {
        const { content, attachments, author } = req.body;
        try {
            if (!API_KEY || !BASE_ID) {
                return res.status(500).json({ error: 'Airtable configuration missing' });
            }

            const records = await table.create([
                {
                    fields: {
                        Content: content || '',
                        Author: author || 'Anonymous',
                        ImageData: attachments && attachments.length > 0 ? attachments[0].url : '',
                        Likes: 0,
                        Comments: JSON.stringify([])
                    }
                }
            ]);
            return res.status(201).json(records[0]);
        } catch (error) {
            console.error('Error creating post:', error);
            return res.status(500).json({
                error: `Error creating post: ${error.message}`,
                details: error.toString()
            });
        }
    }

    res.status(405).json({ error: 'Method not allowed' });
}
