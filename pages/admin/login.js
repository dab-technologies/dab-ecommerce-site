'use client';

import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import styles from './AdminLogin.module.css';
import { Lock, Mail, AlertCircle } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        // Keep your original localStorage
        localStorage.setItem('adminSession', JSON.stringify({
          email,
          loginTime: new Date().toISOString(),
        }));

        // NEW: also set a simple cookie so middleware can protect routes server-side
        document.cookie = `adminSession=1; Max-Age=${60 * 60 * 24 * 7}; Path=/; SameSite=Lax`;

        router.push('/admin/dashboard');
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Admin Login - EcoStore</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles['card-header']}>
            <div className={styles['lock-icon']}>
              <Lock className="text-white" size={32} />
            </div>
            <div className={styles['card-title']}>Admin Login</div>
            <div className={styles['card-subtitle']}>Access the admin dashboard</div>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            {error && (
              <div className={styles.alert}>
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label htmlFor="email" className={styles.label}>Email</label>
              <div className={styles['input-wrapper']}>
                <Mail className={styles.icon} />
                <input
                  id="email"
                  type="email"
                  placeholder="Enter admin email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.input}
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className={styles.label}>Password</label>
              <div className={styles['input-wrapper']}>
                <Lock className={styles.icon} />
                <input
                  id="password"
                  type="password"
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={styles.input}
                  required
                />
              </div>
            </div>

            <button type="submit" className={styles.button} disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
