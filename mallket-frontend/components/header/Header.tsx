// File: components/header/Header.jsx (Main Component)
import { TopBanner } from './TopBanner';
import { MainHeader } from './MainHeader';
import { Navigation } from './Navigation';

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <TopBanner />
      <MainHeader />
      <Navigation />
    </header>
  );
}