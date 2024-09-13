import Link from 'next/link';

interface ChangeOptionProps {
  title: string;
  linkTitle: string;
  redirectTo: string;
}

function ChangeOption({ title, linkTitle, redirectTo }: ChangeOptionProps) {
  return (
    <div className='flex justify-center w-full gap-2 text-sm pt-2'>
      <p>{title}</p>

      <Link href={redirectTo} className='outer-link'>
        {linkTitle}
      </Link>
    </div>
  );
}

export default ChangeOption;
