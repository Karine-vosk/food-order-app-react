import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const mealsPath = path.join(__dirname, 'data', 'available-meals.json');
    const data = fs.readFileSync(mealsPath, 'utf8');
    const meals = JSON.parse(data);
    return res.status(200).json(meals);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Failed to load meals' });
  }
}
