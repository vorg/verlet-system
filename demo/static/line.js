!function t(n,e,r){function i(a,u){if(!e[a]){if(!n[a]){var s="function"==typeof require&&require;if(!u&&s)return s(a,!0);if(o)return o(a,!0);var c=new Error("Cannot find module '"+a+"'");throw c.code="MODULE_NOT_FOUND",c}var f=e[a]={exports:{}};n[a][0].call(f.exports,function(t){var e=n[a][1][t];return i(e?e:t)},f,f.exports,t,n,e,r)}return e[a].exports}for(var o="function"==typeof require&&require,a=0;a<r.length;a++)i(r[a]);return i}({1:[function(t,n){var e=t("gl-matrix").vec2;n.exports=t("./lib/build")(e)},{"./lib/build":4,"gl-matrix":17}],2:[function(t){function n(t,n,r,i){t.clearRect(0,0,n,r),t.fillStyle="#1f1f1f",t.fillRect(0,0,n,r),e(n,r,i),t.beginPath(),s.forEach(function(n){if(n.rect){var e=n.position;t.moveTo(e[0],e[1]);var r=2;t.rect(e[0]-r/2,e[1]-r/2,r,r)}}),t.fillStyle="rgba(255,255,255,0.5)",t.fill(),t.strokeStyle="rgba(255,255,255,0.25)",c.forEach(function(n){t.beginPath(),n.points.forEach(function(n){t.lineTo(n.position[0],n.position[1])}),t.stroke()})}function e(t,n,e){u.min=[0,0],u.max=[t,n],u.integrate(s,e/1e3),c.forEach(function(t){return t.solve()})}function r(t,n,e){u=f(),s=i(500,n,e),c=o(s),setTimeout(function(){a(s,1)},1500),setTimeout(function(){u.gravity[1]=500},2500)}function i(t,n,e){return l(t).map(function(t,r,i){var o=d(10,15),a=r/(i.length-1),u=a*Math.PI*4,s=[Math.cos(u)*o,Math.sin(u)*o],c=p({position:h.add([],s,[n/2,e/2])});return c.addForce(h.scale([],s,.2*a)),r%2===0&&(c.mass=2),c.rect=!0,c})}function o(t){for(var n=[],e=0;e<t.length;e+=2)n.push([t[e],t[(e+1)%t.length]]);return n.map(function(t){return v(t,{restingDistance:10,stiffness:.05})})}function a(t,n){var e=0;t.forEach(function(t,r,i){setTimeout(function(){var n=50,e=r/(i.length-1),o=e*Math.PI*40+d(20,30),a=[Math.cos(o)*n,Math.sin(o)*n];t.addForce(h.scale(a,a,-.5*e)),t.rect=!1},e),e+=n||0})}t("canvas-testbed")(n,r);var u,s,c,f=t("../"),h=t("gl-matrix").vec2,l=t("array-range"),d=t("randf"),v=t("verlet-constraint"),p=t("verlet-point")},{"../":1,"array-range":5,"canvas-testbed":7,"gl-matrix":17,randf:18,"verlet-constraint":19,"verlet-point":21}],3:[function(t,n){n.exports=function(t){var n=t.fromValues(-1/0,-1/0,-1/0),e=t.fromValues(1/0,1/0,1/0),r=t.fromValues(1,1,1),i=t.create(),o=1e-6,a=1;return function(u,s,c,f,h){if(c||f){t.copy(i,r),c=c||n,f=f||e;var l=0,d=u.position.length,v=!1,p=u.radius||0;for(l=0;d>l;l++)"number"==typeof c[l]&&u.position[l]-p<c[l]-a&&(i[l]=s[l]>0?-1:1,u.position[l]=c[l]+p,v=!0);for(l=0;d>l;l++)"number"==typeof f[l]&&u.position[l]+p>f[l]-a&&(i[l]=s[l]>0?-1:1,u.position[l]=f[l]-p,v=!0);var m=t.sqrLen(s);if(v&&!(o>=m)){var y=Math.sqrt(m);0!==y&&t.scale(s,s,1/y),t.scale(i,i,y*h),t.multiply(s,s,i)}}}}},{}],4:[function(t,n){var e=t("as-number"),r=(t("clamp"),t("./box-collision"));n.exports=function(t){function n(r){return this instanceof n?(r=r||{},this.gravity=r.gravity||t.create(),this.friction=e(r.friction,.98),this.min=r.min,this.max=r.max,void(this.bounce=e(r.bounce,1))):new n(r)}var i=r(t),o=t.create(),a=t.create(),u=t.create();return n.prototype.collision=function(t,n){i(t,n,this.min,this.max,this.bounce)},n.prototype.integratePoint=function(n,e){var r="number"==typeof n.mass?n.mass:1;if(0===r)return this.collision(n,u),void t.copy(n.acceleration,u);t.add(n.acceleration,n.acceleration,this.gravity),t.scale(n.acceleration,n.acceleration,r),t.sub(o,n.position,n.previous),t.scale(o,o,this.friction),this.collision(n,o),t.copy(n.previous,n.position);var i=e*e;t.scale(a,n.acceleration,.5*i),t.add(n.position,n.position,o),t.add(n.position,n.position,a),t.copy(n.acceleration,u)},n.prototype.integrate=function(t,n){for(var e=0;e<t.length;e++)this.integratePoint(t[e],n)},n}},{"./box-collision":3,"as-number":6,clamp:16}],5:[function(t,n){n.exports=function(t,n){var e="number"==typeof t,r="number"==typeof n;e&&!r?(n=t,t=0):e||r||(t=0,n=0),t=0|t,n=0|n;var i=n-t;if(0>i)throw new Error("array length must be positive");for(var o=new Array(i),a=0,u=t;i>a;a++,u++)o[a]=u;return o}},{}],6:[function(t,n){n.exports=function(t,n){return"number"==typeof t?t:"number"==typeof n?n:0}},{}],7:[function(t,n){var e=t("domready");t("raf.js");var r=t("canvas-app");n.exports=function(t,n,i){e(function(){"object"==typeof t&&t?(i=t,t=null,n=null):"object"==typeof n&&n&&(i=n,n=null),i=i||{},"function"!=typeof i.onReady&&(i.onReady=n);var e=r(t,i);e.canvas.setAttribute("id","canvas"),document.body.appendChild(e.canvas),document.body.style.margin="0",document.body.style.overflow="hidden",e.start()})}},{"canvas-app":8,domready:14,"raf.js":15}],8:[function(t,n){function e(t){var n="undefined"!=typeof CanvasRenderingContext2D&&t instanceof CanvasRenderingContext2D;return t&&(n||i(t))}function r(t,n){if(!(this instanceof r))return new r(t,n);"object"==typeof t&&t&&(n=t,t=null),t="function"==typeof t?t:n.onRender,n=n||{},n.retina="boolean"==typeof n.retina?n.retina:!0;var s="number"==typeof n.width,c="number"==typeof n.height;(s||c)&&(n.ignoreResize=!0),n.width=s?n.width:window.innerWidth,n.height=c?n.height:window.innerHeight;var f,h,l=n.retina?window.devicePixelRatio||1:1,d=n.contextAttributes||{};if(this.isWebGL=!1,e(n.context)&&(h=n.context,f=h.canvas),f||(f=n.canvas||document.createElement("canvas")),f.width=n.width*l,f.height=n.height*l,!h)if("webgl"===n.context||"experimental-webgl"===n.context){if(h=o({canvas:f,attributes:d}),!h)throw"WebGL Context Not Supported -- try enabling it or using a different browser"}else h=f.getContext(n.context||"2d",d);this.isWebGL=i(h),n.retina&&(f.style.width=n.width+"px",f.style.height=n.height+"px"),this.running=!1,this.width=n.width,this.height=n.height,this.canvas=f,this.context=h,this.onResize=n.onResize,this._DPR=l,this._retina=n.retina,this._once=n.once,this._ignoreResize=n.ignoreResize,this._lastFrame=null,this._then=Date.now(),this.maxDeltaTime="number"==typeof n.maxDeltaTime?n.maxDeltaTime:1e3/24,this.fps=60,this._frames=0,this._prevTime=this._then,this._ignoreResize||(n.resizeDebounce="number"==typeof n.resizeDebounce?n.resizeDebounce:50,u(window,"resize",a(function(){this.resize(window.innerWidth,window.innerHeight)}.bind(this),n.resizeDebounce,!1)),u(window,"orientationchange",function(){this.resize(window.innerWidth,window.innerHeight)}.bind(this))),this.onRender="function"==typeof t?t.bind(this):function(){},this.renderOnce=function(){var t=Date.now(),n=Math.min(this.maxDeltaTime,t-this._then);this._frames++,t>this._prevTime+1e3&&(this.fps=Math.round(1e3*this._frames/(t-this._prevTime)),this._prevTime=t,this._frames=0),this.isWebGL?this.context.viewport(0,0,this.width*this._DPR,this.height*this._DPR):(this.context.save(),this.context.scale(this._DPR,this._DPR)),this.onRender(this.context,this.width,this.height,n),this.isWebGL||this.context.restore(),this._then=t},this._renderHandler=function(){this.running&&(this._once||(this._lastFrame=requestAnimationFrame(this._renderHandler)),this.renderOnce())}.bind(this),"function"==typeof n.onReady&&n.onReady.call(this,h,this.width,this.height)}var i=t("is-webgl-context"),o=t("webgl-context"),a=t("debounce"),u=t("add-event-listener");Object.defineProperty(r.prototype,"retinaEnabled",{set:function(t){this._retina=t,this._DPR=this._retina?window.devicePixelRatio||1:1,this.resize(this.width,this.height)},get:function(){return this._retina}}),Object.defineProperty(r.prototype,"deviceWidth",{get:function(){return this.width*this._DPR}}),Object.defineProperty(r.prototype,"deviceHeight",{get:function(){return this.height*this._DPR}}),r.prototype.resetFPS=function(){this._frames=0,this._prevTime=Date.now(),this._then=this._prevTime,this.fps=60},r.prototype.start=function(){this.running||(this._lastFrame&&cancelAnimationFrame(this._lastFrame),this.resetFPS(),this.running=!0,this._lastFrame=requestAnimationFrame(this._renderHandler))},r.prototype.stop=function(){this._lastFrame&&(cancelAnimationFrame(this._lastFrame),this._lastFrame=null),this.running=!1},r.prototype.resize=function(t,n){var e=this.canvas;this.width=t,this.height=n,e.width=this.width*this._DPR,e.height=this.height*this._DPR,this._retina&&(e.style.width=this.width+"px",e.style.height=this.height+"px"),this._once&&requestAnimationFrame(this._renderHandler),"function"==typeof this.onResize&&this.onResize(this.width,this.height)},n.exports=r},{"add-event-listener":9,debounce:10,"is-webgl-context":12,"webgl-context":13}],9:[function(t,n){function e(t,n,e,r){return s=s||(document.addEventListener?{add:i,rm:o}:{add:a,rm:u}),s.add(t,n,e,r)}function r(t,n,e,r){return s=s||(document.addEventListener?{add:i,rm:o}:{add:a,rm:u}),s.rm(t,n,e,r)}function i(t,n,e,r){t.addEventListener(n,e,r)}function o(t,n,e,r){t.removeEventListener(n,e,r)}function a(t,n,e,r){if(r)throw new Error("cannot useCapture in oldIE");t.attachEvent("on"+n,e)}function u(t,n,e){t.detachEvent("on"+n,e)}e.removeEventListener=r,e.addEventListener=e,n.exports=e;var s=null},{}],10:[function(t,n){var e=t("date-now");n.exports=function(t,n,r){function i(){var f=e()-s;n>f&&f>0?o=setTimeout(i,n-f):(o=null,r||(c=t.apply(u,a),o||(u=a=null)))}var o,a,u,s,c;return null==n&&(n=100),function(){u=this,a=arguments,s=e();var f=r&&!o;return o||(o=setTimeout(i,n)),f&&(c=t.apply(u,a),u=a=null),c}}},{"date-now":11}],11:[function(t,n){function e(){return(new Date).getTime()}n.exports=Date.now||e},{}],12:[function(t,n){n.exports=function(t){if(!t)return!1;var n=t;return"undefined"!=typeof t.rawgl&&(n=t.rawgl),"undefined"!=typeof WebGLRenderingContext&&n instanceof WebGLRenderingContext?!0:!1}},{}],13:[function(t,n){n.exports=function(t){t=t||{};var n=t.canvas||document.createElement("canvas");"number"==typeof t.width&&(n.width=t.width),"number"==typeof t.height&&(n.height=t.height);var e=t.attributes||t.attribs||{};try{gl=n.getContext("webgl",e)||n.getContext("experimental-webgl",e)}catch(r){gl=null}return gl}},{}],14:[function(t,n){!function(t,e){"undefined"!=typeof n?n.exports=e():"function"==typeof define&&"object"==typeof define.amd?define(e):this[t]=e()}("domready",function(){var t,n=[],e=document,r=e.documentElement.doScroll,i="DOMContentLoaded",o=(r?/^loaded|^c/:/^loaded|^i|^c/).test(e.readyState);return o||e.addEventListener(i,t=function(){for(e.removeEventListener(i,t),o=1;t=n.shift();)t()}),function(t){o?t():n.push(t)}})},{}],15:[function(){!function(t){for(var n=0,e=["webkit","moz"],r=t.requestAnimationFrame,i=t.cancelAnimationFrame,o=e.length;--o>=0&&!r;)r=t[e[o]+"RequestAnimationFrame"],i=t[e[o]+"CancelAnimationFrame"];r&&i||(r=function(t){var e=+new Date,r=Math.max(n+16,e);return setTimeout(function(){t(n=r)},r-e)},i=clearTimeout),t.requestAnimationFrame=r,t.cancelAnimationFrame=i}(window)},{}],16:[function(t,n){function e(t,n,e){return e>n?n>t?n:t>e?e:t:e>t?e:t>n?n:t}n.exports=e},{}],17:[function(t,n,e){!function(){"use strict";var t={};"undefined"==typeof e?"function"==typeof define&&"object"==typeof define.amd&&define.amd?(t.exports={},define(function(){return t.exports})):t.exports=window:t.exports=e,function(t){if(!n)var n=1e-6;if(!e)var e="undefined"!=typeof Float32Array?Float32Array:Array;var r={};r.setMatrixArrayType=function(t){e=t},"undefined"!=typeof t&&(t.glMatrix=r);var i={};i.create=function(){var t=new e(2);return t[0]=0,t[1]=0,t},i.clone=function(t){var n=new e(2);return n[0]=t[0],n[1]=t[1],n},i.fromValues=function(t,n){var r=new e(2);return r[0]=t,r[1]=n,r},i.copy=function(t,n){return t[0]=n[0],t[1]=n[1],t},i.set=function(t,n,e){return t[0]=n,t[1]=e,t},i.add=function(t,n,e){return t[0]=n[0]+e[0],t[1]=n[1]+e[1],t},i.subtract=function(t,n,e){return t[0]=n[0]-e[0],t[1]=n[1]-e[1],t},i.sub=i.subtract,i.multiply=function(t,n,e){return t[0]=n[0]*e[0],t[1]=n[1]*e[1],t},i.mul=i.multiply,i.divide=function(t,n,e){return t[0]=n[0]/e[0],t[1]=n[1]/e[1],t},i.div=i.divide,i.min=function(t,n,e){return t[0]=Math.min(n[0],e[0]),t[1]=Math.min(n[1],e[1]),t},i.max=function(t,n,e){return t[0]=Math.max(n[0],e[0]),t[1]=Math.max(n[1],e[1]),t},i.scale=function(t,n,e){return t[0]=n[0]*e,t[1]=n[1]*e,t},i.distance=function(t,n){var e=n[0]-t[0],r=n[1]-t[1];return Math.sqrt(e*e+r*r)},i.dist=i.distance,i.squaredDistance=function(t,n){var e=n[0]-t[0],r=n[1]-t[1];return e*e+r*r},i.sqrDist=i.squaredDistance,i.length=function(t){var n=t[0],e=t[1];return Math.sqrt(n*n+e*e)},i.len=i.length,i.squaredLength=function(t){var n=t[0],e=t[1];return n*n+e*e},i.sqrLen=i.squaredLength,i.negate=function(t,n){return t[0]=-n[0],t[1]=-n[1],t},i.normalize=function(t,n){var e=n[0],r=n[1],i=e*e+r*r;return i>0&&(i=1/Math.sqrt(i),t[0]=n[0]*i,t[1]=n[1]*i),t},i.dot=function(t,n){return t[0]*n[0]+t[1]*n[1]},i.cross=function(t,n,e){var r=n[0]*e[1]-n[1]*e[0];return t[0]=t[1]=0,t[2]=r,t},i.lerp=function(t,n,e,r){var i=n[0],o=n[1];return t[0]=i+r*(e[0]-i),t[1]=o+r*(e[1]-o),t},i.transformMat2=function(t,n,e){var r=n[0],i=n[1];return t[0]=e[0]*r+e[2]*i,t[1]=e[1]*r+e[3]*i,t},i.transformMat2d=function(t,n,e){var r=n[0],i=n[1];return t[0]=e[0]*r+e[2]*i+e[4],t[1]=e[1]*r+e[3]*i+e[5],t},i.transformMat3=function(t,n,e){var r=n[0],i=n[1];return t[0]=e[0]*r+e[3]*i+e[6],t[1]=e[1]*r+e[4]*i+e[7],t},i.transformMat4=function(t,n,e){var r=n[0],i=n[1];return t[0]=e[0]*r+e[4]*i+e[12],t[1]=e[1]*r+e[5]*i+e[13],t},i.forEach=function(){var t=i.create();return function(n,e,r,i,o,a){var u,s;for(e||(e=2),r||(r=0),s=i?Math.min(i*e+r,n.length):n.length,u=r;s>u;u+=e)t[0]=n[u],t[1]=n[u+1],o(t,t,a),n[u]=t[0],n[u+1]=t[1];return n}}(),i.str=function(t){return"vec2("+t[0]+", "+t[1]+")"},"undefined"!=typeof t&&(t.vec2=i);var o={};o.create=function(){var t=new e(3);return t[0]=0,t[1]=0,t[2]=0,t},o.clone=function(t){var n=new e(3);return n[0]=t[0],n[1]=t[1],n[2]=t[2],n},o.fromValues=function(t,n,r){var i=new e(3);return i[0]=t,i[1]=n,i[2]=r,i},o.copy=function(t,n){return t[0]=n[0],t[1]=n[1],t[2]=n[2],t},o.set=function(t,n,e,r){return t[0]=n,t[1]=e,t[2]=r,t},o.add=function(t,n,e){return t[0]=n[0]+e[0],t[1]=n[1]+e[1],t[2]=n[2]+e[2],t},o.subtract=function(t,n,e){return t[0]=n[0]-e[0],t[1]=n[1]-e[1],t[2]=n[2]-e[2],t},o.sub=o.subtract,o.multiply=function(t,n,e){return t[0]=n[0]*e[0],t[1]=n[1]*e[1],t[2]=n[2]*e[2],t},o.mul=o.multiply,o.divide=function(t,n,e){return t[0]=n[0]/e[0],t[1]=n[1]/e[1],t[2]=n[2]/e[2],t},o.div=o.divide,o.min=function(t,n,e){return t[0]=Math.min(n[0],e[0]),t[1]=Math.min(n[1],e[1]),t[2]=Math.min(n[2],e[2]),t},o.max=function(t,n,e){return t[0]=Math.max(n[0],e[0]),t[1]=Math.max(n[1],e[1]),t[2]=Math.max(n[2],e[2]),t},o.scale=function(t,n,e){return t[0]=n[0]*e,t[1]=n[1]*e,t[2]=n[2]*e,t},o.distance=function(t,n){var e=n[0]-t[0],r=n[1]-t[1],i=n[2]-t[2];return Math.sqrt(e*e+r*r+i*i)},o.dist=o.distance,o.squaredDistance=function(t,n){var e=n[0]-t[0],r=n[1]-t[1],i=n[2]-t[2];return e*e+r*r+i*i},o.sqrDist=o.squaredDistance,o.length=function(t){var n=t[0],e=t[1],r=t[2];return Math.sqrt(n*n+e*e+r*r)},o.len=o.length,o.squaredLength=function(t){var n=t[0],e=t[1],r=t[2];return n*n+e*e+r*r},o.sqrLen=o.squaredLength,o.negate=function(t,n){return t[0]=-n[0],t[1]=-n[1],t[2]=-n[2],t},o.normalize=function(t,n){var e=n[0],r=n[1],i=n[2],o=e*e+r*r+i*i;return o>0&&(o=1/Math.sqrt(o),t[0]=n[0]*o,t[1]=n[1]*o,t[2]=n[2]*o),t},o.dot=function(t,n){return t[0]*n[0]+t[1]*n[1]+t[2]*n[2]},o.cross=function(t,n,e){var r=n[0],i=n[1],o=n[2],a=e[0],u=e[1],s=e[2];return t[0]=i*s-o*u,t[1]=o*a-r*s,t[2]=r*u-i*a,t},o.lerp=function(t,n,e,r){var i=n[0],o=n[1],a=n[2];return t[0]=i+r*(e[0]-i),t[1]=o+r*(e[1]-o),t[2]=a+r*(e[2]-a),t},o.transformMat4=function(t,n,e){var r=n[0],i=n[1],o=n[2];return t[0]=e[0]*r+e[4]*i+e[8]*o+e[12],t[1]=e[1]*r+e[5]*i+e[9]*o+e[13],t[2]=e[2]*r+e[6]*i+e[10]*o+e[14],t},o.transformQuat=function(t,n,e){var r=n[0],i=n[1],o=n[2],a=e[0],u=e[1],s=e[2],c=e[3],f=c*r+u*o-s*i,h=c*i+s*r-a*o,l=c*o+a*i-u*r,d=-a*r-u*i-s*o;return t[0]=f*c+d*-a+h*-s-l*-u,t[1]=h*c+d*-u+l*-a-f*-s,t[2]=l*c+d*-s+f*-u-h*-a,t},o.forEach=function(){var t=o.create();return function(n,e,r,i,o,a){var u,s;for(e||(e=3),r||(r=0),s=i?Math.min(i*e+r,n.length):n.length,u=r;s>u;u+=e)t[0]=n[u],t[1]=n[u+1],t[2]=n[u+2],o(t,t,a),n[u]=t[0],n[u+1]=t[1],n[u+2]=t[2];return n}}(),o.str=function(t){return"vec3("+t[0]+", "+t[1]+", "+t[2]+")"},"undefined"!=typeof t&&(t.vec3=o);var a={};a.create=function(){var t=new e(4);return t[0]=0,t[1]=0,t[2]=0,t[3]=0,t},a.clone=function(t){var n=new e(4);return n[0]=t[0],n[1]=t[1],n[2]=t[2],n[3]=t[3],n},a.fromValues=function(t,n,r,i){var o=new e(4);return o[0]=t,o[1]=n,o[2]=r,o[3]=i,o},a.copy=function(t,n){return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t},a.set=function(t,n,e,r,i){return t[0]=n,t[1]=e,t[2]=r,t[3]=i,t},a.add=function(t,n,e){return t[0]=n[0]+e[0],t[1]=n[1]+e[1],t[2]=n[2]+e[2],t[3]=n[3]+e[3],t},a.subtract=function(t,n,e){return t[0]=n[0]-e[0],t[1]=n[1]-e[1],t[2]=n[2]-e[2],t[3]=n[3]-e[3],t},a.sub=a.subtract,a.multiply=function(t,n,e){return t[0]=n[0]*e[0],t[1]=n[1]*e[1],t[2]=n[2]*e[2],t[3]=n[3]*e[3],t},a.mul=a.multiply,a.divide=function(t,n,e){return t[0]=n[0]/e[0],t[1]=n[1]/e[1],t[2]=n[2]/e[2],t[3]=n[3]/e[3],t},a.div=a.divide,a.min=function(t,n,e){return t[0]=Math.min(n[0],e[0]),t[1]=Math.min(n[1],e[1]),t[2]=Math.min(n[2],e[2]),t[3]=Math.min(n[3],e[3]),t},a.max=function(t,n,e){return t[0]=Math.max(n[0],e[0]),t[1]=Math.max(n[1],e[1]),t[2]=Math.max(n[2],e[2]),t[3]=Math.max(n[3],e[3]),t},a.scale=function(t,n,e){return t[0]=n[0]*e,t[1]=n[1]*e,t[2]=n[2]*e,t[3]=n[3]*e,t},a.distance=function(t,n){var e=n[0]-t[0],r=n[1]-t[1],i=n[2]-t[2],o=n[3]-t[3];return Math.sqrt(e*e+r*r+i*i+o*o)},a.dist=a.distance,a.squaredDistance=function(t,n){var e=n[0]-t[0],r=n[1]-t[1],i=n[2]-t[2],o=n[3]-t[3];return e*e+r*r+i*i+o*o},a.sqrDist=a.squaredDistance,a.length=function(t){var n=t[0],e=t[1],r=t[2],i=t[3];return Math.sqrt(n*n+e*e+r*r+i*i)},a.len=a.length,a.squaredLength=function(t){var n=t[0],e=t[1],r=t[2],i=t[3];return n*n+e*e+r*r+i*i},a.sqrLen=a.squaredLength,a.negate=function(t,n){return t[0]=-n[0],t[1]=-n[1],t[2]=-n[2],t[3]=-n[3],t},a.normalize=function(t,n){var e=n[0],r=n[1],i=n[2],o=n[3],a=e*e+r*r+i*i+o*o;return a>0&&(a=1/Math.sqrt(a),t[0]=n[0]*a,t[1]=n[1]*a,t[2]=n[2]*a,t[3]=n[3]*a),t},a.dot=function(t,n){return t[0]*n[0]+t[1]*n[1]+t[2]*n[2]+t[3]*n[3]},a.lerp=function(t,n,e,r){var i=n[0],o=n[1],a=n[2],u=n[3];return t[0]=i+r*(e[0]-i),t[1]=o+r*(e[1]-o),t[2]=a+r*(e[2]-a),t[3]=u+r*(e[3]-u),t},a.transformMat4=function(t,n,e){var r=n[0],i=n[1],o=n[2],a=n[3];return t[0]=e[0]*r+e[4]*i+e[8]*o+e[12]*a,t[1]=e[1]*r+e[5]*i+e[9]*o+e[13]*a,t[2]=e[2]*r+e[6]*i+e[10]*o+e[14]*a,t[3]=e[3]*r+e[7]*i+e[11]*o+e[15]*a,t},a.transformQuat=function(t,n,e){var r=n[0],i=n[1],o=n[2],a=e[0],u=e[1],s=e[2],c=e[3],f=c*r+u*o-s*i,h=c*i+s*r-a*o,l=c*o+a*i-u*r,d=-a*r-u*i-s*o;return t[0]=f*c+d*-a+h*-s-l*-u,t[1]=h*c+d*-u+l*-a-f*-s,t[2]=l*c+d*-s+f*-u-h*-a,t},a.forEach=function(){var t=a.create();return function(n,e,r,i,o,a){var u,s;for(e||(e=4),r||(r=0),s=i?Math.min(i*e+r,n.length):n.length,u=r;s>u;u+=e)t[0]=n[u],t[1]=n[u+1],t[2]=n[u+2],t[3]=n[u+3],o(t,t,a),n[u]=t[0],n[u+1]=t[1],n[u+2]=t[2],n[u+3]=t[3];return n}}(),a.str=function(t){return"vec4("+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+")"},"undefined"!=typeof t&&(t.vec4=a);{var u={};new Float32Array([1,0,0,1])}u.create=function(){var t=new e(4);return t[0]=1,t[1]=0,t[2]=0,t[3]=1,t},u.clone=function(t){var n=new e(4);return n[0]=t[0],n[1]=t[1],n[2]=t[2],n[3]=t[3],n},u.copy=function(t,n){return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t},u.identity=function(t){return t[0]=1,t[1]=0,t[2]=0,t[3]=1,t},u.transpose=function(t,n){if(t===n){var e=n[1];t[1]=n[2],t[2]=e}else t[0]=n[0],t[1]=n[2],t[2]=n[1],t[3]=n[3];return t},u.invert=function(t,n){var e=n[0],r=n[1],i=n[2],o=n[3],a=e*o-i*r;return a?(a=1/a,t[0]=o*a,t[1]=-r*a,t[2]=-i*a,t[3]=e*a,t):null},u.adjoint=function(t,n){var e=n[0];return t[0]=n[3],t[1]=-n[1],t[2]=-n[2],t[3]=e,t},u.determinant=function(t){return t[0]*t[3]-t[2]*t[1]},u.multiply=function(t,n,e){var r=n[0],i=n[1],o=n[2],a=n[3],u=e[0],s=e[1],c=e[2],f=e[3];return t[0]=r*u+i*c,t[1]=r*s+i*f,t[2]=o*u+a*c,t[3]=o*s+a*f,t},u.mul=u.multiply,u.rotate=function(t,n,e){var r=n[0],i=n[1],o=n[2],a=n[3],u=Math.sin(e),s=Math.cos(e);return t[0]=r*s+i*u,t[1]=r*-u+i*s,t[2]=o*s+a*u,t[3]=o*-u+a*s,t},u.scale=function(t,n,e){var r=n[0],i=n[1],o=n[2],a=n[3],u=e[0],s=e[1];return t[0]=r*u,t[1]=i*s,t[2]=o*u,t[3]=a*s,t},u.str=function(t){return"mat2("+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+")"},"undefined"!=typeof t&&(t.mat2=u);{var s={};new Float32Array([1,0,0,1,0,0])}s.create=function(){var t=new e(6);return t[0]=1,t[1]=0,t[2]=0,t[3]=1,t[4]=0,t[5]=0,t},s.clone=function(t){var n=new e(6);return n[0]=t[0],n[1]=t[1],n[2]=t[2],n[3]=t[3],n[4]=t[4],n[5]=t[5],n},s.copy=function(t,n){return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t},s.identity=function(t){return t[0]=1,t[1]=0,t[2]=0,t[3]=1,t[4]=0,t[5]=0,t},s.invert=function(t,n){var e=n[0],r=n[1],i=n[2],o=n[3],a=n[4],u=n[5],s=e*o-r*i;return s?(s=1/s,t[0]=o*s,t[1]=-r*s,t[2]=-i*s,t[3]=e*s,t[4]=(i*u-o*a)*s,t[5]=(r*a-e*u)*s,t):null},s.determinant=function(t){return t[0]*t[3]-t[1]*t[2]},s.multiply=function(t,n,e){var r=n[0],i=n[1],o=n[2],a=n[3],u=n[4],s=n[5],c=e[0],f=e[1],h=e[2],l=e[3],d=e[4],v=e[5];return t[0]=r*c+i*h,t[1]=r*f+i*l,t[2]=o*c+a*h,t[3]=o*f+a*l,t[4]=c*u+h*s+d,t[5]=f*u+l*s+v,t},s.mul=s.multiply,s.rotate=function(t,n,e){var r=n[0],i=n[1],o=n[2],a=n[3],u=n[4],s=n[5],c=Math.sin(e),f=Math.cos(e);return t[0]=r*f+i*c,t[1]=-r*c+i*f,t[2]=o*f+a*c,t[3]=-o*c+f*a,t[4]=f*u+c*s,t[5]=f*s-c*u,t},s.scale=function(t,n,e){var r=e[0],i=e[1];return t[0]=n[0]*r,t[1]=n[1]*i,t[2]=n[2]*r,t[3]=n[3]*i,t[4]=n[4]*r,t[5]=n[5]*i,t},s.translate=function(t,n,e){return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4]+e[0],t[5]=n[5]+e[1],t},s.str=function(t){return"mat2d("+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+", "+t[4]+", "+t[5]+")"},"undefined"!=typeof t&&(t.mat2d=s);{var c={};new Float32Array([1,0,0,0,1,0,0,0,1])}c.create=function(){var t=new e(9);return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=1,t[5]=0,t[6]=0,t[7]=0,t[8]=1,t},c.clone=function(t){var n=new e(9);return n[0]=t[0],n[1]=t[1],n[2]=t[2],n[3]=t[3],n[4]=t[4],n[5]=t[5],n[6]=t[6],n[7]=t[7],n[8]=t[8],n},c.copy=function(t,n){return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t},c.identity=function(t){return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=1,t[5]=0,t[6]=0,t[7]=0,t[8]=1,t},c.transpose=function(t,n){if(t===n){var e=n[1],r=n[2],i=n[5];t[1]=n[3],t[2]=n[6],t[3]=e,t[5]=n[7],t[6]=r,t[7]=i}else t[0]=n[0],t[1]=n[3],t[2]=n[6],t[3]=n[1],t[4]=n[4],t[5]=n[7],t[6]=n[2],t[7]=n[5],t[8]=n[8];return t},c.invert=function(t,n){var e=n[0],r=n[1],i=n[2],o=n[3],a=n[4],u=n[5],s=n[6],c=n[7],f=n[8],h=f*a-u*c,l=-f*o+u*s,d=c*o-a*s,v=e*h+r*l+i*d;return v?(v=1/v,t[0]=h*v,t[1]=(-f*r+i*c)*v,t[2]=(u*r-i*a)*v,t[3]=l*v,t[4]=(f*e-i*s)*v,t[5]=(-u*e+i*o)*v,t[6]=d*v,t[7]=(-c*e+r*s)*v,t[8]=(a*e-r*o)*v,t):null},c.adjoint=function(t,n){var e=n[0],r=n[1],i=n[2],o=n[3],a=n[4],u=n[5],s=n[6],c=n[7],f=n[8];return t[0]=a*f-u*c,t[1]=i*c-r*f,t[2]=r*u-i*a,t[3]=u*s-o*f,t[4]=e*f-i*s,t[5]=i*o-e*u,t[6]=o*c-a*s,t[7]=r*s-e*c,t[8]=e*a-r*o,t},c.determinant=function(t){var n=t[0],e=t[1],r=t[2],i=t[3],o=t[4],a=t[5],u=t[6],s=t[7],c=t[8];return n*(c*o-a*s)+e*(-c*i+a*u)+r*(s*i-o*u)},c.multiply=function(t,n,e){var r=n[0],i=n[1],o=n[2],a=n[3],u=n[4],s=n[5],c=n[6],f=n[7],h=n[8],l=e[0],d=e[1],v=e[2],p=e[3],m=e[4],y=e[5],g=e[6],b=e[7],w=e[8];return t[0]=l*r+d*a+v*c,t[1]=l*i+d*u+v*f,t[2]=l*o+d*s+v*h,t[3]=p*r+m*a+y*c,t[4]=p*i+m*u+y*f,t[5]=p*o+m*s+y*h,t[6]=g*r+b*a+w*c,t[7]=g*i+b*u+w*f,t[8]=g*o+b*s+w*h,t},c.mul=c.multiply,c.translate=function(t,n,e){var r=n[0],i=n[1],o=n[2],a=n[3],u=n[4],s=n[5],c=n[6],f=n[7],h=n[8],l=e[0],d=e[1];return t[0]=r,t[1]=i,t[2]=o,t[3]=a,t[4]=u,t[5]=s,t[6]=l*r+d*a+c,t[7]=l*i+d*u+f,t[8]=l*o+d*s+h,t},c.rotate=function(t,n,e){var r=n[0],i=n[1],o=n[2],a=n[3],u=n[4],s=n[5],c=n[6],f=n[7],h=n[8],l=Math.sin(e),d=Math.cos(e);return t[0]=d*r+l*a,t[1]=d*i+l*u,t[2]=d*o+l*s,t[3]=d*a-l*r,t[4]=d*u-l*i,t[5]=d*s-l*o,t[6]=c,t[7]=f,t[8]=h,t},c.scale=function(t,n,e){var r=e[0],i=e[2];return t[0]=r*n[0],t[1]=r*n[1],t[2]=r*n[2],t[3]=i*n[3],t[4]=i*n[4],t[5]=i*n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t},c.fromMat2d=function(t,n){return t[0]=n[0],t[1]=n[1],t[2]=0,t[3]=n[2],t[4]=n[3],t[5]=0,t[6]=n[4],t[7]=n[5],t[8]=1,t},c.fromQuat=function(t,n){var e=n[0],r=n[1],i=n[2],o=n[3],a=e+e,u=r+r,s=i+i,c=e*a,f=e*u,h=e*s,l=r*u,d=r*s,v=i*s,p=o*a,m=o*u,y=o*s;return t[0]=1-(l+v),t[1]=f+y,t[2]=h-m,t[3]=f-y,t[4]=1-(c+v),t[5]=d+p,t[6]=h+m,t[7]=d-p,t[8]=1-(c+l),t},c.str=function(t){return"mat3("+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+", "+t[4]+", "+t[5]+", "+t[6]+", "+t[7]+", "+t[8]+")"},"undefined"!=typeof t&&(t.mat3=c);{var f={};new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1])}f.create=function(){var t=new e(16);return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t},f.clone=function(t){var n=new e(16);return n[0]=t[0],n[1]=t[1],n[2]=t[2],n[3]=t[3],n[4]=t[4],n[5]=t[5],n[6]=t[6],n[7]=t[7],n[8]=t[8],n[9]=t[9],n[10]=t[10],n[11]=t[11],n[12]=t[12],n[13]=t[13],n[14]=t[14],n[15]=t[15],n},f.copy=function(t,n){return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],t},f.identity=function(t){return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t},f.transpose=function(t,n){if(t===n){var e=n[1],r=n[2],i=n[3],o=n[6],a=n[7],u=n[11];t[1]=n[4],t[2]=n[8],t[3]=n[12],t[4]=e,t[6]=n[9],t[7]=n[13],t[8]=r,t[9]=o,t[11]=n[14],t[12]=i,t[13]=a,t[14]=u}else t[0]=n[0],t[1]=n[4],t[2]=n[8],t[3]=n[12],t[4]=n[1],t[5]=n[5],t[6]=n[9],t[7]=n[13],t[8]=n[2],t[9]=n[6],t[10]=n[10],t[11]=n[14],t[12]=n[3],t[13]=n[7],t[14]=n[11],t[15]=n[15];return t},f.invert=function(t,n){var e=n[0],r=n[1],i=n[2],o=n[3],a=n[4],u=n[5],s=n[6],c=n[7],f=n[8],h=n[9],l=n[10],d=n[11],v=n[12],p=n[13],m=n[14],y=n[15],g=e*u-r*a,b=e*s-i*a,w=e*c-o*a,M=r*s-i*u,x=r*c-o*u,q=i*c-o*s,_=f*p-h*v,D=f*m-l*v,R=f*y-d*v,F=h*m-l*p,L=h*y-d*p,E=l*y-d*m,A=g*E-b*L+w*F+M*R-x*D+q*_;return A?(A=1/A,t[0]=(u*E-s*L+c*F)*A,t[1]=(i*L-r*E-o*F)*A,t[2]=(p*q-m*x+y*M)*A,t[3]=(l*x-h*q-d*M)*A,t[4]=(s*R-a*E-c*D)*A,t[5]=(e*E-i*R+o*D)*A,t[6]=(m*w-v*q-y*b)*A,t[7]=(f*q-l*w+d*b)*A,t[8]=(a*L-u*R+c*_)*A,t[9]=(r*R-e*L-o*_)*A,t[10]=(v*x-p*w+y*g)*A,t[11]=(h*w-f*x-d*g)*A,t[12]=(u*D-a*F-s*_)*A,t[13]=(e*F-r*D+i*_)*A,t[14]=(p*b-v*M-m*g)*A,t[15]=(f*M-h*b+l*g)*A,t):null},f.adjoint=function(t,n){var e=n[0],r=n[1],i=n[2],o=n[3],a=n[4],u=n[5],s=n[6],c=n[7],f=n[8],h=n[9],l=n[10],d=n[11],v=n[12],p=n[13],m=n[14],y=n[15];return t[0]=u*(l*y-d*m)-h*(s*y-c*m)+p*(s*d-c*l),t[1]=-(r*(l*y-d*m)-h*(i*y-o*m)+p*(i*d-o*l)),t[2]=r*(s*y-c*m)-u*(i*y-o*m)+p*(i*c-o*s),t[3]=-(r*(s*d-c*l)-u*(i*d-o*l)+h*(i*c-o*s)),t[4]=-(a*(l*y-d*m)-f*(s*y-c*m)+v*(s*d-c*l)),t[5]=e*(l*y-d*m)-f*(i*y-o*m)+v*(i*d-o*l),t[6]=-(e*(s*y-c*m)-a*(i*y-o*m)+v*(i*c-o*s)),t[7]=e*(s*d-c*l)-a*(i*d-o*l)+f*(i*c-o*s),t[8]=a*(h*y-d*p)-f*(u*y-c*p)+v*(u*d-c*h),t[9]=-(e*(h*y-d*p)-f*(r*y-o*p)+v*(r*d-o*h)),t[10]=e*(u*y-c*p)-a*(r*y-o*p)+v*(r*c-o*u),t[11]=-(e*(u*d-c*h)-a*(r*d-o*h)+f*(r*c-o*u)),t[12]=-(a*(h*m-l*p)-f*(u*m-s*p)+v*(u*l-s*h)),t[13]=e*(h*m-l*p)-f*(r*m-i*p)+v*(r*l-i*h),t[14]=-(e*(u*m-s*p)-a*(r*m-i*p)+v*(r*s-i*u)),t[15]=e*(u*l-s*h)-a*(r*l-i*h)+f*(r*s-i*u),t},f.determinant=function(t){var n=t[0],e=t[1],r=t[2],i=t[3],o=t[4],a=t[5],u=t[6],s=t[7],c=t[8],f=t[9],h=t[10],l=t[11],d=t[12],v=t[13],p=t[14],m=t[15],y=n*a-e*o,g=n*u-r*o,b=n*s-i*o,w=e*u-r*a,M=e*s-i*a,x=r*s-i*u,q=c*v-f*d,_=c*p-h*d,D=c*m-l*d,R=f*p-h*v,F=f*m-l*v,L=h*m-l*p;return y*L-g*F+b*R+w*D-M*_+x*q},f.multiply=function(t,n,e){var r=n[0],i=n[1],o=n[2],a=n[3],u=n[4],s=n[5],c=n[6],f=n[7],h=n[8],l=n[9],d=n[10],v=n[11],p=n[12],m=n[13],y=n[14],g=n[15],b=e[0],w=e[1],M=e[2],x=e[3];return t[0]=b*r+w*u+M*h+x*p,t[1]=b*i+w*s+M*l+x*m,t[2]=b*o+w*c+M*d+x*y,t[3]=b*a+w*f+M*v+x*g,b=e[4],w=e[5],M=e[6],x=e[7],t[4]=b*r+w*u+M*h+x*p,t[5]=b*i+w*s+M*l+x*m,t[6]=b*o+w*c+M*d+x*y,t[7]=b*a+w*f+M*v+x*g,b=e[8],w=e[9],M=e[10],x=e[11],t[8]=b*r+w*u+M*h+x*p,t[9]=b*i+w*s+M*l+x*m,t[10]=b*o+w*c+M*d+x*y,t[11]=b*a+w*f+M*v+x*g,b=e[12],w=e[13],M=e[14],x=e[15],t[12]=b*r+w*u+M*h+x*p,t[13]=b*i+w*s+M*l+x*m,t[14]=b*o+w*c+M*d+x*y,t[15]=b*a+w*f+M*v+x*g,t},f.mul=f.multiply,f.translate=function(t,n,e){var r,i,o,a,u,s,c,f,h,l,d,v,p=e[0],m=e[1],y=e[2];return n===t?(t[12]=n[0]*p+n[4]*m+n[8]*y+n[12],t[13]=n[1]*p+n[5]*m+n[9]*y+n[13],t[14]=n[2]*p+n[6]*m+n[10]*y+n[14],t[15]=n[3]*p+n[7]*m+n[11]*y+n[15]):(r=n[0],i=n[1],o=n[2],a=n[3],u=n[4],s=n[5],c=n[6],f=n[7],h=n[8],l=n[9],d=n[10],v=n[11],t[0]=r,t[1]=i,t[2]=o,t[3]=a,t[4]=u,t[5]=s,t[6]=c,t[7]=f,t[8]=h,t[9]=l,t[10]=d,t[11]=v,t[12]=r*p+u*m+h*y+n[12],t[13]=i*p+s*m+l*y+n[13],t[14]=o*p+c*m+d*y+n[14],t[15]=a*p+f*m+v*y+n[15]),t},f.scale=function(t,n,e){var r=e[0],i=e[1],o=e[2];return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=n[3]*r,t[4]=n[4]*i,t[5]=n[5]*i,t[6]=n[6]*i,t[7]=n[7]*i,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=n[11]*o,t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],t},f.rotate=function(t,e,r,i){var o,a,u,s,c,f,h,l,d,v,p,m,y,g,b,w,M,x,q,_,D,R,F,L,E=i[0],A=i[1],z=i[2],P=Math.sqrt(E*E+A*A+z*z);return Math.abs(P)<n?null:(P=1/P,E*=P,A*=P,z*=P,o=Math.sin(r),a=Math.cos(r),u=1-a,s=e[0],c=e[1],f=e[2],h=e[3],l=e[4],d=e[5],v=e[6],p=e[7],m=e[8],y=e[9],g=e[10],b=e[11],w=E*E*u+a,M=A*E*u+z*o,x=z*E*u-A*o,q=E*A*u-z*o,_=A*A*u+a,D=z*A*u+E*o,R=E*z*u+A*o,F=A*z*u-E*o,L=z*z*u+a,t[0]=s*w+l*M+m*x,t[1]=c*w+d*M+y*x,t[2]=f*w+v*M+g*x,t[3]=h*w+p*M+b*x,t[4]=s*q+l*_+m*D,t[5]=c*q+d*_+y*D,t[6]=f*q+v*_+g*D,t[7]=h*q+p*_+b*D,t[8]=s*R+l*F+m*L,t[9]=c*R+d*F+y*L,t[10]=f*R+v*F+g*L,t[11]=h*R+p*F+b*L,e!==t&&(t[12]=e[12],t[13]=e[13],t[14]=e[14],t[15]=e[15]),t)},f.rotateX=function(t,n,e){var r=Math.sin(e),i=Math.cos(e),o=n[4],a=n[5],u=n[6],s=n[7],c=n[8],f=n[9],h=n[10],l=n[11];return n!==t&&(t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15]),t[4]=o*i+c*r,t[5]=a*i+f*r,t[6]=u*i+h*r,t[7]=s*i+l*r,t[8]=c*i-o*r,t[9]=f*i-a*r,t[10]=h*i-u*r,t[11]=l*i-s*r,t},f.rotateY=function(t,n,e){var r=Math.sin(e),i=Math.cos(e),o=n[0],a=n[1],u=n[2],s=n[3],c=n[8],f=n[9],h=n[10],l=n[11];return n!==t&&(t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15]),t[0]=o*i-c*r,t[1]=a*i-f*r,t[2]=u*i-h*r,t[3]=s*i-l*r,t[8]=o*r+c*i,t[9]=a*r+f*i,t[10]=u*r+h*i,t[11]=s*r+l*i,t},f.rotateZ=function(t,n,e){var r=Math.sin(e),i=Math.cos(e),o=n[0],a=n[1],u=n[2],s=n[3],c=n[4],f=n[5],h=n[6],l=n[7];return n!==t&&(t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15]),t[0]=o*i+c*r,t[1]=a*i+f*r,t[2]=u*i+h*r,t[3]=s*i+l*r,t[4]=c*i-o*r,t[5]=f*i-a*r,t[6]=h*i-u*r,t[7]=l*i-s*r,t},f.fromRotationTranslation=function(t,n,e){var r=n[0],i=n[1],o=n[2],a=n[3],u=r+r,s=i+i,c=o+o,f=r*u,h=r*s,l=r*c,d=i*s,v=i*c,p=o*c,m=a*u,y=a*s,g=a*c;return t[0]=1-(d+p),t[1]=h+g,t[2]=l-y,t[3]=0,t[4]=h-g,t[5]=1-(f+p),t[6]=v+m,t[7]=0,t[8]=l+y,t[9]=v-m,t[10]=1-(f+d),t[11]=0,t[12]=e[0],t[13]=e[1],t[14]=e[2],t[15]=1,t},f.fromQuat=function(t,n){var e=n[0],r=n[1],i=n[2],o=n[3],a=e+e,u=r+r,s=i+i,c=e*a,f=e*u,h=e*s,l=r*u,d=r*s,v=i*s,p=o*a,m=o*u,y=o*s;return t[0]=1-(l+v),t[1]=f+y,t[2]=h-m,t[3]=0,t[4]=f-y,t[5]=1-(c+v),t[6]=d+p,t[7]=0,t[8]=h+m,t[9]=d-p,t[10]=1-(c+l),t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t},f.frustum=function(t,n,e,r,i,o,a){var u=1/(e-n),s=1/(i-r),c=1/(o-a);return t[0]=2*o*u,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=2*o*s,t[6]=0,t[7]=0,t[8]=(e+n)*u,t[9]=(i+r)*s,t[10]=(a+o)*c,t[11]=-1,t[12]=0,t[13]=0,t[14]=a*o*2*c,t[15]=0,t},f.perspective=function(t,n,e,r,i){var o=1/Math.tan(n/2),a=1/(r-i);return t[0]=o/e,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=o,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=(i+r)*a,t[11]=-1,t[12]=0,t[13]=0,t[14]=2*i*r*a,t[15]=0,t},f.ortho=function(t,n,e,r,i,o,a){var u=1/(n-e),s=1/(r-i),c=1/(o-a);return t[0]=-2*u,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=-2*s,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=2*c,t[11]=0,t[12]=(n+e)*u,t[13]=(i+r)*s,t[14]=(a+o)*c,t[15]=1,t},f.lookAt=function(t,e,r,i){var o,a,u,s,c,h,l,d,v,p,m=e[0],y=e[1],g=e[2],b=i[0],w=i[1],M=i[2],x=r[0],q=r[1],_=r[2];return Math.abs(m-x)<n&&Math.abs(y-q)<n&&Math.abs(g-_)<n?f.identity(t):(l=m-x,d=y-q,v=g-_,p=1/Math.sqrt(l*l+d*d+v*v),l*=p,d*=p,v*=p,o=w*v-M*d,a=M*l-b*v,u=b*d-w*l,p=Math.sqrt(o*o+a*a+u*u),p?(p=1/p,o*=p,a*=p,u*=p):(o=0,a=0,u=0),s=d*u-v*a,c=v*o-l*u,h=l*a-d*o,p=Math.sqrt(s*s+c*c+h*h),p?(p=1/p,s*=p,c*=p,h*=p):(s=0,c=0,h=0),t[0]=o,t[1]=s,t[2]=l,t[3]=0,t[4]=a,t[5]=c,t[6]=d,t[7]=0,t[8]=u,t[9]=h,t[10]=v,t[11]=0,t[12]=-(o*m+a*y+u*g),t[13]=-(s*m+c*y+h*g),t[14]=-(l*m+d*y+v*g),t[15]=1,t)
},f.str=function(t){return"mat4("+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+", "+t[4]+", "+t[5]+", "+t[6]+", "+t[7]+", "+t[8]+", "+t[9]+", "+t[10]+", "+t[11]+", "+t[12]+", "+t[13]+", "+t[14]+", "+t[15]+")"},"undefined"!=typeof t&&(t.mat4=f);{var h={};new Float32Array([0,0,0,1])}h.create=function(){var t=new e(4);return t[0]=0,t[1]=0,t[2]=0,t[3]=1,t},h.clone=a.clone,h.fromValues=a.fromValues,h.copy=a.copy,h.set=a.set,h.identity=function(t){return t[0]=0,t[1]=0,t[2]=0,t[3]=1,t},h.setAxisAngle=function(t,n,e){e=.5*e;var r=Math.sin(e);return t[0]=r*n[0],t[1]=r*n[1],t[2]=r*n[2],t[3]=Math.cos(e),t},h.add=a.add,h.multiply=function(t,n,e){var r=n[0],i=n[1],o=n[2],a=n[3],u=e[0],s=e[1],c=e[2],f=e[3];return t[0]=r*f+a*u+i*c-o*s,t[1]=i*f+a*s+o*u-r*c,t[2]=o*f+a*c+r*s-i*u,t[3]=a*f-r*u-i*s-o*c,t},h.mul=h.multiply,h.scale=a.scale,h.rotateX=function(t,n,e){e*=.5;var r=n[0],i=n[1],o=n[2],a=n[3],u=Math.sin(e),s=Math.cos(e);return t[0]=r*s+a*u,t[1]=i*s+o*u,t[2]=o*s-i*u,t[3]=a*s-r*u,t},h.rotateY=function(t,n,e){e*=.5;var r=n[0],i=n[1],o=n[2],a=n[3],u=Math.sin(e),s=Math.cos(e);return t[0]=r*s-o*u,t[1]=i*s+a*u,t[2]=o*s+r*u,t[3]=a*s-i*u,t},h.rotateZ=function(t,n,e){e*=.5;var r=n[0],i=n[1],o=n[2],a=n[3],u=Math.sin(e),s=Math.cos(e);return t[0]=r*s+i*u,t[1]=i*s-r*u,t[2]=o*s+a*u,t[3]=a*s-o*u,t},h.calculateW=function(t,n){var e=n[0],r=n[1],i=n[2];return t[0]=e,t[1]=r,t[2]=i,t[3]=-Math.sqrt(Math.abs(1-e*e-r*r-i*i)),t},h.dot=a.dot,h.lerp=a.lerp,h.slerp=function(t,n,e,r){var i,o,a,u,s=n[0],c=n[1],f=n[2],h=n[3],l=e[0],d=e[1],v=e[2],p=e[3],m=s*l+c*d+f*v+h*p;return Math.abs(m)>=1?(t!==n&&(t[0]=s,t[1]=c,t[2]=f,t[3]=h),t):(i=Math.acos(m),o=Math.sqrt(1-m*m),Math.abs(o)<.001?(t[0]=.5*s+.5*l,t[1]=.5*c+.5*d,t[2]=.5*f+.5*v,t[3]=.5*h+.5*p,t):(a=Math.sin((1-r)*i)/o,u=Math.sin(r*i)/o,t[0]=s*a+l*u,t[1]=c*a+d*u,t[2]=f*a+v*u,t[3]=h*a+p*u,t))},h.invert=function(t,n){var e=n[0],r=n[1],i=n[2],o=n[3],a=e*e+r*r+i*i+o*o,u=a?1/a:0;return t[0]=-e*u,t[1]=-r*u,t[2]=-i*u,t[3]=o*u,t},h.conjugate=function(t,n){return t[0]=-n[0],t[1]=-n[1],t[2]=-n[2],t[3]=n[3],t},h.length=a.length,h.len=h.length,h.squaredLength=a.squaredLength,h.sqrLen=h.squaredLength,h.normalize=a.normalize,h.fromMat3=function(){var t=[1,2,0];return function(n,e){var r,i=e[0]+e[4]+e[8];if(i>0)r=Math.sqrt(i+1),n[3]=.5*r,r=.5/r,n[0]=(e[7]-e[5])*r,n[1]=(e[2]-e[6])*r,n[2]=(e[3]-e[1])*r;else{var o=0;e[4]>e[0]&&(o=1),e[8]>e[3*o+o]&&(o=2);var a=t[o],u=t[a];r=Math.sqrt(e[3*o+o]-e[3*a+a]-e[3*u+u]+1),n[o]=.5*r,r=.5/r,n[3]=(e[3*u+a]-e[3*a+u])*r,n[a]=(e[3*a+o]+e[3*o+a])*r,n[u]=(e[3*u+o]+e[3*o+u])*r}return n}}(),h.str=function(t){return"quat("+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+")"},"undefined"!=typeof t&&(t.quat=h)}(t.exports)}()},{}],18:[function(t,n){function e(t,n){var e="number"==typeof t,r="number"==typeof n;return e&&!r?(n=t,t=0):e||r||(t=0,n=1),t+Math.random()*(n-t)}n.exports=e},{}],19:[function(t,n){var e=t("gl-matrix").vec2;n.exports=t("./lib/build")(e)},{"./lib/build":20,"gl-matrix":17}],20:[function(t,n){n.exports=function(t){function n(n,e){if(!n||2!==n.length)throw new Error("two points must be specified for the constraint");if(!n[0].position||!n[1].position)throw new Error("must specify verlet-point or similar, with { position }");this.points=n,this.stiffness=1,e&&"number"==typeof e.stiffness&&(this.stiffness=e.stiffness),this.restingDistance=e&&"number"==typeof e.restingDistance?e.restingDistance:t.distance(this.points[0].position,this.points[1].position)}var e=t.create(),r=t.create();return n.prototype.solve=function(){var n=this.points[0],i=this.points[1],o=n.position,a=i.position,u="number"==typeof n.mass?n.mass:1,s="number"==typeof i.mass?i.mass:1;t.sub(e,o,a);var c,f,h=Math.sqrt(t.dot(e,e)),l=0===h?this.restingDistance:(this.restingDistance-h)/h;if(0===u||0===s)c=this.stiffness,f=this.stiffness;else{var d=1/u,v=1/s;c=d/(d+v)*this.stiffness,f=this.stiffness-c}return t.scale(r,e,c*l),t.add(o,o,r),t.scale(r,e,f*l),t.sub(a,a,r),h},function(t,e,r){return new n(t,e,r)}}},{}],21:[function(t,n,e){arguments[4][19][0].apply(e,arguments)},{"./lib/build":22,"/projects/npmutils/physics/verlet-system/node_modules/verlet-constraint/2d.js":19,"gl-matrix":17}],22:[function(t,n){n.exports=function(t){function n(n){this.position=t.create(),this.previous=t.create(),this.acceleration=t.create(),this.mass=1,this.radius=0,n&&"number"==typeof n.mass&&(this.mass=n.mass),n&&"number"==typeof n.radius&&(this.radius=n.radius),n&&n.position&&t.copy(this.position,n.position),n&&(n.previous||n.position)&&t.copy(this.previous,n.previous||n.position),n&&n.acceleration&&t.copy(this.acceleration,n.acceleration)}return n.prototype.addForce=function(n){return t.sub(this.previous,this.previous,n),this},n.prototype.place=function(n){return t.copy(this.position,n),t.copy(this.previous,n),this},function(t){return new n(t)}}},{}]},{},[2]);