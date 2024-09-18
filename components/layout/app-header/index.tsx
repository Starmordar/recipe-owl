import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface AppHeaderProps {
  children: React.ReactNode;
  prevUrl?: string;
}

function AppHeader({ children, prevUrl }: AppHeaderProps) {
  return (
    <header className='sticky top-0 mx-0 w-full z-50 bg-background'>
      <div className='container flex items-center justify-between py-2'>
        {prevUrl && (
          <Link href={prevUrl}>
            <ArrowLeft className='h-5 w-5' />
          </Link>
        )}

        {children}
      </div>
    </header>
  );
}

export default AppHeader;
