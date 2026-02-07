// In-memory store: orders are lost when the serverless function goes cold.
// For production, use a database (e.g. Vercel Postgres, Vercel KV).
const ordersStore = [];

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const orderData = req.body?.order;

  if (
    orderData == null ||
    orderData.items == null ||
    orderData.items.length === 0
  ) {
    return res.status(400).json({ message: 'Missing data.' });
  }

  if (
    orderData.customer?.email == null ||
    !orderData.customer.email.includes('@') ||
    orderData.customer?.name == null ||
    orderData.customer.name.trim() === '' ||
    orderData.customer?.street == null ||
    orderData.customer.street.trim() === '' ||
    orderData.customer?.['postal-code'] == null ||
    orderData.customer['postal-code'].trim() === '' ||
    orderData.customer?.city == null ||
    orderData.customer.city.trim() === ''
  ) {
    return res.status(400).json({
      message:
        'Missing data: Email, name, street, postal code or city is missing.',
    });
  }

  const newOrder = {
    ...orderData,
    id: (Math.random() * 1000).toString(),
  };
  ordersStore.push(newOrder);

  return res.status(201).json({ message: 'Order created!' });
}
