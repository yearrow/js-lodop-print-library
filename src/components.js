
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
    this._styleFlie = `<link type='text/css' rel='stylesheet' href='${this._config.STYLE_FILE_PATH + '/print.css'}'/>`;
  }

  // 准备画布
  setBlankPanel () {
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
    } = this._config.SYSTEM_DEFAULT_CONF.SET_PRINT_PAGESIZE;
    LODOP.SET_PRINT_PAGESIZE(intOrient, PageWidth, PageHeight, strPageName);
    const {
      strModeType,
      varModeValue
    } = this._config.SYSTEM_DEFAULT_CONF.SET_SHOW_MODE;
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

  // 纯文本组件option:{params, style}
  drawText (option) {
    LODOP.ADD_PRINT_TEXT(
      option.params.Top,
      option.params.Left,
      option.params.Width,
      option.params.Height,
      option.params.strContent
    );

    for (const item in option.style) {
      LODOP.SET_PRINT_STYLEA(0, item, option.style[item]);
    }
  }


  // 画线组件--建议在文本类函数之前调用
  drawText (option) {
    LODOP.ADD_PRINT_LINE(
      option.params.Top1,
      option.params.Left1,
      option.params.Top2,
      option.params.Left2,
      option.params.intLineStyle,
      option.params.intLineWidth
    );

    for (const item in option.style) {
      LODOP.SET_PRINT_STYLEA(0, item, option.style[item]);
    }
  }


  // 二维码组件
  drawBarcode (option) {
    LODOP.ADD_PRINT_BARCODE(
      option.params.Top,
      option.params.Left,
      option.params.Width,
      option.params.Height,
      option.params.CodeType || 'QRCode',
      option.params. CodeValue
    );

    for (const item in option.style) {
      LODOP.SET_PRINT_STYLEA(0, item, option.style[item]);
    }
  }

  // 条形码组件
  drawBarcode (option) {
    LODOP.ADD_PRINT_BARCODE(
      option.params.Top,
      option.params.Left,
      option.params.Width,
      option.params.Height,
      option.params.CodeType || '128A',
      option.params. CodeValue
    );

    for (const item in option.style) {
      LODOP.SET_PRINT_STYLEA(0, item, option.style[item]);
    }
  }
  
  // 图片组件
  drawImage (option) {
    LODOP.ADD_PRINT_IMAGE(
      option.params.Top,
      option.params.Left,
      option.params.Width,
      option.params.Height,
      option.params.strContent
    );

    for (const item in option.style) {
      LODOP.SET_PRINT_STYLEA(0, item, option.style[item]);
    }
  }

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
    LODOP.SET_PRINT_STYLEA(0, 'ItemType', 1);
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
    this._constructTableHead(rowHeaderArr, propColumns, option.itemsModel, 0);
    rowHeaderArr.map((item) => tableHeader += '<tr>' + item + '</tr>');
    const lineNum = option.params.lineNum;
    // 渲染空白行
    const blankRow = lineNum - (tableData.length % lineNum);
    if (blankRow !== lineNum) {
      for (let x = 1; x <= blankRow; x++) {
        blankStr += `<tr height="${option.params.lineHeight}px">`;
        for (let y = 1; y <= propColumns.length; y++) {
          blankStr += '<td style="border: solid 1px black;"></td>';
        }
        blankStr += '</tr>';
      }
    }
    // 渲染
    tableData.map((item) => {
      tableBody += `<tr height="${option.params.lineHeight}px">`;
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
                        <div align="${iitem.align}" style="max-height:${option.params.lineHeight}px;overflow: hidden;padding: 0px 2px;">
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
    const tableHtml = `<table class="table-paging-content" width="${option.params.Width}"
                        style ="font-family: '宋体', Arial, Helvetica, sans-serif;border-collapse: collapse;font-size: 11px;">
                        <thead>${tableHeader}</thead>
                        <tbody>${tableBody + blankStr}</tbody>
                        <tfoot>${tableFooter}</tfoot>
                    </table>`;
    const tableHeight = lineNum * (option.params.lineHeight || 30) + 5;
    LODOP.ADD_PRINT_TABLE(
      option.params.Top,
      option.params.Left,
      option.params.Width,
      tableHeight,
      this._styleFlie + `<body>${tableHtml}</body>`
    );
    const width = this._config.SYSTEM_DEFAULT_CONF.PRINT_INITA.Width;
    const height = this._config.SYSTEM_DEFAULT_CONF.PRINT_INITA.Height;
    LODOP.ADD_PRINT_TEXT(height - 15, width / 2, 120, 30, '第#页/共&页');
    LODOP.SET_PRINT_STYLEA(0, 'ItemType', 2);
  }

  // 构造表头
  _constructTableHead (rowHeaderArr, propColumns, columns, level) {
    let tableHeader = '';
    rowHeaderArr[level] = rowHeaderArr[level] || '';
    columns.map((column, index) => {
      tableHeader = `<th nowrap width="${column.width}" colspan="${column.colSpan || 1}" rowspan="${column.rowSpan || 1}"
                      style="font-size: 12px;font-weight: 500;border: solid 1px black;">
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
    if (!Array.isArray(option.config)) {
      const keyArr = Object.keys(option.config).sort(option.config.label)
      const ret = []
      keyArr.forEach(row => {
        ret.push(
          {
            label: option.config[row],
            colSpan: Math.floor(24 / keyArr.length)
          }
        )
      })
      option.config = ret
    }
    let tableHtml = '<tr height="22px" >'
    option.config.forEach(function (row) {
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
    tableHtml = `</tr><table class="table-layout-content" border
        style ="font-family: '宋体', Arial, Helvetica, sans-serif;border-collapse: collapse;font-size: 12px;"
        width="${option.params.Width}" >${tableHtml}</table>`
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

  PREVIEW () {
    LODOP.PREVIEW();
  }
}
