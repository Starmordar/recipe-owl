import { Link } from '@/src/shared/i18n/routing';

interface AuthChangeOptionProps {
  title: string;
  linkTitle: string;
  redirectTo: string;
}

function AuthChangeOption({ title, linkTitle, redirectTo }: AuthChangeOptionProps) {
  return (
    <div className='flex justify-center w-full gap-x-2 text-sm md:text-base pt-2'>
      <p>{title}</p>

      <Link href={redirectTo} className='outer-link'>
        {linkTitle}
      </Link>
    </div>
  );
}

export { AuthChangeOption };
