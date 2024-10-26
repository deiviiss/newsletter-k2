export default async function InfoLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className='px-1 '>
      {children}
    </div>
  )
}
