(function(){

  var CSS = ""
  + ".br-wrap{max-width:640px;margin:0 auto;font-family:inherit;}"
  + ".br-card{background:#fff;border-radius:18px;padding:20px;box-shadow:0 2px 10px rgba(8,31,44,0.08);}"
  + ".br-lesson-text{font-size:15px;line-height:1.5;color:#081F2C;text-align:center;margin-top:6px;}"
  + ".br-hud{display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;gap:10px;}"
  + ".br-hearts{font-size:22px;letter-spacing:2px;}"
  + ".br-progress-outer{flex:1;height:14px;background:#e2ece9;border-radius:8px;overflow:hidden;margin:0 10px;}"
  + ".br-progress-inner{height:100%;width:0%;background:linear-gradient(90deg,#62CBC9,#3f9b57);transition:width .1s linear;}"
  + ".br-score{font-size:13px;font-weight:700;color:#081F2C;white-space:nowrap;}"
  + ".br-track{position:relative;height:200px;border-radius:14px;overflow:hidden;background:linear-gradient(#bfe3ea,#e7f4ee);}"
  + ".br-ground{position:absolute;left:0;right:0;bottom:0;height:36px;background:#a9763f;border-top:4px solid #7a5a30;}"
  + ".br-clover{position:absolute;left:60px;bottom:36px;width:54px;transition:none;}"
  + ".br-obstacle{position:absolute;bottom:36px;display:flex;align-items:flex-end;justify-content:center;}"
  + ".br-obstacle.hit{filter:grayscale(0.4);}"
  + ".br-msg{text-align:center;font-size:14px;font-weight:700;color:#3a4533;margin-top:12px;}"
  + ".br-final-hearts{font-size:30px;margin:8px 0;letter-spacing:4px;}"
  ;

  var STYLE_TAG_PLACEHOLDER = '<style>'+CSS+'</style>';

  var GROUND_HEIGHT = 36;
  var CLOVER_LEFT = 60;
  var CLOVER_WIDTH = 50;
  var JUMP_HEIGHT = 72;
  var JUMP_DURATION = 550;
  var BASE_SPEED = 230;
  var ACCEL = 7;
  var MAX_SPEED = 380;
  var FINISH_DISTANCE = 4400;

  function start(host, ctx){
    var STYLE_TAG = STYLE_TAG_PLACEHOLDER;
    var trackEl, cloverEl, heartsEl, progressEl, scoreEl, msgEl, trackWidth;
    var state = 'ready';
    var hearts = 3;
    var obstacles = [];
    var elapsed = 0, distance = 0, score = 0;
    var isJumping = false, jumpStart = 0, cloverY = 0;
    var invincibleUntil = 0;
    var lastTs = null, nextSpawnAt = null;
    var destroyed = false;

    function bind(sel, fn){
      var els = host.querySelectorAll(sel);
      for(var i=0;i<els.length;i++){ els[i].addEventListener('pointerup', fn); }
    }

    function renderHearts(){
      var s = '';
      for(var i=0;i<3;i++){ s += (i < hearts ? '\u2764\uFE0F' : '\uD83E\uDD0D'); }
      if(heartsEl) heartsEl.innerHTML = s;
    }

    function setupTrack(){
      host.innerHTML = STYLE_TAG
        + '<div class="br-wrap">'
        + '<div class="br-hud"><div class="br-hearts" id="br-hearts"></div>'
        +   '<div class="br-progress-outer"><div class="br-progress-inner" id="br-progress"></div></div>'
        +   '<div class="br-score" id="br-score">Cleared: 0</div></div>'
        + '<div class="br-track" id="br-track"><div class="br-ground"></div>'
        +   '<img class="br-clover" id="br-clover" src="'+ctx.clover.run+'" alt="Clover"/></div>'
        + '<div class="br-msg" id="br-msg">Press SPACE to start. Then press SPACE to jump over the rocks and crates!</div>'
        + '</div>';
      trackEl = host.querySelector('#br-track');
      cloverEl = host.querySelector('#br-clover');
      heartsEl = host.querySelector('#br-hearts');
      progressEl = host.querySelector('#br-progress');
      scoreEl = host.querySelector('#br-score');
      msgEl = host.querySelector('#br-msg');
      trackWidth = trackEl.getBoundingClientRect().width;
      renderHearts();
    }

    function resetState(){
      hearts = 3;
      obstacles = [];
      elapsed = 0; distance = 0; score = 0;
      isJumping = false; cloverY = 0;
      invincibleUntil = 0;
      lastTs = null; nextSpawnAt = null;
      state = 'ready';
    }

    function beginRun(){
      state = 'playing';
      if(msgEl) msgEl.textContent = 'Jump with SPACE!';
      nextSpawnAt = null;
    }

    function tryJump(){
      if(!isJumping){ isJumping = true; jumpStart = performance.now(); }
    }

    function onKeyDown(e){
      if(destroyed) return;
      if(e.code !== 'Space' && e.key !== ' ') return;
      e.preventDefault();
      if(state === 'ready') beginRun();
      else if(state === 'playing') tryJump();
    }

    function randInterval(elapsedSec){
      var minI = Math.max(1000, 1900 - elapsedSec*18);
      var maxI = Math.max(1400, 2400 - elapsedSec*18);
      return Math.random()*(maxI-minI) + minI;
    }

    function spawnObstacle(){
      var isRock = Math.random() < 0.5;
      var w = isRock ? 42 : 46;
      var h = isRock ? 34 : 46;
      var el = document.createElement('div');
      el.className = 'br-obstacle';
      el.style.width = w+'px';
      el.style.height = h+'px';
      el.style.fontSize = Math.round(h*0.85)+'px';
      el.textContent = isRock ? '\uD83E\uDEA8' : '\uD83D\uDCE6';
      trackEl.appendChild(el);
      var o = { x: trackWidth+20, width:w, height:h, el:el, hit:false, cleared:false };
      o.el.style.left = o.x+'px';
      obstacles.push(o);
    }

    function moveObstacles(speed, dt, ts){
      for(var i=obstacles.length-1;i>=0;i--){
        var o = obstacles[i];
        o.x -= speed*dt;
        o.el.style.left = o.x+'px';
        var overlapH = (o.x < CLOVER_LEFT+CLOVER_WIDTH) && (o.x+o.width > CLOVER_LEFT);
        if(overlapH && !o.hit && ts >= invincibleUntil){
          if(cloverY < o.height*0.55){
            o.hit = true;
            hearts = Math.max(0, hearts-1);
            renderHearts();
            invincibleUntil = ts + 800;
            o.el.classList.add('hit');
          }
        }
        if(!o.cleared && !o.hit && (o.x+o.width) < CLOVER_LEFT){
          o.cleared = true;
          score++;
          if(scoreEl) scoreEl.textContent = 'Cleared: '+score;
          ctx.award({coins:1});
        }
        if(o.x < -80){ o.el.remove(); obstacles.splice(i,1); }
      }
    }

    function updateClover(ts){
      if(isJumping){
        var ej = ts - jumpStart;
        if(ej >= JUMP_DURATION){ isJumping = false; cloverY = 0; }
        else cloverY = JUMP_HEIGHT * Math.sin(Math.PI * ej / JUMP_DURATION);
      } else {
        cloverY = 0;
      }
      if(cloverEl) cloverEl.style.transform = 'translateY(-'+cloverY+'px)';
    }

    function updateProgress(){
      var pct = Math.min(100, (distance/FINISH_DISTANCE)*100);
      if(progressEl) progressEl.style.width = pct+'%';
    }

    function loop(ts){
      if(destroyed) return;
      if(lastTs === null) lastTs = ts;
      var dt = Math.min((ts-lastTs)/1000, 0.05);
      lastTs = ts;

      if(state === 'playing'){
        elapsed += dt;
        var speed = Math.min(BASE_SPEED + ACCEL*elapsed, MAX_SPEED);
        distance += speed*dt;
        updateProgress();
        if(nextSpawnAt === null) nextSpawnAt = ts + 1500;
        if(ts >= nextSpawnAt){ spawnObstacle(); nextSpawnAt = ts + randInterval(elapsed); }
        moveObstacles(speed, dt, ts);
        updateClover(ts);
        if(hearts <= 0){ triggerGameOver(); }
        else if(distance >= FINISH_DISTANCE){ triggerWin(); }
      }
      if(!destroyed) requestAnimationFrame(loop);
    }

    function triggerGameOver(){
      state = 'over';
      host.innerHTML = STYLE_TAG
        + '<div class="br-wrap"><div class="br-card center">'
        + '<img src="'+ctx.clover.sad+'" style="width:90px;" alt="Clover"/>'
        + '<h3 class="h3">Clover took a tumble!</h3>'
        + '<p class="br-lesson-text">She cleared '+score+' obstacle'+(score===1?'':'s')+' before she needed a rest. Want to try again?</p>'
        + '<div class="row center mt">'
        +   '<button class="btn teal" id="br-retry">Try Again</button>'
        +   '<button class="btn ghost" id="br-done">&larr; Map</button>'
        + '</div>'
        + '</div></div>';
      bind('#br-retry', function(){ resetState(); setupTrack(); });
      bind('#br-done', function(){ cleanup(); ctx.close(); });
    }

    function triggerWin(){
      state = 'win';
      var earnedStar = hearts === 3;
      var alreadyStar = !!ctx.state.bridgeStarEarned;
      var award = { coins:5 };
      if(earnedStar && !alreadyStar){
        award.star = true;
        ctx.state.bridgeStarEarned = true;
      }
      ctx.award(award);
      ctx.confetti();
      var heartDisplay = '';
      for(var i=0;i<3;i++){ heartDisplay += (i < hearts ? '\u2764\uFE0F' : '\uD83E\uDD0D'); }
      host.innerHTML = STYLE_TAG
        + '<div class="br-wrap"><div class="br-card center">'
        + '<img src="'+ctx.clover.cele+'" style="width:100px;" alt="Clover celebrating"/>'
        + '<h2 class="h2">Clover made it across the bridge!</h2>'
        + '<p class="br-lesson-text">She cleared '+score+' obstacle'+(score===1?'':'s')+' along the way.</p>'
        + '<div class="br-final-hearts">'+heartDisplay+'</div>'
        + (earnedStar ? '<p class="fb ok center">Perfect crossing! You earned the Bridge star!</p>' : '<p class="br-lesson-text">Cross with all 3 hearts still glowing to earn the star.</p>')
        + '<div class="row center mt">'
        +   '<button class="btn teal" id="br-again">Run Again</button>'
        +   '<button class="btn ghost" id="br-done">&larr; Map</button>'
        + '</div>'
        + '</div></div>';
      bind('#br-again', function(){ resetState(); setupTrack(); });
      bind('#br-done', function(){ cleanup(); ctx.close(); });
    }

    function cleanup(){
      destroyed = true;
      document.removeEventListener('keydown', onKeyDown);
    }

    document.addEventListener('keydown', onKeyDown);
    resetState();
    setupTrack();
    requestAnimationFrame(loop);
  }

  window.Stops.register('2E', { name:'Bridge', start:start });
})();
