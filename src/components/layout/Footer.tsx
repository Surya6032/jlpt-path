export function Footer() {
  return (
    <footer className="border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 mt-16 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="w-7 h-7 bg-brand-indigo rounded-md flex items-center justify-center text-white text-xs jp">日</span>
          <span className="font-bold text-gray-900 dark:text-white">JLPT Path</span>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Your complete self-study platform for Japanese — from zero to JLPT N4.
        </p>
        <div className="flex justify-center gap-6 mt-4 text-xs text-gray-400 dark:text-gray-500">
          <span>© 2025 JLPT Path</span>
          <span>Built for learners, by learners</span>
        </div>
      </div>
    </footer>
  )
}
