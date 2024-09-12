import SignUpHeader from '@/components/layout/signup-header';
import SignInForm from '@/components/signin-form';

function Page() {
  return (
    <>
      <SignUpHeader />

      <main className='page-container pt-[10vh]'>
        <div className='flex flex-col gap-y-4'>
          <h1 className='text-3xl font-bold'>Log in to your account</h1>
        </div>

        <SignInForm />
      </main>
    </>
  );
}

export default Page;
