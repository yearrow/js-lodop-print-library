
import { getLodop } from './plugin/lodop-fn.js';
import defaultsDeep from 'lodash/defaultsDeep';
import { defaultConfig } from './config.js';

export class DrawComponent {
  constructor (config) {
    // 初始化变量
    try {
      this.LODOP = getLodop(null, null, './assets/plugin/');
    } catch (err) {
      console.error('未检测到Lodop对象，请引入LodopFuncs.js文件');
    }
    this._config = defaultsDeep(config ?? {}, defaultConfig);
    this._styleFlie = `<link type='text/css' rel='stylesheet' href='asset/print.css'/>`;
  }

  // 用于获取打印的属性
  getPrint () {
    return LODOP
  }

  // 准备画布
  setBlankPanel () {
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
    LODOP.SET_PREVIEW_WINDOW(
      intDispMode,
      intToolMode,
      blDirectPrint,
      inWidth,
      intHeight,
      strTitleButtonCaptoin
    );
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
  }

  // 打印背景
  setPrintBKImg (strContent) {
    LODOP.ADD_PRINT_SETUP_BKIMG(strContent);
  }

  // 设置打印模式组件
  setShowMode (option) {
    for (const item in option) {
      LODOP.SET_SHOW_MODE(item, option[item])
    }
  }

  /**
   * 纯文本组件
   * @param {*} option
   * position 定位
   * property 本组件的其他固有属性
   * params 传入的参数。获取config的默认配置并与其合并
   */
  drawText (option) {
    // 判断定位必须为数字，且必传。在转换json的时候判断
    const params = defaultsDeep(option.params ?? {}, defaultConfig.drawText.style)

    LODOP.ADD_PRINT_TEXT(
      option.position.Top,
      option.position.Left,
      option.position.Width,
      option.position.Height,
      option.property.strContent || '请输入文本'
    );

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
  drawLine (option) {
    LODOP.ADD_PRINT_LINE(
      option.position.Top1,
      option.position.Left1,
      option.position.Top2,
      option.position.Left2,
      option.property.intLineStyle || 0, // 0--实线 1--破折线 2--点线 3--点划线 4--双点划线
      option.property.intLineWidth || 1 // 单位是（打印）像素，缺省值是1，非实线的线条宽也是0。
    );
  }


  // 二维码组件
  drawBarcode (option) {
    const params = defaultsDeep(option.params ?? {}, defaultConfig.drawBarcode.style)

    LODOP.ADD_PRINT_BARCODE(
      option.position.Top,
      option.position.Left,
      option.position.Width,
      option.position.Height,
      option.property.CodeType || 'QRCode',
      option.property.CodeValue
    );

    for (const item in params) {
      LODOP.SET_PRINT_STYLEA(0, item, params[item]);
    }
  }
  
  // 图片组件
  drawImage (option) {
    const params = defaultsDeep(option.params ?? {}, defaultConfig.drawImage.style)
    LODOP.ADD_PRINT_IMAGE(
      option.position.Top,
      option.position.Left,
      option.position.Width,
      option.position.Height,
      option.property.strContent
      
    );

    for (const item in params) {
      LODOP.SET_PRINT_STYLEA(0, item, params[item]);
    }
  }
  
  // ADD_PRINT_SHAPE 图形
  // SET_SAVE_MODE 保存模式
  // SAVE_TO_FILE 导出数据到文件
  // FORMAT 数据格式转换
  // GET_VALUE 获得数据值

  // 不翻页表格
  drawOnePageTable (option, tableData) {
    let tableHtml = '<tr>'
    option.config.forEach(function (row) {
      let propValue = ''
      if (row.prop) {
        if (row.render) {
          propValue = row.render(row, tableData, extendOptions._this)
        } else {
          propValue = tableData[row.prop]
        }
      }
      
      const cell = `<td width="${row.width}" height="${row.height}" rowspan="${row.rowSpan}" colspan="${row.colSpan}">
        <div align="${row.align || 'left'}">${row.value || ''}${propValue}</div></td>`
      tableHtml += cell
      if (row.newLine) {
        tableHtml += '</tr><tr>'
      }
    })
    tableHtml = `<table border style ="font-family: '宋体', Arial, Helvetica, sans-serif;border-collapse: collapse;font-size: 12px;"
        width="${option.params.Width}" >${tableHtml}</tr></table>`
    console.log(this._styleFlie + `<body>${tableHtml}</body>`)
    LODOP.ADD_PRINT_TABLE(
      option.params.Top,
      option.params.Left,
      option.params.Width,
      option.params.Height,
      this._styleFlie + `<body>${tableHtml}</body>`
    )
    for (const item in option.style) {
      LODOP.SET_PRINT_STYLEA(0, item, option.style[item]);
    }
  }

  // 翻页表格
  drawTurnPageTable (option, tableData) {
    let tableHeader = '';
    let tableBody = '';
    let tableFooter = '';
    let blankStr = '';
    const rowHeaderArr = [];
    const propColumns = [];
    this._constructTableHead(rowHeaderArr, propColumns, option.orderModel, 0);
    rowHeaderArr.map((item) => tableHeader += '<tr>' + item + '</tr>');
    const lineNum = option.conditionParams.lineNum;
    // 渲染空白行
    const blankRow = lineNum - (tableData.length % lineNum);
    if (blankRow !== lineNum) {
      for (let x = 1; x <= blankRow; x++) {
        blankStr += `<tr height="${option.conditionParams.lineHeight}px">`;
        for (let y = 1; y <= propColumns.length; y++) {
          blankStr += '<td style="border: solid 1px black;"></td>';
        }
        blankStr += '</tr>';
      }
    }
    // 渲染
    tableData.map((item) => {
      tableBody += `<tr height="${option.conditionParams.lineHeight}px">`;
      propColumns.map((iitem) => {
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
    });
    // 合计渲染
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
    LODOP.ADD_PRINT_TABLE(
      option.position.Top,
      option.position.Left,
      option.position.Width,
      tableHeight,
      this._styleFlie + `<body>${tableHtml}</body>`
    );
    const width = this._config.blankPanel.printInita.Width;
    const height = this._config.blankPanel.printInita.Height;
    LODOP.ADD_PRINT_TEXT(height - 15, width / 2, 120, 30, '第#页/共&页');
    LODOP.SET_PRINT_STYLEA(0, 'ItemType', 2);
  }

  // 构造表头
  _constructTableHead (rowHeaderArr, propColumns, columns, level) {
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
  }

  // 主表列式数据陈列
  drawTableContent (option, tableData, extendOptions) {
    let tableHtml = '<tr height="22px" >'
    option.orderModel.forEach(function (row) {
      let propValue = ''
      if (row.prop) {
        if (row.render) {
          propValue = row.render(row, tableData, extendOptions._this)
        } else {
          propValue = tableData[row.prop]
        }
      }
      const label = !row.label ? '' : row.label + ': '
      const cell = `<td width="${row.width}" colspan="${row.colSpan}">
        <div align="${row.align || 'left'}">${label}${propValue}</div></td>`
      tableHtml += cell
      if (row.newLine) {
        tableHtml += '</tr><tr height="22px" >'
      }
    })
    tableHtml = `</tr><table class="table-layout-content"
        style ="font-family: '宋体', Arial, Helvetica, sans-serif;border-collapse: collapse;font-size: 12px;"
        width="${option.position.Width}" >${tableHtml}</table>`
    LODOP.ADD_PRINT_TABLE(
      option.position.Top,
      option.position.Left,
      option.position.Width,
      option.position.Height,
      this._styleFlie + `<body>${tableHtml}</body>`
    )
    for (const item in option.params) {
      LODOP.SET_PRINT_STYLEA(0, item, option.params[item]);
    }
  }

  PREVIEW () {
    LODOP.PREVIEW();
  }
}
