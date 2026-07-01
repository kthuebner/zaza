/* Zoo (8F) — Geography: locate the continents, then match animals to their home.
   Self-contained. Uses ctx.award / ctx.close / ctx.clover. Taps use pointerup. */
(function(){
  var CONTS=[
    {id:'north-america',name:'North America',color:'#f4a259',cx:176,cy:118,fs:14,
     hint:'Look up in the top-left!',
     path:'M120,66 C82,74 70,120 104,140 C92,178 146,206 196,184 C248,204 300,158 268,122 C292,92 252,54 208,72 C172,48 140,52 120,66 Z'},
    {id:'south-america',name:'South America',color:'#57cc99',cx:262,cy:330,fs:13,
     hint:'It\u2019s just below North America.',
     path:'M238,258 C206,272 214,330 248,350 C242,392 276,424 292,404 C316,380 306,332 288,318 C306,290 288,246 260,252 C250,246 244,250 238,258 Z'},
    {id:'europe',name:'Europe',color:'#c77dff',cx:500,cy:120,fs:12,
     hint:'It\u2019s the small one near the top.',
     path:'M470,98 C450,102 452,134 476,140 C480,164 520,166 530,142 C554,140 550,102 522,98 C506,86 484,88 470,98 Z'},
    {id:'africa',name:'Africa',color:'#ffca3a',cx:527,cy:258,fs:16,
     hint:'It\u2019s the big one in the middle.',
     path:'M486,176 C456,190 462,244 492,258 C486,314 528,360 556,336 C586,340 600,290 580,258 C602,234 588,184 552,186 C530,168 504,166 486,176 Z'},
    {id:'asia',name:'Asia',color:'#ff6b6b',cx:712,cy:140,fs:16,
     hint:'It\u2019s the biggest one, on the right.',
     path:'M588,78 C552,88 556,140 602,154 C588,194 656,222 714,198 C782,222 862,188 842,132 C876,102 832,52 768,68 C704,42 630,48 588,78 Z'},
    {id:'australia',name:'Australia',color:'#f4845f',cx:830,cy:372,fs:13,
     hint:'It\u2019s down in the bottom-right.',
     path:'M792,338 C764,346 766,388 802,398 C818,414 862,406 870,382 C894,376 888,340 858,338 C834,324 808,328 792,338 Z'},
    {id:'antarctica',name:'Antarctica',color:'#7fdfff',cx:482,cy:474,fs:14,
     hint:'It\u2019s the icy one along the bottom.',
     path:'M296,452 C270,458 276,488 320,492 C406,502 566,502 650,492 C690,488 696,458 666,454 C566,442 400,442 296,452 Z'}
  ];
  var ANIMALS=[
    {emoji:'\u{1F981}',name:'lion',cont:'africa'},
    {emoji:'\u{1F998}',name:'kangaroo',cont:'australia'},
    {emoji:'\u{1F43C}',name:'panda',cont:'asia'},
    {emoji:'\u{1F427}',name:'penguin',cont:'antarctica'},
    {emoji:'\u{1F9A5}',name:'sloth',cont:'south-america'},
    {emoji:'\u{1F9AC}',name:'bison',cont:'north-america'}
  ];
  var byId={}; CONTS.forEach(function(c){byId[c.id]=c;});

  function shuffle(a){for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t;}return a;}

  function injectStyle(){
    if(document.getElementById('zoo-geo-css'))return;
    var s=document.createElement('style'); s.id='zoo-geo-css';
    s.textContent=[
      '.zoo-geo{text-align:center;}',
      '.zg-map{width:100%;max-width:560px;margin:10px auto;display:block;border:2px solid var(--line);border-radius:16px;box-shadow:var(--shadow-sm);}',
      '.zg-map .cont path{stroke:#fff;stroke-width:2.5;transition:filter .15s ease;}',
      '.zg-map .cont text{fill:#0b3550;font-family:Fredoka,sans-serif;font-weight:600;text-anchor:middle;paint-order:stroke;stroke:#fff;stroke-width:3;stroke-linejoin:round;pointer-events:none;}',
      '.zg-map .cont.zg-live{cursor:pointer;}',
      '.zg-map .cont.zg-live:hover path{filter:brightness(1.1);}',
      '.zg-map .cont.right path{fill:var(--green)!important;filter:none;}',
      '.zg-map .cont.wrong path{filter:brightness(.6) saturate(.4);}',
      '.zg-map .cont.hintpulse path{stroke:#081f2c;stroke-width:4;animation:zgPulse .8s ease infinite;}',
      '@keyframes zgPulse{50%{filter:brightness(1.3);}}',
      '.zg-prompt{font-family:Fredoka,sans-serif;font-weight:600;font-size:20px;margin:4px 0 2px;}',
      '.zg-sub{color:var(--ink-soft);font-weight:700;font-size:13px;margin-bottom:2px;}',
      '.zg-animal{font-size:66px;line-height:1;margin-top:4px;}',
      '.zg-cele{height:130px;}'
    ].join('');
    document.head.appendChild(s);
  }

  function labelSVG(c){
    var parts=c.name.split(' '), fs=c.fs||14;
    if(parts.length===1)
      return '<text x="'+c.cx+'" y="'+(c.cy+fs*0.35)+'" font-size="'+fs+'">'+c.name+'</text>';
    return '<text x="'+c.cx+'" y="'+c.cy+'" font-size="'+fs+'">'+
      '<tspan x="'+c.cx+'" dy="-2">'+parts[0]+'</tspan>'+
      '<tspan x="'+c.cx+'" dy="'+(fs*1.02)+'">'+parts.slice(1).join(' ')+'</tspan></text>';
  }
  function mapSVG(interactive){
    return '<svg class="zg-map" viewBox="0 0 960 500" xmlns="http://www.w3.org/2000/svg">'+
      '<rect x="0" y="0" width="960" height="500" rx="16" fill="#bfe6fb"/>'+
      CONTS.map(function(c){
        return '<g class="cont'+(interactive?' zg-live':'')+'" data-id="'+c.id+'">'+
               '<path d="'+c.path+'" fill="'+c.color+'"/>'+labelSVG(c)+'</g>';
      }).join('')+'</svg>';
  }

  function start(host, ctx){
    injectStyle();
    var total=CONTS.length+ANIMALS.length;
    var score={first:0, coins:0, total:total};

    function bindMap(cb){
      host.querySelectorAll('.cont.zg-live').forEach(function(g){
        g.addEventListener('pointerup',function(e){ e.stopPropagation(); cb(g.getAttribute('data-id'), g); });
      });
    }

    intro();

    function intro(){
      host.innerHTML='<div class="zoo-geo">'+
        '<h2>\u{1F981} Clover\u2019s Zoo Adventure</h2>'+
        '<p class="sub">Clover is at the zoo and wants to learn about the whole world! '+
        'First help her find the seven continents. Then match each animal to the place it calls home.</p>'+
        mapSVG(false)+
        '<button class="btn green" id="go">Let\u2019s explore! \u{1F30D}</button></div>';
      host.querySelector('#go').onclick=phase1;
    }

    // ---- Phase 1: locate continents ----
    function phase1(){
      var order=shuffle(CONTS.slice()), idx=0;
      ask();
      function ask(){
        var target=order[idx], tried=false, busy=false;
        host.innerHTML='<div class="zoo-geo">'+
          '<div class="zg-prompt">Can you find <b>'+target.name+'</b>?</div>'+
          '<div class="zg-sub">Continent '+(idx+1)+' of '+order.length+'</div>'+
          mapSVG(true)+
          '<div class="fb" id="fb">&nbsp;</div></div>';
        var fb=host.querySelector('#fb');
        bindMap(function(id, g){
          if(busy)return;
          if(id===target.id){
            busy=true; g.classList.add('right');
            var pts=tried?1:2; score.coins+=pts; ctx.award({coins:pts});
            if(!tried)score.first++;
            fb.textContent='Yes! That\u2019s '+target.name+'! \u{1F389}'; fb.className='fb ok';
            idx++;
            setTimeout(idx<order.length?ask:toPhase2, 950);
          } else {
            tried=true; g.classList.add('wrong');
            fb.textContent='Not quite \u2014 try again! '+target.hint; fb.className='fb no';
            var c=host.querySelector('.cont[data-id="'+target.id+'"]'); if(c)c.classList.add('hintpulse');
          }
        });
      }
    }

    function toPhase2(){
      host.innerHTML='<div class="zoo-geo center">'+
        '<div style="font-size:52px">\u{1F30E}</div>'+
        '<h2>You found all the continents!</h2>'+
        '<p class="sub">Now Clover wants to know where each animal lives. '+
        'Tap the continent that each animal calls home.</p>'+
        '<button class="btn green" id="go">Meet the animals \u{1F43e}</button></div>';
      host.querySelector('#go').onclick=phase2;
    }

    // ---- Phase 2: match animals to continents ----
    function phase2(){
      var order=shuffle(ANIMALS.slice()), idx=0;
      ask();
      function ask(){
        var a=order[idx], tried=false, busy=false;
        host.innerHTML='<div class="zoo-geo">'+
          '<div class="zg-animal">'+a.emoji+'</div>'+
          '<div class="zg-prompt">Where does the <b>'+a.name+'</b> live?</div>'+
          '<div class="zg-sub">Animal '+(idx+1)+' of '+order.length+'</div>'+
          mapSVG(true)+
          '<div class="fb" id="fb">&nbsp;</div></div>';
        var fb=host.querySelector('#fb');
        bindMap(function(id, g){
          if(busy)return;
          if(id===a.cont){
            busy=true; g.classList.add('right');
            var pts=tried?1:3; score.coins+=pts; ctx.award({coins:pts});
            if(!tried)score.first++;
            fb.textContent='Yes! The '+a.name+' lives in '+byId[a.cont].name+'! \u{1F389}'; fb.className='fb ok';
            idx++;
            setTimeout(idx<order.length?ask:results, 1050);
          } else {
            tried=true; g.classList.add('wrong');
            fb.textContent='Not there \u2014 try again! '+byId[a.cont].hint; fb.className='fb no';
            var c=host.querySelector('.cont[data-id="'+a.cont+'"]'); if(c)c.classList.add('hintpulse');
          }
        });
      }
    }

    // ---- Results ----
    function results(){
      var star=score.first>=Math.ceil(score.total*0.7);
      if(star)ctx.award({star:true});
      host.innerHTML='<div class="zoo-geo center">'+
        (star?'<img class="zg-cele" src="'+ctx.clover.cele+'" alt="">':'<div style="font-size:54px">\u{1F30D}</div>')+
        '<h2>'+(star?'You earned a star! \u{1F31F}':'Great exploring!')+'</h2>'+
        '<p class="sub">You got '+score.first+' of '+score.total+' right on the first try and earned '+
        score.coins+' coins for Clover!'+(star?'':' Get most of them on the first try to earn the \u2B50.')+'</p>'+
        '<div class="row" style="justify-content:center">'+
        '<button class="btn green" id="again">Play again</button>'+
        '<button class="btn ghost" id="map">\u2190 Map</button></div></div>';
      host.querySelector('#again').onclick=function(){ start(host, ctx); };
      host.querySelector('#map').onclick=ctx.close;
    }
  }

  window.Stops.register('8F', { name:'Zoo', start:start });
})();
