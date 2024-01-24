import { CommonUtil } from './common';
import useConvertStore from '@/store/modules/convert';
export class PrasePyConditionUtil {
  praser: any = {};
  cs: any;
  constructor() {
    this.cs = useConvertStore;
    let _that = this;
    let NUMBER = /^\d$/,
      NAME_FIRST = /^[a-zA-Z_]$/,
      NAME = /^[a-zA-Z0-9_]$/;

    let create = function (o, props?) {
      function F() {}
      F.prototype = o;
      let inst = new F();
      for (let name in props) {
        if (!props.hasOwnProperty(name)) {
          continue;
        }
        inst[name] = props[name];
      }
      return inst;
    };

    let symbols = {};
    let comparators = {};
    let Base = {
      nud: function () {
        throw new Error(this.id + ' undefined as prefix');
      },
      led: function (led) {
        throw new Error(this.id + ' undefined as infix');
      },
      toString: function () {
        if (
          this.id === '(constant)' ||
          this.id === '(number)' ||
          this.id === '(name)' ||
          this.id === '(string)'
        ) {
          return [this.id.slice(0, this.id.length - 1), ' ', this.value, ')'].join('');
        } else if (this.id === '(end)') {
          return '(end)';
        } else if (this.id === '(comparator)') {
          let repr = ['(comparator', this.expressions[0]];
          for (let i = 0; i < this.operators.length; ++i) {
            repr.push(this.operators[i], this.expressions[i + 1]);
          }
          return repr.join(' ') + ')';
        }
        let out = [this.id, this.first, this.second, this.third]
          .filter(function (r) {
            return r;
          })
          .join(' ');
        return '(' + out + ')';
      },
    };
    function symbol(id, bp?) {
      bp = bp || 0;
      let s = symbols[id];
      if (s) {
        if (bp > s.lbp) {
          s.lbp = bp;
        }
        return s;
      }
      return (symbols[id] = create(Base, {
        id: id,
        lbp: bp,
      }));
    }
    function constant(id) {
      symbol(id).nud = function () {
        this.id = '(constant)';
        this.value = id;
        return this;
      };
    }
    function prefix(id, bp, nud?) {
      symbol(id).nud =
        nud ||
        function () {
          this.first = expression(bp);
          return this;
        };
    }
    function infix(id, bp, led?) {
      symbol(id, bp).led =
        led ||
        function (left) {
          this.first = left;
          this.second = expression(bp);
          return this;
        };
    }
    function infixr(id, bp) {
      symbol(id, bp).led = function (left) {
        this.first = left;
        this.second = expression(bp - 1);
        return this;
      };
    }
    function comparator(id) {
      comparators[id] = true;
      let bp = 60;
      infix(id, bp, function (left) {
        this.id = '(comparator)';
        this.operators = [id];
        this.expressions = [left, expression(bp)];
        while (token.id in comparators) {
          this.operators.push(token.id);
          advance();
          this.expressions.push(expression(bp));
        }
        return this;
      });
    }

    constant('None');
    constant('False');
    constant('True');

    symbol('(number)').nud = function () {
      return this;
    };
    symbol('(name)').nud = function () {
      return this;
    };
    symbol('(string)').nud = function () {
      return this;
    };
    symbol('(end)');

    symbol(':');
    symbol(')');
    symbol(']');
    symbol('}');
    symbol(',');
    symbol('else');

    symbol('lambda', 20).nud = function () {
      this.first = [];
      if (token.id !== ':') {
        for (;;) {
          if (token.id !== '(name)') {
            throw new Error('Excepted an argument name');
          }
          this.first.push(token);
          advance();
          if (token.id !== ',') {
            break;
          }
          advance(',');
        }
      }
      advance(':');
      this.second = expression();
      return this;
    };
    infix('if', 20, function (left) {
      this.first = left;
      this.second = expression();
      advance('else');
      this.third = expression();
      return this;
    });

    infixr('or', 30);
    infixr('and', 40);
    prefix('not', 50);

    comparator('in');
    comparator('not in');
    comparator('is');
    comparator('is not');
    comparator('<');
    comparator('<=');
    comparator('>');
    comparator('>=');
    comparator('<>');
    comparator('!=');
    comparator('==');

    infix('|', 70);
    infix('^', 80), infix('&', 90);

    infix('<<', 100);
    infix('>>', 100);

    infix('+', 110);
    infix('-', 110);

    infix('*', 120);
    infix('/', 120);
    infix('//', 120), infix('%', 120);

    prefix('-', 130);
    prefix('+', 130);
    prefix('~', 130);

    infixr('**', 140);

    infix('.', 150, function (left) {
      if (token.id !== '(name)') {
        throw new Error('Expected attribute name, got ');
      }
      this.first = left;
      this.second = token;
      advance();
      return this;
    });
    symbol('(', 150).nud = function () {
      this.first = [];
      let comma = false;
      if (token.id !== ')') {
        while (true) {
          if (token.id === ')') {
            break;
          }
          this.first.push(expression());
          if (token.id !== ',') {
            break;
          }
          comma = true;
          advance(',');
        }
      }
      advance(')');
      if (!this.first.length || comma) {
        return this;
      } else {
        return this.first[0];
      }
    };
    symbol('(').led = function (left) {
      this.first = left;
      this.second = [];
      if (token.id !== ')') {
        for (;;) {
          this.second.push(expression());
          if (token.id !== ',') {
            break;
          }
          advance(',');
        }
      }
      advance(')');
      return this;
    };
    infix('[', 150, function (left) {
      this.first = left;
      this.second = expression();
      advance(']');
      return this;
    });
    symbol('[').nud = function () {
      this.first = [];
      if (token.id !== ']') {
        for (;;) {
          if (token.id === ']') {
            break;
          }
          this.first.push(expression());
          if (token.id !== ',') {
            break;
          }
          advance(',');
        }
      }
      advance(']');
      return this;
    };

    symbol('{').nud = function () {
      this.first = [];
      if (token.id !== '}') {
        for (;;) {
          if (token.id === '}') {
            break;
          }
          let key = expression();
          advance(':');
          let value = expression();
          this.first.push([key, value]);
          if (token.id !== ',') {
            break;
          }
          advance(',');
        }
      }
      advance('}');
      return this;
    };

    let longops = {
      '*': ['*'],
      '<': ['<', '=', '>'],
      '>': ['=', '>'],
      '!': ['='],
      '=': ['='],
      '/': ['/'],
    };
    function Tokenizer() {
      this.states = ['initial'];
      this.tokens = [];
    }
    Tokenizer.prototype = {
      builder: function (empty) {
        let key = this.states[0] + '_builder';
        if (empty) {
          let value = this[key];
          delete this[key];
          return value;
        } else {
          return (this[key] = this[key] || []);
        }
      },
      simple: function (type) {
        this.tokens.push({ type: type });
      },
      push: function (new_state) {
        this.states.push(new_state);
      },
      pop: function () {
        this.states.pop();
      },

      feed: function (str, index) {
        let s = this.states;
        return this[s[s.length - 1]](str, index);
      },

      initial: function (str, index) {
        let character = str[index];

        if (character in longops) {
          let follow = longops[character];
          for (let i = 0, len = follow.length; i < len; ++i) {
            if (str[index + 1] === follow[i]) {
              character += follow[i];
              index++;
              break;
            }
          }
        }

        if (character === ' ') {
          return index + 1;
        } else if (character === '\0') {
          this.tokens.push(symbols['(end)']);
          return index + 1;
        } else if (character === '"' || character === "'") {
          this.push('string');
          return index + 1;
        } else if (NUMBER.test(character)) {
          this.push('number');
          return index;
        } else if (NAME_FIRST.test(character)) {
          this.push('name');
          return index;
        } else if (character in symbols) {
          this.tokens.push(create(symbols[character]));
          return index + 1;
        }
        throw new Error(
          'Tokenizing failure of <<' +
            str +
            '>> at index ' +
            index +
            ', character [[' +
            character +
            ']]' +
            '; parsed so far: ' +
            this.tokens
        );
      },
      string: function (str, index) {
        let character = str[index];
        if (character === '"' || character === "'") {
          this.tokens.push(
            create(symbols['(string)'], {
              value: this.builder(true).join(''),
            })
          );
          this.pop();
          return index + 1;
        }
        this.builder().push(character);
        return index + 1;
      },
      number: function (str, index) {
        let character = str[index];
        if (!(character == '.' || NUMBER.test(character))) {
          this.tokens.push(
            create(symbols['(number)'], {
              value: parseFloat(this.builder(true).join('')),
            })
          );
          this.pop();
          return index;
        }
        this.builder().push(character);
        return index + 1;
      },
      name: function (str, index) {
        let character = str[index];
        if (!NAME.test(character)) {
          let name = this.builder(true).join('');
          let symbol = symbols[name];
          if (symbol) {
            if (name === 'in' && this.tokens[this.tokens.length - 1].id === 'not') {
              symbol = symbols['not in'];
              this.tokens.pop();
            } else if (name === 'not' && this.tokens[this.tokens.length - 1].id === 'is') {
              symbol = symbols['is not'];
              this.tokens.pop();
            }
            this.tokens.push(create(symbol));
          } else {
            this.tokens.push(
              create(symbols['(name)'], {
                value: name,
              })
            );
          }
          this.pop();
          return index;
        }
        this.builder().push(character);
        return index + 1;
      },
    };

    _that.praser.tokenize = function tokenize(str) {
      let index = 0,
        tokenizer = new Tokenizer();
      str += '\0';

      do {
        index = tokenizer.feed(str, index);
      } while (index !== str.length);
      return tokenizer.tokens;
    };

    let token, next;
    function expression(rbp?) {
      rbp = rbp || 0;
      let t = token;
      token = next();
      let left = t.nud();
      while (rbp < token.lbp) {
        t = token;
        token = next();
        left = t.led(left);
      }
      return left;
    }
    function advance(id?) {
      if (id && token.id !== id) {
        throw new Error('Expected "' + id + '", got "' + token.id + '"');
      }
      token = next();
    }

    _that.praser.object = create({}, {});
    _that.praser.bool = function (arg) {
      return !!arg;
    };
    _that.praser.tuple = create(_that.praser.object, {
      __contains__: function (value) {
        for (let i = 0, len = this.values.length; i < len; ++i) {
          if (this.values[i] === value) {
            return true;
          }
        }
        return false;
      },
      toJSON: function () {
        return this.values;
      },
    });
    _that.praser.list = _that.praser.tuple;
    _that.praser.dict = create(_that.praser.object, {
      toJSON: function () {
        return this.values;
      },
    });

    _that.praser.parse = function (toks) {
      let index = 0;
      token = toks[0];
      next = function () {
        return toks[++index];
      };
      return expression();
    };
    let evaluate_operator = function (operator, a, b) {
      let datetime_format =
        /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01]) [0-2][0-3]:[0-5][0-9]:[0-5][0-9]$/;
      let date_format = /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/;
      if (typeof a === 'string' && typeof b === 'string') {
        if (datetime_format.test(a) && date_format.test(b)) {
          a = a.split(' ')[0];
        } else if (date_format.test(a) && datetime_format.test(b)) {
          b = b.split(' ')[0];
        }
      }

      switch (operator) {
        case '==':
        case 'is':
          return a === b;
        case '!=':
        case 'is not':
          return a !== b;
        case '<':
          return a < b;
        case '<=':
          return a <= b;
        case '>':
          return a > b;
        case '>=':
          return a >= b;
        case 'in':
          if (typeof b === 'string') {
            return b.indexOf(a) !== -1;
          }
          if (Array.isArray(b)) {
            return b.includes(a);
          }
          if (Object.keys(b).includes('values')) {
            return b.values.includes(a);
          }
          return false;
        case 'not in':
          if (typeof b === 'string') {
            return b.indexOf(a) === -1;
          }
          if (Array.isArray(b)) {
            return !b.includes(a);
          }
          if (Object.keys(b).includes('values')) {
            return !b.values.includes(a);
          }
          if (b.values) {
            return !(b.values || []).includes(a);
          }
          return false;
      }
      throw new Error('SyntaxError: unknown comparator [[' + operator + ']]');
    };
    _that.praser.evaluate = function (expr?, context?) {
      switch (expr.id) {
        case '(name)':
          let val = context[_that.cs.toCamelCase(expr.value)];
          if (val === undefined) {
            console.warn("NameError: name '" + expr.value + "' is not defined");
          }
          return val;
        case '(string)':
        case '(number)':
          return expr.value;
        case '(constant)':
          if (expr.value === 'None') return null;
          else if (expr.value === 'False') return false;
          else if (expr.value === 'True') return true;
          throw new Error("SyntaxError: unknown constant '" + expr.value + "'");
        case '(comparator)':
          let result,
            left = _that.praser.evaluate(expr.expressions[0], context);
          for (let i = 0; i < expr.operators.length; ++i) {
            result = evaluate_operator(
              expr.operators[i],
              left,
              (left = _that.praser.evaluate(expr.expressions[i + 1], context))
            );
            if (!result) {
              return false;
            }
          }
          return true;
        case '-':
          if (expr.second) {
            throw new Error('SyntaxError: binary [-] not implemented yet');
          }
          return -_that.praser.evaluate(expr.first, context);
        case 'not':
          return !_that.praser.evaluate(expr.first, context);
        case 'and':
          return (
            _that.praser.evaluate(expr.first, context) &&
            _that.praser.evaluate(expr.second, context)
          );
        case 'or':
          return (
            _that.praser.evaluate(expr.first, context) ||
            _that.praser.evaluate(expr.second, context)
          );
        case '(':
          if (expr.second) {
            let fn = _that.praser.evaluate(expr.first, context),
              args = [];
            for (let jj = 0; jj < expr.second.length; ++jj) {
              args.push(_that.praser.evaluate(expr.second[jj], context));
            }
            return _that.praser.evaluate.apply(this, args);
          }
          let tuple_exprs = expr.first,
            tuple_values = [];
          for (let j = 0, len = tuple_exprs.length; j < len; ++j) {
            tuple_values.push(_that.praser.evaluate(tuple_exprs[j], context));
          }
          return create(_that.praser.tuple, { values: tuple_values });
        case '[':
          if (expr.second) {
            throw new Error('SyntaxError: indexing not implemented yet');
          }
          let list_exprs = expr.first,
            list_values = [];
          for (let k = 0; k < list_exprs.length; ++k) {
            list_values.push(_that.praser.evaluate(list_exprs[k], context));
          }
          return create(_that.praser.list, { values: list_values });
        case '{':
          let dict_exprs = expr.first,
            dict_values = {};
          for (let l = 0; l < dict_exprs.length; ++l) {
            dict_values[_that.praser.evaluate(dict_exprs[l][0], context)] = _that.praser.evaluate(
              dict_exprs[l][1],
              context
            );
          }
          return create(_that.praser.dict, { values: dict_values });
        case '.':
          if (expr.second.id !== '(name)') {
            throw new Error('SyntaxError: ' + expr);
          }
          return _that.praser.evaluate(expr.first, context)[expr.second.value];
        default:
          return false;
        // throw new wa('SyntaxError: Unknown node [[' + expr.id + ']]');
      }
    };
    _that.praser.eval = (str, context) => {
      return _that.praser.evaluate(_that.praser.parse(_that.praser.tokenize(str)), context);
    };
  }
}
