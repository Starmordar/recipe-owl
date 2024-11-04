function AuthBackground() {
  return (
    <div
      className='absolute inset-0 -z-10 w-screen h-screen bg-cover bg-center bg-[#FFB371]'
      style={{ backgroundImage: 'url("/images/auth-bg.svg")' }}
    ></div>
  );
}

export { AuthBackground };
