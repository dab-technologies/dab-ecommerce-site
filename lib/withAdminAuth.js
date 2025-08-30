'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function withAdminAuth(Component) {
  return function ProtectedComponent(props) {
    const router = useRouter();

    useEffect(() => {
      const adminSession = localStorage.getItem('adminSession');
      if (!adminSession) {
        router.replace('/admin/login');
      }
    }, [router]);

    return <Component {...props} />;
  };
}
