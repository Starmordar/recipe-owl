import type { User } from 'lucia';

const profileShareInfo = (user: User) => ({
  title: `Explore ${user.fullName} recipes | Recipe OWL App`,
  text: `Explore ${user.fullName}'s unique, delisious recipe!`,
});

export { profileShareInfo };
