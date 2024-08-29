import { House } from 'lucide-react';

export interface NavbarItem {
  title: string;
  href: string;
  match?: (pathname: string) => boolean;
  Icon: typeof House;
}
