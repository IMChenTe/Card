const app = getApp()
const chost = 'https://common.bipingcoin.com'
import { _canvas } from "../canvas.js";
Page({
  data: {

  },  
  onLoad: function () {
  },
  // ---------画名片01---------
  createCard01 (data, succ, fail) {
    let { avatar, name, email, companyName, companyPosition, phone, wechat, detailAddress } = data
    // console.log(avatar, name, companyName, companyPosition, phone)
    let canvasHeight = 207;
    let canvasWith = 345;
    const ctx = wx.createCanvasContext("cardCanvas");
    // 左半个白色背景
    ctx.setFillStyle("#ffffff");
    ctx.fillRect(0, 0, canvasWith, canvasHeight);
    // 右半个白色背景
    ctx.setFillStyle("#E2E2E2")
    ctx.fillRect(canvasWith / 2, 0, canvasWith/2, canvasHeight)
    // 中间的白色三角
    ctx.beginPath()
    ctx.moveTo(canvasWith / 2, canvasHeight / 2 - 8)
    ctx.lineTo(canvasWith / 2 + 6, canvasHeight/2)
    ctx.lineTo(canvasWith / 2, canvasHeight / 2 + 8)
    ctx.setFillStyle('#fff')
    ctx.closePath()
    ctx.fill()
    // 头像背后的白色的圆
    // ctx.beginPath()
    // ctx.moveTo(259, 60, 25)
    // ctx.arc(259, 60, 27, 0, 2 * Math.PI)
    // ctx.setFillStyle('#fff')
    // ctx.fill()
    // ctx.closePath()

    // ctx.save();
    // ctx.beginPath();
    // const avatarWH = 26 * pre;
    // const avatarLeft = padding;
    // const avatarTop = 129 * pre;
    // ctx.arc(
    //   50,
    //   50,
    //   50,
    //   0,
    //   Math.PI * 2
    // );
    // ctx.setFillStyle('#f0f')
    // ctx.clip();
    // ctx.drawImage("../images/222.png", 0, 0, 100, 100);
    // ctx.closePath();
    // ctx.restore();


    // 画内容
    // 转换为本地
    _canvas.imgToLocalPath([avatar]).then(imgs => {
      console.log('imgToLocalPath=>', imgs)
      // 头像
      _canvas.drawPic({
        ctx: ctx,
        dWidth: 50,
        dHeight: 50,
        dx: 234,
        dy: 35,
        path: '../images/head.png'
      });
      _canvas.drawPic({
        type: "avatar",
        ctx: ctx,
        dWidth: 46,
        dHeight: 46,
        dx: 236,
        dy: 37,
        path: avatar
      });



      // 手机号
      _canvas.drawPic({
        ctx: ctx,
        dWidth: 16,
        dHeight: 16,
        dx: 12,
        dy: 38,
        path: "../images/phone.png"
      });
      _canvas.writeText({
        ctx: ctx,
        color: "#3F3B3A",
        font: 12,
        dx: 35,
        dy: 37,
        baseLine: 'top',
        txt: phone
      });

      // 微信号
      _canvas.drawPic({
        ctx: ctx,
        dWidth: 16,
        dHeight: 16,
        dx: 12,
        dy: 65,
        path: "../images/weixin.png"
      });
      _canvas.writeText({
        ctx: ctx,
        color: "#3F3B3A",
        font: 12,
        dx: 37.5,
        dy: 64,
        baseLine: 'top',
        txt: wechat
      });

      // 邮箱
      _canvas.drawPic({
        ctx: ctx,
        dWidth: 16,
        dHeight: 16,
        dx: 12,
        dy: 92.5,
        path: "../images/email.png"
      });
      _canvas.writeText({
        ctx: ctx,
        color: "#3F3B3A",
        font: 12,
        dx: 37.5,
        dy: 91,
        limitWidth: 95,
        type: 'limit',
        baseLine: 'top',
        txt: email
      });

      // 地址
      _canvas.drawPic({
        ctx: ctx,
        dWidth: 16,
        dHeight: 16,
        dx: 12,
        dy: 132.5,
        path: "../images/weixin.png"
      });
      _canvas.writeText({
        ctx: ctx,
        color: "#3F3B3A",
        font: 12,
        dx: 37.5,
        dy: 131,
        limitWidth: 115,
        type: 'limit',
        baseLine: 'top',
        txt: detailAddress
      });

      // 名字
      _canvas.writeText({
          ctx: ctx,
          font: 15,
          dx: 235,
          dy: 100.5,
          color: "#0BBF8B",
          align: "center",
          baseLine: 'top',
          txt: name,
      });

      // 职位
      _canvas.writeText({
        ctx: ctx,
        font: 12,
        dx: 285,
        dy: 103,
        color: "#0BBF8B",
        align: "center",
        baseLine: 'top',
        txt: companyPosition,
      });

      // 企业
      _canvas.writeText({
        ctx: ctx,
        font: 12,
        dx: 262,
        dy: 123.5,
        color: "#0BBF8B",
        type: "limit",
        limitWidth: 144,
        baseLine: 'top',
        align: "center",
        txt: companyName,
      });

      // draw
      ctx.draw(false, () => {
        setTimeout(() => {
          wx.canvasToTempFilePath({
            x: 0,
            y: 0,
            canvasId: "cardCanvas",
            quality: 1,
            success: res => {
              succ && succ(res.tempFilePath);
            },
            fail: () => {
              fail && fail();
            }
          });
        }, 500);
      });
    }).catch(() => {
      fail && fail();
    });
  },
  // ---------画名片02---------
  createCard02 (data, succ, fail) {
    let { avatar, name, email, companyName, companyPosition, phone, wechat, detailAddress } = data
    const ctx = wx.createCanvasContext("cardCanvas");
    // 画内容
    // 转换为本地
    _canvas.imgToLocalPath([avatar]).then(imgs => {
      console.log('imgToLocalPath=>', imgs)
      // 背景图
      _canvas.drawPic({
        ctx:ctx,
        dWidth: 345,
        dHeight: 207,
        path: '../images/background02.png'
      })
      // 头像
      _canvas.drawPic({
        ctx: ctx,
        dWidth: 50,
        dHeight: 50,
        dx: 15,
        dy: 20,
        type: "avatar",
        path: avatar
        // path: imgs[0]
      });

      // 手机号
      _canvas.drawPic({
        ctx: ctx,
        dWidth: 12,
        dHeight: 15,
        dx: 15,
        dy: 91,
        path: "../images/phone02.png"
      });
      _canvas.writeText({
        ctx: ctx,
        color: "#3F3B3A",
        font: 12,
        dx: 35,
        dy: 90,
        baseLine: 'top',
        txt: phone
      });

      // 微信号
      _canvas.drawPic({
        ctx: ctx,
        dWidth: 16,
        dHeight: 13,
        dx: 15,
        dy: 118.5,
        path: "../images/weixin02.png"
      });
      _canvas.writeText({
        ctx: ctx,
        color: "#3F3B3A",
        font: 12,
        dx: 37.5,
        dy: 116.5,
        baseLine: 'top',
        txt: wechat
      });

      // 邮箱
      _canvas.drawPic({
        ctx: ctx,
        dWidth: 14,
        dHeight: 11,
        dx: 15,
        dy: 146,
        path: "../images/email02.png"
      });
      _canvas.writeText({
        ctx: ctx,
        color: "#3F3B3A",
        font: 12,
        dx: 37.5,
        dy: 143,
        baseLine: 'top',
        txt: email
      });

      // 地址
      _canvas.drawPic({
        ctx: ctx,
        dWidth: 11.5,
        dHeight: 15.5,
        dx: 15,
        dy: 170.5,
        path: "../images/add02.png"
      });
      _canvas.writeText({
        ctx: ctx,
        color: "#3F3B3A",
        font: 12,
        dx: 37.5,
        dy: 169.5,
        baseLine: 'top',
        txt: detailAddress
      });

      // 名字
      _canvas.writeText({
          ctx: ctx,
          font: 18,
          dx: 75,
          dy: 22.5,
          color: "#333",
          align: "left",
          baseLine: 'top',
          txt: name,
      });

      // 职位
      _canvas.writeText({
        ctx: ctx,
        font: 12,
        dx: 139,
        dy: 27,
        color: "#333",
        align: "left",
        baseLine: 'top',
        txt: companyPosition,
      });

      // 企业
      _canvas.writeText({
        ctx: ctx,
        font: 12,
        dx: 75,
        dy: 50.5,
        color: "#333",
        baseLine: 'top',
        align: "left",
        txt: companyName,
      });

      // draw
      ctx.draw(false, () => {
        setTimeout(() => {
          wx.canvasToTempFilePath({
            x: 0,
            y: 0,
            canvasId: "cardCanvas",
            quality: 1,
            success: res => {
              succ && succ(res.tempFilePath);
            },
            fail: () => {
              fail && fail();
            }
          });
        }, 500);
      });
    }).catch(() => {
      fail && fail();
    });
  },
  // ---------画名片03---------
  createCard03 (data, succ, fail) {
    let { avatar, name, email, companyName, companyPosition, phone, wechat, detailAddress } = data
    const ctx = wx.createCanvasContext("cardCanvas");
    let canvasHeight = 207;
    let canvasWith = 345;
    ctx.setFillStyle('#fff')
    ctx.fillRect(0, 0, canvasWith, canvasHeight)
    ctx.setFillStyle('#B07A4E')
    ctx.fillRect(0, 23, 10, 34)
    ctx.fillRect(335, 23, 10, 34)
    // 画内容
    // 转换为本地
    _canvas.imgToLocalPath([avatar]).then(imgs => {
      console.log('imgToLocalPath=>', imgs)
      // 头像
      _canvas.drawPic({
        ctx: ctx,
        dWidth: 40,
        dHeight: 40,
        dx: 144,
        dy: 20,
        type: "avatar",
        path: avatar
        // path: imgs[0]
      });

      // 手机号
      _canvas.drawPic({
        ctx: ctx,
        dWidth: 16,
        dHeight: 16,
        dx: 30,
        dy: 102,
        path: "../images/phone03.png"
      });
      _canvas.writeText({
        ctx: ctx,
        color: "#B07A4E",
        font: 14,
        dx: 53,
        dy: 100,
        baseLine: 'top',
        txt: phone
      });

      // 微信号
      _canvas.drawPic({
        ctx: ctx,
        dWidth: 16,
        dHeight: 16,
        dx: 30,
        dy: 125.5,
        path: "../images/weixin03.png"
      });
      _canvas.writeText({
        ctx: ctx,
        color: "#B07A4E",
        font: 14,
        dx: 53,
        dy: 125,
        baseLine: 'top',
        txt: wechat
      });

      // 邮箱
      _canvas.drawPic({
        ctx: ctx,
        dWidth: 16,
        dHeight: 16,
        dx: 30,
        dy: 149,
        path: "../images/email03.png"
      });
      _canvas.writeText({
        ctx: ctx,
        color: "#B07A4E",
        font: 14,
        dx: 53,
        dy: 149.5,
        baseLine: 'top',
        txt: email
      });

      // 地址
      _canvas.drawPic({
        ctx: ctx,
        dWidth: 16,
        dHeight: 16,
        dx: 30,
        dy: 174.5,
        path: "../images/add03.png"
      });6
      _canvas.writeText({
        ctx: ctx,
        color: "#B07A4E",
        font: 14,
        dx: 53,
        dy: 174,
        baseLine: 'top',
        txt: detailAddress
      });

      // 名字
      _canvas.writeText({
          ctx: ctx,
          font: 16,
          dx: 30,
          dy: 75,
          color: "#B07A4E",
          align: "left",
          baseLine: 'top',
          txt: name,
      });

      // 职位
      _canvas.writeText({
        ctx: ctx,
        font: 12,
        dx: 86,
        dy: 78,
        color: "#B07A4E",
        align: "left",
        baseLine: 'top',
        txt: companyPosition,
      });

      // 企业
      _canvas.writeText({
        ctx: ctx,
        color: "#B07A4E",
        font: 12,
        dx: 192,
        dy: 23,
        baseLine: 'top',
        align: "left",
        limitWidth: 123,
        type: 'limit',
        txt: companyName,
      });

      // draw
      ctx.draw(false, () => {
        setTimeout(() => {
          wx.canvasToTempFilePath({
            x: 0,
            y: 0,
            canvasId: "cardCanvas",
            quality: 1,
            success: res => {
              succ && succ(res.tempFilePath);
            },
            fail: () => {
              fail && fail();
            }
          });
        }, 500);
      });
    }).catch(() => {
      fail && fail();
    });
  },
  // ---------画名片04---------
  createCard04 (data, succ, fail) {
    let { avatar, name, email, companyName, companyPosition, phone, wechat, detailAddress } = data
    const ctx = wx.createCanvasContext("cardCanvas");
    ctx.fillRect(0, 0, 0, 0)
    // 画内容
    // 转换为本地
    _canvas.imgToLocalPath([avatar]).then(imgs => {
      console.log('imgToLocalPath=>', imgs)
      // 背景图
      _canvas.drawPic({
        ctx:ctx,
        dWidth: 345,
        dHeight: 207,
        path: '../images/background04.png'
      })
      // 头像
      _canvas.drawPic({
        ctx: ctx,
        dWidth: 60,
        dHeight: 60,
        dx: 268,
        dy: 98,
        type: "avatar",
        path: avatar
      });

      // 手机号
      _canvas.drawPic({
        ctx: ctx,
        dWidth: 16,
        dHeight: 16,
        dx: 17,
        dy: 86,
        path: "../images/phone04.png"
      });
      _canvas.writeText({
        ctx: ctx,
        color: "#3F3B3A",
        font: 12,
        dx: 40,
        dy: 85.5,
        baseLine: 'top',
        txt: phone
      });

      // 微信号
      _canvas.drawPic({
        ctx: ctx,
        dWidth: 16,
        dHeight: 16,
        dx: 17,
        dy: 107.5,
        path: "../images/weixin04.png"
      });
      _canvas.writeText({
        ctx: ctx,
        color: "#3F3B3A",
        font: 12,
        dx: 40,
        dy: 107,
        baseLine: 'top',
        txt: wechat
      });

      // 邮箱
      _canvas.drawPic({
        ctx: ctx,
        dWidth: 16,
        dHeight: 16,
        dx: 17,
        dy: 129,
        path: "../images/email04.png"
      });
      _canvas.writeText({
        ctx: ctx,
        color: "#3F3B3A",
        font: 12,
        dx: 40,
        dy: 128.5,
        limitWidth: 132,
        type: 'limit',
        baseLine: 'top',
        txt: email
      });

      // 地址
      _canvas.drawPic({
        ctx: ctx,
        dWidth: 16,
        dHeight: 16,
        dx: 197,
        dy: 160.5,
        path: "../images/add04.png"
      });
      _canvas.writeText({
        ctx: ctx,
        color: "#3F3B3A",
        font: 12,
        dx: 17,
        dy: 160,
        limitWidth: 173,
        type: 'limit',
        baseLine: 'top',
        txt: detailAddress
      });

      // 名字
      _canvas.writeText({
          ctx: ctx,
          font: 16,
          bold: true,
          dx: 17,
          dy: 33,
          color: "#011B4B",
          align: "left",
          baseLine: 'top',
          txt: name,
      });

      // 职位
      _canvas.writeText({
        ctx: ctx,
        font: 12,
        dx: 73,
        dy: 36,
        color: "#011B4B",
        align: "left",
        baseLine: 'top',
        txt: companyPosition,
      });

      // 企业
      _canvas.writeText({
        ctx: ctx,
        font: 12,
        dx: 205,
        dy: 33,
        color: "#011B4B",
        baseLine: 'top',
        type: 'limit',
        limitWidth: 123,
        align: "left",
        txt: companyName,
      });

      // draw
      ctx.draw(false, () => {
        setTimeout(() => {
          wx.canvasToTempFilePath({
            x: 0,
            y: 0,
            canvasId: "cardCanvas",
            quality: 1,
            success: res => {
              succ && succ(res.tempFilePath);
            },
            fail: () => {
              fail && fail();
            }
          });
        }, 500);
      });
    }).catch(() => {
      fail && fail();
    });
  },
  // ---------画名片05---------
  createCard05 (data, succ, fail) {
    let { avatar, name, email, companyName, companyPosition, phone, wechat, detailAddress } = data
    const ctx = wx.createCanvasContext("cardCanvas");
    // 画内容
    // 转换为本地
    _canvas.imgToLocalPath([avatar]).then(imgs => {
      console.log('imgToLocalPath=>', imgs)
      // 背景图
      _canvas.drawPic({
        ctx:ctx,
        dWidth: 345,
        dHeight: 207,
        path: '../images/background05.png'
      })
      ctx.setFillStyle('#646565')
      ctx.fillRect(163, 34, 135, 34)
      // 头像
      _canvas.drawPic({
        ctx: ctx,
        dWidth: 40,
        dHeight: 40,
        dx: 15,
        dy: 34,
        type: "avatar",
        path: avatar
        // path: imgs[0]
      });

      // 手机号
      _canvas.drawPic({
        ctx: ctx,
        dWidth: 16,
        dHeight: 16,
        dx: 164,
        dy: 95,
        path: "../images/phone05.png"
      });
      _canvas.writeText({
        ctx: ctx,
        color: "#3F3B3A",
        font: 12,
        dx: 191.5,
        dy: 94.5,
        baseLine: 'top',
        txt: phone
      });

      // 微信号
      _canvas.drawPic({
        ctx: ctx,
        dWidth: 16,
        dHeight: 16,
        dx: 155,
        dy: 116.5,
        path: "../images/weixin05.png"
      });
      _canvas.writeText({
        ctx: ctx,
        color: "#3F3B3A",
        font: 12,
        dx: 177.5,
        dy: 116,
        baseLine: 'top',
        txt: wechat
      });

      // 邮箱
      _canvas.drawPic({
        ctx: ctx,
        dWidth: 16,
        dHeight: 16,
        dx: 144,
        dy: 138,
        path: "../images/email05.png"
      });
      _canvas.writeText({
        ctx: ctx,
        color: "#3F3B3A",
        font: 12,
        dx: 167,
        dy: 137.5,
        limitWidth: 132,
        type: 'limit',
        baseLine: 'top',
        txt: email
      });

      // 地址
      _canvas.drawPic({
        ctx: ctx,
        dWidth: 16,
        dHeight: 16,
        dx: 132,
        dy: 159.5,
        path: "../images/add05.png"
      });
      _canvas.writeText({
        ctx: ctx,
        color: "#3F3B3A",
        font: 12,
        dx: 155,
        dy: 159,
        limitWidth: 174,
        type: 'limit',
        baseLine: 'top',
        txt: detailAddress
      });

      // 名字
      _canvas.writeText({
          ctx: ctx,
          font: 15,
          bold: true,
          dx: 173,
          dy: 41,
          color: "#99D8DC",
          align: "left",
          baseLine: 'top',
          txt: name,
      });

      // 职位
      _canvas.writeText({
        ctx: ctx,
        font: 12,
        dx: 223,
        dy: 43,
        color: "#FFFFFF",
        align: "left",
        baseLine: 'top',
        txt: companyPosition,
      });

      // 企业
      _canvas.writeText({
        ctx: ctx,
        font: 12,
        dx: 15,
        dy: 84,
        color: "#51514F",
        baseLine: 'top',
        type: 'limit',
        limitWidth: 100.5,
        align: "left",
        txt: companyName,
      });

      // draw
      ctx.draw(false, () => {
        setTimeout(() => {
          wx.canvasToTempFilePath({
            x: 0,
            y: 0,
            canvasId: "cardCanvas",
            quality: 1,
            success: res => {
              succ && succ(res.tempFilePath);
            },
            fail: () => {
              fail && fail();
            }
          });
        }, 500);
      });
    }).catch(() => {
      fail && fail();
    });
  },
  
  secondWay(e) {
    /**判断图是否已经生成过 */
    const id = e.target.dataset.id
    if (this.CardPosterUrl && this.CardPosterUrl[id]) {
      // console.log(this.CardPosterUrl[id])
      wx.previewImage({
        urls: [this.CardPosterUrl[id]]
      });

    } else {
      wx.showLoading({
        title: '正在生成...',
        mask: true
      });

      let data = {
        scene: 'path=business&id=5',
        page: 'pages/index/index',
        avatar: '../images/222.png',
        name: "张芳芳",
        companyName: "爱乐企业爱乐企业爱乐企业爱乐企业爱乐企业",
        companyPosition: "高级特工",
        phone: "17617771728",
        wechat: '17617771728',
        detailAddress: '北京市朝阳区建外北京市朝阳区建外北京市朝',
        email: '17617771728@163.com'
      }
      switch (id) {
        case '1':
          this.createCard01(data, (tempFilePath) => {
            this.callBack(tempFilePath, 1)
          }, () => {
            wx.hideLoading()
          })
          break;
        case '2':
          this.createCard02(data, (tempFilePath) => {
            this.callBack(tempFilePath, 2)
          }, () => {
            wx.hideLoading()
          })
          break;
        case '3':
          this.createCard03(data, (tempFilePath) => {
            this.callBack(tempFilePath, 3)
          }, () => {
            wx.hideLoading()
          })
          break;
        case '4':
          this.createCard04(data, (tempFilePath) => {
            this.callBack(tempFilePath, 4)
          }, () => {
            wx.hideLoading()
          })
          break;
        case '5':
          this.createCard05(data, (tempFilePath) => {
            this.callBack(tempFilePath, 5)
          }, () => {
            wx.hideLoading()
          })
          break;
        default:
          break;
      }
    }
  },
  getCodeUrl (scene, page) {
    let codeUrl = ""
    // console.log("来源source, ---", source);
    return new Promise((resolve, reject) => {
      if (codeUrl) {
        resolve(codeUrl);
      } else {
        wx.request({
          url: chost + "/common/getQrcode",
          method: "GET",
          header: {
            // "content-type": "application/x-www-form-urlencoded",
            //  token: wx.getStorageSync('token') || ''
          },
          data: {
            scene,
            page
          },
          success: ({ data = {} }) => {
            // let url = "https://biping.oss-cn-beijing.aliyuncs.com/Static/images/scene1542609390348.png"
            let url = data.data.url
            let DATA = {
              data: url
            }

            if (data.flag == 0) {
              resolve(DATA.data);
              codeUrl = DATA.data;
            } else {

              reject();
            }
          },
          fail: () => {
            reject();
          }
        });
      }
    });
  },
  callBack (tempFilePath, id){
    wx.hideLoading()
    console.log('图片的地址:',tempFilePath)
    wx.previewImage({
      urls: [tempFilePath]
    })
    wx.saveImageToPhotosAlbum({
      filePath: tempFilePath,
    })
    if(this.CardPosterUrl){
      this.CardPosterUrl[id] = tempFilePath
    } else {
      this.CardPosterUrl = []
      this.CardPosterUrl[id] = tempFilePath
    }
  }
})
