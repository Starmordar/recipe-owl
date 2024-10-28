const cartDetailsPayload = {
  include: {
    items: {
      include: {
        recipe: { select: { id: true, title: true, imageUrl: true } },
        ingredient: true,
      },
    },
    user: true,
  },
} as const;

const cartWithUserPayload = {
  include: { user: { select: { fullName: true, picture: true } } },
} as const;

export { cartDetailsPayload, cartWithUserPayload };
