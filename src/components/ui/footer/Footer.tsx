import Link from 'next/link'

export const Footer = () => {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 py-8 print:hidden text-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 max-w-[1600px] mx-auto">
          <div>
            <h3 className="text-lg font-semibold mb-4">About</h3>
            <p className="text-sm text-gray-400">Our platform provides a centralized solution for parents to easily access educational newsletters, helping children continue learning at home.</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/newsletters"
                  className="text-gray-400 hover:text-white p-0"
                >Newsletters</Link></li>
              <li><Link href="/breakfasts" className="text-gray-400 hover:text-white">Breakfasts</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Help</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/info/terms" className="text-gray-400 hover:text-white">Terms and Conditions</Link></li>
              <li><Link href="/info/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
          <p><span>© {new Date().getFullYear()}</span> Educational Newsletters. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
