var lodopPrint = (function (exports) {
  'use strict';

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

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  /**
   * A faster alternative to `Function#apply`, this function invokes `func`
   * with the `this` binding of `thisArg` and the arguments of `args`.
   *
   * @private
   * @param {Function} func The function to invoke.
   * @param {*} thisArg The `this` binding of `func`.
   * @param {Array} args The arguments to invoke `func` with.
   * @returns {*} Returns the result of `func`.
   */

  function apply$2(func, thisArg, args) {
    switch (args.length) {
      case 0: return func.call(thisArg);
      case 1: return func.call(thisArg, args[0]);
      case 2: return func.call(thisArg, args[0], args[1]);
      case 3: return func.call(thisArg, args[0], args[1], args[2]);
    }
    return func.apply(thisArg, args);
  }

  var _apply = apply$2;

  /**
   * This method returns the first argument it receives.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Util
   * @param {*} value Any value.
   * @returns {*} Returns `value`.
   * @example
   *
   * var object = { 'a': 1 };
   *
   * console.log(_.identity(object) === object);
   * // => true
   */

  function identity$2(value) {
    return value;
  }

  var identity_1 = identity$2;

  var apply$1 = _apply;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeMax = Math.max;

  /**
   * A specialized version of `baseRest` which transforms the rest array.
   *
   * @private
   * @param {Function} func The function to apply a rest parameter to.
   * @param {number} [start=func.length-1] The start position of the rest parameter.
   * @param {Function} transform The rest array transform.
   * @returns {Function} Returns the new function.
   */
  function overRest$1(func, start, transform) {
    start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
    return function() {
      var args = arguments,
          index = -1,
          length = nativeMax(args.length - start, 0),
          array = Array(length);

      while (++index < length) {
        array[index] = args[start + index];
      }
      index = -1;
      var otherArgs = Array(start + 1);
      while (++index < start) {
        otherArgs[index] = args[index];
      }
      otherArgs[start] = transform(array);
      return apply$1(func, this, otherArgs);
    };
  }

  var _overRest = overRest$1;

  /**
   * Creates a function that returns `value`.
   *
   * @static
   * @memberOf _
   * @since 2.4.0
   * @category Util
   * @param {*} value The value to return from the new function.
   * @returns {Function} Returns the new constant function.
   * @example
   *
   * var objects = _.times(2, _.constant({ 'a': 1 }));
   *
   * console.log(objects);
   * // => [{ 'a': 1 }, { 'a': 1 }]
   *
   * console.log(objects[0] === objects[1]);
   * // => true
   */

  function constant$1(value) {
    return function() {
      return value;
    };
  }

  var constant_1 = constant$1;

  /** Detect free variable `global` from Node.js. */

  var freeGlobal$1 = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

  var _freeGlobal = freeGlobal$1;

  var freeGlobal = _freeGlobal;

  /** Detect free variable `self`. */
  var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

  /** Used as a reference to the global object. */
  var root$4 = freeGlobal || freeSelf || Function('return this')();

  var _root = root$4;

  var root$3 = _root;

  /** Built-in value references. */
  var Symbol$2 = root$3.Symbol;

  var _Symbol = Symbol$2;

  var Symbol$1 = _Symbol;

  /** Used for built-in method references. */
  var objectProto$a = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$8 = objectProto$a.hasOwnProperty;

  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */
  var nativeObjectToString$1 = objectProto$a.toString;

  /** Built-in value references. */
  var symToStringTag$1 = Symbol$1 ? Symbol$1.toStringTag : undefined;

  /**
   * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the raw `toStringTag`.
   */
  function getRawTag$1(value) {
    var isOwn = hasOwnProperty$8.call(value, symToStringTag$1),
        tag = value[symToStringTag$1];

    try {
      value[symToStringTag$1] = undefined;
      var unmasked = true;
    } catch (e) {}

    var result = nativeObjectToString$1.call(value);
    if (unmasked) {
      if (isOwn) {
        value[symToStringTag$1] = tag;
      } else {
        delete value[symToStringTag$1];
      }
    }
    return result;
  }

  var _getRawTag = getRawTag$1;

  /** Used for built-in method references. */

  var objectProto$9 = Object.prototype;

  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */
  var nativeObjectToString = objectProto$9.toString;

  /**
   * Converts `value` to a string using `Object.prototype.toString`.
   *
   * @private
   * @param {*} value The value to convert.
   * @returns {string} Returns the converted string.
   */
  function objectToString$1(value) {
    return nativeObjectToString.call(value);
  }

  var _objectToString = objectToString$1;

  var Symbol = _Symbol,
      getRawTag = _getRawTag,
      objectToString = _objectToString;

  /** `Object#toString` result references. */
  var nullTag = '[object Null]',
      undefinedTag = '[object Undefined]';

  /** Built-in value references. */
  var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

  /**
   * The base implementation of `getTag` without fallbacks for buggy environments.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the `toStringTag`.
   */
  function baseGetTag$4(value) {
    if (value == null) {
      return value === undefined ? undefinedTag : nullTag;
    }
    return (symToStringTag && symToStringTag in Object(value))
      ? getRawTag(value)
      : objectToString(value);
  }

  var _baseGetTag = baseGetTag$4;

  /**
   * Checks if `value` is the
   * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
   * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an object, else `false`.
   * @example
   *
   * _.isObject({});
   * // => true
   *
   * _.isObject([1, 2, 3]);
   * // => true
   *
   * _.isObject(_.noop);
   * // => true
   *
   * _.isObject(null);
   * // => false
   */

  function isObject$8(value) {
    var type = typeof value;
    return value != null && (type == 'object' || type == 'function');
  }

  var isObject_1 = isObject$8;

  var baseGetTag$3 = _baseGetTag,
      isObject$7 = isObject_1;

  /** `Object#toString` result references. */
  var asyncTag = '[object AsyncFunction]',
      funcTag$1 = '[object Function]',
      genTag = '[object GeneratorFunction]',
      proxyTag = '[object Proxy]';

  /**
   * Checks if `value` is classified as a `Function` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a function, else `false`.
   * @example
   *
   * _.isFunction(_);
   * // => true
   *
   * _.isFunction(/abc/);
   * // => false
   */
  function isFunction$3(value) {
    if (!isObject$7(value)) {
      return false;
    }
    // The use of `Object#toString` avoids issues with the `typeof` operator
    // in Safari 9 which returns 'object' for typed arrays and other constructors.
    var tag = baseGetTag$3(value);
    return tag == funcTag$1 || tag == genTag || tag == asyncTag || tag == proxyTag;
  }

  var isFunction_1 = isFunction$3;

  var root$2 = _root;

  /** Used to detect overreaching core-js shims. */
  var coreJsData$1 = root$2['__core-js_shared__'];

  var _coreJsData = coreJsData$1;

  var coreJsData = _coreJsData;

  /** Used to detect methods masquerading as native. */
  var maskSrcKey = (function() {
    var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
    return uid ? ('Symbol(src)_1.' + uid) : '';
  }());

  /**
   * Checks if `func` has its source masked.
   *
   * @private
   * @param {Function} func The function to check.
   * @returns {boolean} Returns `true` if `func` is masked, else `false`.
   */
  function isMasked$1(func) {
    return !!maskSrcKey && (maskSrcKey in func);
  }

  var _isMasked = isMasked$1;

  /** Used for built-in method references. */

  var funcProto$2 = Function.prototype;

  /** Used to resolve the decompiled source of functions. */
  var funcToString$2 = funcProto$2.toString;

  /**
   * Converts `func` to its source code.
   *
   * @private
   * @param {Function} func The function to convert.
   * @returns {string} Returns the source code.
   */
  function toSource$1(func) {
    if (func != null) {
      try {
        return funcToString$2.call(func);
      } catch (e) {}
      try {
        return (func + '');
      } catch (e) {}
    }
    return '';
  }

  var _toSource = toSource$1;

  var isFunction$2 = isFunction_1,
      isMasked = _isMasked,
      isObject$6 = isObject_1,
      toSource = _toSource;

  /**
   * Used to match `RegExp`
   * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
   */
  var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

  /** Used to detect host constructors (Safari). */
  var reIsHostCtor = /^\[object .+?Constructor\]$/;

  /** Used for built-in method references. */
  var funcProto$1 = Function.prototype,
      objectProto$8 = Object.prototype;

  /** Used to resolve the decompiled source of functions. */
  var funcToString$1 = funcProto$1.toString;

  /** Used to check objects for own properties. */
  var hasOwnProperty$7 = objectProto$8.hasOwnProperty;

  /** Used to detect if a method is native. */
  var reIsNative = RegExp('^' +
    funcToString$1.call(hasOwnProperty$7).replace(reRegExpChar, '\\$&')
    .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
  );

  /**
   * The base implementation of `_.isNative` without bad shim checks.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a native function,
   *  else `false`.
   */
  function baseIsNative$1(value) {
    if (!isObject$6(value) || isMasked(value)) {
      return false;
    }
    var pattern = isFunction$2(value) ? reIsNative : reIsHostCtor;
    return pattern.test(toSource(value));
  }

  var _baseIsNative = baseIsNative$1;

  /**
   * Gets the value at `key` of `object`.
   *
   * @private
   * @param {Object} [object] The object to query.
   * @param {string} key The key of the property to get.
   * @returns {*} Returns the property value.
   */

  function getValue$1(object, key) {
    return object == null ? undefined : object[key];
  }

  var _getValue = getValue$1;

  var baseIsNative = _baseIsNative,
      getValue = _getValue;

  /**
   * Gets the native function at `key` of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {string} key The key of the method to get.
   * @returns {*} Returns the function if it's native, else `undefined`.
   */
  function getNative$3(object, key) {
    var value = getValue(object, key);
    return baseIsNative(value) ? value : undefined;
  }

  var _getNative = getNative$3;

  var getNative$2 = _getNative;

  var defineProperty$2 = (function() {
    try {
      var func = getNative$2(Object, 'defineProperty');
      func({}, '', {});
      return func;
    } catch (e) {}
  }());

  var _defineProperty = defineProperty$2;

  var constant = constant_1,
      defineProperty$1 = _defineProperty,
      identity$1 = identity_1;

  /**
   * The base implementation of `setToString` without support for hot loop shorting.
   *
   * @private
   * @param {Function} func The function to modify.
   * @param {Function} string The `toString` result.
   * @returns {Function} Returns `func`.
   */
  var baseSetToString$1 = !defineProperty$1 ? identity$1 : function(func, string) {
    return defineProperty$1(func, 'toString', {
      'configurable': true,
      'enumerable': false,
      'value': constant(string),
      'writable': true
    });
  };

  var _baseSetToString = baseSetToString$1;

  /** Used to detect hot functions by number of calls within a span of milliseconds. */

  var HOT_COUNT = 800,
      HOT_SPAN = 16;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeNow = Date.now;

  /**
   * Creates a function that'll short out and invoke `identity` instead
   * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
   * milliseconds.
   *
   * @private
   * @param {Function} func The function to restrict.
   * @returns {Function} Returns the new shortable function.
   */
  function shortOut$1(func) {
    var count = 0,
        lastCalled = 0;

    return function() {
      var stamp = nativeNow(),
          remaining = HOT_SPAN - (stamp - lastCalled);

      lastCalled = stamp;
      if (remaining > 0) {
        if (++count >= HOT_COUNT) {
          return arguments[0];
        }
      } else {
        count = 0;
      }
      return func.apply(undefined, arguments);
    };
  }

  var _shortOut = shortOut$1;

  var baseSetToString = _baseSetToString,
      shortOut = _shortOut;

  /**
   * Sets the `toString` method of `func` to return `string`.
   *
   * @private
   * @param {Function} func The function to modify.
   * @param {Function} string The `toString` result.
   * @returns {Function} Returns `func`.
   */
  var setToString$1 = shortOut(baseSetToString);

  var _setToString = setToString$1;

  var identity = identity_1,
      overRest = _overRest,
      setToString = _setToString;

  /**
   * The base implementation of `_.rest` which doesn't validate or coerce arguments.
   *
   * @private
   * @param {Function} func The function to apply a rest parameter to.
   * @param {number} [start=func.length-1] The start position of the rest parameter.
   * @returns {Function} Returns the new function.
   */
  function baseRest$2(func, start) {
    return setToString(overRest(func, start, identity), func + '');
  }

  var _baseRest = baseRest$2;

  /**
   * Removes all key-value entries from the list cache.
   *
   * @private
   * @name clear
   * @memberOf ListCache
   */

  function listCacheClear$1() {
    this.__data__ = [];
    this.size = 0;
  }

  var _listCacheClear = listCacheClear$1;

  /**
   * Performs a
   * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
   * comparison between two values to determine if they are equivalent.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to compare.
   * @param {*} other The other value to compare.
   * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
   * @example
   *
   * var object = { 'a': 1 };
   * var other = { 'a': 1 };
   *
   * _.eq(object, object);
   * // => true
   *
   * _.eq(object, other);
   * // => false
   *
   * _.eq('a', 'a');
   * // => true
   *
   * _.eq('a', Object('a'));
   * // => false
   *
   * _.eq(NaN, NaN);
   * // => true
   */

  function eq$4(value, other) {
    return value === other || (value !== value && other !== other);
  }

  var eq_1 = eq$4;

  var eq$3 = eq_1;

  /**
   * Gets the index at which the `key` is found in `array` of key-value pairs.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} key The key to search for.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function assocIndexOf$4(array, key) {
    var length = array.length;
    while (length--) {
      if (eq$3(array[length][0], key)) {
        return length;
      }
    }
    return -1;
  }

  var _assocIndexOf = assocIndexOf$4;

  var assocIndexOf$3 = _assocIndexOf;

  /** Used for built-in method references. */
  var arrayProto = Array.prototype;

  /** Built-in value references. */
  var splice = arrayProto.splice;

  /**
   * Removes `key` and its value from the list cache.
   *
   * @private
   * @name delete
   * @memberOf ListCache
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function listCacheDelete$1(key) {
    var data = this.__data__,
        index = assocIndexOf$3(data, key);

    if (index < 0) {
      return false;
    }
    var lastIndex = data.length - 1;
    if (index == lastIndex) {
      data.pop();
    } else {
      splice.call(data, index, 1);
    }
    --this.size;
    return true;
  }

  var _listCacheDelete = listCacheDelete$1;

  var assocIndexOf$2 = _assocIndexOf;

  /**
   * Gets the list cache value for `key`.
   *
   * @private
   * @name get
   * @memberOf ListCache
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function listCacheGet$1(key) {
    var data = this.__data__,
        index = assocIndexOf$2(data, key);

    return index < 0 ? undefined : data[index][1];
  }

  var _listCacheGet = listCacheGet$1;

  var assocIndexOf$1 = _assocIndexOf;

  /**
   * Checks if a list cache value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf ListCache
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function listCacheHas$1(key) {
    return assocIndexOf$1(this.__data__, key) > -1;
  }

  var _listCacheHas = listCacheHas$1;

  var assocIndexOf = _assocIndexOf;

  /**
   * Sets the list cache `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf ListCache
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the list cache instance.
   */
  function listCacheSet$1(key, value) {
    var data = this.__data__,
        index = assocIndexOf(data, key);

    if (index < 0) {
      ++this.size;
      data.push([key, value]);
    } else {
      data[index][1] = value;
    }
    return this;
  }

  var _listCacheSet = listCacheSet$1;

  var listCacheClear = _listCacheClear,
      listCacheDelete = _listCacheDelete,
      listCacheGet = _listCacheGet,
      listCacheHas = _listCacheHas,
      listCacheSet = _listCacheSet;

  /**
   * Creates an list cache object.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function ListCache$4(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;

    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }

  // Add methods to `ListCache`.
  ListCache$4.prototype.clear = listCacheClear;
  ListCache$4.prototype['delete'] = listCacheDelete;
  ListCache$4.prototype.get = listCacheGet;
  ListCache$4.prototype.has = listCacheHas;
  ListCache$4.prototype.set = listCacheSet;

  var _ListCache = ListCache$4;

  var ListCache$3 = _ListCache;

  /**
   * Removes all key-value entries from the stack.
   *
   * @private
   * @name clear
   * @memberOf Stack
   */
  function stackClear$1() {
    this.__data__ = new ListCache$3;
    this.size = 0;
  }

  var _stackClear = stackClear$1;

  /**
   * Removes `key` and its value from the stack.
   *
   * @private
   * @name delete
   * @memberOf Stack
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */

  function stackDelete$1(key) {
    var data = this.__data__,
        result = data['delete'](key);

    this.size = data.size;
    return result;
  }

  var _stackDelete = stackDelete$1;

  /**
   * Gets the stack value for `key`.
   *
   * @private
   * @name get
   * @memberOf Stack
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */

  function stackGet$1(key) {
    return this.__data__.get(key);
  }

  var _stackGet = stackGet$1;

  /**
   * Checks if a stack value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf Stack
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */

  function stackHas$1(key) {
    return this.__data__.has(key);
  }

  var _stackHas = stackHas$1;

  var getNative$1 = _getNative,
      root$1 = _root;

  /* Built-in method references that are verified to be native. */
  var Map$2 = getNative$1(root$1, 'Map');

  var _Map = Map$2;

  var getNative = _getNative;

  /* Built-in method references that are verified to be native. */
  var nativeCreate$4 = getNative(Object, 'create');

  var _nativeCreate = nativeCreate$4;

  var nativeCreate$3 = _nativeCreate;

  /**
   * Removes all key-value entries from the hash.
   *
   * @private
   * @name clear
   * @memberOf Hash
   */
  function hashClear$1() {
    this.__data__ = nativeCreate$3 ? nativeCreate$3(null) : {};
    this.size = 0;
  }

  var _hashClear = hashClear$1;

  /**
   * Removes `key` and its value from the hash.
   *
   * @private
   * @name delete
   * @memberOf Hash
   * @param {Object} hash The hash to modify.
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */

  function hashDelete$1(key) {
    var result = this.has(key) && delete this.__data__[key];
    this.size -= result ? 1 : 0;
    return result;
  }

  var _hashDelete = hashDelete$1;

  var nativeCreate$2 = _nativeCreate;

  /** Used to stand-in for `undefined` hash values. */
  var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';

  /** Used for built-in method references. */
  var objectProto$7 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$6 = objectProto$7.hasOwnProperty;

  /**
   * Gets the hash value for `key`.
   *
   * @private
   * @name get
   * @memberOf Hash
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function hashGet$1(key) {
    var data = this.__data__;
    if (nativeCreate$2) {
      var result = data[key];
      return result === HASH_UNDEFINED$1 ? undefined : result;
    }
    return hasOwnProperty$6.call(data, key) ? data[key] : undefined;
  }

  var _hashGet = hashGet$1;

  var nativeCreate$1 = _nativeCreate;

  /** Used for built-in method references. */
  var objectProto$6 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$5 = objectProto$6.hasOwnProperty;

  /**
   * Checks if a hash value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf Hash
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function hashHas$1(key) {
    var data = this.__data__;
    return nativeCreate$1 ? (data[key] !== undefined) : hasOwnProperty$5.call(data, key);
  }

  var _hashHas = hashHas$1;

  var nativeCreate = _nativeCreate;

  /** Used to stand-in for `undefined` hash values. */
  var HASH_UNDEFINED = '__lodash_hash_undefined__';

  /**
   * Sets the hash `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf Hash
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the hash instance.
   */
  function hashSet$1(key, value) {
    var data = this.__data__;
    this.size += this.has(key) ? 0 : 1;
    data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
    return this;
  }

  var _hashSet = hashSet$1;

  var hashClear = _hashClear,
      hashDelete = _hashDelete,
      hashGet = _hashGet,
      hashHas = _hashHas,
      hashSet = _hashSet;

  /**
   * Creates a hash object.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function Hash$1(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;

    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }

  // Add methods to `Hash`.
  Hash$1.prototype.clear = hashClear;
  Hash$1.prototype['delete'] = hashDelete;
  Hash$1.prototype.get = hashGet;
  Hash$1.prototype.has = hashHas;
  Hash$1.prototype.set = hashSet;

  var _Hash = Hash$1;

  var Hash = _Hash,
      ListCache$2 = _ListCache,
      Map$1 = _Map;

  /**
   * Removes all key-value entries from the map.
   *
   * @private
   * @name clear
   * @memberOf MapCache
   */
  function mapCacheClear$1() {
    this.size = 0;
    this.__data__ = {
      'hash': new Hash,
      'map': new (Map$1 || ListCache$2),
      'string': new Hash
    };
  }

  var _mapCacheClear = mapCacheClear$1;

  /**
   * Checks if `value` is suitable for use as unique object key.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
   */

  function isKeyable$1(value) {
    var type = typeof value;
    return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
      ? (value !== '__proto__')
      : (value === null);
  }

  var _isKeyable = isKeyable$1;

  var isKeyable = _isKeyable;

  /**
   * Gets the data for `map`.
   *
   * @private
   * @param {Object} map The map to query.
   * @param {string} key The reference key.
   * @returns {*} Returns the map data.
   */
  function getMapData$4(map, key) {
    var data = map.__data__;
    return isKeyable(key)
      ? data[typeof key == 'string' ? 'string' : 'hash']
      : data.map;
  }

  var _getMapData = getMapData$4;

  var getMapData$3 = _getMapData;

  /**
   * Removes `key` and its value from the map.
   *
   * @private
   * @name delete
   * @memberOf MapCache
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function mapCacheDelete$1(key) {
    var result = getMapData$3(this, key)['delete'](key);
    this.size -= result ? 1 : 0;
    return result;
  }

  var _mapCacheDelete = mapCacheDelete$1;

  var getMapData$2 = _getMapData;

  /**
   * Gets the map value for `key`.
   *
   * @private
   * @name get
   * @memberOf MapCache
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function mapCacheGet$1(key) {
    return getMapData$2(this, key).get(key);
  }

  var _mapCacheGet = mapCacheGet$1;

  var getMapData$1 = _getMapData;

  /**
   * Checks if a map value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf MapCache
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function mapCacheHas$1(key) {
    return getMapData$1(this, key).has(key);
  }

  var _mapCacheHas = mapCacheHas$1;

  var getMapData = _getMapData;

  /**
   * Sets the map `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf MapCache
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the map cache instance.
   */
  function mapCacheSet$1(key, value) {
    var data = getMapData(this, key),
        size = data.size;

    data.set(key, value);
    this.size += data.size == size ? 0 : 1;
    return this;
  }

  var _mapCacheSet = mapCacheSet$1;

  var mapCacheClear = _mapCacheClear,
      mapCacheDelete = _mapCacheDelete,
      mapCacheGet = _mapCacheGet,
      mapCacheHas = _mapCacheHas,
      mapCacheSet = _mapCacheSet;

  /**
   * Creates a map cache object to store key-value pairs.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function MapCache$1(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;

    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }

  // Add methods to `MapCache`.
  MapCache$1.prototype.clear = mapCacheClear;
  MapCache$1.prototype['delete'] = mapCacheDelete;
  MapCache$1.prototype.get = mapCacheGet;
  MapCache$1.prototype.has = mapCacheHas;
  MapCache$1.prototype.set = mapCacheSet;

  var _MapCache = MapCache$1;

  var ListCache$1 = _ListCache,
      Map = _Map,
      MapCache = _MapCache;

  /** Used as the size to enable large array optimizations. */
  var LARGE_ARRAY_SIZE = 200;

  /**
   * Sets the stack `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf Stack
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the stack cache instance.
   */
  function stackSet$1(key, value) {
    var data = this.__data__;
    if (data instanceof ListCache$1) {
      var pairs = data.__data__;
      if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
        pairs.push([key, value]);
        this.size = ++data.size;
        return this;
      }
      data = this.__data__ = new MapCache(pairs);
    }
    data.set(key, value);
    this.size = data.size;
    return this;
  }

  var _stackSet = stackSet$1;

  var ListCache = _ListCache,
      stackClear = _stackClear,
      stackDelete = _stackDelete,
      stackGet = _stackGet,
      stackHas = _stackHas,
      stackSet = _stackSet;

  /**
   * Creates a stack cache object to store key-value pairs.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function Stack$1(entries) {
    var data = this.__data__ = new ListCache(entries);
    this.size = data.size;
  }

  // Add methods to `Stack`.
  Stack$1.prototype.clear = stackClear;
  Stack$1.prototype['delete'] = stackDelete;
  Stack$1.prototype.get = stackGet;
  Stack$1.prototype.has = stackHas;
  Stack$1.prototype.set = stackSet;

  var _Stack = Stack$1;

  var defineProperty = _defineProperty;

  /**
   * The base implementation of `assignValue` and `assignMergeValue` without
   * value checks.
   *
   * @private
   * @param {Object} object The object to modify.
   * @param {string} key The key of the property to assign.
   * @param {*} value The value to assign.
   */
  function baseAssignValue$3(object, key, value) {
    if (key == '__proto__' && defineProperty) {
      defineProperty(object, key, {
        'configurable': true,
        'enumerable': true,
        'value': value,
        'writable': true
      });
    } else {
      object[key] = value;
    }
  }

  var _baseAssignValue = baseAssignValue$3;

  var baseAssignValue$2 = _baseAssignValue,
      eq$2 = eq_1;

  /**
   * This function is like `assignValue` except that it doesn't assign
   * `undefined` values.
   *
   * @private
   * @param {Object} object The object to modify.
   * @param {string} key The key of the property to assign.
   * @param {*} value The value to assign.
   */
  function assignMergeValue$2(object, key, value) {
    if ((value !== undefined && !eq$2(object[key], value)) ||
        (value === undefined && !(key in object))) {
      baseAssignValue$2(object, key, value);
    }
  }

  var _assignMergeValue = assignMergeValue$2;

  /**
   * Creates a base function for methods like `_.forIn` and `_.forOwn`.
   *
   * @private
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {Function} Returns the new base function.
   */

  function createBaseFor$1(fromRight) {
    return function(object, iteratee, keysFunc) {
      var index = -1,
          iterable = Object(object),
          props = keysFunc(object),
          length = props.length;

      while (length--) {
        var key = props[fromRight ? length : ++index];
        if (iteratee(iterable[key], key, iterable) === false) {
          break;
        }
      }
      return object;
    };
  }

  var _createBaseFor = createBaseFor$1;

  var createBaseFor = _createBaseFor;

  /**
   * The base implementation of `baseForOwn` which iterates over `object`
   * properties returned by `keysFunc` and invokes `iteratee` for each property.
   * Iteratee functions may exit iteration early by explicitly returning `false`.
   *
   * @private
   * @param {Object} object The object to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @param {Function} keysFunc The function to get the keys of `object`.
   * @returns {Object} Returns `object`.
   */
  var baseFor$1 = createBaseFor();

  var _baseFor = baseFor$1;

  var _cloneBuffer = {exports: {}};

  (function (module, exports) {
  var root = _root;

  /** Detect free variable `exports`. */
  var freeExports = exports && !exports.nodeType && exports;

  /** Detect free variable `module`. */
  var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

  /** Detect the popular CommonJS extension `module.exports`. */
  var moduleExports = freeModule && freeModule.exports === freeExports;

  /** Built-in value references. */
  var Buffer = moduleExports ? root.Buffer : undefined,
      allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;

  /**
   * Creates a clone of  `buffer`.
   *
   * @private
   * @param {Buffer} buffer The buffer to clone.
   * @param {boolean} [isDeep] Specify a deep clone.
   * @returns {Buffer} Returns the cloned buffer.
   */
  function cloneBuffer(buffer, isDeep) {
    if (isDeep) {
      return buffer.slice();
    }
    var length = buffer.length,
        result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

    buffer.copy(result);
    return result;
  }

  module.exports = cloneBuffer;
  }(_cloneBuffer, _cloneBuffer.exports));

  var root = _root;

  /** Built-in value references. */
  var Uint8Array$1 = root.Uint8Array;

  var _Uint8Array = Uint8Array$1;

  var Uint8Array = _Uint8Array;

  /**
   * Creates a clone of `arrayBuffer`.
   *
   * @private
   * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
   * @returns {ArrayBuffer} Returns the cloned array buffer.
   */
  function cloneArrayBuffer$1(arrayBuffer) {
    var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
    new Uint8Array(result).set(new Uint8Array(arrayBuffer));
    return result;
  }

  var _cloneArrayBuffer = cloneArrayBuffer$1;

  var cloneArrayBuffer = _cloneArrayBuffer;

  /**
   * Creates a clone of `typedArray`.
   *
   * @private
   * @param {Object} typedArray The typed array to clone.
   * @param {boolean} [isDeep] Specify a deep clone.
   * @returns {Object} Returns the cloned typed array.
   */
  function cloneTypedArray$1(typedArray, isDeep) {
    var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
    return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
  }

  var _cloneTypedArray = cloneTypedArray$1;

  /**
   * Copies the values of `source` to `array`.
   *
   * @private
   * @param {Array} source The array to copy values from.
   * @param {Array} [array=[]] The array to copy values to.
   * @returns {Array} Returns `array`.
   */

  function copyArray$1(source, array) {
    var index = -1,
        length = source.length;

    array || (array = Array(length));
    while (++index < length) {
      array[index] = source[index];
    }
    return array;
  }

  var _copyArray = copyArray$1;

  var isObject$5 = isObject_1;

  /** Built-in value references. */
  var objectCreate = Object.create;

  /**
   * The base implementation of `_.create` without support for assigning
   * properties to the created object.
   *
   * @private
   * @param {Object} proto The object to inherit from.
   * @returns {Object} Returns the new object.
   */
  var baseCreate$1 = (function() {
    function object() {}
    return function(proto) {
      if (!isObject$5(proto)) {
        return {};
      }
      if (objectCreate) {
        return objectCreate(proto);
      }
      object.prototype = proto;
      var result = new object;
      object.prototype = undefined;
      return result;
    };
  }());

  var _baseCreate = baseCreate$1;

  /**
   * Creates a unary function that invokes `func` with its argument transformed.
   *
   * @private
   * @param {Function} func The function to wrap.
   * @param {Function} transform The argument transform.
   * @returns {Function} Returns the new function.
   */

  function overArg$1(func, transform) {
    return function(arg) {
      return func(transform(arg));
    };
  }

  var _overArg = overArg$1;

  var overArg = _overArg;

  /** Built-in value references. */
  var getPrototype$2 = overArg(Object.getPrototypeOf, Object);

  var _getPrototype = getPrototype$2;

  /** Used for built-in method references. */

  var objectProto$5 = Object.prototype;

  /**
   * Checks if `value` is likely a prototype object.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
   */
  function isPrototype$2(value) {
    var Ctor = value && value.constructor,
        proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto$5;

    return value === proto;
  }

  var _isPrototype = isPrototype$2;

  var baseCreate = _baseCreate,
      getPrototype$1 = _getPrototype,
      isPrototype$1 = _isPrototype;

  /**
   * Initializes an object clone.
   *
   * @private
   * @param {Object} object The object to clone.
   * @returns {Object} Returns the initialized clone.
   */
  function initCloneObject$1(object) {
    return (typeof object.constructor == 'function' && !isPrototype$1(object))
      ? baseCreate(getPrototype$1(object))
      : {};
  }

  var _initCloneObject = initCloneObject$1;

  /**
   * Checks if `value` is object-like. A value is object-like if it's not `null`
   * and has a `typeof` result of "object".
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
   * @example
   *
   * _.isObjectLike({});
   * // => true
   *
   * _.isObjectLike([1, 2, 3]);
   * // => true
   *
   * _.isObjectLike(_.noop);
   * // => false
   *
   * _.isObjectLike(null);
   * // => false
   */

  function isObjectLike$5(value) {
    return value != null && typeof value == 'object';
  }

  var isObjectLike_1 = isObjectLike$5;

  var baseGetTag$2 = _baseGetTag,
      isObjectLike$4 = isObjectLike_1;

  /** `Object#toString` result references. */
  var argsTag$1 = '[object Arguments]';

  /**
   * The base implementation of `_.isArguments`.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an `arguments` object,
   */
  function baseIsArguments$1(value) {
    return isObjectLike$4(value) && baseGetTag$2(value) == argsTag$1;
  }

  var _baseIsArguments = baseIsArguments$1;

  var baseIsArguments = _baseIsArguments,
      isObjectLike$3 = isObjectLike_1;

  /** Used for built-in method references. */
  var objectProto$4 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$4 = objectProto$4.hasOwnProperty;

  /** Built-in value references. */
  var propertyIsEnumerable = objectProto$4.propertyIsEnumerable;

  /**
   * Checks if `value` is likely an `arguments` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an `arguments` object,
   *  else `false`.
   * @example
   *
   * _.isArguments(function() { return arguments; }());
   * // => true
   *
   * _.isArguments([1, 2, 3]);
   * // => false
   */
  var isArguments$2 = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
    return isObjectLike$3(value) && hasOwnProperty$4.call(value, 'callee') &&
      !propertyIsEnumerable.call(value, 'callee');
  };

  var isArguments_1 = isArguments$2;

  /**
   * Checks if `value` is classified as an `Array` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an array, else `false`.
   * @example
   *
   * _.isArray([1, 2, 3]);
   * // => true
   *
   * _.isArray(document.body.children);
   * // => false
   *
   * _.isArray('abc');
   * // => false
   *
   * _.isArray(_.noop);
   * // => false
   */

  var isArray$2 = Array.isArray;

  var isArray_1 = isArray$2;

  /** Used as references for various `Number` constants. */

  var MAX_SAFE_INTEGER$1 = 9007199254740991;

  /**
   * Checks if `value` is a valid array-like length.
   *
   * **Note:** This method is loosely based on
   * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
   * @example
   *
   * _.isLength(3);
   * // => true
   *
   * _.isLength(Number.MIN_VALUE);
   * // => false
   *
   * _.isLength(Infinity);
   * // => false
   *
   * _.isLength('3');
   * // => false
   */
  function isLength$2(value) {
    return typeof value == 'number' &&
      value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER$1;
  }

  var isLength_1 = isLength$2;

  var isFunction$1 = isFunction_1,
      isLength$1 = isLength_1;

  /**
   * Checks if `value` is array-like. A value is considered array-like if it's
   * not a function and has a `value.length` that's an integer greater than or
   * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
   * @example
   *
   * _.isArrayLike([1, 2, 3]);
   * // => true
   *
   * _.isArrayLike(document.body.children);
   * // => true
   *
   * _.isArrayLike('abc');
   * // => true
   *
   * _.isArrayLike(_.noop);
   * // => false
   */
  function isArrayLike$3(value) {
    return value != null && isLength$1(value.length) && !isFunction$1(value);
  }

  var isArrayLike_1 = isArrayLike$3;

  var isArrayLike$2 = isArrayLike_1,
      isObjectLike$2 = isObjectLike_1;

  /**
   * This method is like `_.isArrayLike` except that it also checks if `value`
   * is an object.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an array-like object,
   *  else `false`.
   * @example
   *
   * _.isArrayLikeObject([1, 2, 3]);
   * // => true
   *
   * _.isArrayLikeObject(document.body.children);
   * // => true
   *
   * _.isArrayLikeObject('abc');
   * // => false
   *
   * _.isArrayLikeObject(_.noop);
   * // => false
   */
  function isArrayLikeObject$1(value) {
    return isObjectLike$2(value) && isArrayLike$2(value);
  }

  var isArrayLikeObject_1 = isArrayLikeObject$1;

  var isBuffer$2 = {exports: {}};

  /**
   * This method returns `false`.
   *
   * @static
   * @memberOf _
   * @since 4.13.0
   * @category Util
   * @returns {boolean} Returns `false`.
   * @example
   *
   * _.times(2, _.stubFalse);
   * // => [false, false]
   */

  function stubFalse() {
    return false;
  }

  var stubFalse_1 = stubFalse;

  (function (module, exports) {
  var root = _root,
      stubFalse = stubFalse_1;

  /** Detect free variable `exports`. */
  var freeExports = exports && !exports.nodeType && exports;

  /** Detect free variable `module`. */
  var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

  /** Detect the popular CommonJS extension `module.exports`. */
  var moduleExports = freeModule && freeModule.exports === freeExports;

  /** Built-in value references. */
  var Buffer = moduleExports ? root.Buffer : undefined;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

  /**
   * Checks if `value` is a buffer.
   *
   * @static
   * @memberOf _
   * @since 4.3.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
   * @example
   *
   * _.isBuffer(new Buffer(2));
   * // => true
   *
   * _.isBuffer(new Uint8Array(2));
   * // => false
   */
  var isBuffer = nativeIsBuffer || stubFalse;

  module.exports = isBuffer;
  }(isBuffer$2, isBuffer$2.exports));

  var baseGetTag$1 = _baseGetTag,
      getPrototype = _getPrototype,
      isObjectLike$1 = isObjectLike_1;

  /** `Object#toString` result references. */
  var objectTag$1 = '[object Object]';

  /** Used for built-in method references. */
  var funcProto = Function.prototype,
      objectProto$3 = Object.prototype;

  /** Used to resolve the decompiled source of functions. */
  var funcToString = funcProto.toString;

  /** Used to check objects for own properties. */
  var hasOwnProperty$3 = objectProto$3.hasOwnProperty;

  /** Used to infer the `Object` constructor. */
  var objectCtorString = funcToString.call(Object);

  /**
   * Checks if `value` is a plain object, that is, an object created by the
   * `Object` constructor or one with a `[[Prototype]]` of `null`.
   *
   * @static
   * @memberOf _
   * @since 0.8.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   * }
   *
   * _.isPlainObject(new Foo);
   * // => false
   *
   * _.isPlainObject([1, 2, 3]);
   * // => false
   *
   * _.isPlainObject({ 'x': 0, 'y': 0 });
   * // => true
   *
   * _.isPlainObject(Object.create(null));
   * // => true
   */
  function isPlainObject$1(value) {
    if (!isObjectLike$1(value) || baseGetTag$1(value) != objectTag$1) {
      return false;
    }
    var proto = getPrototype(value);
    if (proto === null) {
      return true;
    }
    var Ctor = hasOwnProperty$3.call(proto, 'constructor') && proto.constructor;
    return typeof Ctor == 'function' && Ctor instanceof Ctor &&
      funcToString.call(Ctor) == objectCtorString;
  }

  var isPlainObject_1 = isPlainObject$1;

  var baseGetTag = _baseGetTag,
      isLength = isLength_1,
      isObjectLike = isObjectLike_1;

  /** `Object#toString` result references. */
  var argsTag = '[object Arguments]',
      arrayTag = '[object Array]',
      boolTag = '[object Boolean]',
      dateTag = '[object Date]',
      errorTag = '[object Error]',
      funcTag = '[object Function]',
      mapTag = '[object Map]',
      numberTag = '[object Number]',
      objectTag = '[object Object]',
      regexpTag = '[object RegExp]',
      setTag = '[object Set]',
      stringTag = '[object String]',
      weakMapTag = '[object WeakMap]';

  var arrayBufferTag = '[object ArrayBuffer]',
      dataViewTag = '[object DataView]',
      float32Tag = '[object Float32Array]',
      float64Tag = '[object Float64Array]',
      int8Tag = '[object Int8Array]',
      int16Tag = '[object Int16Array]',
      int32Tag = '[object Int32Array]',
      uint8Tag = '[object Uint8Array]',
      uint8ClampedTag = '[object Uint8ClampedArray]',
      uint16Tag = '[object Uint16Array]',
      uint32Tag = '[object Uint32Array]';

  /** Used to identify `toStringTag` values of typed arrays. */
  var typedArrayTags = {};
  typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
  typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
  typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
  typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
  typedArrayTags[uint32Tag] = true;
  typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
  typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
  typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
  typedArrayTags[errorTag] = typedArrayTags[funcTag] =
  typedArrayTags[mapTag] = typedArrayTags[numberTag] =
  typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
  typedArrayTags[setTag] = typedArrayTags[stringTag] =
  typedArrayTags[weakMapTag] = false;

  /**
   * The base implementation of `_.isTypedArray` without Node.js optimizations.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
   */
  function baseIsTypedArray$1(value) {
    return isObjectLike(value) &&
      isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
  }

  var _baseIsTypedArray = baseIsTypedArray$1;

  /**
   * The base implementation of `_.unary` without support for storing metadata.
   *
   * @private
   * @param {Function} func The function to cap arguments for.
   * @returns {Function} Returns the new capped function.
   */

  function baseUnary$1(func) {
    return function(value) {
      return func(value);
    };
  }

  var _baseUnary = baseUnary$1;

  var _nodeUtil = {exports: {}};

  (function (module, exports) {
  var freeGlobal = _freeGlobal;

  /** Detect free variable `exports`. */
  var freeExports = exports && !exports.nodeType && exports;

  /** Detect free variable `module`. */
  var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

  /** Detect the popular CommonJS extension `module.exports`. */
  var moduleExports = freeModule && freeModule.exports === freeExports;

  /** Detect free variable `process` from Node.js. */
  var freeProcess = moduleExports && freeGlobal.process;

  /** Used to access faster Node.js helpers. */
  var nodeUtil = (function() {
    try {
      // Use `util.types` for Node.js 10+.
      var types = freeModule && freeModule.require && freeModule.require('util').types;

      if (types) {
        return types;
      }

      // Legacy `process.binding('util')` for Node.js < 10.
      return freeProcess && freeProcess.binding && freeProcess.binding('util');
    } catch (e) {}
  }());

  module.exports = nodeUtil;
  }(_nodeUtil, _nodeUtil.exports));

  var baseIsTypedArray = _baseIsTypedArray,
      baseUnary = _baseUnary,
      nodeUtil = _nodeUtil.exports;

  /* Node.js helper references. */
  var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

  /**
   * Checks if `value` is classified as a typed array.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
   * @example
   *
   * _.isTypedArray(new Uint8Array);
   * // => true
   *
   * _.isTypedArray([]);
   * // => false
   */
  var isTypedArray$2 = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

  var isTypedArray_1 = isTypedArray$2;

  /**
   * Gets the value at `key`, unless `key` is "__proto__" or "constructor".
   *
   * @private
   * @param {Object} object The object to query.
   * @param {string} key The key of the property to get.
   * @returns {*} Returns the property value.
   */

  function safeGet$2(object, key) {
    if (key === 'constructor' && typeof object[key] === 'function') {
      return;
    }

    if (key == '__proto__') {
      return;
    }

    return object[key];
  }

  var _safeGet = safeGet$2;

  var baseAssignValue$1 = _baseAssignValue,
      eq$1 = eq_1;

  /** Used for built-in method references. */
  var objectProto$2 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$2 = objectProto$2.hasOwnProperty;

  /**
   * Assigns `value` to `key` of `object` if the existing value is not equivalent
   * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
   * for equality comparisons.
   *
   * @private
   * @param {Object} object The object to modify.
   * @param {string} key The key of the property to assign.
   * @param {*} value The value to assign.
   */
  function assignValue$1(object, key, value) {
    var objValue = object[key];
    if (!(hasOwnProperty$2.call(object, key) && eq$1(objValue, value)) ||
        (value === undefined && !(key in object))) {
      baseAssignValue$1(object, key, value);
    }
  }

  var _assignValue = assignValue$1;

  var assignValue = _assignValue,
      baseAssignValue = _baseAssignValue;

  /**
   * Copies properties of `source` to `object`.
   *
   * @private
   * @param {Object} source The object to copy properties from.
   * @param {Array} props The property identifiers to copy.
   * @param {Object} [object={}] The object to copy properties to.
   * @param {Function} [customizer] The function to customize copied values.
   * @returns {Object} Returns `object`.
   */
  function copyObject$1(source, props, object, customizer) {
    var isNew = !object;
    object || (object = {});

    var index = -1,
        length = props.length;

    while (++index < length) {
      var key = props[index];

      var newValue = customizer
        ? customizer(object[key], source[key], key, object, source)
        : undefined;

      if (newValue === undefined) {
        newValue = source[key];
      }
      if (isNew) {
        baseAssignValue(object, key, newValue);
      } else {
        assignValue(object, key, newValue);
      }
    }
    return object;
  }

  var _copyObject = copyObject$1;

  /**
   * The base implementation of `_.times` without support for iteratee shorthands
   * or max array length checks.
   *
   * @private
   * @param {number} n The number of times to invoke `iteratee`.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the array of results.
   */

  function baseTimes$1(n, iteratee) {
    var index = -1,
        result = Array(n);

    while (++index < n) {
      result[index] = iteratee(index);
    }
    return result;
  }

  var _baseTimes = baseTimes$1;

  /** Used as references for various `Number` constants. */

  var MAX_SAFE_INTEGER = 9007199254740991;

  /** Used to detect unsigned integer values. */
  var reIsUint = /^(?:0|[1-9]\d*)$/;

  /**
   * Checks if `value` is a valid array-like index.
   *
   * @private
   * @param {*} value The value to check.
   * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
   * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
   */
  function isIndex$2(value, length) {
    var type = typeof value;
    length = length == null ? MAX_SAFE_INTEGER : length;

    return !!length &&
      (type == 'number' ||
        (type != 'symbol' && reIsUint.test(value))) &&
          (value > -1 && value % 1 == 0 && value < length);
  }

  var _isIndex = isIndex$2;

  var baseTimes = _baseTimes,
      isArguments$1 = isArguments_1,
      isArray$1 = isArray_1,
      isBuffer$1 = isBuffer$2.exports,
      isIndex$1 = _isIndex,
      isTypedArray$1 = isTypedArray_1;

  /** Used for built-in method references. */
  var objectProto$1 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$1 = objectProto$1.hasOwnProperty;

  /**
   * Creates an array of the enumerable property names of the array-like `value`.
   *
   * @private
   * @param {*} value The value to query.
   * @param {boolean} inherited Specify returning inherited property names.
   * @returns {Array} Returns the array of property names.
   */
  function arrayLikeKeys$1(value, inherited) {
    var isArr = isArray$1(value),
        isArg = !isArr && isArguments$1(value),
        isBuff = !isArr && !isArg && isBuffer$1(value),
        isType = !isArr && !isArg && !isBuff && isTypedArray$1(value),
        skipIndexes = isArr || isArg || isBuff || isType,
        result = skipIndexes ? baseTimes(value.length, String) : [],
        length = result.length;

    for (var key in value) {
      if ((inherited || hasOwnProperty$1.call(value, key)) &&
          !(skipIndexes && (
             // Safari 9 has enumerable `arguments.length` in strict mode.
             key == 'length' ||
             // Node.js 0.10 has enumerable non-index properties on buffers.
             (isBuff && (key == 'offset' || key == 'parent')) ||
             // PhantomJS 2 has enumerable non-index properties on typed arrays.
             (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
             // Skip index properties.
             isIndex$1(key, length)
          ))) {
        result.push(key);
      }
    }
    return result;
  }

  var _arrayLikeKeys = arrayLikeKeys$1;

  /**
   * This function is like
   * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
   * except that it includes inherited enumerable properties.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   */

  function nativeKeysIn$1(object) {
    var result = [];
    if (object != null) {
      for (var key in Object(object)) {
        result.push(key);
      }
    }
    return result;
  }

  var _nativeKeysIn = nativeKeysIn$1;

  var isObject$4 = isObject_1,
      isPrototype = _isPrototype,
      nativeKeysIn = _nativeKeysIn;

  /** Used for built-in method references. */
  var objectProto = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty = objectProto.hasOwnProperty;

  /**
   * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   */
  function baseKeysIn$1(object) {
    if (!isObject$4(object)) {
      return nativeKeysIn(object);
    }
    var isProto = isPrototype(object),
        result = [];

    for (var key in object) {
      if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
        result.push(key);
      }
    }
    return result;
  }

  var _baseKeysIn = baseKeysIn$1;

  var arrayLikeKeys = _arrayLikeKeys,
      baseKeysIn = _baseKeysIn,
      isArrayLike$1 = isArrayLike_1;

  /**
   * Creates an array of the own and inherited enumerable property names of `object`.
   *
   * **Note:** Non-object values are coerced to objects.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Object
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   *   this.b = 2;
   * }
   *
   * Foo.prototype.c = 3;
   *
   * _.keysIn(new Foo);
   * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
   */
  function keysIn$2(object) {
    return isArrayLike$1(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
  }

  var keysIn_1 = keysIn$2;

  var copyObject = _copyObject,
      keysIn$1 = keysIn_1;

  /**
   * Converts `value` to a plain object flattening inherited enumerable string
   * keyed properties of `value` to own properties of the plain object.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Lang
   * @param {*} value The value to convert.
   * @returns {Object} Returns the converted plain object.
   * @example
   *
   * function Foo() {
   *   this.b = 2;
   * }
   *
   * Foo.prototype.c = 3;
   *
   * _.assign({ 'a': 1 }, new Foo);
   * // => { 'a': 1, 'b': 2 }
   *
   * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
   * // => { 'a': 1, 'b': 2, 'c': 3 }
   */
  function toPlainObject$1(value) {
    return copyObject(value, keysIn$1(value));
  }

  var toPlainObject_1 = toPlainObject$1;

  var assignMergeValue$1 = _assignMergeValue,
      cloneBuffer = _cloneBuffer.exports,
      cloneTypedArray = _cloneTypedArray,
      copyArray = _copyArray,
      initCloneObject = _initCloneObject,
      isArguments = isArguments_1,
      isArray = isArray_1,
      isArrayLikeObject = isArrayLikeObject_1,
      isBuffer = isBuffer$2.exports,
      isFunction = isFunction_1,
      isObject$3 = isObject_1,
      isPlainObject = isPlainObject_1,
      isTypedArray = isTypedArray_1,
      safeGet$1 = _safeGet,
      toPlainObject = toPlainObject_1;

  /**
   * A specialized version of `baseMerge` for arrays and objects which performs
   * deep merges and tracks traversed objects enabling objects with circular
   * references to be merged.
   *
   * @private
   * @param {Object} object The destination object.
   * @param {Object} source The source object.
   * @param {string} key The key of the value to merge.
   * @param {number} srcIndex The index of `source`.
   * @param {Function} mergeFunc The function to merge values.
   * @param {Function} [customizer] The function to customize assigned values.
   * @param {Object} [stack] Tracks traversed source values and their merged
   *  counterparts.
   */
  function baseMergeDeep$1(object, source, key, srcIndex, mergeFunc, customizer, stack) {
    var objValue = safeGet$1(object, key),
        srcValue = safeGet$1(source, key),
        stacked = stack.get(srcValue);

    if (stacked) {
      assignMergeValue$1(object, key, stacked);
      return;
    }
    var newValue = customizer
      ? customizer(objValue, srcValue, (key + ''), object, source, stack)
      : undefined;

    var isCommon = newValue === undefined;

    if (isCommon) {
      var isArr = isArray(srcValue),
          isBuff = !isArr && isBuffer(srcValue),
          isTyped = !isArr && !isBuff && isTypedArray(srcValue);

      newValue = srcValue;
      if (isArr || isBuff || isTyped) {
        if (isArray(objValue)) {
          newValue = objValue;
        }
        else if (isArrayLikeObject(objValue)) {
          newValue = copyArray(objValue);
        }
        else if (isBuff) {
          isCommon = false;
          newValue = cloneBuffer(srcValue, true);
        }
        else if (isTyped) {
          isCommon = false;
          newValue = cloneTypedArray(srcValue, true);
        }
        else {
          newValue = [];
        }
      }
      else if (isPlainObject(srcValue) || isArguments(srcValue)) {
        newValue = objValue;
        if (isArguments(objValue)) {
          newValue = toPlainObject(objValue);
        }
        else if (!isObject$3(objValue) || isFunction(objValue)) {
          newValue = initCloneObject(srcValue);
        }
      }
      else {
        isCommon = false;
      }
    }
    if (isCommon) {
      // Recursively merge objects and arrays (susceptible to call stack limits).
      stack.set(srcValue, newValue);
      mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
      stack['delete'](srcValue);
    }
    assignMergeValue$1(object, key, newValue);
  }

  var _baseMergeDeep = baseMergeDeep$1;

  var Stack = _Stack,
      assignMergeValue = _assignMergeValue,
      baseFor = _baseFor,
      baseMergeDeep = _baseMergeDeep,
      isObject$2 = isObject_1,
      keysIn = keysIn_1,
      safeGet = _safeGet;

  /**
   * The base implementation of `_.merge` without support for multiple sources.
   *
   * @private
   * @param {Object} object The destination object.
   * @param {Object} source The source object.
   * @param {number} srcIndex The index of `source`.
   * @param {Function} [customizer] The function to customize merged values.
   * @param {Object} [stack] Tracks traversed source values and their merged
   *  counterparts.
   */
  function baseMerge$2(object, source, srcIndex, customizer, stack) {
    if (object === source) {
      return;
    }
    baseFor(source, function(srcValue, key) {
      stack || (stack = new Stack);
      if (isObject$2(srcValue)) {
        baseMergeDeep(object, source, key, srcIndex, baseMerge$2, customizer, stack);
      }
      else {
        var newValue = customizer
          ? customizer(safeGet(object, key), srcValue, (key + ''), object, source, stack)
          : undefined;

        if (newValue === undefined) {
          newValue = srcValue;
        }
        assignMergeValue(object, key, newValue);
      }
    }, keysIn);
  }

  var _baseMerge = baseMerge$2;

  var baseMerge$1 = _baseMerge,
      isObject$1 = isObject_1;

  /**
   * Used by `_.defaultsDeep` to customize its `_.merge` use to merge source
   * objects into destination objects that are passed thru.
   *
   * @private
   * @param {*} objValue The destination value.
   * @param {*} srcValue The source value.
   * @param {string} key The key of the property to merge.
   * @param {Object} object The parent object of `objValue`.
   * @param {Object} source The parent object of `srcValue`.
   * @param {Object} [stack] Tracks traversed source values and their merged
   *  counterparts.
   * @returns {*} Returns the value to assign.
   */
  function customDefaultsMerge$1(objValue, srcValue, key, object, source, stack) {
    if (isObject$1(objValue) && isObject$1(srcValue)) {
      // Recursively merge objects and arrays (susceptible to call stack limits).
      stack.set(srcValue, objValue);
      baseMerge$1(objValue, srcValue, undefined, customDefaultsMerge$1, stack);
      stack['delete'](srcValue);
    }
    return objValue;
  }

  var _customDefaultsMerge = customDefaultsMerge$1;

  var eq = eq_1,
      isArrayLike = isArrayLike_1,
      isIndex = _isIndex,
      isObject = isObject_1;

  /**
   * Checks if the given arguments are from an iteratee call.
   *
   * @private
   * @param {*} value The potential iteratee value argument.
   * @param {*} index The potential iteratee index or key argument.
   * @param {*} object The potential iteratee object argument.
   * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
   *  else `false`.
   */
  function isIterateeCall$1(value, index, object) {
    if (!isObject(object)) {
      return false;
    }
    var type = typeof index;
    if (type == 'number'
          ? (isArrayLike(object) && isIndex(index, object.length))
          : (type == 'string' && index in object)
        ) {
      return eq(object[index], value);
    }
    return false;
  }

  var _isIterateeCall = isIterateeCall$1;

  var baseRest$1 = _baseRest,
      isIterateeCall = _isIterateeCall;

  /**
   * Creates a function like `_.assign`.
   *
   * @private
   * @param {Function} assigner The function to assign values.
   * @returns {Function} Returns the new assigner function.
   */
  function createAssigner$1(assigner) {
    return baseRest$1(function(object, sources) {
      var index = -1,
          length = sources.length,
          customizer = length > 1 ? sources[length - 1] : undefined,
          guard = length > 2 ? sources[2] : undefined;

      customizer = (assigner.length > 3 && typeof customizer == 'function')
        ? (length--, customizer)
        : undefined;

      if (guard && isIterateeCall(sources[0], sources[1], guard)) {
        customizer = length < 3 ? undefined : customizer;
        length = 1;
      }
      object = Object(object);
      while (++index < length) {
        var source = sources[index];
        if (source) {
          assigner(object, source, index, customizer);
        }
      }
      return object;
    });
  }

  var _createAssigner = createAssigner$1;

  var baseMerge = _baseMerge,
      createAssigner = _createAssigner;

  /**
   * This method is like `_.merge` except that it accepts `customizer` which
   * is invoked to produce the merged values of the destination and source
   * properties. If `customizer` returns `undefined`, merging is handled by the
   * method instead. The `customizer` is invoked with six arguments:
   * (objValue, srcValue, key, object, source, stack).
   *
   * **Note:** This method mutates `object`.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Object
   * @param {Object} object The destination object.
   * @param {...Object} sources The source objects.
   * @param {Function} customizer The function to customize assigned values.
   * @returns {Object} Returns `object`.
   * @example
   *
   * function customizer(objValue, srcValue) {
   *   if (_.isArray(objValue)) {
   *     return objValue.concat(srcValue);
   *   }
   * }
   *
   * var object = { 'a': [1], 'b': [2] };
   * var other = { 'a': [3], 'b': [4] };
   *
   * _.mergeWith(object, other, customizer);
   * // => { 'a': [1, 3], 'b': [2, 4] }
   */
  var mergeWith$1 = createAssigner(function(object, source, srcIndex, customizer) {
    baseMerge(object, source, srcIndex, customizer);
  });

  var mergeWith_1 = mergeWith$1;

  var apply = _apply,
      baseRest = _baseRest,
      customDefaultsMerge = _customDefaultsMerge,
      mergeWith = mergeWith_1;

  /**
   * This method is like `_.defaults` except that it recursively assigns
   * default properties.
   *
   * **Note:** This method mutates `object`.
   *
   * @static
   * @memberOf _
   * @since 3.10.0
   * @category Object
   * @param {Object} object The destination object.
   * @param {...Object} [sources] The source objects.
   * @returns {Object} Returns `object`.
   * @see _.defaults
   * @example
   *
   * _.defaultsDeep({ 'a': { 'b': 2 } }, { 'a': { 'b': 1, 'c': 3 } });
   * // => { 'a': { 'b': 2, 'c': 3 } }
   */
  var defaultsDeep = baseRest(function(args) {
    args.push(undefined, customDefaultsMerge);
    return apply(mergeWith, undefined, args);
  });

  var defaultsDeep_1 = defaultsDeep;

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
        // 横向打印，固定纸张
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
  //   AlignJustify: , // 设置“text文本”是否两端对齐或“barcode条码文字”靠齐方式.设置“text文本”时，1代表两端对齐，0代表不处理（默认）；设置“barcode条码文字”时，0-两端对齐(默认)  1-左靠齐  2-居中  3-右靠齐；
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

      this._config = defaultsDeep_1(config !== null && config !== void 0 ? config : {}, defaultConfig);
      this._styleFlie = `<link type='text/css' rel='stylesheet' href='${this._config.STYLE_FILE_PATH + '/print.css'}'/>`;
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
    } // 打印背景


    setPrintBKImg(strContent) {
      LODOP.ADD_PRINT_SETUP_BKIMG(strContent);
    } // 设置打印模式组件


    setShowMode(option) {
      for (const item in option) {
        LODOP.SET_SHOW_MODE(item, option[item]);
      }
    } // 纯文本组件option:{params, style}


    drawText(option) {
      LODOP.ADD_PRINT_TEXT(option.params.Top, option.params.Left, option.params.Width, option.params.Height, option.params.strContent);

      for (const item in option.style) {
        LODOP.SET_PRINT_STYLEA(0, item, option.style[item]);
      }
    } // 画线组件--建议在文本类函数之前调用


    drawLine(option) {
      LODOP.ADD_PRINT_LINE(option.params.Top1, option.params.Left1, option.params.Top2, option.params.Left2, option.params.intLineStyle, option.params.intLineWidth);

      for (const item in option.style) {
        LODOP.SET_PRINT_STYLEA(0, item, option.style[item]);
      }
    } // 二维码组件


    drawBarcode(option) {
      LODOP.ADD_PRINT_BARCODE(option.params.Top, option.params.Left, option.params.Width, option.params.Height, option.params.CodeType || 'QRCode', option.params.CodeValue);

      for (const item in option.style) {
        LODOP.SET_PRINT_STYLEA(0, item, option.style[item]);
      }
    } // 图片组件


    drawImage(option) {
      LODOP.ADD_PRINT_IMAGE(option.params.Top, option.params.Left, option.params.Width, option.params.Height, option.params.strContent);

      for (const item in option.style) {
        LODOP.SET_PRINT_STYLEA(0, item, option.style[item]);
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

      this._constructTableHead(rowHeaderArr, propColumns, option.itemsModel, 0);

      rowHeaderArr.map(item => tableHeader += '<tr>' + item + '</tr>');
      const lineNum = option.params.lineNum; // 渲染空白行

      const blankRow = lineNum - tableData.length % lineNum;

      if (blankRow !== lineNum) {
        for (let x = 1; x <= blankRow; x++) {
          blankStr += `<tr height="${option.params.lineHeight}px">`;

          for (let y = 1; y <= propColumns.length; y++) {
            blankStr += '<td style="border: solid 1px black;"></td>';
          }

          blankStr += '</tr>';
        }
      } // 渲染


      tableData.map(item => {
        tableBody += `<tr height="${option.params.lineHeight}px">`;
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
                        <div align="${iitem.align}" style="max-height:${option.params.lineHeight}px;overflow: hidden;padding: 0px 2px;">
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

      const tableHtml = `<table class="table-paging-content" width="${option.params.Width}"
                        style ="font-family: '宋体', Arial, Helvetica, sans-serif;border-collapse: collapse;font-size: 11px;">
                        <thead>${tableHeader}</thead>
                        <tbody>${tableBody + blankStr}</tbody>
                        <tfoot>${tableFooter}</tfoot>
                    </table>`;
      const tableHeight = lineNum * (option.params.lineHeight || 30) + 5;
      LODOP.ADD_PRINT_TABLE(option.params.Top, option.params.Left, option.params.Width, tableHeight, this._styleFlie + `<body>${tableHtml}</body>`);
      const width = this._config.SYSTEM_DEFAULT_CONF.PRINT_INITA.Width;
      const height = this._config.SYSTEM_DEFAULT_CONF.PRINT_INITA.Height;
      LODOP.ADD_PRINT_TEXT(height - 15, width / 2, 120, 30, '第#页/共&页');
      LODOP.SET_PRINT_STYLEA(0, 'ItemType', 2);
    } // 构造表头


    _constructTableHead(rowHeaderArr, propColumns, columns, level) {
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
    } // 主表列式数据陈列


    drawTableContent(option, tableData, extendOptions) {
      if (!Array.isArray(option.config)) {
        const keyArr = Object.keys(option.config).sort(option.config.label);
        const ret = [];
        keyArr.forEach(row => {
          ret.push({
            label: option.config[row],
            colSpan: Math.floor(24 / keyArr.length)
          });
        });
        option.config = ret;
      }

      let tableHtml = '<tr height="22px" >';
      option.config.forEach(function (row) {
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
      tableHtml = `</tr><table class="table-layout-content" border
        style ="font-family: '宋体', Arial, Helvetica, sans-serif;border-collapse: collapse;font-size: 12px;"
        width="${option.params.Width}" >${tableHtml}</table>`;
      LODOP.ADD_PRINT_TABLE(option.params.Top, option.params.Left, option.params.Width, option.params.Height, this._styleFlie + `<body>${tableHtml}</body>`);

      for (const item in option.style) {
        LODOP.SET_PRINT_STYLEA(0, item, option.style[item]);
      }
    }

    PREVIEW() {
      LODOP.PREVIEW();
    }

  }

  exports.DrawComponent = DrawComponent;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({});
