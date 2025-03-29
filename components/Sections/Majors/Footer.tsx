import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-background text-foreground border-t border-border">
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold text-primary">AsterixhDev</h3>
            <p className="mt-2">Providing innovative solutions since 2023.</p>
          </div>
          {/* Navigation */}
          <div>
            <h3 className="text-xl font-bold">Navigation</h3>
            <ul className="mt-2 space-y-2">
              <li>
                <Link
                  href="#"
                  className="hover:text-primary transition-colors duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-primary transition-colors duration-300"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-primary transition-colors duration-300"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-primary transition-colors duration-300"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          {/* Resources */}
          <div>
            <h3 className="text-xl font-bold">Resources</h3>
            <ul className="mt-2 space-y-2">
              <li>
                <Link
                  href="#"
                  className="hover:text-primary transition-colors duration-300"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-primary transition-colors duration-300"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-primary transition-colors duration-300"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-primary transition-colors duration-300"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          {/* Social Media */}
          <div>
            <h3 className="text-xl font-bold">Follow Us</h3>
            <div className="mt-2 flex space-x-4">
              <Link
                href="#"
                className="hover:text-primary transition-colors duration-300"
              >
                <i className="pi pi-facebook"></i>
              </Link>
              <Link
                href="#"
                className="hover:text-primary transition-colors duration-300"
              >
                <i className="pi pi-twitter"></i>
              </Link>
              <Link
                href="#"
                className="hover:text-primary transition-colors duration-300"
              >
                <i className="pi pi-instagram"></i>
              </Link>
              <Link
                href="#"
                className="hover:text-primary transition-colors duration-300"
              >
                <i className="pi pi-linkedin"></i>
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-4 text-center">
          <p>&copy; 2025 AsterixhDev. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
