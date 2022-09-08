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
  SYSTEM_DEFAULT_CONF: {
    SET_PREVIEW_WINDOW: {
      intDispMode: 1,
      intToolMode: 2,
      blDirectPrint: 1,
      inWidth: 0,
      intHeight: 0,
      strTitleButtonCaptoin: '打印预览.开始打印'
    },
    PRINT_INITA: {
      Top: 10,
      Left: 10,
      Width: 1000,
      Height: 740,
      strPrintName: '基于LODOP的打印作业'
    },
    SET_PRINT_MODE: {
      strModeType: 'POS_BASEON_PAPER',
      // 设置输出位置以纸张边缘为基点
      varModeValue: 0 // 以可打印区域的边缘为基点

    },
    SET_PRINT_PAGESIZE: {
      intOrient: 2,
      PageWidth: 0,
      PageHeight: 0,
      strPageName: 'A4'
    },
    SET_SHOW_MODE: {
      strModeType: 'LANDSCAPE_DEFROTATED',
      varModeValue: 1
    }
  },
  STYLE_FILE_PATH: 'asset'
};
//   FontName: '宋体',
//   FontSize: 9,
//   FontColor: '#FFB400',
//   Bold: 0,
//   Italic: 0,
//   Underline: 0,
//   Alignment: 1, // 数字型，1--左靠齐 2--居中 3--右靠齐
//   LineSpacing: , // 纯文本的行间距
//   LetterSpacing: , // 纯文本的字间距
//   AlignJustify: , // 设置“text文本”是否两端对齐或“barcode条码文字”靠齐方式
//   ReadOnly: 0, // 纯文本内容在打印维护时，是否禁止修改 0--否 1--是 默认“是”
//   TextFrame: , // 文本的外框类型
//   TextNeatRow: , // 设置多行Text对象文本行是否尽量对齐
// }
// const imageStyle = {
//   Stretch: 0, // 图片截取缩放模式 0--截取图片 1--扩展（可变形）缩放 2--按原图长和宽比例（不变形）缩放
//   TransColor: , // 透明图片的底色
// }
// const chartStyle = {
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
// const QrCodeStyle = {
//   ShowBarText: , // (一维)条码的码值是否显示
//   QRCodeVersion: , // 设置二维码QRCode版本值，其决定容量
//   QRCodeErrorLevel: , // 设置二维码QRCode纠错等级
//   QRCodeEncodeMode: , // 设置二维码QRCode编码模式
//   ContentVName: , // 设置打印设计返回程序代码时的内容参数变量名, (当PROGRAM_CONTENT_BYVAR真时ContentVName才有效)
//   DataCharset: , // 设置二维条码的数据集
//   GroundColor: , // 设置条码的背景色
//   AlignJustify: , // 设置“text文本”是否两端对齐或“barcode条码文字”靠齐方式
//   NotOnlyHighPrecision: , // 设置条码适应低精度输出或扫描设备
// }
// const lineStyle = {
//   PenWidth: 1, // 线条宽度px
//   PenStyle: 0, // 线条风格 0--实线 1--破折线 2--点线 3--点划线 4--双点划线
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
    this._styleFlie = `<link type='text/css' rel='stylesheet' href='${this._config.STYLE_FILE_PATH + '/print.css'}'/>`;
  } // 准备画布


  setBlankPanel() {
    const {
      Top,
      Left,
      Width,
      Height,
      strPrintName
    } = this._config.SYSTEM_DEFAULT_CONF.PRINT_INITA;
    LODOP.PRINT_INITA(Top, Left, Width, Height, strPrintName);
    const {
      intDispMode,
      intToolMode,
      blDirectPrint,
      inWidth,
      intHeight,
      strTitleButtonCaptoin
    } = this._config.SYSTEM_DEFAULT_CONF.SET_PREVIEW_WINDOW;
    LODOP.SET_PREVIEW_WINDOW(intDispMode, intToolMode, blDirectPrint, inWidth, intHeight, strTitleButtonCaptoin);
    const {
      intOrient,
      PageWidth,
      PageHeight,
      strPageName
    } = this._config.SYSTEM_DEFAULT_CONF.SET_PRINT_PAGESIZE;
    LODOP.SET_PRINT_PAGESIZE(intOrient, PageWidth, PageHeight, strPageName);
    const {
      strModeType,
      varModeValue
    } = this._config.SYSTEM_DEFAULT_CONF.SET_SHOW_MODE;
    LODOP.SET_SHOW_MODE(strModeType, varModeValue);
  } // 纯文本组件option:{params, style}


  setText(option) {
    LODOP.ADD_PRINT_TEXT(option.params.Top, option.params.Left, option.params.Width, option.params.Height, option.params.strContent);

    for (const item in option.style) {
      LODOP.SET_PRINT_STYLEA(0, item, option.style[item]);
    }
  } // 图片组件


  setImage(option) {
    LODOP.ADD_PRINT_IMAGE(option.params.Top, option.params.Left, option.params.Width, option.params.Height, option.params.strContent);

    for (const item in option.style) {
      LODOP.SET_PRINT_STYLEA(0, item, option.style[item]);
    }
  } // 翻页表格


  setTable(option, templateData) {
    let tableHeader = '';
    let tableBody = '';
    let tableFooter = '';
    let blankStr = '';
    const rowHeaderArr = [];
    const tableData = templateData.orderItem;

    this._constructTableHead(rowHeaderArr, option.listModel, 0);

    rowHeaderArr.map(item => tableHeader += '<tr>' + item + '</tr>');
    const lineNum = option.lineNum; // 渲染空白行

    const blankRow = lineNum - tableData.length % lineNum;

    if (blankRow !== lineNum) {
      for (let x = 1; x <= blankRow; x++) {
        blankStr += `<tr height="${option.lineHeight}px">`;

        for (let y = 1; y <= this.propColumns.length; y++) {
          blankStr += '<td style="border: solid 1px black;"></td>';
        }

        blankStr += '</tr>';
      }
    } // 渲染


    tableData.map(item => {
      tableBody += `<tr height="${option.lineHeight}px">`;
      this.propColumns.map(iitem => {
        let propValue = '';

        if (iitem.prop) {
          if (iitem.render) {
            propValue = iitem.render(iitem, item);
          } else {
            propValue = item[iitem.prop];
          }
        }

        tableBody += `<td style="border: solid 1px black;">
                        <div align="${iitem.align}" style="max-height:${option.lineHeight}px;overflow: hidden;padding: 0px 2px;">
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
                <div align="${item.align}">
                <font tdata="${item.font.tdata}" format="${item.font.format}" tindex="${item.font.tindex}">
                  ${item.text}
                </font></div></td>`;
      });
      tableFooter += '</tr>';
    } else {
      tableFooter += '<tr height="0px"></tr>';
    }

    const tableHtml = `<table class="table-paging-content" width="${option.Width}"
                        style ="font-family: '宋体', Arial, Helvetica, sans-serif;border-collapse: collapse;font-size: 11px;">
                        <thead>${tableHeader}</thead>
                        <tbody>${tableBody + blankStr}</tbody>
                        <tfoot>${tableFooter}</tfoot>
                    </table>`;
    const tableHeight = lineNum * (option.lineHeight || 30) + 5;
    LODOP.ADD_PRINT_TABLE(option.Top, option.Left, option.Width, tableHeight, this._styleFlie + `<body>${tableHtml}</body>`);
    const width = this._option.SYSTEM_DEFAULT_CONF.PRINT_INITA.Width;
    const height = this._option.SYSTEM_DEFAULT_CONF.PRINT_INITA.Height;
    LODOP.ADD_PRINT_TEXT(height - 15, width / 2, 120, 30, '第#页/共&页');
    LODOP.SET_PRINT_STYLEA(0, 'ItemType', 2); // LODOP.ADD_PRINT_IMAGE(
    //   option.params.Top,
    //   option.params.Left,
    //   option.params.Width,
    //   option.params.Height,
    //   option.params.strContent
    // )
    // for(var item in option.style) {
    //   LODOP.SET_PRINT_STYLEA(0, item, option.style[item])
    // }
  } // 构造表头


  _constructTableHead(rowHeaderArr, columns, level) {
    let tableHeader = '';
    rowHeaderArr[level] = rowHeaderArr[level] || '';
    columns.map((column, index) => {
      tableHeader = `<th nowrap width="${column.width}" colspan="${column.colSpan || 1}" rowspan="${column.rowSpan || 1}"
                      style="font-size: 12px;font-weight: 500;border: solid 1px black;">
                     <div align="center">${column.label}</div></th>`;
      rowHeaderArr[level] += tableHeader;

      if (column.isParent) {
        const childLev = level + (column.rowSpan || 1);

        this._constructTableHead(column.children, childLev);
      } else {
        this.propColumns.push(column);
      }
    });
  }

  PREVIEW() {
    LODOP.PREVIEW();
  }

}

export { DrawComponent };