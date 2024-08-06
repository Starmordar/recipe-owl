'use client';

import * as React from 'react';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { House, Search } from 'lucide-react';

const menuItems = [
  { title: 'Home', href: '/home', icon: <House /> },
  { title: 'Explore', href: '/search', icon: <Search /> },
];

export default function BottomNavbar() {
  return (
    <NavigationMenu className="max-w-full">
      <NavigationMenuList>
        {/* <NavigationMenuItem></NavigationMenuItem>
        <NavigationMenuItem></NavigationMenuItem> */}
        {menuItems.map((item) => (
          <NavigationMenuItem key={item.href} className="flex-1">
            <Link href={item.href} legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                {item.icon}
                {item.title}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
