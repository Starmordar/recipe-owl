import { validateRequest } from '@/src/shared/api/auth';

import { AuthDrawer } from './auth-drawer';

import type { PropsWithChildren } from 'react';

interface ProtectedDrawerProps extends PropsWithChildren {
  title: string;
  description: string;
  renderTrigger: () => JSX.Element;
}

async function ProtectedDrawer({
  title,
  description,
  renderTrigger,
  children,
}: ProtectedDrawerProps) {
  const { user } = await validateRequest();

  if (user === null) {
    return (
      <AuthDrawer title={title} description={description}>
        {renderTrigger()}
      </AuthDrawer>
    );
  }

  return <>{children}</>;
}

export { ProtectedDrawer };
