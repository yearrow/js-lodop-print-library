const defaultConfig = {
  global: {
    
  },
  blankPanel: {
    setPreviewWindow: {
      intDispMode: 1, // 预览比例 0--适高1--正常大小2--适宽。
      intToolMode: 2, // 工具条和按钮，数字型 0--显示工具条1--显示按钮 2--两个都显示 3--两个都不显示 
      blDirectPrint: 1, // 打印按钮是否“直接打印” 1-是 0-否（弹出界面“选机打印”）
      inWidth: 0, // 窗口宽高 当inWidth 或intHeight 小于等于0时窗口最大化(整个打印的窗口，占电脑满屏)
      intHeight: 0,
      strTitleButtonCaptoin: '打印预览.开始打印' // 预览窗口和打印按钮的名称组合
    },
    printInita: { // 打印初始化
      Top: 10, // 整页上边距
      Left: 10,
      Width: 1000,
      Height: 740, // 可视编辑区域的高度
      strPrintName: '基于LODOP的打印作业'
    },
    setPrintPagesize: {
      intOrient: 2, // 横向打印，固定纸张
      PageWidth: 0,
      PageHeight: 0,
      strPageName: 'A4'
    },
    setShowMode: {
      strModeType: 'LANDSCAPE_DEFROTATED', // 横向打印的预览默认旋转90度（正向显示）
      varModeValue: 1 // 对应的值, 1或true=是
    }
  },
  drawBarcode: {
    style: {
      //   ShowBarText: , // (一维)条码的码值是否显示
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
      Alignment: 2, // 数字型，1--左靠齐 2--居中 3--右靠齐
      //   LineSpacing: , // 纯文本的行间距
      //   LetterSpacing: , // 纯文本的字间距
      //   AlignJustify: , // 设置“text文本”是否两端对齐或“barcode条码文字”靠齐方式.设置“text文本”时，1代表两端对齐，0代表不处理（默认）；设置“barcode条码文字”时，0-两端对齐(默认)  1-左靠齐  2-居中  3-右靠齐；
      //   ReadOnly: 0, // 纯文本内容在打印维护时，是否禁止修改 0--否 1--是 默认“是”
      //   TextFrame: , // 文本的外框类型
      //   TextNeatRow: , // 设置多行Text对象文本行是否尽量对齐
    }
  },
  drawImage: {
    style: {
      //   Stretch: 0, // 图片截取缩放模式 0--截取图片 1--扩展（可变形）缩放 2--按原图长和宽比例（不变形）缩放
      //   TransColor: , // 透明图片的底色
    }
  }
};

export {
  defaultConfig
};

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
