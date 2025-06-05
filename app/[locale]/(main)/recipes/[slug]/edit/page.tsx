import { EditRecipePage } from '@/src/views/edit-recipe';

async function Page(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  return <EditRecipePage params={params} />;
}

export default Page;
