'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ReturnBackBtn() {
  const router = useRouter();

  return (
    <button type="button" onClick={() => router.back()}>
      <ArrowLeft className="h-4 w-4 opacity-50" />
    </button>
  );
}
