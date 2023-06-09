var adReward = null

function rewardedVideoInit(adpid, callbackData) {
  adReward = plus.ad.createRewardedVideoAd({
    adpid: adpid,
    urlCallback: callbackData
  });
}

export default {adReward,rewardedVideoInit}