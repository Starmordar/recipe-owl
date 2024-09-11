import { auth } from '@/auth';
import SignIn from '@/components/profile/signIn';

async function Profile() {
  const session = await auth();

  console.log('session :>> ', session);

  return (
    <main className='page-container'>
      <SignIn />
    </main>
  );
}

export default Profile;
