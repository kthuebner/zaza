/* Soccer Fields (7F) — penalty-shootout math. Tier-1 easy. ⭐ for 5+ goals. */
(function(){
  function run(host,ctx,cfg){
    let score=0,cur=null,endT=0,tick=null;
    intro();
    function intro(){host.innerHTML='<div class="center"><h2>'+cfg.title+'</h2><p class="sub">'+cfg.intro+'</p><button class="btn green" id="go">Start!</button></div>';host.querySelector('#go').onclick=play;}
    function play(){score=0;endT=Date.now()+cfg.secs*1000;
      host.innerHTML='<div class="center"><div class="timer" id="t"></div><div style="font-weight:800;color:var(--ink-soft)">Goals: <span id="sc">0</span></div><div class="bigproblem" id="pr"></div><input class="answer-input" id="in" inputmode="numeric" autocomplete="off" placeholder="?"><div class="fb" id="fb">&nbsp;</div><div style="font-size:12px;font-weight:700;color:var(--ink-soft)">Type the answer and press Enter</div></div>';
      const inp=host.querySelector('#in');
      function next(){cur=ctx.math.gen(cfg.op,cfg.lvl);host.querySelector('#pr').textContent=cur.q+' =';inp.value='';inp.focus();}
      function submit(){if(inp.value.trim()==='')return;const fb=host.querySelector('#fb');if(parseInt(inp.value,10)===cur.a){score++;host.querySelector('#sc').textContent=score;fb.textContent='GOAL! ⚽';fb.className='fb ok';}else{fb.textContent='Saved! '+cur.q+' = '+cur.a;fb.className='fb no';}next();}
      inp.addEventListener('keydown',e=>{if(e.key==='Enter')submit();});
      next();clearInterval(tick);tick=setInterval(()=>{const left=Math.max(0,Math.round((endT-Date.now())/1000));host.querySelector('#t').textContent='⏱ '+left+'s';if(left<=0){clearInterval(tick);end();}},200);}
    function end(){const star=score>=cfg.goal;ctx.award({coins:score,star});
      host.innerHTML='<div class="center">'+(star?'<img src="'+ctx.clover.cele+'" style="height:130px" alt="">':'<div style="font-size:54px">⚽</div>')+'<h2>'+(star?'Star earned!':'Nice shooting!')+'</h2><p class="sub">You scored '+score+' goal'+(score===1?'':'s')+' and earned '+score+' coins.'+(star?'':' Score '+cfg.goal+'+ to earn the \u2B50.')+'</p><div class="row" style="justify-content:center"><button class="btn green" id="ag">Play again</button><button class="btn ghost" id="dn">← Map</button></div></div>';
      host.querySelector('#ag').onclick=play;host.querySelector('#dn').onclick=ctx.close;}
  }
  window.Stops.register('7F',{name:'Soccer Fields',start(h,c){run(h,c,{title:'⚽ Penalty Shootout',intro:'Help Clover score! Each correct answer is a shot on goal.',op:'mixed',lvl:0,secs:60,goal:5});}});
})();
