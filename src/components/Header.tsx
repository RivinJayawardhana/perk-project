import Link from "next/link";

export default function Header() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-[#1a2233]">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-[#e6b756] flex items-center justify-center text-lg font-bold text-[#1a2233]">
          V
        </div>
        <span className="text-xl font-bold text-white">
          enture<span className="text-[#e6b756]">Next</span>
        </span>
      </div>
      <div className="hidden md:flex gap-8 text-white font-medium">
        <Link href="/" className="hover:text-[#e6b756]">Home</Link>
        <Link href="/perks" className="hover:text-[#e6b756]">Perks</Link>
        <Link href="/about" className="hover:text-[#e6b756]">About</Link>
        <Link href="/partner" className="hover:text-[#e6b756]">Partner</Link>
        <Link href="/journal" className="hover:text-[#e6b756]">Journal</Link>
        <Link href="/contact" className="hover:text-[#e6b756]">Contact</Link>
      </div>
      <div className="flex gap-4 items-center">
        <Link href="/admin" className="hidden md:block text-white hover:text-[#e6b756]">Admin</Link>
        <Link href="/perks">
          <button className="bg-[#e6b756] text-[#1a2233] font-semibold px-6 py-2 rounded-full hover:bg-[#f5d488]">
            Explore Perks
          </button>
        </Link>
      </div>
    </nav>
  );
}
