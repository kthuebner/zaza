(function(){

  // ---------- tiny color helper ----------
  function shade(hex, pct){
    var n = parseInt(hex.slice(1),16);
    var r = (n>>16)+Math.round(255*(pct/100));
    var g = ((n>>8)&0xff)+Math.round(255*(pct/100));
    var b = (n&0xff)+Math.round(255*(pct/100));
    r = Math.max(0,Math.min(255,r)); g = Math.max(0,Math.min(255,g)); b = Math.max(0,Math.min(255,b));
    return '#'+((1<<24)+(r<<16)+(g<<8)+b).toString(16).slice(1);
  }

  // ---------- option data ----------
  var LINERS = [
    {id:'l1', name:'Cherry Red',    hex:'#e63950'},
    {id:'l2', name:'Bubblegum Pink',hex:'#ff8fc0'},
    {id:'l3', name:'Sunshine Yellow',hex:'#ffd23f'},
    {id:'l4', name:'Sky Blue',      hex:'#5aa9e6'},
    {id:'l5', name:'Grape Purple',  hex:'#9b6bce'},
    {id:'l6', name:'Mint Green',    hex:'#6fd6a6'}
  ];
  var FROSTINGS = [
    {id:'f1', name:'Strawberry',  hex:'#ff6fa5'},
    {id:'f2', name:'Chocolate',   hex:'#8a5a37'},
    {id:'f3', name:'Vanilla',     hex:'#fff3d6'},
    {id:'f4', name:'Blueberry',   hex:'#6f8fe6'},
    {id:'f5', name:'Mint Swirl',  hex:'#7fe0c0'},
    {id:'f6', name:'Lemon',       hex:'#ffe25a'}
  ];
  var TOPPINGS = [
    {id:'t1', name:'Cherry'},
    {id:'t2', name:'Gold Star'},
    {id:'t3', name:'Choc Chips'},
    {id:'t4', name:'Rainbow Candy'}
  ];
  var SPRINKLE_COLORS = ['#e63950','#ff8fc0','#ffd23f','#5aa9e6','#9b6bce','#6fd6a6','#ff6fa5'];

  function start(host, ctx){
    var sel = { liner: LINERS[0].hex, frosting: FROSTINGS[0].hex, topping: TOPPINGS[0].id, sprinkles: [] };
    var served = false;
    var count = (ctx.state.mccCupcakes|0);

    function stripes(hex){
      var out = '';
      var xs = [50,68,86,104,122,140];
      var light = shade(hex, 25);
      for (var i=0;i<xs.length;i++){
        out += '<rect x="'+xs[i]+'" y="132" width="7" height="72" fill="'+light+'" opacity="0.4"/>';
      }
      return out;
    }

    function toppingMarkup(id){
      if (id==='t1'){ // cherry
        return '<line x1="100" y1="40" x2="106" y2="24" stroke="#3f8a4a" stroke-width="2.5" stroke-linecap="round"/>'+
               '<circle cx="100" cy="42" r="9" fill="#c0392b"/>'+
               '<ellipse cx="97" cy="38" rx="2.4" ry="1.4" fill="#fff" opacity="0.55"/>';
      }
      if (id==='t2'){ // gold star
        return '<path d="M100,26 L104,38 L117,38 L106,46 L110,58 L100,50 L90,58 L94,46 L83,38 L96,38 Z" '+
               'fill="#ffd23f" stroke="#e6b800" stroke-width="1.5"/>';
      }
      if (id==='t3'){ // choc chips
        return ['85,58','101,48','116,60','93,68','107,72'].map(function(p){
          var xy = p.split(','); 
          return '<circle cx="'+xy[0]+'" cy="'+xy[1]+'" r="3.2" fill="#4a2e1a"/>';
        }).join('');
      }
      // rainbow candy
      var cols = ['#e63950','#5aa9e6','#ffd23f','#6fd6a6','#9b6bce'];
      var pts = [[85,58],[101,48],[116,60],[93,68],[107,72]];
      return pts.map(function(p,i){
        return '<circle cx="'+p[0]+'" cy="'+p[1]+'" r="3.6" fill="'+cols[i%cols.length]+'"/>';
      }).join('');
    }

    function cakeSVG(){
      var f2 = shade(sel.frosting, -10);
      var sprinkleMarkup = sel.sprinkles.map(function(s){
        return '<rect x="'+(s.x-4)+'" y="'+(s.y-1.5)+'" width="8" height="3" rx="1.5" fill="'+s.c+'" '+
               'transform="rotate('+s.r+' '+s.x+' '+s.y+')"/>';
      }).join('');
      return ''+
      '<svg id="mcc-cake" viewBox="0 0 200 220" width="230" height="253" style="cursor:pointer;touch-action:manipulation;display:block;margin:0 auto;">'+
        '<defs><clipPath id="mccLinerClip"><path d="M40,204 L160,204 L142,138 L58,138 Z"/></clipPath></defs>'+
        '<path d="M40,204 L160,204 L142,138 L58,138 Z" fill="'+sel.liner+'"/>'+
        '<g clip-path="url(#mccLinerClip)">'+stripes(sel.liner)+'</g>'+
        '<rect x="66" y="126" width="68" height="18" rx="5" fill="#eecaa1"/>'+
        '<ellipse cx="100" cy="122" rx="58" ry="26" fill="'+sel.frosting+'"/>'+
        '<ellipse cx="100" cy="96" rx="44" ry="23" fill="'+f2+'"/>'+
        '<ellipse cx="100" cy="72" rx="30" ry="19" fill="'+sel.frosting+'"/>'+
        '<circle cx="100" cy="54" r="15" fill="'+f2+'"/>'+
        '<ellipse cx="78" cy="88" rx="15" ry="7" fill="#ffffff" opacity="0.18"/>'+
        toppingMarkup(sel.topping)+
        sprinkleMarkup+
      '</svg>';
    }

    function tileRow(role, options, selectedVal, keyName){
      return '<div class="story-grid" data-role="'+role+'">'+
        options.map(function(o){
          var val = keyName ? o[keyName] : o.id;
          var isSel = val === selectedVal;
          var swatch = o.hex ? '<span class="mcc-swatch" style="background:'+o.hex+'"></span>' : '<span class="mcc-swatch mcc-emoji">'+({t1:'🍒',t2:'⭐',t3:'🍫',t4:'🍬'}[o.id]||'')+'</span>';
          return '<button type="button" class="story-pick mcc-tile'+(isSel?' sel':'')+'" data-role="'+role+'" data-val="'+val+'">'+
            swatch+'<span class="sub">'+o.name+'</span>'+
          '</button>';
        }).join('')+
      '</div>';
    }

    function galleryHTML(){
      if (count<=0) return '';
      var shown = Math.min(count,12);
      var cups = new Array(shown).fill('🧁').join(' ');
      var extra = count>12 ? ' <span class="sub">+'+(count-12)+' more</span>' : '';
      return '<p class="sub center mt">Case so far: '+cups+extra+'</p>';
    }

    function render(){
      host.innerHTML =
        '<div class="center">'+
          '<button type="button" class="btn ghost sm" id="mcc-close">\u2190 Map</button>'+
        '</div>'+
        '<h2 class="center">Decorate a Cupcake for McClain\'s!</h2>'+
        '<p class="sub center">Clover\u2019s cousin runs the counter and needs your help \u2014 pick your favorites, then tap the frosting to add sprinkles!</p>'+
        '<div class="row mt" style="align-items:flex-start;justify-content:center;gap:24px;flex-wrap:wrap;">'+
          '<div class="center" id="mcc-cake-wrap">'+
            cakeSVG()+
            '<p class="sub" id="mcc-sprinkle-count">'+(sel.sprinkles.length? sel.sprinkles.length+' sprinkles added!' : 'Tap the cupcake to add sprinkles')+'</p>'+
          '</div>'+
          '<div style="min-width:240px;max-width:340px;">'+
            '<h3>Liner</h3>'+tileRow('liner', LINERS, sel.liner, 'hex')+
            '<h3 class="mt">Frosting</h3>'+tileRow('frosting', FROSTINGS, sel.frosting, 'hex')+
            '<h3 class="mt">Topping</h3>'+tileRow('topping', TOPPINGS, sel.topping)+
          '</div>'+
        '</div>'+
        '<div class="center mt" id="mcc-serve-area">'+
          '<button type="button" class="btn green" id="mcc-serve">Serve it to Clover!</button>'+
        '</div>'+
        '<div id="mcc-thanks"></div>'+
        galleryHTML();

      wire();
    }

    function wireCake(){
      var cake = host.querySelector('#mcc-cake');
      if (!cake) return;
      cake.addEventListener('click', function(e){
        if (sel.sprinkles.length >= 24){
          ctx.toast && ctx.toast("That's plenty of sprinkles!");
          return;
        }
        var rect = cake.getBoundingClientRect();
        var vx = (e.clientX - rect.left) / rect.width * 200;
        var vy = (e.clientY - rect.top) / rect.height * 220;
        // keep sprinkles on the frosting area
        if (vy < 42 || vy > 138 || vx < 46 || vx > 154) return;
        var color = SPRINKLE_COLORS[Math.floor(Math.random()*SPRINKLE_COLORS.length)];
        sel.sprinkles.push({x:vx, y:vy, c:color, r:Math.floor(Math.random()*360)});
        refreshCakeOnly();
      });
    }

    function wire(){
      var closeBtn = host.querySelector('#mcc-close');
      if (closeBtn) closeBtn.addEventListener('click', ctx.close);

      wireCake();

      host.querySelectorAll('.mcc-tile').forEach(function(btn){
        btn.addEventListener('click', function(){
          var role = btn.getAttribute('data-role');
          var val = btn.getAttribute('data-val');
          sel[role] = val;
          render();
        });
      });

      var serveBtn = host.querySelector('#mcc-serve');
      if (serveBtn) serveBtn.addEventListener('click', serve);
    }

    function refreshCakeOnly(){
      var wrap = host.querySelector('#mcc-cake-wrap');
      if (!wrap) return;
      wrap.innerHTML = cakeSVG() +
        '<p class="sub" id="mcc-sprinkle-count">'+(sel.sprinkles.length? sel.sprinkles.length+' sprinkles added!' : 'Tap the cupcake to add sprinkles')+'</p>';
      wireCake(); // only the cake element was replaced — only it needs rewiring
    }

    function serve(){
      if (served) return;
      served = true;
      count++;
      ctx.state.mccCupcakes = count;
      var firstTime = count === 1;
      ctx.award({ coins: 4, star: firstTime });
      ctx.toast && ctx.toast(firstTime ? 'You earned a star! \u2b50' : '+4 coins!');
      ctx.confetti && ctx.confetti();

      var thanks = host.querySelector('#mcc-thanks');
      if (thanks){
        thanks.innerHTML =
          '<div class="center mt">'+
            '<img src="'+ctx.clover.cele+'" alt="Clover celebrating" style="width:90px;height:auto;"/>'+
            '<p class="fb ok">"Yum! Thank you, Eliza! That\'s a perfect cupcake for McClain\'s!"</p>'+
            '<div class="row" style="justify-content:center;gap:10px;">'+
              '<button type="button" class="btn teal" id="mcc-again">Make Another</button>'+
              '<button type="button" class="btn ghost" id="mcc-done">Done for now</button>'+
            '</div>'+
          '</div>';
        host.querySelector('#mcc-again').addEventListener('click', function(){
          sel.sprinkles = [];
          served = false;
          render();
        });
        host.querySelector('#mcc-done').addEventListener('click', ctx.close);
      }
      var serveArea = host.querySelector('#mcc-serve-area');
      if (serveArea) serveArea.innerHTML = '';
    }

    // scoped styles for the picker swatches (small, additive to shell classes)
    var style = document.createElement('style');
    style.textContent =
      '.mcc-tile{display:flex;flex-direction:column;align-items:center;gap:4px;}'+
      '.mcc-swatch{width:26px;height:26px;border-radius:50%;border:2px solid rgba(8,31,44,0.18);}'+
      '.mcc-swatch.mcc-emoji{background:#fff;display:flex;align-items:center;justify-content:center;font-size:15px;}';
    host.appendChild(style);

    render();
  }

  window.Stops.register('9C', { name: "McClain's Bakery", start: start });
})();
