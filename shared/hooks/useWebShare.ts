interface UseWebShareOptions {
  shareData: ShareData;
}

function useWebShare({ shareData }: UseWebShareOptions) {
  function isShareSupported(url?: string) {
    const shareUrl = url ?? window.location.href;
    return navigator.canShare && navigator.canShare({ url: shareUrl });
  }

  function shareContent(url?: string) {
    if (!isShareSupported(url)) return;

    const shareUrl = url ?? window.location.href;
    return navigator.share({ ...shareData, url: shareUrl });
  }

  return { isShareSupported, shareContent };
}

export default useWebShare;
