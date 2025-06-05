import { CartPage } from '@/src/views/cart';

interface PageProps {
  searchParams: Promise<{ shareToken?: string }>;
}

async function Page(props: PageProps) {
  const searchParams = await props.searchParams;
  const { shareToken } = searchParams;

  return <CartPage shareToken={shareToken} />;
}

export default Page;
