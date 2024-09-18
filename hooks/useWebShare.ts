interface UseWebShareOptions {
  data: ShareData;
}

function useWebShare({ data }: UseWebShareOptions) {
  function handleShare() {
    if (!navigator.share) return;
    navigator.share({ ...data });
  }

  return { handleShare };
}

export default useWebShare;
