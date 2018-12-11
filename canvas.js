let _canvas = {};

_canvas.drawPic = opts => {
    let _opts = {
        type: "default",
        dx: 0,
        dy: 0,
        dWidth: 64,
        dHeight: 64
    };
    let options = Object.assign(_opts, opts);
    let _ctx = options.ctx;
    // console.log(options.type, options.path)
    if (options.type == "default") {
       
        _ctx.drawImage(
            options.path,
            options.dx,
            options.dy,
            options.dWidth,
            options.dHeight
        );
    } else {
        //type == avatar
        _ctx.save();
        _ctx.beginPath();
        _ctx.arc(
            options.dx + options.dWidth / 2,
            options.dy + options.dHeight / 2,
            options.dHeight / 2,
            0,
            2 * Math.PI
        );
        _ctx.clip();

        _ctx.drawImage(
            options.path,
            options.dx,
            options.dy,
            options.dWidth,
            options.dHeight
        );
        _ctx.restore();
    }
};
_canvas.drawBg = opts => {
    let _opts = {
        dx: 0,
        dy: 0,
    };
    let options = Object.assign(_opts, opts);
    let _ctx = options.ctx;
    const grd = _ctx.createLinearGradient(0,200, 0, 50)
    grd.addColorStop(0, options.start)
    grd.addColorStop(1, options.end)
    // Fill with gradient
    _ctx.setFillStyle(grd)
    _ctx.fillRect( options.dx, options.dy, options.width, options.height)
    
};
_canvas.writeText = (opts, cb) => {
    //set font styles && filltext
    let fillText = (_ctx, options, _txt, _dx, _dy) => {
        //  _ctx.font = '12px PingFangSC-Light';
        //  _ctx.font = `normal ${options.bold ? 'bold' : ''} 12px PingFangSC-Light`;
        //  _ctx.font = 'normal bold 12px PingFangSC-Light';
        if (options.bold) {
            _ctx.font = "normal bold 12px PingFangSC-Light";
        } else {
            _ctx.font = "normal 12px PingFangSC-Light";
        }
        _ctx.setFillStyle(options.color);
        _ctx.setFontSize(options.font);
        _ctx.setTextBaseline(options.baseLine);
        _ctx.setTextAlign(options.align);
        _ctx.fillText(_txt, _dx, _dy);
    };

    let _opts = {
        ctx: null, //Object
        font: 14,
        color: "#353535",
        txt: "", //write contents
        align: "left", //text-align
        baseLine: "middle",
        dx: 0,
        dy: 0,
        type: "defalut", //limit 限制区域显示 超出隐藏
        limitWidth: 0,
        //limitHeight: 0,
        limitLines: 1,
        lineHeight: 14
    };

    let options = Object.assign({}, _opts, opts);
    let _ctx = options.ctx;
    // console.log(options)
    //options.txt = options.txt.replace(/[\r\n]/g, "");

    if (options.type == "limit") {
        _ctx.save();
        _ctx.beginPath();
        //设置矩形区域 超出隐藏
        // _ctx.rect(options.dx, options.dy - 10, options.limitWidth, options.limitHeight + 10);
        // _ctx.clip();

        let curLines = 0; //现在在画第几行
        let startIndex = 0;
        let endIndex = 0;
        let curLength = 0; //当前行 已画长度

        for (let j = 0; j < options.txt.length; j++) {
            if (options.txt.charCodeAt(j) > 128) {
                curLength = curLength + options.font;
            } else {
                curLength = curLength + options.font / 2;
            }
            if (
                curLength > options.limitWidth ||
                (curLength < options.limitWidth && j == options.txt.length - 1)
            ) {
                endIndex = j - 1;
                if (j == options.txt.length - 1) {
                    fillText(
                        _ctx,
                        options,
                        options.txt.substring(startIndex, endIndex + 2),
                        options.dx,
                        options.dy + curLines * options.lineHeight
                    );
                } else {
                    fillText(
                        _ctx,
                        options,
                        options.txt.substring(startIndex, endIndex + 1),
                        options.dx,
                        options.dy + curLines * options.lineHeight
                    );
                }
                if (options.limitLines == curLines) return; //截止
                curLines++;
                startIndex = j;
                if (options.txt.charCodeAt(j) > 128) {
                    curLength = options.font;
                } else {
                    curLength = options.font / 2;
                }
            }
        }
        //_ctx.restore();
    } else {
        let _width = 0;
        for (let m = 0; m < options.txt.length; m++) {
            if (options.txt.charCodeAt(m) > 128) {
                _width = _width + options.font;
            } else {
                _width = _width + options.font / 2;
            }
        }
        fillText(_ctx, options, options.txt, options.dx, options.dy);
        cb && cb(_width);
    }
};

// 圆角
(_canvas.drawRadiusRect = (_ctx, x, y, w, h, r) => {
    const br = r / 2;
    _ctx.beginPath();
    _ctx.moveTo(x + br, y); // 移动到左上角的点
    _ctx.lineTo(x + w - br, y);
    _ctx.arcTo(x + w, y, x + w, y + br, br);
    _ctx.lineTo(x + w, y + h - br);
    _ctx.arcTo(x + w, y + h, x + w - br, y + h, br);
    _ctx.lineTo(x + br, y + h);
    _ctx.arcTo(x, y + h, x, y + h - br, br);
    _ctx.lineTo(x, y + br);
    _ctx.arcTo(x, y, x + br, y, br);
}),
    // 省略
    (_canvas.canvasTextEllipsis = opts => {
        //  opts.setFontSize(opts.font);
        if (opts.bold) {
            opts.ctx.font = "normal bold 12px PingFangSC-Light";
        } else {
            opts.ctx.font = "normal 12px PingFangSC-Light";
        }
        //  opts.ctx.font = 'bold PingFangSC-Light'
        opts.ctx.setFillStyle(opts.color);
        opts.ctx.setFontSize(opts.font);

        let arr = [];
        let t = opts.text.trim();
        const len = t.length;
        let lineCount = 0;
        let widthCount = 0;
        let car = "";
        let n = 0;

        for (let i = 0; i < len; i++) {
            n = t[i].charCodeAt(0);
            if (n === 13 || n === 32 || n == 10 || t[i] == "\n") {
                if (car === " ") continue;
                car = " ";
            } else {
                car = t[i];
            }

            widthCount = opts.ctx.measureText(arr.join("") + car).width;
            if (widthCount <= opts.width) {
                arr.push(car);
            } else if (lineCount === opts.line - 1) {
                arr[arr.length - 1] = "…";
            }

            if (widthCount > opts.width || len == i + 1) {
                opts.ctx.fillText(
                    arr.join(""),
                    opts.left,
                    opts.top + opts.lineHeight * lineCount
                );
                lineCount++;
                arr.length = 0;
                arr.push(car);
                widthCount = 0;
            }
            if (lineCount === opts.line) {
                break;
            }
        }
    });

_canvas.writeSpecialText = (opts, cb) => {
    //set font styles && filltext
    let fillText = (_ctx, options, _txt, _dx, _dy) => {
        _ctx.font = "12px PingFangSC-Light";
        _ctx.setFillStyle(options.color);
        _ctx.setFontSize(options.font);
        _ctx.setTextBaseline(options.baseLine);
        _ctx.setTextAlign(options.align);
        _ctx.fillText(_txt, _dx, _dy);
    };

    let _opts = {
        ctx: null, //Object
        font: 14,
        color: "#353535",
        txt: "", //write contents
        align: "left", //text-align
        baseLine: "middle",
        dx: 0,
        dy: 0,
        type: "defalut", //limit 限制区域显示 超出隐藏
        limitWidth: 0,
        //limitHeight: 0,
        limitLines: 1,
        lineHeight: 14
    };

    let options = Object.assign({}, _opts, opts);
    let _ctx = options.ctx;
    options.txt = options.txt.replace(/[\r\n]/g, "@@@@@");
    let arr = options.txt.split("@@@@@");
    let length = arr.length;

    let curLines = 1; //现在在画第几行
    let curLength = 0; //当前行 已画长度
    let startIndex = 0;
    let endIndex = 0;

    for (var k = 0; k < length; k++) {
        let str = arr[k]; //当前循环的字符串

        for (let j = 0; j < str.length; j++) {
            if (str.charCodeAt(j) > 128) {
                curLength = curLength + options.font;
            } else {
                curLength = curLength + options.font / 2;
            }

            if (
                curLength > options.limitWidth ||
                (curLength < options.limitWidth && j == str.length - 1)
            ) {
                endIndex = j - 1;
                if (j == str.length - 1) {
                    fillText(
                        _ctx,
                        options,
                        str.substring(startIndex, endIndex + 2),
                        options.dx,
                        options.dy + curLines * options.lineHeight
                    );
                } else {
                    fillText(
                        _ctx,
                        options,
                        str.substring(startIndex, endIndex + 1),
                        options.dx,
                        options.dy + curLines * options.lineHeight
                    );
                }

                if (options.limitLines == curLines) return; //截止
                curLines++;
                startIndex = j;
                if (str.charCodeAt(j) > 128) {
                    curLength = options.font;
                } else {
                    curLength = options.font / 2;
                }
            }
        }

        if (options.limitLines == curLines) return; //截止
        curLength = 0; //当前行 已画长度
        startIndex = 0;
        endIndex = 0;
    }
};

_canvas.strokeLine = opts => {
    let _opts = {
        color: "",
        lineWidth: 1,
        ctx: null,
        lineCap: "butt", //'butt'、'round'、'square'
        startDot: [0, 0],
        endDot: [100, 0]
    };

    let options = Object.assign({}, _opts, opts);
    let _ctx = options.ctx;
    _ctx.beginPath();
    _ctx.setStrokeStyle(options.color);
    _ctx.setLineWidth(options.lineWidth);
    _ctx.moveTo(options.startDot[0], options.startDot[1]);
    _ctx.lineTo(options.endDot[0], options.endDot[1]);
    _ctx.stroke();
};

_canvas.createLinearGradient = opts => {
    let _opts = {
        ctx: null,
        dot: [0, 0, 100, 100]
    };

    let options = Object.assign({}, _opts, opts);
    let _ctx = options.ctx;

    const grd = _ctx.createLinearGradient(0, 0, 10, 0);
    grd.addColorStop(0, "red");
    grd.addColorStop(1, "white");
    _ctx.setFillStyle(grd);
    _ctx.fillRect(
        options.dot[0],
        options.dot[1],
        options.dot[2],
        options.dot[3]
    );
};

_canvas.cutText = (txt, font, width, cb) => {
    let curLength = 0;
    let flag = true;
    for (let j = 0; j < txt.length; j++) {
        if (txt.charCodeAt(j) > 128) {
            curLength = curLength + font;
        } else {
            curLength = curLength + font / 2;
        }
        if (curLength > width) {
            cb(txt.substring(0, j - 2) + "...");
            return;
        } else {
            if (j == txt.length - 1) {
                cb(txt);
                return;
            }
        }
    }
};

// 网络图片转为本地图片
_canvas.imgToLocalPath = paths => {
    return new Promise(resolve => {
        let count = 0;
        let pathObj = {};
        paths.forEach((path, index) => {
            // console.log('forEach=>',new Date(), path)
            wx.getImageInfo({
                src: path,
                success: res => {
                    // console.log('success=>',new Date(), res)
                    pathObj[index] = res.path;
                    count++;
                    if (count == paths.length) {
                        resolve(pathObj);
                    }
                },
                fail: () => {
                    reject();
                }
            });
        });
    });
};

module.exports = {
    _canvas: _canvas
};
