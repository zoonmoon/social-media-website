import { useState, useEffect } from 'react';
import GroupsSidebar from '@/app/_components/_groups_sidebar/';

export default function RightSidebar({ handleFeedTypeFilterChange }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768); // You can adjust the 768px value as needed
    };

    // Check on mount
    checkIfMobile();

    // Add resize event listener
    window.addEventListener('resize', checkIfMobile);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  // Don't render on mobile
  if (isMobile) return null;

  return (
    <div>
      <GroupsSidebar handleFeedTypeFilterChange={handleFeedTypeFilterChange} />
    </div>
  );
}
