import SearchBar from '@/components/layout/search-bar';

export default function DiscoverLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <div className="fixed top-0 mx-0 w-full z-50 bg-white">
        <SearchBar />
      </div>
      <div className="h-[55px]"></div>

      {children}
    </>
  );
}
