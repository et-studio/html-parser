/* jshint devel:true */
'use strict';

import Parser from 'Parser';
import * as machine from 'StateMachine';
import * as submachine from 'SubStateMachine';

var basicSymbol = ['<', ' ', '=', '"', '\'', '>', '/', '!', '-'];
var etSymbol = ['{', '['];
var $$endStates = ['stringNode', 'endNode'];

class EtParser {
  constructor(str) {
    var len, pos, i, token, _parser, _state, subpos;
    _parser = new Parser();
    if(!str) {
      return;
    }
    len = str.length;
    for(i = 0; i < len; i++) {
      token = str.charAt(i);
      subpos = etSymbol.indexOf(token);
      if(subpos !== -1) {
        console.log(token);
      }else {
        pos = basicSymbol.indexOf(token);
      }
      _state = machine.stateMachine(token, pos);
      if(_parser[_state]) {
        _parser[_state](token, pos);
      }else {
        // console.log(token);
      }
    }
    return _parser;
  }

}

export default EtParser;
