/* Border Star (8C) — Ms. Ruiz's timed math challenge. ⭐ for 6+. */
(function(){
  function run(host,ctx,cfg){
    let score=0,cur=null,endT=0,tick=null;
    intro();
    function intro(){host.innerHTML='<div class="center"><h2>'+cfg.title+'</h2><p class="sub">'+cfg.intro+'</p><button class="btn green" id="go">Start!</button></div>';host.querySelector('#go').onclick=play;}
    function play(){score=0;endT=Date.now()+cfg.secs*1000;
      host.innerHTML='<div class="center"><div class="timer" id="t"></div><div style="font-weight:800;color:var(--ink-soft)">Correct: <span id="sc">0</span></div><div class="bigproblem" id="pr"></div><input class="answer-input" id="in" inputmode="numeric" autocomplete="off" placeholder="?"><div class="fb" id="fb">&nbsp;</div><div style="font-size:12px;font-weight:700;color:var(--ink-soft)">Type the answer and press Enter</div></div>';
      const inp=host.querySelector('#in');
      function next(){cur=ctx.math.gen(cfg.op,cfg.lvl);host.querySelector('#pr').textContent=cur.q+' =';inp.value='';inp.focus();}
      function submit(){if(inp.value.trim()==='')return;const fb=host.querySelector('#fb');if(parseInt(inp.value,10)===cur.a){score++;host.querySelector('#sc').textContent=score;fb.textContent='Correct! ✏️';fb.className='fb ok';}else{fb.textContent='Almost! '+cur.q+' = '+cur.a;fb.className='fb no';}next();}
      inp.addEventListener('keydown',e=>{if(e.key==='Enter')submit();});
      next();clearInterval(tick);tick=setInterval(()=>{const left=Math.max(0,Math.round((endT-Date.now())/1000));host.querySelector('#t').textContent='⏱ '+left+'s';if(left<=0){clearInterval(tick);end();}},200);}
    function end(){const star=score>=cfg.goal;ctx.award({coins:score,star});
      host.innerHTML='<div class="center">'+(star?'<img src="'+ctx.clover.cele+'" style="height:130px" alt="">':'<div style="font-size:54px">✏️</div>')+'<h2>'+(star?'Star earned!':'Great work!')+'</h2><p class="sub">Ms. Ruiz counts '+score+' correct \u2014 you earned '+score+' coins.'+(star?'':' Get '+cfg.goal+'+ to earn the \u2B50.')+'</p><div class="row" style="justify-content:center"><button class="btn green" id="ag">Play again</button><button class="btn ghost" id="dn">← Map</button></div></div>';
      host.querySelector('#ag').onclick=play;host.querySelector('#dn').onclick=ctx.close;}
  }
  window.Stops.register('8C',{name:'Border Star',start(h,c){run(h,c,{title:'✏️ Ms. Ruiz\u2019s Math Challenge',intro:'Beat the clock like you do in class! Add and subtract as many as you can.',op:'mixed',lvl:1,secs:90,goal:6});}});
})();
