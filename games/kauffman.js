(function(){
  // ---------- shared scoped CSS (injected once) ----------
  if(!document.getElementById('kauffman-css')){
    var css = document.createElement('style');
    css.id = 'kauffman-css';
    css.textContent = `
      .kf-wrap{max-width:520px;margin:0 auto;}
      .kf-staffbox{background:#fffefa;border:3px solid #081F2C;border-radius:16px;
        padding:10px 6px 6px;margin:10px 0;box-shadow:0 2px 0 rgba(8,31,44,.08);}
      .kf-staffbox svg{width:100%;height:auto;display:block;}
      .kf-mnem{display:flex;flex-direction:column;gap:6px;margin:10px 0;}
      .kf-mnem-line{border-radius:10px;padding:8px 12px;font-size:14px;font-weight:700;
        display:flex;align-items:center;gap:8px;}
      .kf-mnem-line.lines{background:#eaf6f6;color:#0e5c5a;border:2px solid #62CBC9;}
      .kf-mnem-line.spaces{background:#fff3e0;color:#8a5a12;border:2px solid #ffc24a;}
      .kf-note{cursor:pointer;transition:transform .12s ease;}
      .kf-note:hover{transform:scale(1.06);}
      .kf-progress{font-size:13px;font-weight:700;color:#081F2C;opacity:.7;text-align:center;margin-top:2px;}
      .kf-scorepill{display:inline-block;background:var(--sun,#ffc24a);color:#081F2C;
        border-radius:999px;padding:3px 12px;font-weight:800;font-size:13px;margin-left:6px;}
      @keyframes kf-pop{0%{transform:scale(.8);opacity:0;}100%{transform:scale(1);opacity:1;}}
      .kf-pop{animation:kf-pop .25s ease;}
      .kf-composebar{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-top:10px;}
      .kf-songline{text-align:center;font-size:16px;font-weight:800;color:#081F2C;
        min-height:26px;letter-spacing:2px;margin-top:8px;}
      .kf-hint-warm{text-align:center;font-size:13px;color:#8a5a12;margin-top:4px;}
      .kf-slotcount{text-align:center;font-size:13px;font-weight:700;opacity:.7;margin-top:2px;}
    `;
    document.head.appendChild(css);
  }

  // ---------- music theory data ----------
  // 9 staff positions, bottom to top
  var LETTERS   = ['E','F','G','A','B','C','D','E','F'];
  var IS_LINE   = [true,false,true,false,true,false,true,false,true];
  var YPOS      = [140,130,120,110,100,90,80,70,60];
  var FREQ      = [329.63,349.23,392.00,440.00,493.88,523.25,587.33,659.25,698.46];
  var ALL_LETTERS = ['A','B','C','D','E','F','G'];

  // question order: the 4 spaces (F A C E) first, then 4 lines (E G B D)
  var SPACE_IDX = [1,3,5,7];
  var LINE_IDX  = [0,2,4,6];

  function shuffle(arr){
    var a = arr.slice();
    for(var i=a.length-1;i>0;i--){
      var j = Math.floor(Math.random()*(i+1));
      var t=a[i]; a[i]=a[j]; a[j]=t;
    }
    return a;
  }

  // ---------- tiny audio helper ----------
  var actx = null;
  function playTone(freq){
    try{
      if(!actx) actx = new (window.AudioContext||window.webkitAudioContext)();
      var osc = actx.createOscillator();
      var gain = actx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.0001, actx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.22, actx.currentTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, actx.currentTime + 0.4);
      osc.connect(gain); gain.connect(actx.destination);
      osc.start();
      osc.stop(actx.currentTime + 0.42);
    }catch(e){ /* sound is optional, fail silently */ }
  }

  // ---------- SVG staff drawing ----------
  function staffSVG(innerExtra){
    return '' +
      '<svg viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg">' +
        '<text x="18" y="150" font-size="92" fill="#081F2C" font-family="Georgia, serif">\uD834\uDD1E</text>' +
        [60,80,100,120,140].map(function(y){
          return '<line x1="90" y1="'+y+'" x2="440" y2="'+y+'" stroke="#081F2C" stroke-width="2.5"/>';
        }).join('') +
        (innerExtra||'') +
      '</svg>';
  }

  function noteGroup(idx, opts){
    opts = opts||{};
    var y = YPOS[idx];
    var id = opts.id || 'note';
    var fill = opts.fill || '#CF3339';
    var stemUp = y >= 100; // notes at/below middle line (B) stem up on right
    var noteX = opts.x || 260;
    var stem = '';
    if(opts.stem !== false){
      if(stemUp){
        stem = '<line x1="'+(noteX+8.5)+'" y1="'+y+'" x2="'+(noteX+8.5)+'" y2="'+(y-38)+'" stroke="'+fill+'" stroke-width="2"/>';
      } else {
        stem = '<line x1="'+(noteX-8.5)+'" y1="'+y+'" x2="'+(noteX-8.5)+'" y2="'+(y+38)+'" stroke="'+fill+'" stroke-width="2"/>';
      }
    }
    var ledger = '';
    return '<g id="'+id+'" class="kf-note'+(opts.cls?(' '+opts.cls):'')+'" transform="translate(0,0)">' +
        ledger +
        stem +
        '<ellipse cx="'+noteX+'" cy="'+y+'" rx="10.5" ry="7.5" fill="'+fill+'" transform="rotate(-18 '+noteX+' '+y+')"/>' +
      '</g>';
  }

  function pickChoices(correctLetter){
    var others = shuffle(ALL_LETTERS.filter(function(l){ return l !== correctLetter; })).slice(0,3);
    return shuffle(others.concat([correctLetter]));
  }

  // ---------- main stop ----------
  function start(host, ctx){
    var order = shuffle(SPACE_IDX).concat(shuffle(LINE_IDX)); // 8 questions
    var qIndex = 0;
    var firstTryRight = 0;
    var coinsEarned = 0;
    var triedThisQ = false;
    var composeNotes = [];       // indices (0-8) of notes she's placed, in order
    var composedSongLetters = ''; // finalized letters, shown on results
    var COMPOSE_MAX = 8;
    var COMPOSE_MIN = 3;

    var mnemHTML =
      '<div class="kf-mnem">' +
        '<div class="kf-mnem-line lines">🎵 Lines (bottom→top): <b>E G B D F</b> — Every Good Boy Does Fine!</div>' +
        '<div class="kf-mnem-line spaces">🎵 Spaces (bottom→top): <b>F A C E</b> — spells FACE!</div>' +
      '</div>';

    function renderIntro(){
      var explore = shuffle(LETTERS.map(function(l,i){return i;})); // just for tap order, not used directly
      host.innerHTML =
        '<div class="kf-wrap">' +
          '<p class="sub">Clover wants to play a song on stage, but the notes on the sheet music are a mystery! Can you help Clover learn to read them?</p>' +
          '<div class="kf-staffbox">' + staffSVG(buildIntroNotes()) + '</div>' +
          mnemHTML +
          '<p class="sub" style="text-align:center;">Tap a note above to hear it and see its letter!</p>' +
          '<div class="center mt"><button class="btn green" id="kf-start">Start Reading Music →</button></div>' +
        '</div>';

      // wire tappable rows for exploring (pointerup per SVG rule)
      var svg = host.querySelector('.kf-staffbox svg');
      for(var i=0;i<9;i++){
        (function(i){
          var hit = svg.querySelector('#kf-hit-'+i);
          if(!hit) return;
          hit.addEventListener('pointerup', function(){
            playTone(FREQ[i]);
            var lbl = svg.querySelector('#kf-lbl-'+i);
            svg.querySelectorAll('.kf-explabel').forEach(function(el){ el.style.opacity = 0; });
            if(lbl){ lbl.style.opacity = 1; }
          });
        })(i);
      }

      host.querySelector('#kf-start').addEventListener('click', function(){
        renderQuestion();
      });
    }

    function buildIntroNotes(){
      var out = '';
      for(var i=0;i<9;i++){
        var y = YPOS[i];
        // invisible hit rect over the row
        out += '<rect id="kf-hit-'+i+'" x="90" y="'+(y-10)+'" width="350" height="20" fill="transparent" style="cursor:pointer;"/>';
        // small faint marker so she knows where to tap
        out += '<circle cx="'+(120+i*32)+'" cy="'+y+'" r="4" fill="'+(IS_LINE[i]?'#CF3339':'#62CBC9')+'" opacity="0.55" style="pointer-events:none;"/>';
        out += '<text id="kf-lbl-'+i+'" x="'+(120+i*32)+'" y="'+(y-12)+'" text-anchor="middle" font-size="14" font-weight="800" fill="#081F2C" opacity="0" style="pointer-events:none; transition:opacity .15s;">'+LETTERS[i]+'</text>';
      }
      return out;
    }

    function renderQuestion(){
      if(qIndex >= order.length){ return renderCompose(); }
      triedThisQ = false;
      var idx = order[qIndex];
      var letter = LETTERS[idx];
      var choices = pickChoices(letter);

      host.innerHTML =
        '<div class="kf-wrap">' +
          '<div class="kf-progress">Note ' + (qIndex+1) + ' of ' + order.length + '<span class="kf-scorepill">⭐ ' + firstTryRight + ' / ' + qIndex + '</span></div>' +
          '<h3 class="h3 center">What note is this?</h3>' +
          '<div class="kf-staffbox">' + staffSVG(noteGroup(idx, {id:'kf-q-note'})) + '</div>' +
          '<div class="row center mt" id="kf-choices"></div>' +
          '<div class="fb" id="kf-fb" style="min-height:24px;"></div>' +
          mnemHTML +
        '</div>';

      var choicesWrap = host.querySelector('#kf-choices');
      choices.forEach(function(c){
        var b = document.createElement('button');
        b.className = 'btn q-opt';
        b.textContent = c;
        b.addEventListener('click', function(){ handleAnswer(c, letter, idx, b); });
        choicesWrap.appendChild(b);
      });
    }

    function handleAnswer(chosen, correctLetter, idx, btn){
      var fb = host.querySelector('#kf-fb');
      var allBtns = host.querySelectorAll('#kf-choices .q-opt');

      if(chosen === correctLetter){
        allBtns.forEach(function(b){ b.disabled = true; });
        btn.style.outline = '3px solid var(--green,#3fa86b)';
        fb.className = 'fb ok';
        fb.textContent = '🎉 Yes! That note is ' + correctLetter + '!';
        playTone(FREQ[idx]);
        var coins = triedThisQ ? 1 : 2;
        coinsEarned += coins;
        ctx.award({coins: coins});
        if(!triedThisQ) firstTryRight++;
        ctx.toast && ctx.toast('+' + coins + ' coins!');

        var nextBtn = document.createElement('div');
        nextBtn.className = 'center mt';
        nextBtn.innerHTML = '<button class="btn teal" id="kf-next">Next Note →</button>';
        fb.parentNode.insertBefore(nextBtn, fb.nextSibling);
        host.querySelector('#kf-next').addEventListener('click', function(){
          qIndex++;
          renderQuestion();
        });
      } else {
        triedThisQ = true;
        btn.style.outline = '3px solid var(--red,#CF3339)';
        btn.disabled = true;
        var isLine = IS_LINE[idx];
        fb.className = 'fb no';
        fb.textContent = isLine
          ? '🤔 Not quite. This note sits ON a line — remember, lines spell E G B D F!'
          : '🤔 Not quite. This note sits IN a space — remember, spaces spell F A C E!';
      }
    }

    function composeStaffSVG(){
      var notesMarkup = '';
      composeNotes.forEach(function(posIdx, slot){
        notesMarkup += noteGroup(posIdx, {
          id: 'kf-comp-note-' + slot,
          x: 112 + slot * 38,
          fill: '#62CBC9'
        });
      });
      // hit rects drawn AFTER notes so taps always register, even over an existing note
      var hitMarkup = '';
      for(var i=0;i<9;i++){
        var y = YPOS[i];
        hitMarkup += '<rect id="kf-add-'+i+'" x="90" y="'+(y-10)+'" width="350" height="20" fill="transparent" style="cursor:pointer;"/>';
      }
      return staffSVG(notesMarkup + hitMarkup);
    }

    function playComposedSong(){
      composeNotes.forEach(function(idx, i){
        setTimeout(function(){ playTone(FREQ[idx]); }, i * 550);
      });
    }

    function renderCompose(){
      var lettersLine = composeNotes.map(function(i){ return LETTERS[i]; }).join(' - ');
      var full = composeNotes.length >= COMPOSE_MAX;
      var canContinue = composeNotes.length >= COMPOSE_MIN;

      host.innerHTML =
        '<div class="kf-wrap">' +
          '<p class="sub">Great reading! Now Clover needs a song to play on stage. Tap the staff to add your own notes and write one!</p>' +
          '<div class="kf-staffbox">' + composeStaffSVG() + '</div>' +
          '<div class="kf-songline">' + (lettersLine || '&nbsp;') + '</div>' +
          '<div class="kf-slotcount">' + composeNotes.length + ' / ' + COMPOSE_MAX + ' notes' + (full ? ' — staff is full!' : '') + '</div>' +
          '<div class="kf-composebar">' +
            '<button class="btn teal sm" id="kf-play-song"' + (composeNotes.length ? '' : ' disabled') + '>▶ Play My Song</button>' +
            '<button class="btn ghost sm" id="kf-undo"' + (composeNotes.length ? '' : ' disabled') + '>Undo</button>' +
            '<button class="btn ghost sm" id="kf-clear"' + (composeNotes.length ? '' : ' disabled') + '>Clear</button>' +
          '</div>' +
          (canContinue
            ? '<div class="center mt"><button class="btn green" id="kf-song-done">Finish My Song →</button></div>'
            : '<p class="kf-hint-warm">Add at least ' + COMPOSE_MIN + ' notes to finish your song.</p>') +
        '</div>';

      var svg = host.querySelector('.kf-staffbox svg');
      for(var i=0;i<9;i++){
        (function(i){
          var hit = svg.querySelector('#kf-add-'+i);
          if(!hit) return;
          hit.addEventListener('pointerup', function(){
            if(composeNotes.length >= COMPOSE_MAX) return;
            composeNotes.push(i);
            playTone(FREQ[i]);
            renderCompose();
          });
        })(i);
      }

      var playBtn = host.querySelector('#kf-play-song');
      if(playBtn) playBtn.addEventListener('click', playComposedSong);

      var undoBtn = host.querySelector('#kf-undo');
      if(undoBtn) undoBtn.addEventListener('click', function(){
        composeNotes.pop();
        renderCompose();
      });

      var clearBtn = host.querySelector('#kf-clear');
      if(clearBtn) clearBtn.addEventListener('click', function(){
        composeNotes = [];
        renderCompose();
      });

      var doneBtn = host.querySelector('#kf-song-done');
      if(doneBtn) doneBtn.addEventListener('click', function(){
        composedSongLetters = lettersLine;
        var bonus = 3;
        coinsEarned += bonus;
        ctx.award({coins: bonus});
        ctx.toast && ctx.toast('+' + bonus + ' coins for your song!');
        renderResults();
      });
    }

    function renderResults(){
      var pct = Math.round((firstTryRight / order.length) * 100);
      var earnedStar = pct >= 70;
      var img = earnedStar ? ctx.clover.cele : ctx.clover.head;

      host.innerHTML =
        '<div class="kf-wrap center">' +
          '<img src="' + img + '" alt="Clover" style="width:120px;height:120px;object-fit:contain;" class="kf-pop"/>' +
          '<h2 class="h2">' + (earnedStar ? 'Clover can read music now!' : 'Nice work helping Clover!') + '</h2>' +
          '<p class="sub">You got ' + firstTryRight + ' out of ' + order.length + ' notes right on the first try (' + pct + '%).</p>' +
          '<p class="sub">You earned <b>' + coinsEarned + ' coins</b>' + (earnedStar ? ' and a ⭐ star!' : '.') + '</p>' +
          (composedSongLetters
            ? '<p class="sub">🎼 Your song for Clover: <b>' + composedSongLetters + '</b></p>'
            : '') +
          (earnedStar ? '' : '<p class="sub">Get 70% right on the first try to earn a star. Want to try again?</p>') +
          '<div class="row center mt">' +
            '<button class="btn green" id="kf-again">Play Again</button>' +
            '<button class="btn ghost" id="kf-map">← Map</button>' +
          '</div>' +
        '</div>';

      if(earnedStar){
        ctx.award({star: true});
        ctx.confetti && ctx.confetti();
      }

      host.querySelector('#kf-again').addEventListener('click', function(){
        order = shuffle(SPACE_IDX).concat(shuffle(LINE_IDX));
        qIndex = 0; firstTryRight = 0; coinsEarned = 0;
        composeNotes = []; composedSongLetters = '';
        renderQuestion();
      });
      host.querySelector('#kf-map').addEventListener('click', function(){
        ctx.close();
      });
    }

    renderIntro();
  }

  window.Stops.register('4C', { name:'Kauffman Arts', start });
})();
