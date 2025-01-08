import Image from 'next/image';
import Link from 'next/link';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/src/shared/ui/carousel';

import { recipeQuickLinks } from '../../config/recipe-quick-links';

function QuickLinks() {
  return (
    <section className='space-y-2 md:space-y-4'>
      <h2 className='text-xl md:text-2xl font-semibold'>Quick Links For You</h2>

      <Carousel className='w-full'>
        <CarouselContent>
          {recipeQuickLinks.map(({ picture, url, title, textColor }) => (
            <CarouselItem key={title} className='basis-36'>
              <Link key={title} href={url} className='relative group'>
                <div className='relative min-h-32 h-32 rounded-lg overflow-hidden'>
                  <Image
                    className='transition-transform group-hover:scale-110 duration-300'
                    src={picture}
                    alt={title ?? ''}
                    fill
                    sizes='(max-width: 768px) 50vw, 33vw'
                    style={{ objectFit: 'cover' }}
                  />
                </div>

                <p
                  className='absolute inset-x-0 bottom-2 text-base text-center font-medium'
                  style={{ color: textColor ?? 'inherit' }}
                >
                  {title}
                </p>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className='hidden lg:flex' />
        <CarouselNext className='hidden lg:flex' />
      </Carousel>
    </section>
  );
}

export { QuickLinks };
