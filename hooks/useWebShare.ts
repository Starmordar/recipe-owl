interface UseWebShareOptions {
  data: ShareData;
}

function useWebShare({ data }: UseWebShareOptions) {
  function shareAllowed(url?: string) {
    const shareUrl = url ?? window.location.href;
    return navigator.canShare && navigator.canShare({ url: shareUrl });
  }

  function handleShare(url?: string) {
    if (!shareAllowed(url)) return;

    const shareUrl = url ?? window.location.href;
    return navigator.share({ ...data, url: shareUrl });
  }

  return { shareAllowed, handleShare };
}

export default useWebShare;
