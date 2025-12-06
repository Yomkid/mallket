// File: components/header/MainHeader.jsx
import Link from 'next/link';
import { SearchBar } from './SearchBar';
import { AccountDropdown } from './AccountDropdown';
import { HelpDropdown } from './HelpDropdown';
import { CartButton } from './CartButton';

export function MainHeader() {
    return (
        <div className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20 gap-4">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
                        <img src="/logos/logo-green.svg" alt="Mallket Logo" className="h-8 w-auto" />
                    </Link>

                    {/* Search Bar */}
                    <SearchBar />

                    {/* Right Actions */}
                    <div className="flex items-center space-x-6">
                        <AccountDropdown />
                        <HelpDropdown />
                        <CartButton itemCount={3} />
                    </div>
                </div>
            </div>
        </div>
    );
}