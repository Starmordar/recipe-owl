import Image from 'next/image';
import Link from 'next/link';

import { recipeQuickLinks } from '../../config/recipe-quick-links';

function QuickLinks() {
  return (
    <section className='space-y-2'>
      <h2 className='text-xl font-semibold'>Quick Links For You</h2>

      <div className='flex flex-nowrap gap-x-3 overflow-x-auto hide-scrollbar'>
        {recipeQuickLinks.map(({ picture, url, title }) => (
          <Link key={title} href={url} className='relative min-w-32 w-32'>
            <div className='relative min-h-32 h-32'>
              <Image
                className='rounded-lg'
                src={picture}
                alt={title ?? ''}
                fill
                sizes='(max-width: 768px) 50vw, 33vw'
                style={{ objectFit: 'cover' }}
              />
            </div>

            <p className='absolute inset-x-0 bottom-2 text-base text-center font-medium'>{title}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

export { QuickLinks };
