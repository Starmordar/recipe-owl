import { auth } from '@/auth';
import SignIn from '@/components/profile/signIn';

export default async function Page() {
  const session = await auth();
  console.log('session :>> ', session);

  return (
    <main className='page-container'>
      <SignIn />
    </main>
  );
}
