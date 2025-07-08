import Link from 'next/link'
import { MapPinIcon, EnvelopeIcon } from '@heroicons/react/24/outline'
import { Github, Linkedin } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white min-h-[50vh] py-16 sm:py-20 flex items-center">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MapPinIcon className="h-5 w-5 text-gray-400" />
                <span className="text-gray-300">Islamabad, Pakistan</span>
              </div>
              <div className="flex items-center gap-3">
                <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                <a 
                  href="mailto:your.email@example.com"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  haris.a.mannan@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/projects" className="block text-gray-300 hover:text-white transition-colors">
                Projects
              </Link>
              <Link href="/about" className="block text-gray-300 hover:text-white transition-colors">
                About
              </Link>
              <Link href="/contact" className="block text-gray-300 hover:text-white transition-colors">
                Contact
              </Link>
              <a href="/resume.pdf" className="block text-gray-300 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                Resume
              </a>
            </div>
          </div>

          {/* Professional Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Connect</h3>
            <div className="flex items-center gap-4">
              <a 
                href="https://www.linkedin.com/in/muhammad-tayyab-3962a2373/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a 
                href="https://github.com/TayyabManan" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Github className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © {currentYear} Tayyab Manan. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}