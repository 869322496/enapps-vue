import camelcaseKeys from 'camelcase-keys';
import snakecaseKeys from 'snakecase-keys';
import * as _ from 'lodash';
import BigNumber from 'bignumber.js';
import { v4 as uuidv4 } from 'uuid';
import { FieldType, ParametersValueType, ViewItemType } from '@/constant/enum';
import { AdvancedConditionOptions } from '@/constant/types';
import { CUSTOM_COLOUR_FILTER_FIELD_NAME, advancedConditionOptions } from '@/constant/data';
export class CommonUtil {
  static patterns = [/[\/]/, /\d/, /\./, /^(?!_+)_/];
  static toSnakeCaseBatch<T>(obj: T): T {
    return snakecaseKeys(obj, {
      exclude: [
        '__ref',
        '__contexts',
        '__domains',
        '__eval_context',
        '_onchange_field',
        '__debug',
        '__id',
        ...this.patterns,
      ],
    });
  }
  static toCamelCaseBatch<T>(obj: T): T {
    return camelcaseKeys(obj, {
      deep: true,
      exclude: [
        '__ref',
        '__contexts',
        '__domains',
        '__eval_context',
        '_onchange_field',
        '__debug',
        '__id',
        ...this.patterns,
      ],
    });
  }
  static matches(value): boolean {
    return this.patterns.some(function (pattern) {
      return typeof pattern === 'string' ? pattern === value : pattern.test(value);
    });
  }
  static isValueChange(
    prevRecord,
    currRecord,
    key,
    isJudgeParameteriesOptions = false,
    needRealEqual = false,
    fieldType?: FieldType,
    parametersForceEqual?: boolean
  ) {
    if (key === 'id') {
      return false;
    }

    let prevValue = prevRecord[key];
    let currValue = currRecord[key];

    if (key === _.camelCase(CUSTOM_COLOUR_FILTER_FIELD_NAME)) {
      return currValue !== prevValue;
    }

    if (fieldType === FieldType.Boolean) {
      if (prevValue !== currValue) {
        return true;
      }
    }
    // for boolean field Type
    if (typeof prevValue === 'boolean' && typeof currValue == 'boolean') {
      if (prevValue !== currValue) {
        return true;
      }
    }
    if (Object.keys(currRecord).includes(key) && !Object.keys(prevRecord).includes(key)) {
      return true;
    }
    if ([FieldType.Float, FieldType.Integer].includes(fieldType)) {
      if (needRealEqual) {
        return prevValue !== currValue;
      }
    }
    if (JSON.stringify(prevValue || {}) === JSON.stringify(currValue || {})) {
      return false;
    }

    if (prevValue === '' || prevValue === null || prevValue === undefined) {
      prevValue = false;
    }

    if (currValue === '' || currValue === null || currValue === undefined) {
      currValue = false;
    }

    let isFormChanged = false;
    if (
      (!currRecord.hasOwnProperty(key) && prevRecord.hasOwnProperty(key)) ||
      (currRecord.hasOwnProperty(key) && !prevRecord.hasOwnProperty(key))
    ) {
      return true;
    }
    if (key === 'parameters') {
      if (typeof prevRecord['parameters'] === 'string') {
        prevRecord['parameters'] = CommonUtil.convertPythonDictToJSON(prevRecord['parameters']);
      }
      if (typeof currRecord['parameters'] === 'string') {
        currRecord['parameters'] = CommonUtil.convertPythonDictToJSON(currRecord['parameters']);
      }
      const preParameters = this.toCamelCaseBatch(prevRecord['parameters']);
      const currParameters = this.toCamelCaseBatch(currRecord['parameters']);

      const checkIsParametersEmpty = paramValue =>
        !paramValue || paramValue === '{}' || Object.keys(paramValue).length === 0;
      // if both pre and curr are empty, no changed
      if (checkIsParametersEmpty(preParameters) && checkIsParametersEmpty(currParameters)) {
        return false;
      }
      // if pre is false, that mean not parameters loaded yet, no changed.
      if (preParameters === false && !parametersForceEqual) {
        return false;
      }
      let isParametersChange = false;

      // if one has parameters , another not , changed
      if (checkIsParametersEmpty(preParameters) !== checkIsParametersEmpty(currParameters)) {
        return true;
      }

      // if parameters length not same, changed.
      if (preParameters.parameters?.length !== currParameters.parameters?.length) {
        return true;
      }

      preParameters.parameters = (preParameters.parameters || []).sort((a, b) => a.id - b.id);
      currParameters.parameters = (currParameters.parameters || []).sort((a, b) => a.id - b.id);
      for (let index = 0; index < preParameters.parameters.length; index++) {
        const preParameter = preParameters.parameters[index];
        const currentParameter = currParameters.parameters[index];
        // do not use === to judge the type, because '0' and 0 , false and null
        if (
          preParameter[ParametersValueType.DecimalValue] !==
            currentParameter[ParametersValueType.DecimalValue] ||
          ((preParameter[ParametersValueType.DescriptionValue] ||
            currentParameter[ParametersValueType.DescriptionValue]) &&
            preParameter[ParametersValueType.DescriptionValue] !==
              currentParameter[ParametersValueType.DescriptionValue])
        ) {
          isParametersChange = true;
          break;
        }
        const preOptionParamValue = Array.isArray(preParameter[ParametersValueType.OptionValue])
          ? preParameter[ParametersValueType.OptionValue][0]
          : preParameter[ParametersValueType.OptionValue];
        const currOptionParamValue = Array.isArray(
          currentParameter[ParametersValueType.OptionValue]
        )
          ? currentParameter[ParametersValueType.OptionValue][0]
          : currentParameter[ParametersValueType.OptionValue];
        if (preOptionParamValue != currOptionParamValue) {
          isParametersChange = true;
          break;
        }
        if (isJudgeParameteriesOptions) {
          if (JSON.stringify(preParameter.optionIds) !== JSON.stringify(currParameters.optionIds)) {
            isParametersChange = true;
            break;
          }
        }
      }
      if (isParametersChange) {
        return true;
      }
      return false;
    }
    if (typeof prevValue == 'boolean') {
      isFormChanged = prevValue !== currValue;
      if (isFormChanged) return true;
    }
    // must equal
    if (typeof prevValue !== 'object' && prevValue !== null && `${prevValue}` === `${currValue}`) {
      return false;
    }
    if (JSON.stringify(prevValue) === JSON.stringify(currValue)) {
      return false;
    }
    if (
      typeof prevValue === typeof currValue &&
      !Array.isArray(prevValue) &&
      prevValue !== currValue
    ) {
      isFormChanged = true;
      return true;
    }

    if (!prevValue && currValue) {
      isFormChanged = true;
      return true;
    }

    if (prevValue && !currValue) {
      isFormChanged = true;
      return true;
    }

    if (
      prevRecord &&
      currRecord &&
      typeof prevValue !== typeof currValue &&
      (Array.isArray(prevValue) || Array.isArray(currValue))
    ) {
      isFormChanged = true;
      return true;
    }

    if (Array.isArray(prevValue) && Array.isArray(currValue)) {
      if (prevValue.length === 0 && currValue.length === 0) {
        return false;
      }
      if (Array.isArray(prevValue[0])) {
        isFormChanged = JSON.stringify(prevValue) !== JSON.stringify(currValue);
      } else {
        (<any[]>prevValue).forEach(item => {
          if (currValue.indexOf(item) === -1) {
            isFormChanged = true;
          }
        });
        (<any[]>currValue).forEach(item => {
          if (prevValue.indexOf(item) === -1) {
            isFormChanged = true;
          }
        });
      }

      if (isFormChanged) {
        return true;
      }
    }

    if (
      prevRecord &&
      currRecord &&
      JSON.stringify(prevValue) !== currValue &&
      JSON.stringify(currValue) !== prevValue
    ) {
      const preSortData = {};
      const curSortData = {};
      if (prevValue?.length > 0 && Object.keys(currValue)?.length > 0) {
        Object.keys(prevValue)
          .sort()
          .map(item => {
            preSortData[item] = prevValue[item];
          });
        Object.keys(currValue)
          .sort()
          .map(item => {
            curSortData[item] = currValue[item];
          });
        if (JSON.stringify(preSortData) == JSON.stringify(curSortData)) {
          return false;
        }
      }
      isFormChanged = true;
      return true;
    }
  }
  static formatUTCtoLocal(str, forceEnd?) {
    if (!str) {
      return str;
    }
    let localStr = '';
    const dateRegex = /^(\d\d\d\d)-(\d\d)-(\d\d)$/;
    if (dateRegex.exec(str)) {
      localStr = `${str} ${forceEnd ? '23:59:59' : '00:00:00'}`;
    } else {
      localStr = str;
    }
    const dateTimeRegex = /^(\d\d\d\d)-(\d\d)-(\d\d) (\d\d):(\d\d):(\d\d)(?:\.\d+)?$/;
    const res = dateTimeRegex.exec(localStr);
    try {
      if (!res) {
        throw new Error("'" + localStr + "' is not a valid datetime");
      }
      return new Date(
        Date.UTC(
          parseInt(res[1], 10),
          parseInt(res[2], 10) - 1,
          parseInt(res[3], 10),
          parseInt(res[4], 10),
          parseInt(res[5], 10),
          parseInt(res[6], 10)
        )
      );
    } catch (e) {
      return new Date(str);
    }
  }

  static timeStringToFloat(time) {
    const hoursMinutes = time.split(/[.:]/);
    const hours = parseInt(hoursMinutes[0], 10);
    const minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
    return hours + minutes / 60;
  }

  static convertNumToTime(number, returnString = false) {
    // Check sign of given number
    let sign: any = number >= 0 ? 1 : -1;
    // Set positive value of number of sign negative
    number = number * sign;
    // Separate the int from the decimal part
    let hour = Math.floor(number);
    let decpart = number - hour;
    const min = 1 / 60;
    // Round to nearest minute
    decpart = min * Math.round(decpart / min);
    let minute = Math.floor(decpart * 60) + '';
    if (minute === '60') {
      hour++;
      minute = '00';
    } else {
      // Add padding if need
      if (minute.length < 2) {
        minute = '0' + minute;
      }
    }
    // Add Sign in final result
    sign = sign == 1 ? '' : '-';
    // Concate hours and minutes
    const time = sign + hour + ':' + minute;

    return returnString ? time : new Date('2022-01-01 ' + time);
  }
  static canvas;
  static pxWidth(text, font = '12px Poppins') {
    // re-use canvas object for better performance
    this.canvas = this.canvas || (this.canvas = document.createElement('canvas'));
    const context = this.canvas.getContext('2d');

    font && (context.font = font);
    const metrics = context.measureText(text);

    return new BigNumber(metrics.width).decimalPlaces(0).toNumber();
  }
  static getLongtestWordPx(str: string = '') {
    if (!str) {
      return 0;
    }
    // const str =
    //   'This is a string24151 withfffqf /1241 so#me English words Benjamin MasasMasMasMasMMason Mason Mason Mason on Debbie Villa .';
    try {
      const regex = /^[a-zA-Z0-9/()\[\]@.*]+$/;
      const engwords = `${str}`.split(/[-\s]/).filter(word => regex.test(word));
      let longestWord = '';
      if (engwords.length > 0) {
        longestWord = _.maxBy(engwords, word => word.length);
      }
      return this.pxWidth(longestWord) + 17;
    } catch (e) {
      console.error(e, str);
    }
  }

  static firstCharUppercase(str): string {
    if (!str) {
      return str;
    }
    return `${str}`.charAt(0).toUpperCase() + `${str}`.slice(1);
  }

  static firstChatUpper(str) {
    if (!str) {
      return '';
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  static isDevelopMode() {
    const queryString = window.location.hash.replace('#', '');
    const params = new URLSearchParams(queryString);
    return params.has('debug');
  }
  // {}/[]/''/NaN/null/undeifend
  static isEmpty(key, includingBoolean = false) {
    if (JSON.stringify(key) === `{}`) {
      return true;
    }
    if (`${key}` === `[]`) {
      return true;
    }
    if (`${key}` === '') {
      return true;
    }
    if (`${key}` === 'null') {
      return true;
    }
    if (`${key}` === 'undefined') {
      return true;
    }
    if (includingBoolean) {
      if (`${key}` === 'false') {
        return true;
      }
    }
    return false;
  }

  static isEnglishWordWithSlash(str) {
    const pattern = /^[a-zA-Z/]+$/;
    return pattern.test(str);
  }
  static jsonNodeToXml(node: any, human_readable?, indent?) {
    // For debugging purpose, this function will convert a json node back to xml
    // Maybe useful for xml view editor
    const tag: ViewItemType = node.tag;
    if (tag === 't') {
    }
    indent = indent || 0;
    const sindent = human_readable ? new Array(indent + 1).join('\t') : '';
    let r = sindent + '<' + tag;
    const cr = human_readable ? '\n' : '';
    if (typeof node === 'string') {
      return sindent + node;
    } else if (
      typeof tag !== 'string' ||
      (node.children && !(node.children instanceof Array)) ||
      (node.attrs && !(node.attrs instanceof Object))
    ) {
      throw new Error('Node a json node');
    }
    for (var attr in node.attrs) {
      var vattr = node.attrs[attr];
      if (typeof vattr !== 'string') {
        // domains, ...
        vattr = JSON.stringify(vattr);
      }
      vattr = vattr
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
      if (human_readable) {
        vattr = vattr.replace(/&quot;/g, "'");
      }
      r += ' ' + attr + '="' + vattr + '"';
    }
    if (node.children && node.children.length) {
      r += '>' + cr;
      var childs = [];
      for (var i = 0, ii = node.children.length; i < ii; i++) {
        childs.push(this.jsonNodeToXml(node.children[i], human_readable, indent + 1));
      }
      r += childs.join(cr);
      r += cr + sindent + '</' + tag + '>';
      return r;
    } else {
      if ([ViewItemType.A, ViewItemType.Span].includes(tag)) {
        return r + `></${tag}>`;
      }
      return r + '/>';
    }
  }

  /**
   * Converts a currency string to a number.
   * @param currencyString The currency string to convert.
   * @returns The numeric value of the currency string.
   */
  static convertCurrencyToNumber(currencyString: string) {
    const numericString = currencyString.trim().replace(/[^\d.-]/g, '');
    const numericValue = parseFloat(numericString);
    return numericValue;
  }

  static uuid(prefix = '') {
    return `${prefix}_${uuidv4()}`;
  }

  /**
   * Parses a custom domain string and returns an array of domains.
   * @param customDomain - The custom domain string to parse.
   * @returns An array of domains.
   */
  static parseCustomDomain(customDomain) {
    const to_replace = {
      ' eq ': ' = ',
      ' lt ': ' < ',
      ' lteq ': ' <= ',
      ' gt ': ' > ',
      ' gteq ': ' >= ',
      ' slash ': '/',
    };
    for (const key in to_replace) {
      customDomain = customDomain.replaceAll(key, to_replace[key]);
    }
    const domains = [];
    for (const domain of customDomain.split(',')) {
      const exp = domain.split(' ');
      domains.push([exp[0], exp[1], exp.slice(2).join(' ')]);
    }
    return domains;
  }
  // domian [['type', '=', 'internal'], '|',['type', '=', 'internal'],['type', '=', 'internal']]
  // to [[3,4],[6,7,8]]
  static calculateIfAdcancedFilterDomainFieldIndex = domain => {
    const indices = [];
    for (let i = 0; i < domain.length; i++) {
      if (domain[i] === '|') {
        let count = 0;
        while (domain[i + count] === '|') {
          count++;
        }
        const subArray = [];
        for (let j = 0; j <= count; j++) {
          subArray.push(i + count + j);
        }
        indices.push(subArray);
        i += count - 1;
      }
    }
    return indices;
  };

  static getCondintionOptions(fieldType: FieldType): AdvancedConditionOptions[] {
    return advancedConditionOptions.filter(item => item.types.includes(fieldType));
  }

  static flattenTree<T extends { id: string | number; children?: T[] }>(tree: T[], key: string) {
    const queue = [...tree];
    const data = [];
    while (queue.length !== 0) {
      const item = queue.shift();
      data.push({
        ...item,
      });
      const children = item.children;
      if (children) {
        for (let i = 0; i < children.length; i++) {
          queue.push(children[i]);
        }
      }
    }
    return data;

    // return tree.reduce((result, node) => {
    //   result.push(node);
    //   if (Array.isArray(node.children)) {
    //     result.push(...this.flattenTree(node.children));
    //   }
    //   return result;
    // }, []);
  }

  static toTree<T extends { id: string; children?: T[] }>(nodes: T[], key: string) {
    const result = [];
    const map = {};
    if (!Array.isArray(nodes)) {
      // 验证data是不是数组类型
      return [];
    }
    nodes.forEach(item => {
      // 建立每个数组元素id和该对象的关系
      map[item.id] = item; // 这里可以理解为浅拷贝，共享引用
    });
    nodes.forEach(item => {
      const parent = map[item[key]]; // 找到data中每一项item的爸爸
      if (parent) {
        // 说明元素有爸爸，把元素放在爸爸的children下面
        (parent.children || (parent.children = [])).push(item);
      } else {
        // 说明元素没有爸爸，是根节点，把节点push到最终结果中
        result.push(item); // item是对象的引用
      }
    });
    return result; // 数组里的对象和data是共享的
    // const map = {};
    // const roots = [];
    // for (let i = 0; i < nodes.length; i++) {
    //   const node = nodes[i];
    //   map[node.id] = node;
    //   if (!node[key]) {
    //     roots.push(node);
    //   } else {
    //     const parent = map[node[key]];
    //     if (parent && !parent?.children) {
    //       parent.children = [];
    //     }
    //     parent?.children && parent.children.push(node);
    //   }
    // }
    // return roots;
  }

  static convertPythonDictToJSON = (data: any): any => {
    // let d = data.replace(new RegExp(`(?<=[a-zA-Z])'(?=[a-zA-Z ])`, "g"), '__')
    // d = d.replace(new RegExp("__", 'g'), "'")

    let d = data.replace(/, u'/g, ", '");
    d = d.replace(/: u'/g, ": '");
    d = d.replace(/,u'/g, ",'");
    d = d.replace(/, u"/g, ', "');
    d = d.replace(/, u"/g, ', "');
    d = d.replace(/: u"/g, ': "');
    d = d.replace(/,u'/g, ',"');
    d = d.replace(/0\.0,/g, '0,');
    d = d.replace(/'/g, '"');
    d = d.replace(/None/g, 'null');
    d = d.replace(/False/g, 'false');
    d = d.replace(/True/g, 'true');
    d = d.replace(/\(/g, '[');
    d = d.replace(/\)/g, ']');
    d = d.replace(/,(\s*[\]}])/gi, '$1');

    try {
      return JSON.parse(d);
    } catch (e) {
      // console.warn('JSON has wrong format', e);
      return {};
    }
  };
}
