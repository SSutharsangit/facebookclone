"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import React from 'react';

function Navbar() {
  const Pathname = usePathname();

  return (
    <div className="container d-flex align-items-center justify-content-start" style={{ width: '75vw', maxHeight: '60vh' }}>
      <button type="button" className={`btn btn-light mx-3 ${Pathname=== '/profile/posts' ? 'active' : ''}`}>
        <Link href="/profile/posts">
          Posts
        </Link>
      </button>
      <button type="button" className={`btn btn-light mx-3 ${Pathname === '/profile/albums' ? 'active' : ''}`}>
        <Link href="/profile/albums">
          Albums
        </Link>
      </button>
      <button type="button" className={`btn btn-light mx-3 ${Pathname=== '/profile/photos' ? 'active' : ''}`}>
        <Link href="/profile/photos">
          Photos
        </Link>
      </button>
    </div>
  );
}

export default Navbar;
