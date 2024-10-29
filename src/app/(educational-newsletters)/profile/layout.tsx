export default async function ProfileLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className='px-1 md:p-4 min-[992px]:p-6 min-[1200px]:p-10 pb-10 bg-gray-100'>
      {children}
    </div>
  )
}
