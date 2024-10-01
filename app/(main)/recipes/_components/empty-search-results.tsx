import { SearchX } from 'lucide-react';

function EmptySearchResults() {
  return (
    <div className='text-center space-y-2 flex flex-col pt-[15vh] items-center px-5'>
      <SearchX className='h-20 w-20' />
      <h2 className='text-3xl font-semibold'>No Recipes Found</h2>
      <p>We couldn&apos;t find any recipes that match your search.</p>
    </div>
  );
}

export default EmptySearchResults;
