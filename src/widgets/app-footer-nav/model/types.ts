import type { User } from 'lucia';
import type { ReactElement } from 'react';

export interface NavbarItem {
  title: string;
  isTitleHidden?: boolean;

  href: (() => string) | string;
  match?: (pathname: string) => boolean;
  render: (user: User | null | undefined, className: string) => null | ReactElement<unknown>;
}
