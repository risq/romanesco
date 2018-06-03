(window.webpackJsonp=window.webpackJsonp||[]).push([[42],{400:function(e,t,n){"use strict";n.r(t);var r,i,o,a,u,c,s,f,d=monaco.Promise,l=function(){function e(e){var t=this;this._defaults=e,this._worker=null,this._idleCheckInterval=setInterval(function(){return t._checkIfIdle()},3e4),this._lastUsedTime=0,this._configChangeListener=this._defaults.onDidChange(function(){return t._stopWorker()})}return e.prototype._stopWorker=function(){this._worker&&(this._worker.dispose(),this._worker=null),this._client=null},e.prototype.dispose=function(){clearInterval(this._idleCheckInterval),this._configChangeListener.dispose(),this._stopWorker()},e.prototype._checkIfIdle=function(){this._worker&&(Date.now()-this._lastUsedTime>12e4&&this._stopWorker())},e.prototype._getClient=function(){return this._lastUsedTime=Date.now(),this._client||(this._worker=monaco.editor.createWebWorker({moduleId:"vs/language/css/cssWorker",label:this._defaults.languageId,createData:{languageSettings:this._defaults.diagnosticsOptions,languageId:this._defaults.languageId}}),this._client=this._worker.getProxy()),this._client},e.prototype.getLanguageServiceWorker=function(){for(var e,t,n,r,i,o=this,a=[],u=0;u<arguments.length;u++)a[u]=arguments[u];return t=this._getClient().then(function(t){e=t}).then(function(e){return o._worker.withSyncedResources(a)}).then(function(t){return e}),i=new d(function(e,t){n=e,r=t},function(){}),t.then(n,r),i},e}();!function(e){e.create=function(e,t){return{line:e,character:t}},e.is=function(e){var t=e;return W.defined(t)&&W.number(t.line)&&W.number(t.character)}}(r||(r={})),function(e){e.create=function(e,t,n,i){if(W.number(e)&&W.number(t)&&W.number(n)&&W.number(i))return{start:r.create(e,t),end:r.create(n,i)};if(r.is(e)&&r.is(t))return{start:e,end:t};throw new Error("Range#create called with invalid arguments["+e+", "+t+", "+n+", "+i+"]")},e.is=function(e){var t=e;return W.defined(t)&&r.is(t.start)&&r.is(t.end)}}(i||(i={})),function(e){e.create=function(e,t){return{uri:e,range:t}},e.is=function(e){var t=e;return W.defined(t)&&i.is(t.range)&&(W.string(t.uri)||W.undefined(t.uri))}}(o||(o={})),function(e){e.Error=1,e.Warning=2,e.Information=3,e.Hint=4}(a||(a={})),function(e){e.create=function(e,t,n,r,i){var o={range:e,message:t};return W.defined(n)&&(o.severity=n),W.defined(r)&&(o.code=r),W.defined(i)&&(o.source=i),o},e.is=function(e){var t=e;return W.defined(t)&&i.is(t.range)&&W.string(t.message)&&(W.number(t.severity)||W.undefined(t.severity))&&(W.number(t.code)||W.string(t.code)||W.undefined(t.code))&&(W.string(t.source)||W.undefined(t.source))}}(u||(u={})),function(e){e.create=function(e,t){for(var n=[],r=2;r<arguments.length;r++)n[r-2]=arguments[r];var i={title:e,command:t};return W.defined(n)&&n.length>0&&(i.arguments=n),i},e.is=function(e){var t=e;return W.defined(t)&&W.string(t.title)&&W.string(t.title)}}(c||(c={})),function(e){e.replace=function(e,t){return{range:e,newText:t}},e.insert=function(e,t){return{range:{start:e,end:e},newText:t}},e.del=function(e){return{range:e,newText:""}}}(s||(s={})),function(e){e.create=function(e,t){return{textDocument:e,edits:t}},e.is=function(e){var t=e;return W.defined(t)&&h.is(t.textDocument)&&Array.isArray(t.edits)}}(f||(f={}));var g,h,p,m,v,_,y,b,w,k,x,C,E,T,I,S,M,P,D=function(){function e(e){this.edits=e}return e.prototype.insert=function(e,t){this.edits.push(s.insert(e,t))},e.prototype.replace=function(e,t){this.edits.push(s.replace(e,t))},e.prototype.delete=function(e){this.edits.push(s.del(e))},e.prototype.add=function(e){this.edits.push(e)},e.prototype.all=function(){return this.edits},e.prototype.clear=function(){this.edits.splice(0,this.edits.length)},e}();!function(){function e(e){var t=this;this._textEditChanges=Object.create(null),e&&(this._workspaceEdit=e,e.documentChanges?e.documentChanges.forEach(function(e){var n=new D(e.edits);t._textEditChanges[e.textDocument.uri]=n}):e.changes&&Object.keys(e.changes).forEach(function(n){var r=new D(e.changes[n]);t._textEditChanges[n]=r}))}Object.defineProperty(e.prototype,"edit",{get:function(){return this._workspaceEdit},enumerable:!0,configurable:!0}),e.prototype.getTextEditChange=function(e){if(h.is(e)){if(this._workspaceEdit||(this._workspaceEdit={documentChanges:[]}),!this._workspaceEdit.documentChanges)throw new Error("Workspace edit is not configured for versioned document changes.");var t=e;if(!(r=this._textEditChanges[t.uri])){var n={textDocument:t,edits:i=[]};this._workspaceEdit.documentChanges.push(n),r=new D(i),this._textEditChanges[t.uri]=r}return r}if(this._workspaceEdit||(this._workspaceEdit={changes:Object.create(null)}),!this._workspaceEdit.changes)throw new Error("Workspace edit is not configured for normal text edit changes.");var r;if(!(r=this._textEditChanges[e])){var i=[];this._workspaceEdit.changes[e]=i,r=new D(i),this._textEditChanges[e]=r}return r}}();!function(e){e.create=function(e){return{uri:e}},e.is=function(e){var t=e;return W.defined(t)&&W.string(t.uri)}}(g||(g={})),function(e){e.create=function(e,t){return{uri:e,version:t}},e.is=function(e){var t=e;return W.defined(t)&&W.string(t.uri)&&W.number(t.version)}}(h||(h={})),function(e){e.create=function(e,t,n,r){return{uri:e,languageId:t,version:n,text:r}},e.is=function(e){var t=e;return W.defined(t)&&W.string(t.uri)&&W.string(t.languageId)&&W.number(t.version)&&W.string(t.text)}}(p||(p={})),function(e){e.PlainText="plaintext",e.Markdown="markdown"}(m||(m={})),function(e){e.Text=1,e.Method=2,e.Function=3,e.Constructor=4,e.Field=5,e.Variable=6,e.Class=7,e.Interface=8,e.Module=9,e.Property=10,e.Unit=11,e.Value=12,e.Enum=13,e.Keyword=14,e.Snippet=15,e.Color=16,e.File=17,e.Reference=18,e.Folder=19,e.EnumMember=20,e.Constant=21,e.Struct=22,e.Event=23,e.Operator=24,e.TypeParameter=25}(v||(v={})),function(e){e.PlainText=1,e.Snippet=2}(_||(_={})),function(e){e.create=function(e){return{label:e}}}(y||(y={})),function(e){e.create=function(e,t){return{items:e||[],isIncomplete:!!t}}}(b||(b={})),function(e){e.fromPlainText=function(e){return e.replace(/[\\`*_{}[\]()#+\-.!]/g,"\\$&")}}(w||(w={})),function(e){e.create=function(e,t){return t?{label:e,documentation:t}:{label:e}}}(k||(k={})),function(e){e.create=function(e,t){for(var n=[],r=2;r<arguments.length;r++)n[r-2]=arguments[r];var i={label:e};return W.defined(t)&&(i.documentation=t),W.defined(n)?i.parameters=n:i.parameters=[],i}}(x||(x={})),function(e){e.Text=1,e.Read=2,e.Write=3}(C||(C={})),function(e){e.create=function(e,t){var n={range:e};return W.number(t)&&(n.kind=t),n}}(E||(E={})),function(e){e.File=1,e.Module=2,e.Namespace=3,e.Package=4,e.Class=5,e.Method=6,e.Property=7,e.Field=8,e.Constructor=9,e.Enum=10,e.Interface=11,e.Function=12,e.Variable=13,e.Constant=14,e.String=15,e.Number=16,e.Boolean=17,e.Array=18,e.Object=19,e.Key=20,e.Null=21,e.EnumMember=22,e.Struct=23,e.Event=24,e.Operator=25,e.TypeParameter=26}(T||(T={})),function(e){e.create=function(e,t,n,r,i){var o={name:e,kind:t,location:{uri:r,range:n}};return i&&(o.containerName=i),o}}(I||(I={})),function(e){e.create=function(e){return{diagnostics:e}},e.is=function(e){var t=e;return W.defined(t)&&W.typedArray(t.diagnostics,u.is)}}(S||(S={})),function(e){e.create=function(e,t){var n={range:e};return W.defined(t)&&(n.data=t),n},e.is=function(e){var t=e;return W.defined(t)&&i.is(t.range)&&(W.undefined(t.command)||c.is(t.command))}}(M||(M={})),function(e){e.create=function(e,t){return{tabSize:e,insertSpaces:t}},e.is=function(e){var t=e;return W.defined(t)&&W.number(t.tabSize)&&W.boolean(t.insertSpaces)}}(P||(P={}));var O=function(){return function(){}}();!function(e){e.create=function(e,t){return{range:e,target:t}},e.is=function(e){var t=e;return W.defined(t)&&i.is(t.range)&&(W.undefined(t.target)||W.string(t.target))}}(O||(O={}));var A,F;!function(e){e.create=function(e,t,n,r){return new j(e,t,n,r)},e.is=function(e){var t=e;return!!(W.defined(t)&&W.string(t.uri)&&(W.undefined(t.languageId)||W.string(t.languageId))&&W.number(t.lineCount)&&W.func(t.getText)&&W.func(t.positionAt)&&W.func(t.offsetAt))},e.applyEdits=function(e,t){for(var n=e.getText(),r=function e(t,n){if(t.length<=1)return t;var r=t.length/2|0,i=t.slice(0,r),o=t.slice(r);e(i,n),e(o,n);for(var a=0,u=0,c=0;a<i.length&&u<o.length;){var s=n(i[a],o[u]);t[c++]=s<=0?i[a++]:o[u++]}for(;a<i.length;)t[c++]=i[a++];for(;u<o.length;)t[c++]=o[u++];return t}(t,function(e,t){return 0==e.range.start.line-t.range.start.line?e.range.start.character-t.range.start.character:0}),i=n.length,o=r.length-1;o>=0;o--){var a=r[o],u=e.offsetAt(a.range.start),c=e.offsetAt(a.range.end);if(!(c<=i))throw new Error("Ovelapping edit");n=n.substring(0,u)+a.newText+n.substring(c,n.length),i=u}return n}}(A||(A={})),function(e){e.Manual=1,e.AfterDelay=2,e.FocusOut=3}(F||(F={}));var W,j=function(){function e(e,t,n,r){this._uri=e,this._languageId=t,this._version=n,this._content=r,this._lineOffsets=null}return Object.defineProperty(e.prototype,"uri",{get:function(){return this._uri},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"languageId",{get:function(){return this._languageId},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"version",{get:function(){return this._version},enumerable:!0,configurable:!0}),e.prototype.getText=function(e){if(e){var t=this.offsetAt(e.start),n=this.offsetAt(e.end);return this._content.substring(t,n)}return this._content},e.prototype.update=function(e,t){this._content=e.text,this._version=t,this._lineOffsets=null},e.prototype.getLineOffsets=function(){if(null===this._lineOffsets){for(var e=[],t=this._content,n=!0,r=0;r<t.length;r++){n&&(e.push(r),n=!1);var i=t.charAt(r);n="\r"===i||"\n"===i,"\r"===i&&r+1<t.length&&"\n"===t.charAt(r+1)&&r++}n&&t.length>0&&e.push(t.length),this._lineOffsets=e}return this._lineOffsets},e.prototype.positionAt=function(e){e=Math.max(Math.min(e,this._content.length),0);var t=this.getLineOffsets(),n=0,i=t.length;if(0===i)return r.create(0,e);for(;n<i;){var o=Math.floor((n+i)/2);t[o]>e?i=o:n=o+1}var a=n-1;return r.create(a,e-t[a])},e.prototype.offsetAt=function(e){var t=this.getLineOffsets();if(e.line>=t.length)return this._content.length;if(e.line<0)return 0;var n=t[e.line],r=e.line+1<t.length?t[e.line+1]:this._content.length;return Math.max(Math.min(n+e.character,r),n)},Object.defineProperty(e.prototype,"lineCount",{get:function(){return this.getLineOffsets().length},enumerable:!0,configurable:!0}),e}();!function(e){var t=Object.prototype.toString;e.defined=function(e){return void 0!==e},e.undefined=function(e){return void 0===e},e.boolean=function(e){return!0===e||!1===e},e.string=function(e){return"[object String]"===t.call(e)},e.number=function(e){return"[object Number]"===t.call(e)},e.func=function(e){return"[object Function]"===t.call(e)},e.typedArray=function(e,t){return Array.isArray(e)&&e.every(t)}}(W||(W={}));var N=monaco.Uri,R=function(){function e(e,t,n){var r=this;this._languageId=e,this._worker=t,this._disposables=[],this._listener=Object.create(null);var i=function(e){var t,n=e.getModeId();n===r._languageId&&(r._listener[e.uri.toString()]=e.onDidChangeContent(function(){clearTimeout(t),t=setTimeout(function(){return r._doValidate(e.uri,n)},500)}),r._doValidate(e.uri,n))},o=function(e){monaco.editor.setModelMarkers(e,r._languageId,[]);var t=e.uri.toString(),n=r._listener[t];n&&(n.dispose(),delete r._listener[t])};this._disposables.push(monaco.editor.onDidCreateModel(i)),this._disposables.push(monaco.editor.onWillDisposeModel(o)),this._disposables.push(monaco.editor.onDidChangeModelLanguage(function(e){o(e.model),i(e.model)})),n.onDidChange(function(e){monaco.editor.getModels().forEach(function(e){e.getModeId()===r._languageId&&(o(e),i(e))})}),this._disposables.push({dispose:function(){for(var e in r._listener)r._listener[e].dispose()}}),monaco.editor.getModels().forEach(i)}return e.prototype.dispose=function(){this._disposables.forEach(function(e){return e&&e.dispose()}),this._disposables=[]},e.prototype._doValidate=function(e,t){this._worker(e).then(function(t){return t.doValidation(e.toString())}).then(function(n){var r=n.map(function(e){return n="number"==typeof(t=e).code?String(t.code):t.code,{severity:function(e){switch(e){case a.Error:return monaco.MarkerSeverity.Error;case a.Warning:return monaco.MarkerSeverity.Warning;case a.Information:return monaco.MarkerSeverity.Info;case a.Hint:return monaco.MarkerSeverity.Hint;default:return monaco.MarkerSeverity.Info}}(t.severity),startLineNumber:t.range.start.line+1,startColumn:t.range.start.character+1,endLineNumber:t.range.end.line+1,endColumn:t.range.end.character+1,message:t.message,code:n,source:t.source};var t,n}),i=monaco.editor.getModel(e);i.getModeId()===t&&monaco.editor.setModelMarkers(i,t,r)}).done(void 0,function(e){console.error(e)})},e}();function H(e){if(e)return{character:e.column-1,line:e.lineNumber-1}}function L(e){if(e)return new monaco.Range(e.start.line+1,e.start.character+1,e.end.line+1,e.end.character+1)}function V(e){if(e)return{range:L(e.range),text:e.newText}}var K=function(){function e(e){this._worker=e}return Object.defineProperty(e.prototype,"triggerCharacters",{get:function(){return[" ",":"]},enumerable:!0,configurable:!0}),e.prototype.provideCompletionItems=function(e,t,n){e.getWordUntilPosition(t);var r=e.uri;return Y(n,this._worker(r).then(function(e){return e.doComplete(r.toString(),H(t))}).then(function(e){if(e){var t=e.items.map(function(e){var t={label:e.label,insertText:e.insertText,sortText:e.sortText,filterText:e.filterText,documentation:e.documentation,detail:e.detail,kind:function(e){var t=monaco.languages.CompletionItemKind;switch(e){case v.Text:return t.Text;case v.Method:return t.Method;case v.Function:return t.Function;case v.Constructor:return t.Constructor;case v.Field:return t.Field;case v.Variable:return t.Variable;case v.Class:return t.Class;case v.Interface:return t.Interface;case v.Module:return t.Module;case v.Property:return t.Property;case v.Unit:return t.Unit;case v.Value:return t.Value;case v.Enum:return t.Enum;case v.Keyword:return t.Keyword;case v.Snippet:return t.Snippet;case v.Color:return t.Color;case v.File:return t.File;case v.Reference:return t.Reference}return t.Property}(e.kind)};return e.textEdit&&(t.range=L(e.textEdit.range),t.insertText=e.textEdit.newText),e.additionalTextEdits&&(t.additionalTextEdits=e.additionalTextEdits.map(V)),e.insertTextFormat===_.Snippet&&(t.insertText={value:t.insertText}),t});return{isIncomplete:e.isIncomplete,items:t}}}))},e}();function U(e){return"string"==typeof e?{value:e}:(t=e)&&"object"==typeof t&&"string"==typeof t.kind?"plaintext"===e.kind?{value:e.value.replace(/[\\`*_{}[\]()#+\-.!]/g,"\\$&")}:{value:e.value}:{value:"```"+e.language+"\n"+e.value+"\n```\n"};var t}var B=function(){function e(e){this._worker=e}return e.prototype.provideHover=function(e,t,n){var r=e.uri;return Y(n,this._worker(r).then(function(e){return e.doHover(r.toString(),H(t))}).then(function(e){if(e)return{range:L(e.range),contents:function(e){if(e)return Array.isArray(e)?e.map(U):[U(e)]}(e.contents)}}))},e}();var z=function(){function e(e){this._worker=e}return e.prototype.provideDocumentHighlights=function(e,t,n){var r=e.uri;return Y(n,this._worker(r).then(function(e){return e.findDocumentHighlights(r.toString(),H(t))}).then(function(e){if(e)return e.map(function(e){return{range:L(e.range),kind:function(e){switch(e){case C.Read:return monaco.languages.DocumentHighlightKind.Read;case C.Write:return monaco.languages.DocumentHighlightKind.Write;case C.Text:return monaco.languages.DocumentHighlightKind.Text}return monaco.languages.DocumentHighlightKind.Text}(e.kind)}})}))},e}();function J(e){return{uri:N.parse(e.uri),range:L(e.range)}}var $=function(){function e(e){this._worker=e}return e.prototype.provideDefinition=function(e,t,n){var r=e.uri;return Y(n,this._worker(r).then(function(e){return e.findDefinition(r.toString(),H(t))}).then(function(e){if(e)return[J(e)]}))},e}(),q=function(){function e(e){this._worker=e}return e.prototype.provideReferences=function(e,t,n,r){var i=e.uri;return Y(r,this._worker(i).then(function(e){return e.findReferences(i.toString(),H(t))}).then(function(e){if(e)return e.map(J)}))},e}();var G=function(){function e(e){this._worker=e}return e.prototype.provideRenameEdits=function(e,t,n,r){var i=e.uri;return Y(r,this._worker(i).then(function(e){return e.doRename(i.toString(),H(t),n)}).then(function(e){return function(e){if(e&&e.changes){var t=[];for(var n in e.changes){for(var r=[],i=0,o=e.changes[n];i<o.length;i++){var a=o[i];r.push({range:L(a.range),text:a.newText})}t.push({resource:N.parse(n),edits:r})}return{edits:t}}}(e)}))},e}();var Q=function(){function e(e){this._worker=e}return e.prototype.provideDocumentSymbols=function(e,t){var n=e.uri;return Y(t,this._worker(n).then(function(e){return e.findDocumentSymbols(n.toString())}).then(function(e){if(e)return e.map(function(e){return{name:e.name,containerName:e.containerName,kind:function(e){var t=monaco.languages.SymbolKind;switch(e){case T.File:return t.Array;case T.Module:return t.Module;case T.Namespace:return t.Namespace;case T.Package:return t.Package;case T.Class:return t.Class;case T.Method:return t.Method;case T.Property:return t.Property;case T.Field:return t.Field;case T.Constructor:return t.Constructor;case T.Enum:return t.Enum;case T.Interface:return t.Interface;case T.Function:return t.Function;case T.Variable:return t.Variable;case T.Constant:return t.Constant;case T.String:return t.String;case T.Number:return t.Number;case T.Boolean:return t.Boolean;case T.Array:return t.Array}return t.Function}(e.kind),location:J(e.location)}})}))},e}(),X=function(){function e(e){this._worker=e}return e.prototype.provideDocumentColors=function(e,t){var n=e.uri;return Y(t,this._worker(n).then(function(e){return e.findDocumentColors(n.toString())}).then(function(e){if(e)return e.map(function(e){return{color:e.color,range:L(e.range)}})}))},e.prototype.provideColorPresentations=function(e,t,n){var r=e.uri;return Y(n,this._worker(r).then(function(e){return e.getColorPresentations(r.toString(),t.color,function(e){if(e)return{start:{line:e.startLineNumber-1,character:e.startColumn-1},end:{line:e.endLineNumber-1,character:e.endColumn-1}}}(t.range))}).then(function(e){if(e)return e.map(function(e){var t={label:e.label};return e.textEdit&&(t.textEdit=V(e.textEdit)),e.additionalTextEdits&&(t.additionalTextEdits=e.additionalTextEdits.map(V)),t})}))},e}();function Y(e,t){return e.onCancellationRequested(function(){return t.cancel()}),t}function Z(e){var t=new l(e),n=function(e){for(var n=[],r=1;r<arguments.length;r++)n[r-1]=arguments[r];return t.getLanguageServiceWorker.apply(t,[e].concat(n))},r=e.languageId;monaco.languages.registerCompletionItemProvider(r,new K(n)),monaco.languages.registerHoverProvider(r,new B(n)),monaco.languages.registerDocumentHighlightProvider(r,new z(n)),monaco.languages.registerDefinitionProvider(r,new $(n)),monaco.languages.registerReferenceProvider(r,new q(n)),monaco.languages.registerDocumentSymbolProvider(r,new Q(n)),monaco.languages.registerRenameProvider(r,new G(n)),monaco.languages.registerColorProvider(r,new X(n)),new R(r,n,e)}n.d(t,"setupMode",function(){return Z})}}]);
//# sourceMappingURL=42.js.map