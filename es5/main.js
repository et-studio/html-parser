define(['exports', 'module', 'Parser'], function (exports, module, _Parser) {
  /* jshint devel:true */
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _Parser2 = _interopRequireDefault(_Parser);

  var $$state;

  function stateMachine(oldstate) {
    var newState;
    switch (oldstate) {
      //匹配扫描到<符号后再扫描到/的状态，即标签开始闭合
      case 'getTags6':
        newState = 'getEndNode';
        break;
      //匹配扫描到<符号后再扫描到符号表外字符的状态，即即将开始获取Node节点名
      case 'getTags-1':
        newState = 'getNodeBegin';
        break;
      //匹配上一情况后跟字符串的状态，即正在获取Node节点名
      case 'getNodeBegin-1':
        newState = 'getNodeBegin';
        break;
      //匹配上一情况后再扫描到空格的状态，即开始获取attribute名
      case 'getNodeBegin1':
        newState = 'getAttributesKey';
        break;
      case 'getNodeBegin5':
        newState = 'buildNode';
        break;
      case 'buildNode0':
        newState = 'getTags';
        break;
      case 'buildNode-1':
        newState = 'stringNode';
        break;
      case 'getEndNode-1':
        newState = 'getEndNode';
        break;
      case 'getEndNode5':
        newState = 'endNode';
        break;
      case 'endNode-1':
        newState = 'stringNode';
        break;
      case 'endNode0':
        newState = 'getTags';
        break;
      //匹配上一情况后再跟符号表外字符的状态，即正在获取attribute名
      case 'getAttributesKey-1':
        newState = 'getAttributesKey';
        break;
      //
      case 'getAttributesKey2':
        newState = 'getAttributesValBegin';
        break;
      case 'getAttributesValBegin3':
        newState = 'getAttributesVal';
        break;
      case 'getAttributesVal-1':
      case 'getAttributesVal1':
        newState = 'getAttributesVal';
        break;
      case 'getAttributesVal3':
        newState = 'getNodeBegin';
        break;
      case 'stringNode0':
        newState = 'getTags';
        break;
      case 'stringNode-1':
      case 'stringNode1':
      case 'stringNode2':
      case 'stringNode3':
      case 'stringNode4':
      case 'stringNode5':
      case 'stringNode6':
        newState = 'stringNode';
        break;
    }
    return newState;
  }

  function autoMachine(token, pos) {
    var prestate, parser, _state;
    $$state = $$state || 'stringNode';
    _state = $$state = stateMachine($$state + pos);
    parser = _Parser2['default'][_state];
    if (parser) {
      parser(token, pos);
    } else {
      console.log(_state);
    }
  }

  var EtParser = function EtParser(str) {
    var endt, len, pos, i, token;
    if (!str) {
      return;
    }
    len = str.length;
    endt = ['<', ' ', '=', '"', '\'', '>', '/'];
    for (i = 0; i < len; i++) {
      token = str.charAt(i);
      pos = endt.indexOf(token);
      autoMachine(token, pos);
    }
    return _Parser2['default'];
  };

  module.exports = EtParser;
});