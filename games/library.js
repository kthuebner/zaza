/* ===========================================================
   Plaza Library  (map cell 7C)  —  fables + comprehension
   Edit this file freely; it won't affect any other stop.
   Earns: 2 coins per correct answer, ⭐ for 3+/4 on a story.
   =========================================================== */
(function(){
  const FABLES=[
    { id:'tortoise', emoji:'🐢', title:'The Tortoise and the Hare',
      passage:[
        "One sunny day, a fast hare laughed at a slow tortoise. \u201cYou are so slow!\u201d he said.",
        "\u201cLet\u2019s race, then,\u201d said the tortoise calmly. The hare zoomed far ahead, then thought, \u201cI have time for a nap,\u201d and curled up under a tree.",
        "The tortoise kept walking. Step, step, step. He never stopped. He passed the sleeping hare and kept going.",
        "When the hare woke up, he ran as fast as he could \u2014 but it was too late. The tortoise had already crossed the finish line.",
      ],
      moral:"Slow and steady wins the race.",
      questions:[
        {q:"Why did the hare stop for a nap?",options:["He was hurt","He thought he was too far ahead to lose","It was nighttime"],answer:1,why:"He was so sure he\u2019d win that he got lazy."},
        {q:"How did the tortoise win?",options:["He took a shortcut","He kept going and never stopped","He flew"],answer:1,why:"Slow but steady \u2014 he never quit."},
        {q:"What does \u201cslow\u201d mean?",options:["Not fast","Very loud","Bright"],answer:0,why:"Slow is the opposite of fast."},
        {q:"What is the lesson?",options:["Naps are good","Slow and steady wins the race","Never race"],answer:1,why:"Keeping at it beats rushing and getting lazy."},
      ]},
    { id:'lionmouse', emoji:'🦁', title:'The Lion and the Mouse',
      passage:[
        "A great lion was sleeping when a tiny mouse ran across his nose. The lion trapped the mouse under his paw.",
        "\u201cPlease let me go! Someday I might help you,\u201d squeaked the mouse. The lion laughed \u2014 but he let her go.",
        "A few days later, the lion got caught in a hunter\u2019s rope net. He roared and pulled, but could not get free.",
        "The little mouse heard him and nibbled the ropes with her sharp teeth until the lion was free. \u201cEven a small friend can help,\u201d he said.",
      ],
      moral:"Even the smallest friend can be a big help.",
      questions:[
        {q:"What did the mouse promise?",options:["To bring food","That she might help one day","To stay away"],answer:1,why:"She promised to help, and she kept her word."},
        {q:"How did the mouse free the lion?",options:["She roared","She chewed the ropes","She dug a hole"],answer:1,why:"Her sharp teeth nibbled the ropes apart."},
        {q:"What caught the lion?",options:["A net","A box","A wall"],answer:0,why:"He was caught in a hunter\u2019s net."},
        {q:"What is the lesson?",options:["Lions are scary","Even a small friend can help","Never nap"],answer:1,why:"The tiny mouse saved the mighty lion."},
      ]},
    { id:'crow', emoji:'🐦', title:'The Crow and the Pitcher',
      passage:[
        "A thirsty crow found a tall pitcher with a little water at the very bottom.",
        "She put her beak in, but the water was too low to reach, no matter how she stretched.",
        "She did not give up. She saw small pebbles nearby and had an idea.",
        "One by one she dropped pebbles in. With each one, the water rose higher \u2014 until she could drink. Clever thinking solved her problem!",
      ],
      moral:"A clever idea can solve a hard problem.",
      questions:[
        {q:"What was the crow\u2019s problem?",options:["She was lost","She couldn\u2019t reach the water","She was cold"],answer:1,why:"The water was too low for her beak."},
        {q:"What did she drop in?",options:["Pebbles","Leaves","Bread"],answer:0,why:"She dropped pebbles in, one by one."},
        {q:"Why did the water rise?",options:["It rained","The pebbles pushed it up","She blew on it"],answer:1,why:"Pebbles take up space, lifting the water."},
        {q:"What is the lesson?",options:["Crows can\u2019t fly","Thinking carefully solves problems","Water is heavy"],answer:1,why:"A smart idea beat giving up."},
      ]},
  ];

  function start(host, ctx){
    let cur=null, idx=0, correct=0;
    list();

    function list(){
      host.innerHTML='<h2>📖 Plaza Library</h2><p class="sub">Read a fable with Clover, then answer her questions.</p>'+
        '<div class="story-grid">'+FABLES.map(f=>{
          const done=ctx.state.storiesDone&&ctx.state.storiesDone[f.id];
          return '<button class="story-pick" data-id="'+f.id+'">'+(done?'<div style="position:absolute">⭐</div>':'')+
                 '<div class="emo">'+f.emoji+'</div><b>'+f.title+'</b></button>';
        }).join('')+'</div>';
      host.querySelectorAll('.story-pick').forEach(b=> b.onclick=()=>open(b.dataset.id));
    }
    function open(id){ cur=FABLES.find(f=>f.id===id); idx=0; correct=0;
      host.innerHTML='<h2>'+cur.emoji+' '+cur.title+'</h2>'+
        '<div class="passage">'+cur.passage.map(p=>'<p>'+p+'</p>').join('')+
        '<p style="font-style:italic;color:var(--green-deep);font-weight:800">Lesson: '+cur.moral+'</p></div>'+
        '<div class="row mt"><button class="btn green" id="goQ">I\u2019m ready \u2014 ask me!</button>'+
        '<button class="btn ghost" id="back">Back</button></div>';
      host.querySelector('#goQ').onclick=question; host.querySelector('#back').onclick=list;
    }
    function question(){ const q=cur.questions[idx];
      host.innerHTML='<p style="font-weight:800;color:var(--ink-soft)">Question '+(idx+1)+' of '+cur.questions.length+'</p>'+
        '<h3 style="font-size:20px">'+q.q+'</h3><div id="opts"></div><div class="fb" id="fb">&nbsp;</div><div id="nextWrap"></div>';
      const opts=host.querySelector('#opts');
      q.options.forEach((o,i)=>{ const b=document.createElement('button'); b.className='q-opt'; b.textContent=o; b.onclick=()=>answer(i,b); opts.appendChild(b); });
    }
    function answer(i,btn){ const q=cur.questions[idx];
      host.querySelectorAll('.q-opt').forEach((b,bi)=>{ b.disabled=true;
        if(bi===q.answer){ b.style.borderColor='var(--green)'; b.style.background='#eafaf0'; }
        else if(bi===i){ b.style.borderColor='var(--red)'; b.style.background='#fff0ee'; } });
      const fb=host.querySelector('#fb');
      if(i===q.answer){ correct++; fb.textContent='Yes! '+q.why; fb.className='fb ok'; }
      else{ fb.textContent='The green one is right. '+q.why; fb.className='fb no'; }
      const nb=document.createElement('button'); nb.className='btn green'; nb.textContent= idx<cur.questions.length-1?'Next':'See how I did!';
      nb.onclick=()=>{ idx++; if(idx<cur.questions.length) question(); else done(); };
      host.querySelector('#nextWrap').appendChild(nb);
    }
    function done(){ const total=cur.questions.length, star=correct>=3;
      ctx.state.storiesDone=ctx.state.storiesDone||{}; ctx.state.storiesDone[cur.id]=true;
      ctx.award({coins:correct*2, star});
      host.innerHTML='<div class="center">'+(star?'<img src="'+ctx.clover.cele+'" style="height:130px" alt="">':'<div style="font-size:50px">📚</div>')+
        '<h2>'+(star?'Star earned!':'Nice reading!')+'</h2>'+
        '<p class="sub">You got '+correct+' of '+total+' right and earned '+(correct*2)+' coins.'+(star?'':' Get 3+ to earn the \u2B50.')+'</p>'+
        '<div class="row" style="justify-content:center"><button class="btn green" id="more">More stories</button>'+
        '<button class="btn ghost" id="leave">Done</button></div></div>';
      host.querySelector('#more').onclick=list; host.querySelector('#leave').onclick=ctx.close;
    }
  }

  window.Stops.register('7C', { name:'Plaza Library', start });
})();
