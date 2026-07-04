(function(){

  var CSS = ""
  + ".br-wrap{max-width:660px;margin:0 auto;font-family:inherit;}"
  + ".br-card{background:#fff;border-radius:18px;padding:20px;box-shadow:0 2px 10px rgba(8,31,44,0.08);}"
  + ".br-shape-row{display:flex;justify-content:center;gap:16px;margin:14px 0;}"
  + ".br-shape-box{width:84px;height:70px;display:flex;align-items:center;justify-content:center;pointer-events:none;}"
  + ".br-lesson-text{font-size:15px;line-height:1.5;color:#081F2C;text-align:center;margin-top:6px;}"
  + ".br-dots{display:flex;justify-content:center;gap:8px;margin-top:14px;}"
  + ".br-dot{width:9px;height:9px;border-radius:50%;background:#dfe6e3;}"
  + ".br-dot.on{background:#62CBC9;}"
  + ".br-hint-bar{text-align:center;font-size:14px;color:#3a4533;margin-bottom:10px;}"
  + ".br-bridge{position:relative;background:linear-gradient(#bfe3ea,#8fcdd9);border-radius:14px;padding:34px 10px 16px;overflow:hidden;}"
  + ".br-water{position:absolute;left:0;right:0;bottom:0;height:34px;background:#5fb6da;}"
  + ".br-deck{position:relative;display:flex;justify-content:center;gap:8px;z-index:2;}"
  + ".br-gapwrap{display:flex;flex-direction:column;align-items:center;}"
  + ".br-hint{font-size:18px;line-height:1;margin-bottom:3px;}"
  + ".br-hintlabel{font-size:9px;font-weight:700;color:#0b2733;background:#ffffffcc;border-radius:6px;padding:1px 4px;margin-bottom:4px;white-space:nowrap;}"
  + ".br-gap{width:74px;height:58px;border-radius:8px;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,0.35);border:3px dashed #ffffffaa;transition:transform .2s ease, box-shadow .2s ease;position:relative;}"
  + ".br-gap.filled{border-style:solid;background:rgba(255,255,255,0.55);}"
  + ".br-gap.br-hover{border-color:#CF3339;background:rgba(255,255,255,0.75);transform:scale(1.06);}"
  + ".br-gap.locked.pass{border-color:#3f9b57;box-shadow:0 0 0 3px rgba(63,155,87,0.25);}"
  + ".br-gap.fail{border-color:#CF3339;}"
  + ".br-gap.testing-pause{transform:scale(1.08);}"
  + ".br-gap.sag{animation:brSag .5s ease;}"
  + ".br-gap.holdfirm{animation:brHold .5s ease;}"
  + "@keyframes brSag{0%{transform:translateY(0);}50%{transform:translateY(10px) rotate(-2deg);}100%{transform:translateY(0);}}"
  + "@keyframes brHold{0%{transform:scale(1);}40%{transform:scale(1.14);}100%{transform:scale(1);}}"
  + ".br-crack{position:absolute;inset:0;pointer-events:none;}"
  + ".br-pier{position:absolute;bottom:0;width:12px;height:34px;background:#a9763f;}"
  + ".br-palette{display:flex;justify-content:center;gap:18px;margin-top:20px;}"
  + ".br-token{background:#fff;border:2px solid #dfe6e3;border-radius:14px;padding:10px 6px;cursor:grab;width:96px;touch-action:none;user-select:none;transition:border-color .12s ease;}"
  + ".br-token:hover{border-color:#62CBC9;}"
  + ".br-shape-label{font-size:12px;font-weight:700;color:#081F2C;text-align:center;margin-top:4px;pointer-events:none;}"
  + ".br-drag-clone{width:96px;box-shadow:0 6px 16px rgba(8,31,44,0.3);border-radius:14px;background:#fff;border:2px solid #62CBC9;padding:10px 6px;}"
  + ".br-truck{position:absolute;bottom:-2px;font-size:34px;transition:left .55s ease;z-index:5;}"
  + ".br-results-row{display:flex;justify-content:center;gap:10px;margin:14px 0;flex-wrap:wrap;}"
  + ".br-result-chip{font-size:13px;font-weight:700;border-radius:20px;padding:6px 12px;}"
  + ".br-result-chip.pass{background:#e3f5e8;color:#256b3a;}"
  + ".br-result-chip.fail{background:#fdeaec;color:#a3222f;}"
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
  function svgCrack(){
    return '<svg class="br-crack" viewBox="0 0 74 58"><path d="M10,4 L30,26 L18,30 L46,54 M46,10 L30,26" stroke="#a3222f" stroke-width="2.5" fill="none" stroke-linecap="round"/></svg>';
  }
  function shapeSvg(kind){
    if(kind==='triangle') return svgTriangle();
    if(kind==='arch') return svgArch();
    return svgBeam();
  }
  var SHAPE_NAME = {triangle:'Triangle', arch:'Arch', beam:'Beam'};
  var STYLE_TAG = '<style>'+CSS+'</style>';

  var LESSONS = [
    { kind:'triangle', title:'Triangles', text:'Triangles do not bend! Their sides lock together tight, so they can carry heavy loads without changing shape.' },
    { kind:'arch', title:'Arches', text:'Arches spread the weight down and out to both sides. That lets them curve gracefully over a wide gap.' },
    { kind:'beam', title:'Beams', text:'Beams are simple and straight. They are great for short gaps, but a long beam can sag in the middle.' }
  ];

  // 2 gaps that need each shape, each with a hint icon/label (not a full riddle)
  var HINT_SPEC = [
    { need:'triangle', icon:'\uD83C\uDFCB\uFE0F', label:'Heavy Load' },
    { need:'triangle', icon:'\uD83D\uDE9A', label:'Big Truck' },
    { need:'arch', icon:'\uD83C\uDF0A', label:'Wide Curve' },
    { need:'arch', icon:'\uD83C\uDF09', label:'Wide Curve' },
    { need:'beam', icon:'\uD83D\uDEB2', label:'Quick Hop' },
    { need:'beam', icon:'\uD83E\uDDB6', label:'Quick Hop' }
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
    var gaps = shuffle(HINT_SPEC); // fixed order for this playthrough: gaps[i].need is the true answer
    var filled = [null,null,null,null,null,null];
    var passed = [false,false,false,false,false,false];
    var scored = [false,false,false,false,false,false];
    var firstTestDone = false;
    var firstTestPassCount = 0;
    var lessonIdx = 0;
    var dragKind = null;

    function bind(sel, fn){
      var els = host.querySelectorAll(sel);
      for(var i=0;i<els.length;i++){ els[i].addEventListener('pointerup', fn); }
    }

    function renderIntro(){
      host.innerHTML = STYLE_TAG +
        '<div class="br-wrap"><div class="br-card center">'
        + '<img src="'+ctx.clover.head+'" style="width:84px;" alt="Clover"/>'
        + '<h2 class="h2">Clover found the bridge!</h2>'
        + '<p class="br-lesson-text">Some pieces are missing. Eliza, drag the right shapes into place, then we will test the bridge with a big heavy load!</p>'
        + '<button class="btn teal mt" id="br-start">Learn the Shapes</button>'
        + '</div></div>';
      bind('#br-start', function(){ lessonIdx=0; renderLesson(); });
    }

    function renderLesson(){
      var L = LESSONS[lessonIdx];
      var dots = LESSONS.map(function(_,i){ return '<div class="br-dot'+(i===lessonIdx?' on':'')+'"></div>'; }).join('');
      host.innerHTML = STYLE_TAG +
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

    function gapMarkup(i){
      var g = gaps[i];
      var cls = 'br-gap';
      if(filled[i]) cls += ' filled';
      return '<div class="br-gapwrap">'
        + '<div class="br-hint">'+g.icon+'</div>'
        + '<div class="br-hintlabel">'+g.label+'</div>'
        + '<div class="'+cls+'" data-idx="'+i+'" id="br-gap-'+i+'">'+(filled[i]?shapeSvg(filled[i]):'')+'</div>'
        + '</div>';
    }

    function deckMarkup(){
      var out = '';
      for(var i=0;i<6;i++) out += gapMarkup(i);
      return out;
    }

    function renderBuild(){
      host.innerHTML = STYLE_TAG +
        '<div class="br-wrap">'
        + '<div class="br-hint-bar">Drag a shape onto each gap. The little pictures are clues about what that gap needs to hold!</div>'
        + '<div class="br-bridge" id="br-bridge"><div class="br-water"></div><div class="br-deck" id="br-deck">'+deckMarkup()+'</div></div>'
        + '<div class="br-palette">'
        +   token('triangle') + token('arch') + token('beam')
        + '</div>'
        + '<div class="row center mt">'
        +   '<button class="btn teal" id="br-test" disabled>Test the Bridge!</button>'
        + '</div>'
        + '</div>';
      attachDragHandlers();
      updateTestButton();
    }

    function token(kind){
      return '<div class="br-token" data-kind="'+kind+'" id="br-token-'+kind+'">'
        + '<div class="br-shape-box">'+shapeSvg(kind)+'</div>'
        + '<div class="br-shape-label">'+SHAPE_NAME[kind]+'</div>'
        + '</div>';
    }

    function attachDragHandlers(){
      ['triangle','arch','beam'].forEach(function(kind){
        var tok = host.querySelector('#br-token-'+kind);
        if(!tok) return;
        tok.addEventListener('pointerdown', function(e){
          startDrag(kind, e.clientX, e.clientY);
        });
      });
    }

    function startDrag(kind, x, y){
      var clone = document.createElement('div');
      clone.className = 'br-drag-clone';
      clone.innerHTML = '<div class="br-shape-box">'+shapeSvg(kind)+'</div>';
      clone.style.position = 'fixed';
      clone.style.left = (x-50)+'px';
      clone.style.top = (y-40)+'px';
      clone.style.zIndex = 9999;
      clone.style.pointerEvents = 'none';
      document.body.appendChild(clone);

      function findGap(cx,cy){
        var el = document.elementFromPoint(cx,cy);
        return el ? el.closest ? el.closest('.br-gap') : null : null;
      }
      function clearHover(){
        host.querySelectorAll('.br-gap.br-hover').forEach(function(g){ g.classList.remove('br-hover'); });
      }
      function move(ev){
        clone.style.left = (ev.clientX-50)+'px';
        clone.style.top = (ev.clientY-40)+'px';
        clearHover();
        var gapEl = findGap(ev.clientX, ev.clientY);
        if(gapEl && !gapEl.classList.contains('locked')) gapEl.classList.add('br-hover');
      }
      function up(ev){
        document.removeEventListener('pointermove', move);
        document.removeEventListener('pointerup', up);
        clone.remove();
        clearHover();
        var gapEl = findGap(ev.clientX, ev.clientY);
        if(gapEl && gapEl.dataset.idx !== undefined && !gapEl.classList.contains('locked')){
          placeShape(parseInt(gapEl.dataset.idx,10), kind);
        }
      }
      document.addEventListener('pointermove', move);
      document.addEventListener('pointerup', up);
    }

    function placeShape(idx, kind){
      filled[idx] = kind;
      passed[idx] = false;
      var gapEl = host.querySelector('#br-gap-'+idx);
      if(gapEl){
        gapEl.classList.add('filled');
        gapEl.classList.remove('fail');
        gapEl.innerHTML = shapeSvg(kind);
      }
      updateTestButton();
    }

    function updateTestButton(){
      var btn = host.querySelector('#br-test');
      if(!btn) return;
      var ready = filled.every(function(v){ return v !== null; });
      btn.disabled = !ready;
      btn.textContent = firstTestDone ? 'Test Again' : 'Test the Bridge!';
      if(ready) bind('#br-test', runStressTest); else btn.onclick = null;
    }

    function runStressTest(){
      var btn = host.querySelector('#br-test');
      if(btn) btn.disabled = true;
      var bridgeEl = host.querySelector('#br-bridge');
      var truck = document.createElement('div');
      truck.className = 'br-truck';
      truck.id = 'br-truck';
      truck.textContent = '\uD83D\uDE9A';
      truck.style.left = '4px';
      bridgeEl.appendChild(truck);

      var gapEls = [];
      for(var i=0;i<6;i++) gapEls.push(host.querySelector('#br-gap-'+i));
      var deckWidth = host.querySelector('#br-deck').offsetWidth;
      var step = deckWidth / 6;

      var i = 0;
      function nextGap(){
        if(i >= 6){
          finishTest();
          return;
        }
        var idx = i;
        truck.style.left = (idx*step + step/2 - 17) + 'px';
        setTimeout(function(){
          var ok = (filled[idx] === gaps[idx].need);
          passed[idx] = ok;
          var gEl = gapEls[idx];
          if(gEl){
            if(ok){
              gEl.classList.add('holdfirm');
              if(!scored[idx]){ ctx.award({coins:1}); scored[idx] = true; }
              gEl.classList.add('locked','pass');
            } else {
              gEl.classList.add('sag','fail');
            }
          }
          setTimeout(function(){
            if(gEl){ gEl.classList.remove('holdfirm','sag'); }
            i++;
            nextGap();
          }, 500);
        }, 450);
      }
      nextGap();

      function finishTest(){
        setTimeout(function(){
          truck.remove();
          if(!firstTestDone){
            firstTestDone = true;
            firstTestPassCount = passed.filter(Boolean).length;
          }
          renderResults();
        }, 300);
      }
    }

    function renderResults(){
      var allPass = passed.every(Boolean);
      var chips = '';
      for(var i=0;i<6;i++){
        chips += '<div class="br-result-chip '+(passed[i]?'pass':'fail')+'">'+(passed[i] ? '\u2713 Held' : '\u2717 Cracked')+'</div>';
      }
      if(allPass){
        finishAll();
        return;
      }
      var failCount = passed.filter(function(p){return !p;}).length;
      host.innerHTML = STYLE_TAG +
        '<div class="br-wrap"><div class="br-card center">'
        + '<h3 class="h3">'+passed.filter(Boolean).length+' of 6 gaps held!</h3>'
        + '<p class="br-lesson-text">'+failCount+' gap'+(failCount>1?'s':'')+' cracked under the load. Let\'s swap in a better shape and test again.</p>'
        + '<div class="br-results-row">'+chips+'</div>'
        + '<button class="btn teal mt" id="br-fix">Fix the Cracked Gaps</button>'
        + '</div></div>';
      bind('#br-fix', function(){
        renderBuildForFix();
      });
    }

    function renderBuildForFix(){
      host.innerHTML = STYLE_TAG +
        '<div class="br-wrap">'
        + '<div class="br-hint-bar">Drag a new shape onto any cracked gap, then test again.</div>'
        + '<div class="br-bridge" id="br-bridge"><div class="br-water"></div><div class="br-deck" id="br-deck">'+deckMarkup()+'</div></div>'
        + '<div class="br-palette">'
        +   token('triangle') + token('arch') + token('beam')
        + '</div>'
        + '<div class="row center mt">'
        +   '<button class="btn teal" id="br-test">Test Again</button>'
        + '</div>'
        + '</div>';
      for(var i=0;i<6;i++){
        var gEl = host.querySelector('#br-gap-'+i);
        if(gEl && passed[i]) gEl.classList.add('locked','pass');
        if(gEl && !passed[i]) gEl.classList.add('fail');
      }
      attachDragHandlers();
      bind('#br-test', runStressTest);
    }

    function finishAll(){
      var earnedStar = firstTestPassCount === 6;
      var alreadyStar = !!ctx.state.bridgeStarEarned;
      var award = {coins:5};
      if(earnedStar && !alreadyStar){
        award.star = true;
        ctx.state.bridgeStarEarned = true;
      }
      ctx.award(award);
      ctx.confetti();
      host.innerHTML = STYLE_TAG +
        '<div class="br-wrap"><div class="br-card center">'
        + '<img src="'+ctx.clover.cele+'" style="width:100px;" alt="Clover celebrating"/>'
        + '<h2 class="h2">The bridge holds strong!</h2>'
        + '<p class="br-lesson-text">Every gap held up under the big test.</p>'
        + (earnedStar ? '<p class="fb ok center">You earned the Bridge star for a perfect first test!</p>' : '<p class="br-lesson-text">Get all 6 right on your very first test to earn the star next time.</p>')
        + '<div class="row center mt">'
        +   '<button class="btn teal" id="br-again">Build Again</button>'
        +   '<button class="btn ghost" id="br-done">&larr; Map</button>'
        + '</div>'
        + '</div></div>';
      bind('#br-again', function(){
        gaps = shuffle(HINT_SPEC);
        filled = [null,null,null,null,null,null];
        passed = [false,false,false,false,false,false];
        scored = [false,false,false,false,false,false];
        firstTestDone = false;
        firstTestPassCount = 0;
        renderBuild();
      });
      bind('#br-done', function(){ ctx.close(); });
    }

    renderIntro();
  }

  window.Stops.register('2E', { name:'Bridge', start:start });
})();
