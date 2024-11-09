export const checkFollowing = async (followerId: string, userId: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${userId}/is-following?followerId=${followerId}`
  );
  const { isFollowing } = await response.json();
  return isFollowing;
};
