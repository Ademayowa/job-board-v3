/* Layout for all components in the components folder */
export default function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className='max-w-6xl mx-auto px-5'>{children}</div>;
}
