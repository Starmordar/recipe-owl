'use client';

import * as React from 'react';
import Link from 'next/link';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { ShoppingCart, User, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

const menuItems = [
  { title: 'Discover', href: '/recipes', icon: <Search /> },
  { title: 'My Cart', href: '/cart', icon: <ShoppingCart /> },
  { title: 'Profile', href: '/profile', icon: <User /> },
];

export default function BottomNavbar() {
  return (
    <NavigationMenu className="w-full">
      <NavigationMenuList className="w-full">
        {/* <NavigationMenuItem></NavigationMenuItem>
        <NavigationMenuItem></NavigationMenuItem> */}
        {menuItems.map((item) => (
          <NavigationMenuItem key={item.href} className="flex-1 !mr-0 !ml-0">
            <Link href={item.href} legacyBehavior passHref>
              <NavigationMenuLink
                className={cn(navigationMenuTriggerStyle(), 'flex flex-col h-16')}
              >
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
