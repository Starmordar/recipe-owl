import { CartPage } from '@/src/views/cart';

interface PageProps {
  searchParams: { shareToken?: string };
}

async function Page({ searchParams: { shareToken } }: PageProps) {
  return <CartPage shareToken={shareToken} />;
}

export default Page;
