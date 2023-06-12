----------
#  H5对接文档
----------

::: tip 注意
  **H5对接仅支持使用《HBuilderx》打包后的app，广告无法在H5环境中运行**
:::

## Demo工程

Demo [下载](https://fpvideo.shenshiads.com/h5tovue/testh5tovue.zip)

## 对接流程(H5端)

### 原生HTML

1.  引入uni-webivewjs文件[地址](https://fpvideo.shenshiads.com/h5tovue/index.js)
```js
<script src="https://fpvideo.shenshiads.com/h5tovue/index.js"></script>
```
2. 监听UniAppJSBridgeReady事件，在此事件中向APP发送消息
```js
  // 等待sdk加载
document.addEventListener('UniAppJSBridgeReady', function() {
    // 向应用发送消息
    uni.postMessage({
      //  约定数据格式为data:{} data必须带否则APP收不到此信息
        data: {
            type: 'reward' // reward => 激励视频    inters => 插屏视频    fullScreen => 全屏视频
        }
    });
});




// 比如点击某个按钮触发广告
document.addEventListener('UniAppJSBridgeReady', function() {
    button.addEventListener('click',function(){
      uni.postMessage({
      //  约定数据格式为data:{} data必须带否则APP收不到此信息
        data: {
            type: 'reward' // reward => 激励视频    inters => 插屏视频    fullScreen => 全屏视频
        }
    });
    })
});
  ``` 

### VUE等框架
1. 引入uni-webivewjs文件[地址](https://fpvideo.shenshiads.com/h5tovue/index.js) 
   或者通过包管理器下载
   ```json
   yarn add shenshiad
   npm i shenshiad
   ```
2. 在页面中引入
   
   ```js
    import uni from 'shenshiad'
   ```

3. 直接在点击事件中发起请求
   
  ```vue
<template>
  <div id="app">
    <button class="reward" @click="show('reward')">点击展示激励视频</button>
    <button class="reward" @click="show('inters')">点击展示插屏视频</button>
    <button class="reward" @click="show('fullScreen')">点击展示全屏视频</button>
  </div>
</template>

<script>
import uni from 'shenshiad'
export default {
    name: 'App',
    components: {

    },
    data() {
      return {
    
      };
    },
    methods: {
      show(val) {
        uni.postMessage({
          data: {
            type:val
          }
        })
      }
    }
}
</script>

<style>
.reward {
    width: 100%;
    height: 50px;
}
</style>
   ```

## 对接流程(APP端)

1. 下载HBuilderx编辑器最新版本，推荐下载Alpha版 [下载地址](https://dcloud.io/hbuilderx.html)
2. 在编辑器左边右键，新建项目，选择默认模板，然后引入shenshiad/ads.js
  ```js
  // 在项目终端，先运行npm init  然后 npm i shenshiad 或者  yarn add shenshiad
  npm init
  npm i shenshiad / yarn add shenshiad
   ```
   在pages/idnex/index.vue中引入shenshiad/ads.js导出的方法
   ```js
	import {adReward,rewardedVideoInit,adInter,interstitialInit,adFull,fullScreenInit} from 'shenshiad/ads.js'
   ```

   在template中使用web-view标签引入H5项目  message事件接受H5端传过来的参数
   ```vue
  <template>
    <view>
      <!-- H5地址 -->
        <web-view :update-title="false" src="https://fpvideo.shenshiads.com/h5tovue/index.html?a=7246"
          @message="handlerMessage">
        </web-view>
      </view>
  </template>
   ```

### 全屏视频
1. 通过message事件监听传参为fullScreen然后调用fullScreenInit函数传入广告位ID进行初始化，初始化之后adFull实例会挂载一些方法
  ```js
    // 全屏
	if (type.detail.data[0].type == 'fullScreen') {
      // 初始化广告
		fullScreenInit('1507000611')
      // 广告加载事件
		adFull.onLoad(function() {
			console.log('加载成功')
        // 展示全屏广告方法
			adFull.show();
		});
      // 广告错误事件
		adFull.onError(function(e) {
			console.log('加载失败: ' + JSON.stringify(e));
			adFull.destroy();
			adFull = null;
		});
      // 广告关闭事件
		adFull.onClose(function(e) {
			if (e.isEnded) {
				console.log('全屏视频播放完成');
				plus.nativeUI.toast('全屏视频播放完成');
				//这里实现完成全屏视频逻辑
			} else {
				console.log('全屏视频未播放完成关闭!')
			}
      // 销毁广告实例
			adFull.destroy();
			adFull = null;
		});
      // 加载全屏广告方法
		adFull.load();
	}
  ```

### 插屏视频
1. 通过message事件监听传参为inters然后调用interstitialInit函数传入广告位ID进行初始化，初始化之后adInter实例会挂载一些方法
  ```js
    // 插屏
	if (type.detail.data[0].type == 'inters') {
      // 初始化广告
		interstitialInit('1111111113')
      // 广告加载事件
		adInter.onLoad(function() {
			console.log('加载成功')
        // 展示插屏广告方法
			adInter.show();
		});
      // 广告错误事件
		adInter.onError(function(e) {
			console.log('加载失败: ' + JSON.stringify(e));
			adInter.destroy();
			adInter = null;
		});
      // 广告关闭事件
		adInter.onClose(function(e) {
			console.log('插屏广告被关闭');
      // 销毁广告实例
			adInter.destroy();
			adInter = null;
		});
      // 加载插屏广告方法
		adInter.load();
	}
  ```

### 激励视频
1. 通过message事件监听传参为reward然后调用rewardedVideoInit函数传入广告位ID进行初始化，初始化之后adReward实例会挂载一些方法
  ```js
    // 插激励视频
	if (type.detail.data[0].type == 'reward') {
      // 初始化广告
		rewardedVideoInit('1507000689')
      // 广告加载事件
		adReward.onLoad(function() {
			console.log('加载成功')
        // 展示插屏广告方法
			adReward.show();
		});
      // 广告错误事件
		adReward.onError(function(e) {
			console.log('加载失败: ' + JSON.stringify(e));
			adReward.destroy();
			adReward = null;
		});
      // 广告关闭事件
		adReward.onClose(function(e) {
			console.log('插屏广告被关闭');
      // 销毁广告实例
			adReward.destroy();
			adReward = null;
		});
      // 加载插屏广告方法
		adReward.load();
	}
  ```

2. 激励回调 详细配置请看[文档](https://doc.shenshiads.com/uniapp.html#%E6%9C%8D%E5%8A%A1%E5%99%A8%E5%9B%9E%E8%B0%83)
3. 只需要在初始化激励视频的时候传入第二个参数
```js

 data: {
  // 用户id 唯一值
	userId: 'xxxxx',
  // 此值是自定义，但也需唯一值
	extra: 'xxx'
}

rewardedVideoInit('1507000689', this.data)
```


## 完整示例

```vue
<template>
	<view class="container">
		<web-view :update-title="false" src="https://fpvideo.shenshiads.com/h5tovue/index.html?a=7246"
			@message="handlerMessage">
		</web-view>
	</view>
</template>

<script>
	import {
		adReward,
		rewardedVideoInit,
		adInter,
		interstitialInit,
		adFull,
		fullScreenInit
	} from 'shenshiad/ads.js'
	export default {
		data() {
			return {
				data: {
					userId: '17601336219',
					extra: 'xxx'
				}
			}
		},
		onReady() {},
		methods: {
			handlerMessage(type) {
				console.log(type.detail.data[0].type);
				//	激励
				if (type.detail.data[0].type == 'reward') {
					this.data.extra = 'reward'
					rewardedVideoInit('1507000689', this.data)
					console.log(adReward);
					adReward.onLoad(function() {
						console.log('加载成功')
						adReward.show();
					});
					adReward.onError(function(e) {
						console.log('加载失败: ' + JSON.stringify(e));
						adReward.destroy();
						adReward = null;
					});
					adReward.onClose(function(e) {
						if (e.isEnded) {
							console.log('激励视频播放完成');
							plus.nativeUI.toast('激励视频播放完成');
						} else {
							console.log('激励视频未播放完成关闭!')
						}
						adReward.destroy();
						adReward = null;
					});
					adReward.load();
				}
				// 插屏
				if (type.detail.data[0].type == 'inters') {
					interstitialInit('1111111113')
					adInter.onLoad(function() {
						console.log('加载成功')
						adInter.show();
					});
					adInter.onError(function(e) {
						console.log('加载失败: ' + JSON.stringify(e));
						adInter.destroy();
						adInter = null;
					});
					adInter.onClose(function(e) {
						console.log('插屏广告被关闭');
						adInter.destroy();
						adInter = null;
					});
					adInter.load();
				}
				// 全屏
				if (type.detail.data[0].type == 'fullScreen') {
					fullScreenInit('1609386895')
					adFull.onLoad(function() {
						console.log('加载成功')
						adFull.show();
					});
					adFull.onError(function(e) {
						console.log('加载失败: ' + JSON.stringify(e));
						adFull.destroy();
						adFull = null;
					});
					adFull.onClose(function(e) {
						if (e.isEnded) {
							console.log('全屏视频播放完成');
							plus.nativeUI.toast('全屏视频播放完成');
							//这里实现完成全屏视频逻辑
						} else {
							console.log('全屏视频未播放完成关闭!')
						}
						adFull.destroy();
						adFull = null;
					});
					adFull.load();
				}
			}
		}
	}
</script>
```