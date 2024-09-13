interface LayoutProps {
  children: React.ReactNode;
}

export default async function Layout({ children }: LayoutProps) {
  return <main className='page-container pt-[5vh] px-10'>{children}</main>;
}
