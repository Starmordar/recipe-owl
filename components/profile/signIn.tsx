import { signIn, signOut } from '@/auth';

export default function SignIn() {
  console.log('render');
  return (
    <>
      <div
        style={{
          backgroundColor: '#000',
          display: 'flex',
          justifyContent: 'space-between',
          color: '#fff',
          padding: 16,
        }}
      >
        <span>Sign In With Google.</span>
        <a href='https://google.com'>
          <img
            style={{ display: 'block' }}
            src='https://authjs.dev/img/providers/google.svg'
            height='48'
            width='48'
          />
        </a>
      </div>

      <form
        action={async () => {
          'use server';
          await signIn('google');
        }}
      >
        <button type='submit'>Signin with Google</button>
      </form>
      <form
        action={async () => {
          'use server';
          await signOut();
        }}
      >
        <button type='submit'>Sign OUT</button>
      </form>
    </>
  );
}
