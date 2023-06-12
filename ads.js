export var adReward = null

export function rewardedVideoInit(adpid, callbackData = {}) {
  adReward = plus.ad.createRewardedVideoAd({
    adpid: adpid,
    urlCallback: callbackData
  });
}

export var adInter = null

export function interstitialInit(adpid) {
  adInter = plus.ad.createInterstitialAd({
    adpid: adpid
  });
}

export var adFull = null

export function fullScreenInit(adpid) {
  adFull = plus.ad.createFullScreenVideoAd({
    adpid: adpid
  });
}