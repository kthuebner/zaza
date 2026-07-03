(function(){
  var ENGINE_IMG = "data:image/png;base64,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";

  var ROLES = {
    subject: {label:'Subject',              color:'#62CBC9', text:'#04342C'},
    verb:    {label:'Verb',                 color:'#FAC775', text:'#412402'},
    dobj:    {label:'Direct object',        color:'#F0997B', text:'#4A1B0C'},
    iobj:    {label:'Indirect object',      color:'#AFA9EC', text:'#26215C'},
    prep:    {label:'To/for phrase',        color:'#8FD9A8', text:'#123B1E'}
  };

  var L1_SENTENCES = [
    ['The','dog','runs','fast'],
    ['Clover','kicks','the','ball'],
    ['The','train','stops','here'],
    ['We','ride','the','bus'],
    ['Birds','fly','in','the','sky'],
    ['The','rabbit','hops','home'],
    ['Eliza','reads','a','book'],
    ['The','city','has','tall','buildings'],
    ['The','streetcar','glides','downtown'],
    ['Eliza','waves','at','Clover']
  ];

  var L2_SENTENCES = [
    { chunks:['Clover','kicks','the ball'], tags:['subject','verb','dobj'] },
    { chunks:['The dog','chases','the ball'], tags:['subject','verb','dobj'] },
    { chunks:['Eliza','reads','a story'], tags:['subject','verb','dobj'] },
    { chunks:['The train','carries','riders'], tags:['subject','verb','dobj'] },
    { chunks:['Eliza','gave','Clover','the ball'], tags:['subject','verb','iobj','dobj'] },
    { chunks:['The rabbit','throws','Eliza','a treat'], tags:['subject','verb','iobj','dobj'] },
    { chunks:['The coach','tells','Clover','a plan'], tags:['subject','verb','iobj','dobj'] },
    { chunks:['Clover','gives','Eliza','a high five'], tags:['subject','verb','iobj','dobj'] },
    { chunks:['The little rabbit','passes','Eliza','the ball'], tags:['subject','verb','iobj','dobj'] },
    { chunks:['Clover','kicks','the ball','to Eliza'], tags:['subject','verb','dobj','prep'] }
  ];

  var CSS = ""
    + ".lr-wrap *{box-sizing:border-box;}"
    + ".lr-wrap{font-family:inherit;}"
    + ".lr-top{display:flex;justify-content:flex-end;margin-bottom:6px;}"
    + ".lr-exit{background:none;border:1px solid #9db7c2;color:#0F6E56;padding:6px 12px;border-radius:8px;font-size:13px;cursor:pointer;font-weight:600;}"
    + ".lr-h1{color:#081F2C;font-size:18px;text-align:center;margin:0 0 4px;font-weight:800;}"
    + ".lr-subline{color:#4c6b7a;font-size:13px;text-align:center;margin:0 0 12px;}"
    + ".lr-hero{width:100%;max-width:300px;display:block;margin:0 auto 14px;}"
    + ".lr-levelcard{width:100%;text-align:left;padding:14px 16px;margin-bottom:10px;border-radius:12px;border:2px solid #d8e6ea;background:#f4faf9;cursor:pointer;}"
    + ".lr-levelcard b{display:block;font-size:15px;color:#081F2C;}"
    + ".lr-levelcard span{display:block;font-size:12px;color:#5a7482;margin-top:3px;}"
    + ".lr-dots{display:flex;flex-wrap:wrap;justify-content:center;gap:6px;margin-bottom:12px;}"
    + ".lr-dot{width:14px;height:14px;border-radius:50%;background:#e1ecee;border:2px solid #c7d8dc;}"
    + ".lr-dot.done{background:#62CBC9;border-color:#3aa9a6;}"
    + ".lr-scene{position:relative;width:100%;max-width:480px;margin:0 auto;height:190px;border-radius:14px;overflow:hidden;background:linear-gradient(#bfe3f4,#e8f6ef);margin-bottom:14px;}"
    + ".lr-hill{position:absolute;left:0;right:0;bottom:46px;height:34px;background:#a8d18a;opacity:.6;}"
    + ".lr-track{position:absolute;left:0;right:0;bottom:0;height:46px;background:#cfc9ba;}"
    + ".lr-rail{position:absolute;bottom:26px;left:0;right:0;height:4px;background:#8f8a7c;}"
    + ".lr-train{position:absolute;bottom:22px;left:10px;display:flex;align-items:flex-end;transition:transform 1s cubic-bezier(.4,0,.2,1),opacity 1s ease;}"
    + ".lr-engine{height:84px;width:auto;margin-right:-8px;flex-shrink:0;filter:drop-shadow(0 3px 3px rgba(0,0,0,.25));}"
    + ".lr-car{width:64px;height:52px;background:#1D9E75;border-radius:6px;margin-left:2px;position:relative;flex-shrink:0;transition:background .3s,transform .2s;display:flex;align-items:center;justify-content:center;box-shadow:inset 0 0 0 2px #0F6E56;}"
    + ".lr-car .lr-windowband{position:absolute;top:7px;left:6px;right:6px;height:15px;background:#042C53;border-radius:4px;opacity:.85;}"
    + ".lr-car .lr-word{position:absolute;bottom:3px;left:0;right:0;text-align:center;font-size:10.5px;font-weight:700;color:#fff;padding:0 3px;line-height:1.1;}"
    + ".lr-car.empty{background:rgba(8,31,44,0.08);box-shadow:inset 0 0 0 2px rgba(8,31,44,0.18);}"
    + ".lr-car.empty .lr-windowband{background:rgba(8,31,44,0.12);}"
    + ".lr-car.shake{animation:lr-shake .4s;}"
    + ".lr-wheelrow{position:absolute;bottom:-6px;left:8px;right:8px;display:flex;justify-content:space-between;}"
    + ".lr-wheel{width:9px;height:9px;border-radius:50%;background:#2C2C2A;border:1px solid #666;}"
    + "@keyframes lr-shake{0%,100%{transform:translateX(0);}25%{transform:translateX(-5px);}75%{transform:translateX(5px);}}"
    + ".lr-puff{position:absolute;width:12px;height:12px;border-radius:50%;background:#fff;opacity:0;}"
    + ".lr-puff.go{animation:lr-puffup 1s ease-out forwards;}"
    + "@keyframes lr-puffup{0%{opacity:.7;transform:translateY(0) scale(1);}100%{opacity:0;transform:translateY(-36px) scale(2);}}"
    + ".lr-banner{position:absolute;top:10px;left:0;right:0;text-align:center;font-size:19px;font-weight:800;color:#0F6E56;opacity:0;transform:scale(.4);transition:all .3s cubic-bezier(.2,1.6,.4,1);pointer-events:none;text-shadow:0 1px 0 rgba(255,255,255,.6);}"
    + ".lr-banner.pop{opacity:1;transform:scale(1);}"
    + ".lr-signboard{background:#062736;border:1px solid #1e4a63;border-radius:10px;padding:10px 12px;margin-bottom:14px;text-align:center;color:#fff;font-size:15px;font-weight:600;max-width:480px;margin-left:auto;margin-right:auto;}"
    + ".lr-bank{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-bottom:14px;min-height:40px;max-width:480px;margin-left:auto;margin-right:auto;}"
    + ".lr-chip{padding:10px 14px;background:#fff;color:#081F2C;border:2px solid #c7d8dc;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer;transition:transform .1s,opacity .2s;}"
    + ".lr-chip:active{transform:scale(.95);}"
    + ".lr-chip.used{opacity:0;pointer-events:none;}"
    + ".lr-chip.role.selected{outline:3px solid #081F2C;}"
    + ".lr-chip.role.done{opacity:.4;pointer-events:none;}"
    + ".lr-controls{display:flex;gap:10px;justify-content:center;margin-bottom:8px;flex-wrap:wrap;}"
    + ".lr-ctlbtn{background:none;border:1px solid #9db7c2;color:#0F6E56;padding:9px 16px;border-radius:8px;font-size:13px;cursor:pointer;}"
    + ".lr-ctlbtn.primary{background:#CF3339;border-color:#CF3339;color:#fff;font-weight:700;}"
    + ".lr-feedback{color:#333;text-align:center;font-size:13px;min-height:18px;}"
    + ".lr-legend{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin-bottom:10px;font-size:11px;color:#4c6b7a;max-width:480px;margin-left:auto;margin-right:auto;}"
    + ".lr-legend span{display:flex;align-items:center;gap:5px;}"
    + ".lr-swatch{width:11px;height:11px;border-radius:3px;display:inline-block;}";

  function injectStyles(){
    if(document.getElementById('lr-style')) return;
    var s = document.createElement('style');
    s.id = 'lr-style';
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  function shuffle(arr){
    var a = arr.slice();
    for(var i=a.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)); var t=a[i]; a[i]=a[j]; a[j]=t; }
    return a;
  }

  function start(host, ctx){
    injectStyles();
    var wrap = document.createElement('div');
    wrap.className = 'lr-wrap';
    host.innerHTML = '';
    host.appendChild(wrap);

    function exitBtn(){
      return '<div class="lr-top"><button class="lr-exit" id="lrExit">\u2190 Map</button></div>';
    }
    function wireExit(){
      var b = document.getElementById('lrExit');
      if(b) b.addEventListener('pointerup', function(){ ctx.close(); });
    }

    function renderPicker(){
      wrap.innerHTML =
        exitBtn() +
        '<h1 class="lr-h1">Clover\u2019s Sentence Train</h1>' +
        '<p class="lr-subline">A streetcar just pulled up! Help Clover build sentences before it departs.</p>' +
        '<img class="lr-hero" src="' + ENGINE_IMG + '" alt="A teal light rail streetcar">' +
        '<div class="lr-levelcard" id="lv1"><b>Level 1: Word order</b><span>Tap the words in the right order</span></div>' +
        '<div class="lr-levelcard" id="lv2"><b>Level 2: Parts of a sentence</b><span>Find the subject, verb, and object</span></div>';
      wireExit();
      document.getElementById('lv1').addEventListener('pointerup', startL1);
      document.getElementById('lv2').addEventListener('pointerup', startL2);
    }

    function sceneShell(){
      return '<div class="lr-dots" id="lrDots"></div>' +
        '<div class="lr-scene" id="lrScene"><div class="lr-hill"></div><div class="lr-track"></div><div class="lr-rail"></div>' +
        '<div class="lr-train" id="lrTrain"></div><div class="lr-banner" id="lrBanner"></div></div>';
    }

    function buildTrainDOM(container, chunkCount){
      container.innerHTML = '<img class="lr-engine" src="' + ENGINE_IMG + '" alt="Streetcar engine">';
      for(var i=0;i<chunkCount;i++){
        var car = document.createElement('div');
        car.className = 'lr-car empty';
        car.dataset.idx = i;
        car.innerHTML = '<div class="lr-windowband"></div><div class="lr-word"></div><div class="lr-wheelrow"><div class="lr-wheel"></div><div class="lr-wheel"></div></div>';
        container.appendChild(car);
      }
    }

    function spawnPuffs(){
      var scene = document.getElementById('lrScene');
      if(!scene) return;
      for(var i=0;i<6;i++){
        var p = document.createElement('div');
        p.className = 'lr-puff go';
        p.style.left = (90 + i*9) + 'px';
        p.style.bottom = '70px';
        p.style.animationDelay = (i*0.08) + 's';
        scene.appendChild(p);
        (function(el){ setTimeout(function(){ el.remove(); }, 1200); })(p);
      }
    }

    function renderDots(total, doneCount){
      var dotsEl = document.getElementById('lrDots');
      if(!dotsEl) return;
      dotsEl.innerHTML = '';
      for(var i=0;i<total;i++){
        var d = document.createElement('div');
        d.className = 'lr-dot' + (i<doneCount ? ' done' : '');
        dotsEl.appendChild(d);
      }
    }

    function awardLevelCompletion(wrongCount, totalRounds){
      var mastered = wrongCount <= totalRounds;
      var coins = 5 + (mastered ? 5 : 0);
      var grantStar = mastered && !ctx.state.lightrailStarEarned;
      if(grantStar) ctx.state.lightrailStarEarned = true;
      ctx.award({ coins: coins, star: grantStar });
      if(ctx.confetti) ctx.confetti();
      if(mastered){
        ctx.toast && ctx.toast('All aboard! Great sentence work.');
      } else {
        ctx.toast && ctx.toast('The streetcar made it downtown! Try again for an even smoother ride.');
      }
    }

    function startL1(){
      var round = 0, placed = [], target = [], bankWords = [];
      var order = shuffle(L1_SENTENCES.map(function(_,i){return i;}));
      var wrongCount = 0;

      function renderGame(){
        wrap.innerHTML =
          exitBtn() +
          '<h1 class="lr-h1">Clover\u2019s Sentence Train</h1>' +
          '<p class="lr-subline">Level 1: tap the words in order</p>' +
          sceneShell() +
          '<div class="lr-bank" id="lrBank"></div>' +
          '<div class="lr-controls"><button class="lr-ctlbtn" id="lrClear">Clear</button><button class="lr-ctlbtn primary" id="lrCheck">Check sentence</button><button class="lr-ctlbtn" id="lrBack">Change level</button></div>' +
          '<p class="lr-feedback" id="lrFeedback">&nbsp;</p>';
        wireExit();
        document.getElementById('lrClear').addEventListener('pointerup', function(){ placed=[]; renderTrain(); syncBank(); });
        document.getElementById('lrCheck').addEventListener('pointerup', checkAnswer);
        document.getElementById('lrBack').addEventListener('pointerup', renderPicker);
      }

      function renderTrain(){
        var trainEl = document.getElementById('lrTrain');
        buildTrainDOM(trainEl, target.length);
        var cars = trainEl.querySelectorAll('.lr-car');
        target.forEach(function(w, i){
          if(placed[i]){
            cars[i].classList.remove('empty');
            cars[i].querySelector('.lr-word').textContent = placed[i];
            cars[i].style.background = '#1D9E75';
          }
        });
        trainEl.style.transform = 'translateX(-40px)';
        trainEl.style.opacity = '0';
        setTimeout(function(){ trainEl.style.transform='translateX(0)'; trainEl.style.opacity='1'; }, 30);
      }

      function renderBank(){
        var bankEl = document.getElementById('lrBank');
        bankEl.innerHTML = '';
        bankWords.forEach(function(word, idx){
          var chip = document.createElement('button');
          chip.className = 'lr-chip';
          chip.textContent = word;
          chip.dataset.idx = idx;
          chip.addEventListener('pointerup', function(){ pick(idx); });
          bankEl.appendChild(chip);
        });
        syncBank();
      }

      function syncBank(){
        var used = placed.slice();
        Array.prototype.forEach.call(document.getElementById('lrBank').children, function(chip){
          var word = chip.textContent;
          var pos = used.indexOf(word);
          if(pos !== -1){ chip.classList.add('used'); used.splice(pos,1); }
          else { chip.classList.remove('used'); }
        });
      }

      function pick(idx){
        if(placed.length >= target.length) return;
        var word = bankWords[idx];
        var used = placed.filter(function(w){return w===word;}).length;
        var total = bankWords.filter(function(w){return w===word;}).length;
        if(used >= total) return;
        placed.push(word);
        renderTrain();
        syncBank();
      }

      function checkAnswer(){
        var feedbackEl = document.getElementById('lrFeedback');
        if(placed.length < target.length){ feedbackEl.textContent = 'Add all the words first.'; return; }
        var correct = placed.every(function(w,i){ return w===target[i]; });
        if(correct){
          document.getElementById('lrBanner').classList.add('pop');
          document.getElementById('lrBanner').textContent = 'All aboard!';
          feedbackEl.textContent = 'Great sentence!';
          spawnPuffs();
          ctx.award({ coins: 1 });
          var trainEl = document.getElementById('lrTrain');
          trainEl.style.transform = 'translateX(360px)';
          trainEl.style.opacity = '0';
          round++;
          setTimeout(function(){
            if(round >= order.length){ awardLevelCompletion(wrongCount, order.length); renderPicker(); } else { nextRound(); }
          }, 1000);
        } else {
          wrongCount++;
          feedbackEl.textContent = 'Not quite. Try rearranging.';
          Array.prototype.forEach.call(document.querySelectorAll('#lrTrain .lr-car'), function(c){
            c.classList.add('shake'); setTimeout(function(){ c.classList.remove('shake'); }, 400);
          });
        }
      }

      function nextRound(){
        placed = [];
        target = L1_SENTENCES[order[round]];
        bankWords = shuffle(target);
        renderGame();
        renderDots(order.length, round);
        renderBank();
        renderTrain();
      }

      nextRound();
    }

    function startL2(){
      var round = 0, sentence = null, assigned = {}, selectedRole = null;
      var order = shuffle(L2_SENTENCES.map(function(_,i){return i;}));
      var wrongCount = 0;

      function legendHTML(tags){
        return '<div class="lr-legend">' + tags.map(function(t){
          var r = ROLES[t];
          return '<span><span class="lr-swatch" style="background:'+r.color+'"></span>'+r.label+'</span>';
        }).join('') + '</div>';
      }

      function renderGame(){
        wrap.innerHTML =
          exitBtn() +
          '<h1 class="lr-h1">Clover\u2019s Sentence Train</h1>' +
          '<p class="lr-subline">Level 2: tap a label, then tap its word</p>' +
          sceneShell() +
          '<div class="lr-signboard" id="lrSign"></div>' +
          '<div class="lr-bank" id="lrRoles"></div>' +
          '<div class="lr-controls"><button class="lr-ctlbtn" id="lrBack">Change level</button></div>' +
          '<p class="lr-feedback" id="lrFeedback">&nbsp;</p>';
        wireExit();
        document.getElementById('lrBack').addEventListener('pointerup', renderPicker);
      }

      function renderTrain(){
        var trainEl = document.getElementById('lrTrain');
        buildTrainDOM(trainEl, sentence.chunks.length);
        var cars = trainEl.querySelectorAll('.lr-car');
        sentence.chunks.forEach(function(word, i){
          cars[i].classList.remove('empty');
          cars[i].querySelector('.lr-word').textContent = word;
          cars[i].style.background = '#1D9E75';
          cars[i].addEventListener('pointerup', function(){ tryAssign(i); });
          var tag = sentence.tags[i];
          if(assigned[tag]){
            cars[i].style.background = ROLES[tag].color;
            cars[i].querySelector('.lr-word').style.color = ROLES[tag].text;
          }
        });
        trainEl.style.transform = 'translateX(-40px)';
        trainEl.style.opacity = '0';
        setTimeout(function(){ trainEl.style.transform='translateX(0)'; trainEl.style.opacity='1'; }, 30);
      }

      function renderRoles(){
        var rolesEl = document.getElementById('lrRoles');
        rolesEl.innerHTML = '';
        var uniqueTags = sentence.tags.filter(function(t,i){ return sentence.tags.indexOf(t)===i; });
        uniqueTags.forEach(function(tag){
          var r = ROLES[tag];
          var chip = document.createElement('button');
          chip.className = 'lr-chip role' + (assigned[tag] ? ' done' : '') + (selectedRole===tag ? ' selected' : '');
          chip.style.background = r.color;
          chip.style.color = r.text;
          chip.style.borderColor = r.color;
          chip.textContent = r.label;
          chip.dataset.tag = tag;
          chip.addEventListener('pointerup', function(){
            if(assigned[tag]) return;
            selectedRole = tag;
            renderRoles();
            document.getElementById('lrFeedback').textContent = 'Now tap the word that is the ' + r.label.toLowerCase() + '.';
          });
          rolesEl.appendChild(chip);
        });
      }

      function tryAssign(carIdx){
        if(!selectedRole){
          document.getElementById('lrFeedback').textContent = 'Pick a label first.';
          return;
        }
        var actualTag = sentence.tags[carIdx];
        var feedbackEl = document.getElementById('lrFeedback');
        if(actualTag === selectedRole && !assigned[selectedRole]){
          assigned[selectedRole] = true;
          selectedRole = null;
          renderTrain();
          renderRoles();
          feedbackEl.textContent = 'Yes! Keep going.';
          var allTags = sentence.tags.filter(function(t,i){ return sentence.tags.indexOf(t)===i; });
          var allDone = allTags.every(function(t){ return assigned[t]; });
          if(allDone){
            document.getElementById('lrBanner').classList.add('pop');
            document.getElementById('lrBanner').textContent = 'All aboard!';
            feedbackEl.textContent = 'Sentence fully labeled!';
            spawnPuffs();
            ctx.award({ coins: 1 });
            var trainEl = document.getElementById('lrTrain');
            trainEl.style.transform = 'translateX(360px)';
            trainEl.style.opacity = '0';
            round++;
            setTimeout(function(){
              if(round >= order.length){ awardLevelCompletion(wrongCount, order.length); renderPicker(); } else { nextRound(); }
            }, 1100);
          }
        } else {
          wrongCount++;
          feedbackEl.textContent = 'Not quite. Try another word.';
          var car = document.querySelectorAll('#lrTrain .lr-car')[carIdx];
          car.classList.add('shake');
          setTimeout(function(){ car.classList.remove('shake'); }, 400);
        }
      }

      function nextRound(){
        sentence = L2_SENTENCES[order[round]];
        assigned = {};
        selectedRole = null;
        renderGame();
        renderDots(order.length, round);
        var uniqueTags = sentence.tags.filter(function(t,i){return sentence.tags.indexOf(t)===i;});
        document.getElementById('lrSign').innerHTML = sentence.chunks.join(' ') + '.' + legendHTML(uniqueTags);
        renderTrain();
        renderRoles();
      }

      nextRound();
    }

    renderPicker();
  }

  window.Stops.register('6C', { name:'Light Rail', start });
})();
