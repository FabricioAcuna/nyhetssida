export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="mb-8 md:mb-0">
            <h6 className="text-xl font-bold mb-4">Services</h6>
            <nav className="flex flex-col gap-3">
              <a href="#" className="hover:text-blue-400 transition-colors duration-200">Branding</a>
              <a href="#" className="hover:text-blue-400 transition-colors duration-200">Design</a>
              <a href="#" className="hover:text-blue-400 transition-colors duration-200">Marketing</a>
              <a href="#" className="hover:text-blue-400 transition-colors duration-200">Advertisement</a>
            </nav>
          </div>
          <div className="mb-8 md:mb-0">
            <h6 className="text-xl font-bold mb-4">Company</h6>
            <nav className="flex flex-col gap-3">
              <a href="#" className="hover:text-blue-400 transition-colors duration-200">About us</a>
              <a href="#" className="hover:text-blue-400 transition-colors duration-200">Contact</a>
              <a href="#" className="hover:text-blue-400 transition-colors duration-200">Jobs</a>
              <a href="#" className="hover:text-blue-400 transition-colors duration-200">Press kit</a>
            </nav>
          </div>
          <div className="mb-8 md:mb-0">
            <h6 className="text-xl font-bold mb-4">Legal</h6>
            <nav className="flex flex-col gap-3">
              <a href="#" className="hover:text-blue-400 transition-colors duration-200">Terms of use</a>
              <a href="#" className-="hover:text-blue-400 transition-colors duration-200">Privacy policy</a>
              <a href="#" className="hover:text-blue-400 transition-colors duration-200">Cookie policy</a>
            </nav>
          </div>
        </div>
        <div className="mt-10 border-t border-gray-700 pt-8 text-center text-base">
          <p>&copy; {new Date().getFullYear()} ChasNews. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
