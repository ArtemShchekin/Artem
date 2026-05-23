'use client';

import dynamic from 'next/dynamic';

const AuthSelector = dynamic(() => import('@/components/AuthSelector'), {
  ssr: false,
});

export default function AuthPage() {
  return <AuthSelector />;
}
