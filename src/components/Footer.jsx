"use client"
import { motion } from "framer-motion";
import Link from "next/link";

const Footer = () => {
    return (
        <motion.footer
            className="bg-gradient-to-b from-gray-900 to-black text-white py-10 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
        >
            <div className="max-w-screen-xl mx-auto text-center">
                {/* Footer Top Section */}
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                    {/* Links Section */}
                    <motion.div
                        className="flex flex-col space-y-4"
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 1.5, delay: 0.3 }}
                    >
                        <h3 className="font-semibold text-xl">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/about" className="hover:text-blue-400 transition-colors">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog" className="hover:text-blue-400 transition-colors">
                                  Blog
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-blue-400 transition-colors">
                                  Contact
                                </Link>
                            </li>
                        </ul>
                    </motion.div>

                    {/* Newsletter Section */}
                    <motion.div
                        className="flex flex-col space-y-4"
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 1.5, delay: 0.3 }}
                    >
                        <h3 className="font-semibold text-xl">Subscribe to Newsletter</h3>
                        <input
                            type="email"
                            className="p-3 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none"
                            placeholder="Enter your email"
                        />
                        <button className="mt-4 bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition duration-300">
                            Subscribe
                        </button>
                    </motion.div>

                    {/* Social Media Section */}
                    <motion.div
                        className="flex justify-center space-x-6 mt-4 md:mt-0"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1.5, delay: 0.3 }}
                    >
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-blue-400 transition-colors"
                        >
                            <i className="fab fa-twitter text-2xl"></i>
                        </a>
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-blue-400 transition-colors"
                        >
                            <i className="fab fa-facebook text-2xl"></i>
                        </a>
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-blue-400 transition-colors"
                        >
                            <i className="fab fa-instagram text-2xl"></i>
                        </a>
                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-blue-400 transition-colors"
                        >
                            <i className="fab fa-linkedin text-2xl"></i>
                        </a>
                    </motion.div>
                </div>

                {/* Footer Bottom Section */}
                <motion.div
                    className="text-sm text-gray-400"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                >
                    <p>© 2025 My Blog. All Rights Reserved.</p>
                </motion.div>
            </div>
        </motion.footer>
    );
};

export default Footer;
