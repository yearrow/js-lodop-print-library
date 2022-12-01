import defaultsDeep from 'lodash/defaultsDeep';

let CreatedOKLodop7766 = null;
let CLodopIsLocal; //= ===判断是否需要 Web打印服务CLodop:===
//= ==(不支持插件的浏览器版本需要用它)===

const needCLodop = function () {
  try {
    const ua = navigator.userAgent;

    if (ua.match(/Windows\sPhone/i)) {
      return true;
    }

    if (ua.match(/iPhone|iPod|iPad/i)) {
      return true;
    }

    if (ua.match(/Android/i)) {
      return true;
    }

    if (ua.match(/Edge\D?\d+/i)) {
      return true;
    }

    const verTrident = ua.match(/Trident\D?\d+/i);
    const verIE = ua.match(/MSIE\D?\d+/i);
    let verOPR = ua.match(/OPR\D?\d+/i);
    let verFF = ua.match(/Firefox\D?\d+/i);
    const x64 = ua.match(/x64/i);

    if (!verTrident && !verIE && x64) {
      return true;
    } else if (verFF) {
      verFF = verFF[0].match(/\d+/);

      if (verFF[0] >= 41 || x64) {
        return true;
      }
    } else if (verOPR) {
      verOPR = verOPR[0].match(/\d+/);

      if (verOPR[0] >= 32) {
        return true;
      }
    } else if (!verTrident && !verIE) {
      let verChrome = ua.match(/Chrome\D?\d+/i);

      if (verChrome) {
        verChrome = verChrome[0].match(/\d+/);

        if (verChrome[0] >= 41) {
          return true;
        }
      }
    }

    return false;
  } catch (err) {
    return true;
  }
}; //= ===页面引用CLodop云打印必须的JS文件,用双端口(8000和18000）避免其中某个被占用：====

if (needCLodop()) {
  const src1 = 'http://localhost:8000/CLodopfuncs.js?priority=1';
  const src2 = 'http://localhost:18000/CLodopfuncs.js?priority=0';
  const head = document.head || document.getElementsByTagName('head')[0] || document.documentElement;
  let oscript = document.createElement('script');
  oscript.src = src1;
  head.insertBefore(oscript, head.firstChild);
  oscript = document.createElement('script');
  oscript.src = src2;
  head.insertBefore(oscript, head.firstChild);
  CLodopIsLocal = !!(src1 + src2).match(/\/\/localho|\/\/127.0.0./i);
} //= ===获取LODOP对象的主过程：====


const getLodop = function (oOBJECT, oEMBED, path = './') {
  const strHtmInstall = '<br><font color=\'#FF00FF\'>打印控件未安装!点击这里<a href=\'' + path + 'install_lodop32.exe\' target=\'_self\' style=\'color:blue;\'>执行安装</a>,安装后请刷新页面或重新进入。</font>';
  const strHtmUpdate = '<br><font color=\'#FF00FF\'>打印控件需要升级!点击这里<a href=\'' + path + 'install_lodop32.exe\' target=\'_self\' style=\'color:blue;\'>执行升级</a>,升级后请重新进入。</font>';
  const strHtm64_Install = '<br><font color=\'#FF00FF\'>打印控件未安装!点击这里<a href=\'' + path + 'install_lodop64.exe\' target=\'_self\' style=\'color:blue;\'>执行安装</a>,安装后请刷新页面或重新进入。</font>';
  const strHtm64_Update = '<br><font color=\'#FF00FF\'>打印控件需要升级!点击这里<a href=\'' + path + 'install_lodop64.exe\' target=\'_self\' style=\'color:blue;\'>执行升级</a>,升级后请重新进入。</font>';
  const strHtmFireFox = '<br><br><font color=\'#FF00FF\'>（注意：如曾安装过Lodop旧版附件npActiveXPLugin,请在【工具】->【附加组件】->【扩展】中先卸它）</font>';
  const strHtmChrome = '<br><br><font color=\'#FF00FF\'>(如果此前正常，仅因浏览器升级或重安装而出问题，需重新执行以上安装）</font>';
  const strCLodopInstall_1 = '<br><font color=\'#FF00FF\'>Web打印服务CLodop未安装启动，点击这里<a href=\'' + path + 'CLodop_Setup_for_Win32NT.exe\' target=\'_self\' style=\'color:blue;\'>下载执行安装</a>';
  const strCLodopInstall_2 = '<br>（若此前已安装过，可<a href=\'CLodop.protocol:setup\' target=\'_self\' style=\'color:blue;\'>点这里直接再次启动</a>）';
  const strCLodopInstall_3 = '，成功后请刷新本页面。</font>';
  const strCLodopUpdate = '<br><font color=\'#FF00FF\'>Web打印服务CLodop需升级!点击这里<a href=\'' + path + 'CLodop_Setup_for_Win32NT.exe\' target=\'_self\' style=\'color:blue;\'>执行升级</a>,升级后请刷新页面。</font>';
  let LODOP;

  try {
    const ua = navigator.userAgent;
    const isIE = !!ua.match(/MSIE/i) || !!ua.match(/Trident/i);

    if (needCLodop()) {
      try {
        LODOP = getCLodop();
      } catch (err) {}

      if (!LODOP && document.readyState !== 'complete') {
        alert('网页还没下载完毕，请稍等一下再操作.');
        return;
      }

      if (!LODOP) {
        document.body.innerHTML = `<div style='z-index:100;width:100%;position:fixed;background:#fff'>${strCLodopInstall_1 + (CLodopIsLocal ? strCLodopInstall_2 : '') + strCLodopInstall_3}</div>` + document.body.innerHTML;
        return;
      } else {
        if (CLODOP.CVERSION < '3.0.9.2') {
          document.body.innerHTML = strCLodopUpdate + document.body.innerHTML;
        }

        if (oEMBED && oEMBED.parentNode) {
          oEMBED.parentNode.removeChild(oEMBED);
        }

        if (oOBJECT && oOBJECT.parentNode) {
          oOBJECT.parentNode.removeChild(oOBJECT);
        }
      }
    } else {
      var is64IE = isIE && !!ua.match(/x64/i); //= ====如果页面有Lodop就直接使用，没有则新建:==========

      if (oOBJECT || oEMBED) {
        if (isIE) {
          LODOP = oOBJECT;
        } else {
          LODOP = oEMBED;
        }
      } else if (!CreatedOKLodop7766) {
        LODOP = document.createElement('object');
        LODOP.setAttribute('width', 0);
        LODOP.setAttribute('height', 0);
        LODOP.setAttribute('style', 'position:absolute;left:0px;top:-100px;width:0px;height:0px;');

        if (isIE) {
          LODOP.setAttribute('classid', 'clsid:2105C259-1E0C-4534-8141-A753534CB4CA');
        } else {
          LODOP.setAttribute('type', 'application/x-print-lodop');
        }

        document.documentElement.appendChild(LODOP);
        CreatedOKLodop7766 = LODOP;
      } else {
        LODOP = CreatedOKLodop7766;
      } //= ====Lodop插件未安装时提示下载地址:==========


      if (!LODOP || !LODOP.VERSION) {
        if (ua.indexOf('Chrome') >= 0) {
          document.body.innerHTML = strHtmChrome + document.body.innerHTML;
        }

        if (ua.indexOf('Firefox') >= 0) {
          document.body.innerHTML = strHtmFireFox + document.body.innerHTML;
        }

        document.body.innerHTML = (is64IE ? strHtm64_Install : strHtmInstall) + document.body.innerHTML;
        return LODOP;
      }
    }

    if (LODOP.VERSION < '6.2.2.6') {
      if (!needCLodop()) {
        document.body.innerHTML = (is64IE ? strHtm64_Update : strHtmUpdate) + document.body.innerHTML;
      }
    } //= ==如下空白位置适合调用统一功能(如注册语句、语言选择等):==
    //= ======================================================


    return LODOP;
  } catch (err) {
    alert('getLodop出错:' + err);
  }
};

const defaultConfig = {
  global: {},
  blankPanel: {
    setPreviewWindow: {
      intDispMode: 1,
      // 预览比例 0--适高1--正常大小2--适宽。
      intToolMode: 2,
      // 工具条和按钮，数字型 0--显示工具条1--显示按钮 2--两个都显示 3--两个都不显示 
      blDirectPrint: 1,
      // 打印按钮是否“直接打印” 1-是 0-否（弹出界面“选机打印”）
      inWidth: 0,
      // 窗口宽高 当inWidth 或intHeight 小于等于0时窗口最大化(整个打印的窗口，占电脑满屏)
      intHeight: 0,
      strTitleButtonCaptoin: '打印预览.开始打印' // 预览窗口和打印按钮的名称组合

    },
    printInita: {
      // 打印初始化
      Top: 10,
      // 整页上边距
      Left: 10,
      Width: 1000,
      Height: 740,
      // 可视编辑区域的高度
      strPrintName: '基于LODOP的打印作业'
    },
    setPrintPagesize: {
      intOrient: 2,
      // 横向打印，固定纸张
      PageWidth: 0,
      PageHeight: 0,
      strPageName: 'A4'
    },
    setShowMode: {
      strModeType: 'LANDSCAPE_DEFROTATED',
      // 横向打印的预览默认旋转90度（正向显示）
      varModeValue: 1 // 对应的值, 1或true=是

    }
  },
  drawBarcode: {
    style: {//   ShowBarText: , // (一维)条码的码值是否显示
      //   QRCodeVersion: , // 设置二维码QRCode版本值，其决定容量
      //   QRCodeErrorLevel: , // 设置二维码QRCode纠错等级
      //   QRCodeEncodeMode: , // 设置二维码QRCode编码模式
      //   ContentVName: , // 设置打印设计返回程序代码时的内容参数变量名, (当PROGRAM_CONTENT_BYVAR真时ContentVName才有效)
      //   DataCharset: , // 设置二维条码的数据集
      //   GroundColor: , // 设置条码的背景色
      //   AlignJustify: , // 设置“text文本”是否两端对齐或“barcode条码文字”靠齐方式
      //   NotOnlyHighPrecision: , // 设置条码适应低精度输出或扫描设备
    }
  },
  drawText: {
    style: {
      FontName: '宋体',
      FontSize: 20,
      FontColor: '#0000EE',
      //   FontName: '宋体',
      //   FontSize: 9,
      //   FontColor: '#FFB400',
      //   Bold: 0,
      //   Italic: 0,
      //   Underline: 0,
      Alignment: 2 // 数字型，1--左靠齐 2--居中 3--右靠齐
      //   LineSpacing: , // 纯文本的行间距
      //   LetterSpacing: , // 纯文本的字间距
      //   AlignJustify: , // 设置“text文本”是否两端对齐或“barcode条码文字”靠齐方式.设置“text文本”时，1代表两端对齐，0代表不处理（默认）；设置“barcode条码文字”时，0-两端对齐(默认)  1-左靠齐  2-居中  3-右靠齐；
      //   ReadOnly: 0, // 纯文本内容在打印维护时，是否禁止修改 0--否 1--是 默认“是”
      //   TextFrame: , // 文本的外框类型
      //   TextNeatRow: , // 设置多行Text对象文本行是否尽量对齐

    }
  },
  drawImage: {
    style: {//   Stretch: 0, // 图片截取缩放模式 0--截取图片 1--扩展（可变形）缩放 2--按原图长和宽比例（不变形）缩放
      //   TransColor: , // 透明图片的底色
    }
  }
};
//   ChartStyle: , // 图表风格，字符形的控制串
//   ChartLeftTitle: , // 图表的左标题，单行文本字符
//   ChartBottomTitle: , // 图表的底标题
//   ChartTopTitle: , // 图表的上标题
//   ChartRightTitle: , // 图表的右标题
//   ChartTitle: , // 图表的主标题
//   ChartFoot: , // 图表的注脚
//   ChartbkStartColor: , // 图表的背景渐变的起始颜色
//   ChartBKEndColor: , // 图表的背景渐变的截止颜色
//   ChartMarkColor: , // 图表的标注颜色
//   LeftWallColor: , // 图表的左墙颜色
//   BottomWallColor: , // 图表的底墙颜色
//   BackWallColor: , // 图表的背墙颜色
// }
// const otherStyle = {
//   Angle: 0, // 逆时针旋转角度数,以左上角为原点
//   ItemType: 0, // 0--普通项 1--页眉页脚 2--页号项 3--页数项 4--多页项
//   HOrient: 0, // 0--左边距锁定 1--右边距锁定 2--水平方向居中 3--左边距和右边距同时锁定（中间拉伸）
//   VOrient: 0, // 0--上边距锁定 1--下边距锁定 2--垂直方向居中 3--上边距和下边距同时锁定（中间拉伸）
//   PreviewOnly: 0, // **内容仅仅用来预览
//   PageIndex: '', // 指定输出页的序号控制字,用该序号字指定本数据项输出到哪些页。“First”第一页；“Last”最后页；“Odd”奇数页；“Even”偶数页；“具体数字”对应具体页号，可以是多个页号，页号之间用逗号或分号隔开；
//   NumberStartPage: , // 页号排序的起始页
//   ItemName: , // 项目类名
//   StartNumberValue: , // 打印页号的初始值
//   Content: , // 打印项的内容
//   PageUnIndex: , // 禁止输出页的序号控制字
//   LinkedItem: , // 设置关联内容项的项目编号
//   TableHeightScope: , // 设置TABLE高度是否包含页头页尾
//   LinkNewPage: , // 如果前面剩余空间不足，关联对象顺序打印时就“从新页开始”
//   HtmWaitMilSecs: , // 设置超文本下载延迟毫秒数
//   TextFRepeatrame: , // 设置对象是否在本纸张内有规律重复输出
//   Repeat: , // 设置对象是否在本纸张内有规律重复输出
//   AngleOfPageInside: , // 设置内容对象所在页的整体旋转角度（该对象最好是所在页的首对象）
//   TableRowThickNess: , // 设置htm对象中表格行的自动分页粒度
//   IDTagForPick: , // 用URL获取整页面后,可按ID或标签摘取页面内的单个元素
// }

class DrawComponent {
  constructor(config) {
    // 初始化变量
    try {
      this.LODOP = getLodop(null, null, './assets/plugin/');
    } catch (err) {
      console.error('未检测到Lodop对象，请引入LodopFuncs.js文件');
    }

    this._config = defaultsDeep(config !== null && config !== void 0 ? config : {}, defaultConfig);
    this._styleFlie = `<link type='text/css' rel='stylesheet' href='asset/print.css'/>`;
  } // 用于获取打印的属性


  getPrint() {
    return LODOP;
  } // 准备画布


  setBlankPanel() {
    const {
      Top,
      Left,
      Width,
      Height,
      strPrintName
    } = this._config.blankPanel.printInita;
    LODOP.PRINT_INITA(Top, Left, Width, Height, strPrintName);
    const {
      intDispMode,
      intToolMode,
      blDirectPrint,
      inWidth,
      intHeight,
      strTitleButtonCaptoin
    } = this._config.blankPanel.setPreviewWindow;
    LODOP.SET_PREVIEW_WINDOW(intDispMode, intToolMode, blDirectPrint, inWidth, intHeight, strTitleButtonCaptoin);
    const {
      intOrient,
      PageWidth,
      PageHeight,
      strPageName
    } = this._config.blankPanel.setPrintPagesize;
    LODOP.SET_PRINT_PAGESIZE(intOrient, PageWidth, PageHeight, strPageName);
    const {
      strModeType,
      varModeValue
    } = this._config.blankPanel.setShowMode;
    LODOP.SET_SHOW_MODE(strModeType, varModeValue);
  } // 打印背景


  setPrintBKImg(strContent) {
    LODOP.ADD_PRINT_SETUP_BKIMG(strContent);
  } // 设置打印模式组件


  setShowMode(option) {
    for (const item in option) {
      LODOP.SET_SHOW_MODE(item, option[item]);
    }
  }
  /**
   * 纯文本组件
   * @param {*} option
   * position 定位
   * property 本组件的其他固有属性
   * params 传入的参数。获取config的默认配置并与其合并
   */


  drawText(option) {
    var _option$params;

    // 判断定位必须为数字，且必传。在转换json的时候判断
    const params = defaultsDeep((_option$params = option.params) !== null && _option$params !== void 0 ? _option$params : {}, defaultConfig.drawText.style);
    LODOP.ADD_PRINT_TEXT(option.position.Top, option.position.Left, option.position.Width, option.position.Height, option.property.strContent || '请输入文本');

    for (const item in params) {
      LODOP.SET_PRINT_STYLEA(0, item, params[item]);
    }
  }
  /**
   * 画线组件--建议在文本类函数之前调用
   * @param {*} option
   * position 定位
   * property 本组件的其他固有属性
   * params 传入的参数。获取config的默认配置并与其合并
   */


  drawLine(option) {
    LODOP.ADD_PRINT_LINE(option.position.Top1, option.position.Left1, option.position.Top2, option.position.Left2, option.property.intLineStyle || 0, // 0--实线 1--破折线 2--点线 3--点划线 4--双点划线
    option.property.intLineWidth || 1 // 单位是（打印）像素，缺省值是1，非实线的线条宽也是0。
    );
  } // 二维码组件


  drawBarcode(option) {
    var _option$params2;

    const params = defaultsDeep((_option$params2 = option.params) !== null && _option$params2 !== void 0 ? _option$params2 : {}, defaultConfig.drawBarcode.style);
    LODOP.ADD_PRINT_BARCODE(option.position.Top, option.position.Left, option.position.Width, option.position.Height, option.property.CodeType || 'QRCode', option.property.CodeValue);

    for (const item in params) {
      LODOP.SET_PRINT_STYLEA(0, item, params[item]);
    }
  } // 图片组件


  drawImage(option) {
    var _option$params3;

    const params = defaultsDeep((_option$params3 = option.params) !== null && _option$params3 !== void 0 ? _option$params3 : {}, defaultConfig.drawImage.style);
    LODOP.ADD_PRINT_IMAGE(option.position.Top, option.position.Left, option.position.Width, option.position.Height, option.property.strContent);

    for (const item in params) {
      LODOP.SET_PRINT_STYLEA(0, item, params[item]);
    }
  } // ADD_PRINT_SHAPE 图形
  // SET_SAVE_MODE 保存模式
  // SAVE_TO_FILE 导出数据到文件
  // FORMAT 数据格式转换
  // GET_VALUE 获得数据值
  // 不翻页表格


  drawOnePageTable(option, tableData) {
    let tableHtml = '<tr>';
    option.config.forEach(function (row) {
      let propValue = '';

      if (row.prop) {
        if (row.render) {
          propValue = row.render(row, tableData, extendOptions._this);
        } else {
          propValue = tableData[row.prop];
        }
      }

      const cell = `<td width="${row.width}" height="${row.height}" rowspan="${row.rowSpan}" colspan="${row.colSpan}">
        <div align="${row.align || 'left'}">${row.value || ''}${propValue}</div></td>`;
      tableHtml += cell;

      if (row.newLine) {
        tableHtml += '</tr><tr>';
      }
    });
    tableHtml = `<table border style ="font-family: '宋体', Arial, Helvetica, sans-serif;border-collapse: collapse;font-size: 12px;"
        width="${option.params.Width}" >${tableHtml}</tr></table>`;
    console.log(this._styleFlie + `<body>${tableHtml}</body>`);
    LODOP.ADD_PRINT_TABLE(option.params.Top, option.params.Left, option.params.Width, option.params.Height, this._styleFlie + `<body>${tableHtml}</body>`);

    for (const item in option.style) {
      LODOP.SET_PRINT_STYLEA(0, item, option.style[item]);
    }
  } // 翻页表格


  drawTurnPageTable(option, tableData) {
    let tableHeader = '';
    let tableBody = '';
    let tableFooter = '';
    let blankStr = '';
    const rowHeaderArr = [];
    const propColumns = [];

    this._constructTableHead(rowHeaderArr, propColumns, option.orderModel, 0);

    rowHeaderArr.map(item => tableHeader += '<tr>' + item + '</tr>');
    const lineNum = option.conditionParams.lineNum; // 渲染空白行

    const blankRow = lineNum - tableData.length % lineNum;

    if (blankRow !== lineNum) {
      for (let x = 1; x <= blankRow; x++) {
        blankStr += `<tr height="${option.conditionParams.lineHeight}px">`;

        for (let y = 1; y <= propColumns.length; y++) {
          blankStr += '<td style="border: solid 1px black;"></td>';
        }

        blankStr += '</tr>';
      }
    } // 渲染


    tableData.map(item => {
      tableBody += `<tr height="${option.conditionParams.lineHeight}px">`;
      propColumns.map(iitem => {
        let propValue = '';

        if (iitem.prop) {
          if (iitem.render) {
            propValue = iitem.render(iitem, item);
          } else {
            propValue = item[iitem.prop];
          }
        }

        tableBody += `<td style="border: solid 1px black;">
                        <div align="${iitem.align}" style="max-height:${option.conditionParams.lineHeight}px;overflow: hidden;padding: 0px 2px;">
                          ${propValue}
                        </div>
                      </td>`;
      });
      tableBody += '</tr>';
    }); // 合计渲染

    if (option.sumRowModel && option.sumRowModel.length) {
      tableFooter += '<tr height="30px">';
      option.sumRowModel.forEach(function (item) {
        tableFooter += `<td colspan="${item.colSpan}" 
                          style="border: solid 1px black;">
                <div>
                <font tdata="${item.font.tdata}" format="${item.font.format ? item.font.format : '###0.####'}" tindex="${item.font.tindex}">
                  ${item.text}
                </font></div></td>`;
      });
      tableFooter += '</tr>';
    } else {
      tableFooter += '<tr height="0px"></tr>';
    }

    const tableHtml = `<table class="table-paging-content" width="${option.position.Width}"
                        style ="font-family: '宋体', Arial, Helvetica, sans-serif;border-collapse: collapse;font-size: 11px;">
                        <thead>${tableHeader}</thead>
                        <tbody>${tableBody + blankStr}</tbody>
                        <tfoot>${tableFooter}</tfoot>
                    </table>`;
    const tableHeight = lineNum * (option.conditionParams.lineHeight || 30) + 5;
    LODOP.ADD_PRINT_TABLE(option.position.Top, option.position.Left, option.position.Width, tableHeight, this._styleFlie + `<body>${tableHtml}</body>`);
    const width = this._config.blankPanel.printInita.Width;
    const height = this._config.blankPanel.printInita.Height;
    LODOP.ADD_PRINT_TEXT(height - 15, width / 2, 120, 30, '第#页/共&页');
    LODOP.SET_PRINT_STYLEA(0, 'ItemType', 2);
  } // 构造表头


  _constructTableHead(rowHeaderArr, propColumns, columns, level) {
    let tableHeader = '';
    rowHeaderArr[level] = rowHeaderArr[level] || '';
    columns.map((column, index) => {
      tableHeader = `<th nowrap width="${column.width}" colspan="${column.colSpan || 1}" rowspan="${column.rowSpan || 1}"
                      style="font-size: 12px;font-weight: 900;border: solid 1px black;">
                     <div align="center">${column.label}</div></th>`;
      rowHeaderArr[level] += tableHeader;

      if (column.isParent) {
        const childLev = level + (column.rowSpan || 1);

        this._constructTableHead(rowHeaderArr, propColumns, column.children, childLev);
      } else {
        propColumns.push(column);
      }
    });
  } // 主表列式数据陈列


  drawTableContent(option, tableData, extendOptions) {
    let tableHtml = '<tr height="22px" >';
    option.orderModel.forEach(function (row) {
      let propValue = '';

      if (row.prop) {
        if (row.render) {
          propValue = row.render(row, tableData, extendOptions._this);
        } else {
          propValue = tableData[row.prop];
        }
      }

      const label = !row.label ? '' : row.label + ': ';
      const cell = `<td width="${row.width}" colspan="${row.colSpan}">
        <div align="${row.align || 'left'}">${label}${propValue}</div></td>`;
      tableHtml += cell;

      if (row.newLine) {
        tableHtml += '</tr><tr height="22px" >';
      }
    });
    tableHtml = `</tr><table class="table-layout-content"
        style ="font-family: '宋体', Arial, Helvetica, sans-serif;border-collapse: collapse;font-size: 12px;"
        width="${option.position.Width}" >${tableHtml}</table>`;
    LODOP.ADD_PRINT_TABLE(option.position.Top, option.position.Left, option.position.Width, option.position.Height, this._styleFlie + `<body>${tableHtml}</body>`);

    for (const item in option.params) {
      LODOP.SET_PRINT_STYLEA(0, item, option.params[item]);
    }
  }

  PREVIEW() {
    LODOP.PREVIEW();
  }

}

// 页面传入配置结构
const config = {
  // 在组件中要判断哪些参数是必填，没有该参数时需要抛出错误。
  // 全局配置
  "config": {
    "baseUrl": "" // 接口地址

  },
  "blankPanel": {
    // 画布参数
    "setPreviewWindow": {
      "intDispMode": 1,
      "intToolMode": 2,
      "blDirectPrint": 1,
      "inWidth": 0,
      "intHeight": 0,
      "strTitleButtonCaptoin": '打印预览.开始打印'
    },
    "printInita": {
      "Top": 10,
      "Left": 10,
      "Width": 1000,
      "Height": 740,
      "strPrintName": '基于LODOP的打印作业'
    },
    "setPrintPagesize": {
      "intOrient": 2,
      // 横向打印，固定纸张
      "PageWidth": 0,
      "PageHeight": 0,
      "strPageName": 'A4' // 打印的范围由纸张决定

    },
    "setShowMode": {
      "strModeType": 'LANDSCAPE_DEFROTATED',
      // 横向打印的预览默认旋转90度（正向显示）
      "varModeValue": 1 // 对应的值, 1或true=是

    }
  },
  "datasource": {
    // 该打印模板所需整体数据
    "url": "",
    "type": "",
    "params": "",
    "result": ""
  },
  "draw": [// 图片
  {
    "type": "image",
    // 组件名
    "name": "",
    "option": {
      "position": {
        // 定位
        "Top": 10,
        "Left": 10,
        "Width": 80,
        "Height": 80
      },
      "property": {
        // 固有属性
        "strContent": ''
      },
      "params": {
        // 配置参数
        "Stretch": 1
      }
    }
  }, // 二维码
  {
    "type": "barcode",
    // 组件名
    "name": "",
    "option": {
      "position": {
        // 定位
        "Top": 10,
        "Left": 950,
        "Width": 100,
        "Height": 100
      },
      "property": {
        // 固有属性
        "CodeType": "QRCode",
        "CodeValue": "{\"orgId\":#orgId,\"id\":#id}"
      },
      "datamap": {// 数据映射关系
      },
      "params": {
        // 配置参数
        "QRCodeVersion": 7
      }
    }
  }, // 表名
  {
    "type": "text",
    // 组件名
    "name": "",
    "option": {
      "position": {
        // 定位
        "Top": 30,
        "Left": 200,
        "Width": 600,
        // 文字的宽度决定显示的多少
        "Height": 50
      },
      "property": {
        // 固有属性
        "strContent": "#orgName点验单"
      },
      "params": {
        // 配置参数
        "Bold": 1
      }
    }
  }, // 单号
  {
    "type": "text",
    // 组件名
    "name": "",
    "option": {
      "position": {
        // 定位
        "Top": 80,
        "Left": 750,
        "Width": 150,
        // 文字的宽度决定显示的多少
        "Height": 20
      },
      "property": {
        // 固有属性
        "strContent": "NO.2022113000001"
      },
      "params": {
        // 配置参数
        "FontSize": 12,
        "FontColor": '#DC143C'
      }
    }
  }, // 主表
  {
    "type": "tableContent",
    // 组件名
    "name": "",
    "option": {
      "position": {
        // 定位
        "Top": 150,
        "Left": 10,
        "Width": 700,
        "Height": 300 // 指定表格高度，超过也会自动分页

      },
      "property": {// 固有属性
      },
      "params": {// 配置参数
      },
      "datasource": {
        // 数据源（自身的数据源用于自身，若使用映射关系找不到时需要找全局，全局找不到则没有，是否需要校验并抛出错误）
        "url": "",
        "type": "",
        "params": "",
        "result": ""
      },
      "datamap": {
        // 数据映射关系
        "orderModel": [{
          "label": "组织机构",
          "prop": "orgName",
          "width": "25%",
          "colSpan": 2
        }, {
          "label": "供应商名称",
          "prop": "supplierName",
          "width": "25%",
          "colSpan": 1,
          "newLine": true
        }, {
          "label": "账期",
          "prop": "orderDate",
          "width": "25%",
          "colSpan": 1
        }]
      }
    }
  }, // 从表
  {
    "type": "turnPageTable",
    "name": "",
    "option": {
      "position": {
        // 定位
        "Top": 210,
        "Left": 10,
        "Width": 1000,
        "Height": 300 // 指定表格高度，超过也会自动分页

      },
      "property": {},
      "datasource": {
        // 数据源（自身的数据源用于自身，若使用映射关系找不到时需要找全局，全局找不到则没有，是否需要校验并抛出错误）
        "url": "",
        "type": "",
        "params": "",
        "result": ""
      },
      "datamap": {
        // 数据映射关系
        "conditionParams": {
          "lineHeight": 30,
          // 行高
          "lineNum": 10 // 行数太大，超过页面大小之后会自动分页

        },
        "orderModel": [{
          "isParent": true,
          "label": "材料信息",
          "colSpan": 4,
          "children": [{
            "prop": "materialName",
            "label": "材料名称",
            "width": "18%"
          }, {
            "prop": "materialModel",
            "label": "规格型号",
            "width": "8%"
          }, {
            "prop": "materialName",
            "label": "材料名称",
            "width": "18%"
          }, {
            "prop": "materialModel",
            "label": "规格型号",
            "width": "8%"
          }]
        }, {
          "prop": "materialUnit",
          "label": "单位",
          "rowSpan": 2,
          "width": "14%"
        }, {
          "prop": "quantity",
          "label": "数量",
          "rowSpan": 2,
          "width": "4%"
        }, {
          "prop": "materialUnit",
          "label": "单位",
          "rowSpan": 2,
          "width": "14%"
        }, {
          "prop": "quantity",
          "label": "数量",
          "rowSpan": 2,
          "width": "4%"
        }],
        "sumRowModel": [{
          "text": "数量合计:######",
          "font": {
            "tdata": "SubSum",
            "format": "UpperMoney",
            "tindex": 6
          },
          "colSpan": 5,
          "value": "#大写合计#"
        }, {
          "text": "######",
          "font": {
            "tdata": "SubSum",
            "tindex": 6
          },
          "colSpan": 1
        }, {
          "text": "",
          "font": {
            "tdata": "",
            "tindex": 7
          },
          "colSpan": 1
        }, {
          "text": "",
          "font": {
            "tdata": "",
            "tindex": 8
          },
          "colSpan": 1
        }]
      },
      "params": {// 配置参数
      }
    }
  }]
};

export { DrawComponent, config };
