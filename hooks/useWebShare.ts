interface UseWebShareOptions {
  url?: string;
  data: ShareData;
}

function useWebShare({ url, data }: UseWebShareOptions) {
  function handleShare() {
    if (!navigator.share) return;

    const shareUrl = url ?? window.location.href;
    navigator.share({ ...data, url: shareUrl });
  }

  return { handleShare };
}

export default useWebShare;
