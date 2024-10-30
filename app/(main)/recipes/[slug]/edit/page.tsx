import { EditRecipePage } from '@/src/views/edit-recipe';

async function Page({ params }: { params: { slug: string } }) {
  return <EditRecipePage params={params} />;
}

export default Page;
