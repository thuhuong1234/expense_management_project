export function useAvatar() {
  const getAvatarUrl = (avatar) => {
    if (!avatar) {
      avatar = "avatar-default.jpeg";
    }
    return `${import.meta.env.VITE_URL_UPLOAD}${avatar}`;
  };

  return { getAvatarUrl };
}
