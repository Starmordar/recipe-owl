import SignUpHeader from '@/components/layout/signup-header';
import SignupForm from '@/components/signup-form';

function Page() {
  return (
    <>
      <SignUpHeader />

      <main className='page-container pt-[10vh]'>
        <div className='flex flex-col gap-y-4'>
          <h1 className='text-3xl font-bold'>Sign Up with Email</h1>
        </div>

        <SignupForm />
      </main>
    </>
  );
}

export default Page;
