"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2389],{62389:function(t,i,n){n.d(i,{diagram:function(){return o}});var s=n(51106);n(74548),n(41417),n(35772),n(43571);var e=function(){var t=function(t,i,n,s){for(n=n||{},s=t.length;s--;n[t[s]]=i);return n},i=[6,9,10],n={trace:function(){},yy:{},symbols_:{error:2,start:3,info:4,document:5,EOF:6,line:7,statement:8,NL:9,showInfo:10,$accept:0,$end:1},terminals_:{2:"error",4:"info",6:"EOF",9:"NL",10:"showInfo"},productions_:[0,[3,3],[5,0],[5,2],[7,1],[7,1],[8,1]],performAction:function(t,i,n,s,e,r,h){switch(r.length,e){case 1:return s;case 4:break;case 6:s.setInfo(!0)}},table:[{3:1,4:[1,2]},{1:[3]},t(i,[2,2],{5:3}),{6:[1,4],7:5,8:6,9:[1,7],10:[1,8]},{1:[2,1]},t(i,[2,3]),t(i,[2,4]),t(i,[2,5]),t(i,[2,6])],defaultActions:{4:[2,1]},parseError:function(t,i){if(i.recoverable)this.trace(t);else{var n=Error(t);throw n.hash=i,n}},parse:function(t){var i=this,n=[0],s=[],e=[null],r=[],h=this.table,o="",l=0,c=0,a=r.slice.call(arguments,1),y=Object.create(this.lexer),u={yy:{}};for(var p in this.yy)Object.prototype.hasOwnProperty.call(this.yy,p)&&(u.yy[p]=this.yy[p]);y.setInput(t,u.yy),u.yy.lexer=y,u.yy.parser=this,void 0===y.yylloc&&(y.yylloc={});var f=y.yylloc;r.push(f);var g=y.options&&y.options.ranges;"function"==typeof u.yy.parseError?this.parseError=u.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError;for(var _,m,d,k,b,x,v,I,E={};;){if(m=n[n.length-1],this.defaultActions[m]?d=this.defaultActions[m]:(null==_&&(_=function(){var t;return"number"!=typeof(t=s.pop()||y.lex()||1)&&(t instanceof Array&&(t=(s=t).pop()),t=i.symbols_[t]||t),t}()),d=h[m]&&h[m][_]),void 0===d||!d.length||!d[0]){var S="";for(b in I=[],h[m])this.terminals_[b]&&b>2&&I.push("'"+this.terminals_[b]+"'");S=y.showPosition?"Parse error on line "+(l+1)+":\n"+y.showPosition()+"\nExpecting "+I.join(", ")+", got '"+(this.terminals_[_]||_)+"'":"Parse error on line "+(l+1)+": Unexpected "+(1==_?"end of input":"'"+(this.terminals_[_]||_)+"'"),this.parseError(S,{text:y.match,token:this.terminals_[_]||_,line:y.yylineno,loc:f,expected:I})}if(d[0]instanceof Array&&d.length>1)throw Error("Parse Error: multiple actions possible at state: "+m+", token: "+_);switch(d[0]){case 1:n.push(_),e.push(y.yytext),r.push(y.yylloc),n.push(d[1]),_=null,c=y.yyleng,o=y.yytext,l=y.yylineno,f=y.yylloc;break;case 2:if(x=this.productions_[d[1]][1],E.$=e[e.length-x],E._$={first_line:r[r.length-(x||1)].first_line,last_line:r[r.length-1].last_line,first_column:r[r.length-(x||1)].first_column,last_column:r[r.length-1].last_column},g&&(E._$.range=[r[r.length-(x||1)].range[0],r[r.length-1].range[1]]),void 0!==(k=this.performAction.apply(E,[o,c,l,u.yy,d[1],e,r].concat(a))))return k;x&&(n=n.slice(0,-1*x*2),e=e.slice(0,-1*x),r=r.slice(0,-1*x)),n.push(this.productions_[d[1]][0]),e.push(E.$),r.push(E._$),v=h[n[n.length-2]][n[n.length-1]],n.push(v);break;case 3:return!0}}return!0}};function s(){this.yy={}}return n.lexer={EOF:1,parseError:function(t,i){if(this.yy.parser)this.yy.parser.parseError(t,i);else throw Error(t)},setInput:function(t,i){return this.yy=i||this.yy||{},this._input=t,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},input:function(){var t=this._input[0];return this.yytext+=t,this.yyleng++,this.offset++,this.match+=t,this.matched+=t,t.match(/(?:\r\n?|\n).*/g)?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),t},unput:function(t){var i=t.length,n=t.split(/(?:\r\n?|\n)/g);this._input=t+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-i),this.offset-=i;var s=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),n.length-1&&(this.yylineno-=n.length-1);var e=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:n?(n.length===s.length?this.yylloc.first_column:0)+s[s.length-n.length].length-n[0].length:this.yylloc.first_column-i},this.options.ranges&&(this.yylloc.range=[e[0],e[0]+this.yyleng-i]),this.yyleng=this.yytext.length,this},more:function(){return this._more=!0,this},reject:function(){return this.options.backtrack_lexer?(this._backtrack=!0,this):this.parseError("Lexical error on line "+(this.yylineno+1)+". You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n"+this.showPosition(),{text:"",token:null,line:this.yylineno})},less:function(t){this.unput(this.match.slice(t))},pastInput:function(){var t=this.matched.substr(0,this.matched.length-this.match.length);return(t.length>20?"...":"")+t.substr(-20).replace(/\n/g,"")},upcomingInput:function(){var t=this.match;return t.length<20&&(t+=this._input.substr(0,20-t.length)),(t.substr(0,20)+(t.length>20?"...":"")).replace(/\n/g,"")},showPosition:function(){var t=this.pastInput(),i=Array(t.length+1).join("-");return t+this.upcomingInput()+"\n"+i+"^"},test_match:function(t,i){var n,s,e;if(this.options.backtrack_lexer&&(e={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(e.yylloc.range=this.yylloc.range.slice(0))),(s=t[0].match(/(?:\r\n?|\n).*/g))&&(this.yylineno+=s.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:s?s[s.length-1].length-s[s.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+t[0].length},this.yytext+=t[0],this.match+=t[0],this.matches=t,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(t[0].length),this.matched+=t[0],n=this.performAction.call(this,this.yy,this,i,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),n)return n;if(this._backtrack)for(var r in e)this[r]=e[r];return!1},next:function(){if(this.done)return this.EOF;this._input||(this.done=!0),this._more||(this.yytext="",this.match="");for(var t,i,n,s,e=this._currentRules(),r=0;r<e.length;r++)if((n=this._input.match(this.rules[e[r]]))&&(!i||n[0].length>i[0].length)){if(i=n,s=r,this.options.backtrack_lexer){if(!1!==(t=this.test_match(n,e[r])))return t;if(!this._backtrack)return!1;i=!1;continue}if(!this.options.flex)break}return i?!1!==(t=this.test_match(i,e[s]))&&t:""===this._input?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+". Unrecognized text.\n"+this.showPosition(),{text:"",token:null,line:this.yylineno})},lex:function(){return this.next()||this.lex()},begin:function(t){this.conditionStack.push(t)},popState:function(){return this.conditionStack.length-1>0?this.conditionStack.pop():this.conditionStack[0]},_currentRules:function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},topState:function(t){return(t=this.conditionStack.length-1-Math.abs(t||0))>=0?this.conditionStack[t]:"INITIAL"},pushState:function(t){this.begin(t)},stateStackSize:function(){return this.conditionStack.length},options:{"case-insensitive":!0},performAction:function(t,i,n,s){switch(n){case 0:return 4;case 1:return 9;case 2:return"space";case 3:return 10;case 4:return 6;case 5:return"TXT"}},rules:[/^(?:info\b)/i,/^(?:[\s\n\r]+)/i,/^(?:[\s]+)/i,/^(?:showInfo\b)/i,/^(?:$)/i,/^(?:.)/i],conditions:{INITIAL:{rules:[0,1,2,3,4,5],inclusive:!0}}},s.prototype=n,n.Parser=s,new s}();e.parser=e;let r={info:!1},h=r.info,o={parser:e,db:{clear:()=>{h=r.info},setInfo:t=>{h=t},getInfo:()=>h},renderer:{draw:(t,i,n)=>{s.l.debug("rendering info diagram\n"+t);let e=(0,s.B)(i);(0,s.i)(e,100,400,!0);let r=e.append("g");r.append("text").attr("x",100).attr("y",40).attr("class","version").attr("font-size",32).style("text-anchor","middle").text(`v${n}`)}}}}}]);