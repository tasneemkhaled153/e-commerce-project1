import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      {/* App Download Section */}
      <div className="bg-main-light py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">Get the FreshCart App</h3>
            <p className="text-gray-600 mb-4">We will send you a link, open it on your phone to download the app</p>
            <div className="flex max-w-md mx-auto gap-2">
              <Input placeholder="Email .." className="flex-1" />
              <Button className="bg-main hover:bg-main/90">Share App Link</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Partners */}
      <div className="py-6 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium">Payment Partners</span>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-6 bg-blue-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">💳</span>
                </div>
                <div className="w-8 h-6 bg-red-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">💳</span>
                </div>
                <div className="w-8 h-6 bg-purple-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">💳</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium">Get deliveries with FreshCart</span>
              <div className="flex space-x-2">
                <div className="bg-black text-white px-3 py-1 rounded text-xs">Available on the App Store</div>
                <div className="bg-black text-white px-3 py-1 rounded text-xs">Get it on Google Play</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <div className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <Link href="/categories/electronics" className="hover:text-main">
                    Electronics
                  </Link>
                </li>
                <li>
                  <Link href="/categories/fashion" className="hover:text-main">
                    Fashion
                  </Link>
                </li>
                <li>
                  <Link href="/categories/home" className="hover:text-main">
                    Home & Garden
                  </Link>
                </li>
                <li>
                  <Link href="/categories/sports" className="hover:text-main">
                    Sports
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Customer Service</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <Link href="/contact" className="hover:text-main">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/shipping" className="hover:text-main">
                    Shipping Info
                  </Link>
                </li>
                <li>
                  <Link href="/returns" className="hover:text-main">
                    Returns
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-main">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Account</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <Link href="/login" className="hover:text-main">
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link href="/register" className="hover:text-main">
                    Create Account
                  </Link>
                </li>
                <li>
                  <Link href="/orders" className="hover:text-main">
                    Order History
                  </Link>
                </li>
                <li>
                  <Link href="/wishlist" className="hover:text-main">
                    Wishlist
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">About</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <Link href="/about" className="hover:text-main">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:text-main">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-main">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-main">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t py-4">
        <div className="container mx-auto px-4">
          <div className="text-center text-sm text-gray-600">© 2024 FreshCart. All rights reserved.</div>
        </div>
      </div>
    </footer>
  )
}
