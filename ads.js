export var adReward = null

export function rewardedVideoInit(adpid, callbackData) {
  adReward = plus.ad.createRewardedVideoAd({
    adpid: adpid,
    urlCallback: callbackData
  });
}
