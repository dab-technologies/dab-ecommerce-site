export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password } = req.body;

  const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'senyojustice36@gmail.com';
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'fresh1818';

  console.log('🔐 Received credentials:', email, password);
  console.log('✅ Expected credentials:', ADMIN_EMAIL, ADMIN_PASSWORD);

  if (
    email.trim().toLowerCase() === ADMIN_EMAIL.trim().toLowerCase() &&
    password === ADMIN_PASSWORD
  ) {
    return res.status(200).json({ success: true, message: 'Authentication successful' });
  } else {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
}