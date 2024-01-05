// code = 1 ===> init app
// code = 2 ===> earn reward

class KlaiklaiMiniApp {
  isDevMode =
    location.hostname === "localhost"
      ? true
      : location.hostname === "127.0.0.1"
      ? true
      : !window?.ReactNativeWebView?.postMessage
      ? true
      : false;
  appToken = "";
  payload = {
    code: 0,
    data: {},
  };
  rewardList = [];
  appName = "";
  startApp = () => {};

  constructor(appName) {
    this.appName = appName;
    if (!this.isDevMode) {
      this.payload = {
        code: 4,
        payload: {
          appName: this.appName,
        },
      };
      window.ReactNativeWebView.postMessage(JSON.stringify(this.payload));
    }
  }

  initApp(appId) {
    this.appId = appId;
    if (this.isDevMode) {
      this.appToken = "testMode";
      this.rewardList = [
        {
          id: 1,
          name: "Coin",
          value: 10,
        },

        {
          id: 3,
          name: "Coin",
          value: 10,
        },
        {
          id: 5,
          name: "Coin",
          value: 10,
        },
      ];
    } else {
      this.payload = {
        code: 1,
        payload: {
          appId: this.appId,
        },
      };
      window.ReactNativeWebView.postMessage(JSON.stringify(this.payload));
    }
  }

  setStartApp(startApp) {
    this.startApp = startApp;
  }

  setAppToken(token) {
    this.appToken = token;
  }

  earnReward(reward) {
    if (!this.isDevMode) {
      alert("ยินดีด้วย คุณได้รับรางวัล " + reward?.value + " " + reward?.name);
      setTimeout(() => {
        this.payload = {
          code: 2,
          payload: {
            rewardId: reward?.id,
          },
        };
        window.ReactNativeWebView.postMessage(JSON.stringify(this.payload));
      }, 2000);
    }
  }

  closeApp() {
    if (!this.isDevMode) {
      alert("เสียใจด้วย คุณไม่ได้รับรางวัล");
      setTimeout(() => {
        this.payload = {
          code: 3,
          payload: {},
        };
        window.ReactNativeWebView.postMessage(JSON.stringify(this.payload));
      }, 2000);
    }
  }

  setRewardList(rewardList) {
    this.rewardList = rewardList;
  }

  startApp() {
    this.startApp();
  }
}
