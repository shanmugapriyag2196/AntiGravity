import Airtable from 'airtable';

const API_KEY = process.env.VITE_AIRTABLE_API_KEY || process.env.AIRTABLE_API_KEY;
const BASE_ID = process.env.VITE_AIRTABLE_BASE_ID || process.env.AIRTABLE_BASE_ID;
const TABLE_ID = 'Events'; // Assuming table name is 'Events'

const base = new Airtable({ apiKey: API_KEY }).base(BASE_ID);
const table = base(TABLE_ID);

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
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
                return res.status(500).json({ error: 'Airtable configuration missing.' });
            }

            const records = await table.select({
                sort: [{ field: 'Date', direction: 'desc' }]
            }).all();

            const events = records.map(record => ({
                id: record.id,
                name: record.get('Name') || '',
                date: record.get('Date') || '',
                description: record.get('Description') || '',
                location: record.get('Location') || '',
                author: record.get('Author') || 'Anonymous',
                imageData: record.get('ImageData') || '',
                createdTime: record._rawJson.createdTime
            }));

            return res.status(200).json(events);
        } catch (error) {
            console.error('Error fetching events:', error);
            return res.status(500).json({ error: error.message });
        }
    }

    if (req.method === 'POST') {
        const { name, date, description, location, author, imageData } = req.body;
        try {
            const fields = {
                Name: name || '',
                Date: date || '',
                Description: description || '',
                Location: location || '',
                Author: author || 'Anonymous',
                ImageData: imageData || ''
            };
            const records = await table.create([{ fields }]);
            return res.status(201).json(records[0]);
        } catch (error) {
            console.error('Error creating event:', error);
            return res.status(500).json({ error: error.message });
        }
    }

    res.status(405).json({ error: 'Method not allowed' });
}
