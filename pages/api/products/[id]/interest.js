import connectDB from '../../../../lib/mongodb';
import Product from '../../../../models/Product';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id } = req.query;
  await connectDB();

  try {
    const product = await Product.findByIdAndUpdate(
      id,
      { $inc: { interests: 1 } },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json({ message: 'Interest recorded', interests: product.interests });
  } catch (error) {
    res.status(500).json({ error: 'Failed to record interest' });
  }
}