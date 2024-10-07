import TodaysRecipe from "./_components/today's-recipe";

function Page() {
  return (
    <main className='page-container px-0'>
      <TodaysRecipe />
      <div className='h-[100vh]'></div>
    </main>
  );
}

export default Page;
