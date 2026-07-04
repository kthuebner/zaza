(function(){

  var CSS = ""
  + ".br-wrap{max-width:640px;margin:0 auto;font-family:inherit;}"
  + ".br-card{background:#fff;border-radius:18px;padding:20px;box-shadow:0 2px 10px rgba(8,31,44,0.08);}"
  + ".br-shape-row{display:flex;justify-content:center;gap:16px;margin:14px 0;}"
  + ".br-shape-box{width:84px;height:70px;display:flex;align-items:center;justify-content:center;}"
  + ".br-lesson-text{font-size:15px;line-height:1.5;color:#081F2C;text-align:center;margin-top:6px;}"
  + ".br-dots{display:flex;justify-content:center;gap:8px;margin-top:14px;}"
  + ".br-dot{width:9px;height:9px;border-radius:50%;background:#dfe6e3;}"
  + ".br-dot.on{background:#62CBC9;}"
  + ".br-riddle{font-size:16px;text-align:center;color:#081F2C;margin:10px 0 16px;font-weight:600;}"
  + ".br-progress{text-align:center;font-size:13px;color:#7a8a86;margin-bottom:6px;}"
  + ".br-bridge{position:relative;background:linear-gradient(#bfe3ea,#8fcdd9);border-radius:14px;padding:26px 10px 14px;overflow:hidden;}"
  + ".br-water{position:absolute;left:0;right:0;bottom:0;height:34px;background:#5fb6da;}"
  + ".br-deck{position:relative;display:flex;justify-content:center;gap:8px;z-index:2;}"
  + ".br-gap{width:70px;height:56px;border-radius:8px;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,0.35);border:3px dashed #ffffffaa;transition:transform .25s ease;}"
  + ".br-gap.filled{border:3px solid transparent;background:transparent;}"
  + ".br-gap.current{border-color:#CF3339;background:rgba(255,255,255,0.6);}"
  + ".br-gap.pop{animation:brPop .35s ease;}"
  + ".br-gap.shake{animation:brShake .35s ease;}"
  + "@keyframes brPop{0%{transform:scale(0.7);}60%{transform:scale(1.12);}100%{transform:scale(1);}}"
  + "@keyframes brShake{0%,100%{transform:translateX(0);}25%{transform:translateX(-6px);}75%{transform:translateX(6px);}}"
  + ".br-pier{position:absolute;bottom:0;width:12px;height:34px;background:#a9763f;}"
  + ".br-tray{display:flex;justify-content:center;gap:16px;margin-top:20px;}"
  + ".br-shape-btn{background:#fff;border:2px solid #dfe6e3;border-radius:14px;padding:10px 6px;cursor:pointer;width:96px;transition:transform .12s ease, border-color .12s ease;}"
  + ".br-shape-btn:active{transform:scale(0.94);}"
  + ".br-shape-btn:hover{border-color:#62CBC9;}"
  + ".br-shape-label{font-size:12px;font-weight:700;color:#081F2C;text-align:center;margin-top:4px;}"
  + ".br-crossing{position:relative;height:34px;}"
  + ".br-runner{position:absolute;bottom:-6px;left:0;width:46px;height:46px;transition:left 2.6s linear;}"
  + ".br-star-row{display:flex;justify-content:center;gap:6px;margin:10px 0;font-size:26px;}"
  ;

  function svgTriangle(){
    return '<svg viewBox="0 0 60 52" width="52" height="46"><polygon points="30,4 56,48 4,48" fill="#CF3339"/></svg>';
  }
  function svgArch(){
    return '<svg viewBox="0 0 60 40" width="56" height="38"><path d="M4,38 L4,22 A26,26 0 0,1 56,22 L56,38 Z" fill="#62CBC9"/></svg>';
  }
  function svgBeam(){
    return '<svg viewBox="0 0 60 20" width="56" height="19"><rect x="2" y="2" width="56" height="16" rx="4" fill="#081F2C"/></svg>';
  }
  function shapeSvg(kind){
    if(kind==='triangle') return svgTriangle();
    if(kind==='arch') return svgArch();
    return svgBeam();
  }
  var SHAPE_NAME = {triangle:'Triangle', arch:'Arch', beam:'Beam'};

  var LESSONS = [
    { kind:'triangle', title:'Triangles', text:'Triangles do not bend! Their sides lock together tight, so they can carry heavy loads without changing shape.' },
    { kind:'arch', title:'Arches', text:'Arches spread the weight down and out to both sides. That lets them curve gracefully over a wide gap.' },
    { kind:'beam', title:'Beams', text:'Beams are simple and straight. They are great for short gaps, but a long beam can sag in the middle.' }
  ];

  var RIDDLES = [
    { shape:'triangle', text:'This gap has to hold Clover\'s whole soccer team when they cross together. Which shape will not bend?' },
    { shape:'triangle', text:'A heavy delivery truck needs to drive across this gap. Which shape holds its form under a heavy load?' },
    { shape:'arch', text:'This gap curves over the wide part of the river. Which shape spreads the weight out to both sides?' },
    { shape:'arch', text:'This part of the bridge needs to curve gracefully over a big open space. Which shape is best?' },
    { shape:'beam', text:'This gap is short, just enough for a bike to hop across. Which simple shape is perfect here?' },
    { shape:'beam', text:'This little gap just needs something plain and straight. Which shape works best for a short hop?' }
  ];

  function shuffle(arr){
    var a = arr.slice();
    for(var i=a.length-1;i>0;i--){
      var j = Math.floor(Math.random()*(i+1));
      var t=a[i]; a[i]=a[j]; a[j]=t;
    }
    return a;
  }

  function start(host, ctx){
    var rounds = shuffle(RIDDLES);
    var idx = 0;
    var misses = 0;
    var firstTry = 0;
    var filled = [null,null,null,null,null,null];
    var lessonIdx = 0;

    function bind(sel, fn){
      var els = host.querySelectorAll(sel);
      for(var i=0;i<els.length;i++){
        els[i].addEventListener('pointerup', fn);
      }
    }

    function renderIntro(){
      host.innerHTML =
        '<div class="br-wrap"><div class="br-card center">'
        + '<img src="'+ctx.clover.head+'" style="width:84px;" alt="Clover"/>'
        + '<h2 class="h2">Clover found the bridge!</h2>'
        + '<p class="br-lesson-text">Some pieces of the bridge are missing. Eliza, can you help Clover pick the right shapes to build it back up?</p>'
        + '<button class="btn teal mt" id="br-start">Learn the Shapes</button>'
        + '</div></div>';
      bind('#br-start', function(){ lessonIdx=0; renderLesson(); });
    }

    function renderLesson(){
      var L = LESSONS[lessonIdx];
      var dots = LESSONS.map(function(_,i){ return '<div class="br-dot'+(i===lessonIdx?' on':'')+'"></div>'; }).join('');
      host.innerHTML =
        '<div class="br-wrap"><div class="br-card center">'
        + '<h3 class="h3">'+L.title+'</h3>'
        + '<div class="br-shape-row"><div class="br-shape-box">'+shapeSvg(L.kind)+'</div></div>'
        + '<p class="br-lesson-text">'+L.text+'</p>'
        + '<div class="br-dots">'+dots+'</div>'
        + '<button class="btn teal mt" id="br-next">'+(lessonIdx<LESSONS.length-1 ? 'Next' : 'Let\'s Build!')+'</button>'
        + '</div></div>';
      bind('#br-next', function(){
        if(lessonIdx < LESSONS.length-1){ lessonIdx++; renderLesson(); }
        else { renderBuild(); }
      });
    }

    function gapHtml(){
      var boxes = '';
      for(var i=0;i<6;i++){
        var cls = 'br-gap';
        if(filled[i]) cls += ' filled';
        else if(i===idx) cls += ' current';
        boxes += '<div class="'+cls+'" id="br-gap-'+i+'">'+(filled[i]?shapeSvg(filled[i]):'')+'</div>';
      }
      return boxes;
    }

    function renderBuild(){
      var r = rounds[idx];
      host.innerHTML =
        '<div class="br-wrap">'
        + '<div class="br-progress">Gap '+(idx+1)+' of 6</div>'
        + '<div class="br-riddle">'+r.text+'</div>'
        + '<div class="br-bridge"><div class="br-water"></div><div class="br-deck">'+gapHtml()+'</div></div>'
        + '<div class="br-tray">'
        +   trayBtn('triangle')
        +   trayBtn('arch')
        +   trayBtn('beam')
        + '</div>'
        + '<div class="fb center mt" id="br-fb">&nbsp;</div>'
        + '</div>';
      bind('.br-shape-btn', function(e){
        var kind = e.currentTarget.getAttribute('data-kind');
        checkAnswer(kind);
      });
    }

    function trayBtn(kind){
      return '<div class="br-shape-btn" data-kind="'+kind+'">'
        + '<div class="br-shape-box">'+shapeSvg(kind)+'</div>'
        + '<div class="br-shape-label">'+SHAPE_NAME[kind]+'</div>'
        + '</div>';
    }

    function checkAnswer(kind){
      var r = rounds[idx];
      var fb = host.querySelector('#br-fb');
      var gap = host.querySelector('#br-gap-'+idx);
      if(kind === r.shape){
        filled[idx] = kind;
        if(misses === 0) firstTry++;
        ctx.award({coins:1});
        if(gap){ gap.classList.add('pop'); gap.innerHTML = shapeSvg(kind); }
        if(fb){ fb.className='fb ok center mt'; fb.textContent='Great choice!'; }
        misses = 0;
        idx++;
        setTimeout(function(){
          if(idx < 6) renderBuild();
          else renderCrossing();
        }, 550);
      } else {
        misses++;
        if(gap){ gap.classList.add('shake'); setTimeout(function(){ gap.classList.remove('shake'); }, 350); }
        if(misses >= 2){
          if(fb){ fb.className='fb no center mt'; fb.textContent='Let\'s try a '+SHAPE_NAME[r.shape]+' here.'; }
          filled[idx] = r.shape;
          ctx.award({coins:1});
          if(gap){ gap.innerHTML = shapeSvg(r.shape); gap.classList.add('pop'); }
          misses = 0;
          idx++;
          setTimeout(function(){
            if(idx < 6) renderBuild();
            else renderCrossing();
          }, 900);
        } else {
          if(fb){ fb.className='fb no center mt'; fb.textContent='Hmm, try again! Think about what this gap needs.'; }
        }
      }
    }

    function renderCrossing(){
      host.innerHTML =
        '<div class="br-wrap"><div class="br-card center">'
        + '<h3 class="h3">The bridge is ready!</h3>'
        + '<p class="br-lesson-text">Let\'s see Clover cross it.</p>'
        + '<div class="br-bridge"><div class="br-water"></div><div class="br-deck">'+gapHtml()+'</div>'
        +   '<div class="br-crossing"><img class="br-runner" id="br-runner" src="'+ctx.clover.run+'" alt="Clover running"/></div>'
        + '</div>'
        + '</div></div>';
      var runner = host.querySelector('#br-runner');
      setTimeout(function(){
        if(runner) runner.style.left = 'calc(100% - 46px)';
      }, 150);
      setTimeout(renderResults, 2900);
    }

    function renderResults(){
      var earnedStar = firstTry >= 5;
      var alreadyStar = !!ctx.state.bridgeStarEarned;
      var award = {coins:5};
      if(earnedStar && !alreadyStar){
        award.star = true;
        ctx.state.bridgeStarEarned = true;
      }
      ctx.award(award);
      ctx.confetti();
      var stars = '';
      for(var i=0;i<6;i++){ stars += (i < firstTry ? '⭐' : '☆'); }
      host.innerHTML =
        '<div class="br-wrap"><div class="br-card center">'
        + '<img src="'+ctx.clover.cele+'" style="width:100px;" alt="Clover celebrating"/>'
        + '<h2 class="h2">The bridge holds strong!</h2>'
        + '<p class="br-lesson-text">You got '+firstTry+' of 6 gaps right on the first try.</p>'
        + '<div class="br-star-row">'+stars+'</div>'
        + (earnedStar ? '<p class="fb ok center">You earned the Bridge star!</p>' : '<p class="br-lesson-text">Get 5 of 6 right on your first try to earn the star.</p>')
        + '<div class="row center mt">'
        +   '<button class="btn teal" id="br-again">Build Again</button>'
        +   '<button class="btn ghost" id="br-done">&larr; Map</button>'
        + '</div>'
        + '</div></div>';
      bind('#br-again', function(){
        rounds = shuffle(RIDDLES);
        idx = 0; misses = 0; firstTry = 0; filled = [null,null,null,null,null,null];
        renderBuild();
      });
      bind('#br-done', function(){ ctx.close(); });
    }

    renderIntro();
  }

  window.Stops.register('2E', { name:'Bridge', start:start });
})();
