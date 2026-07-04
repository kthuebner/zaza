(function(){
  const FABLES = [
    { id:'worse', title:"It Could Always Be Worse", emoji:'\u{1F410}', culture:'Yiddish folktale',
      passage:[
        "A man named Rueben lived in one tiny room with his wife, six children, a goose, and a goat. The room was so crowded that nobody could take a single step without bumping into someone.",
        "Rueben could not sleep. He could not think. He ran to the wise old Rabbi in town. \u201cHelp me!\u201d he cried. \u201cMy house is too small and too loud. I cannot bear it any longer!\u201d",
        "The Rabbi stroked his beard and asked a strange question. \u201cDo you have chickens?\u201d \u201cYes,\u201d said Rueben, confused. \u201cBring them inside,\u201d said the Rabbi. The idea seemed <span class='lib-vocab'>absurd</span>, but Rueben obeyed.",
        "Each day the Rabbi told him to bring in another animal, a cow, then a dog, until the tiny room was bursting with creatures. Rueben was certain he would lose his mind.",
        "Finally the Rabbi said, \u201cNow take them all back outside. Every one.\u201d Rueben rushed home and set every animal free. That night his little room felt peaceful and roomy for the first time in weeks. His house was exactly as crowded as it had always been, but it felt like a palace."
      ],
      moral:"Sometimes a problem looks smaller once you have something harder to compare it to.",
      questions:[
        {q:"Why did Rueben go to the Rabbi?", options:["His house felt too small and crowded","He wanted a new goat","He wanted to sell his house"], answer:0, why:"He couldn't stand how loud and cramped his one room had become.", type:'comp'},
        {q:"What did the Rabbi tell Rueben to do first?", options:["Move to a bigger house","Bring animals inside","Send the children away"], answer:1, why:"The Rabbi's odd plan started with adding animals, not taking anything away.", type:'comp'},
        {q:"In the story, Rueben thought the Rabbi's idea seemed \u201cabsurd.\u201d What does absurd mean?", options:["Wonderful and exciting","Silly and hard to believe","Extremely dangerous"], answer:1, why:"Bringing farm animals into a tiny room did sound like a ridiculous idea to Rueben.", type:'vocab'}
      ]
    },
    { id:'sky', title:"Why the Sky Is Far Away", emoji:'\u{1F30C}', culture:'Efik folktale, Nigeria',
      passage:[
        "Long ago, the sky hung so close to the earth that people could reach up and break off a piece to eat, soft and blue like bread. The chief told everyone to take only what they needed for that meal.",
        "At first, people obeyed, and there was always enough for everyone. But little by little, people grew <span class='lib-vocab'>wasteful</span>. They tore off huge chunks, ate only a bite, and let the rest rot on the ground.",
        "The sky watched this happen day after day. It had given generously, and it grew sadder each time a good piece was thrown away uneaten.",
        "One morning, the sky had had enough. It pulled itself up, slowly, further and further, until it rested high above the clouds where no hand could ever reach it again.",
        "From then on, people had to plant seeds, tend fields, and wait patiently for their own food to grow. They never forgot the lesson the sky had taught them."
      ],
      moral:"Take care not to waste what is given to you freely.",
      questions:[
        {q:"What could people do to the sky at the beginning of the story?", options:["Break off pieces to eat","Ride on clouds","Paint it different colors"], answer:0, why:"The sky hung low enough that people could break off a piece like bread.", type:'comp'},
        {q:"Why did the sky move far away?", options:["People were too loud","People wasted its pieces","A storm pushed it up"], answer:1, why:"People took more than they needed and let good pieces rot, so the sky grew tired of being wasted.", type:'comp'},
        {q:"In the story, people were being \u201cwasteful\u201d with pieces of the sky. What does wasteful mean?", options:["Using something carefully","Not using something well, or throwing it away","Sharing with everyone"], answer:1, why:"Letting good food rot instead of eating it is exactly what wasteful means.", type:'vocab'}
      ]
    },
    { id:'twoeverything', title:"Two of Everything", emoji:'\u2697\uFE0F', culture:'Chinese folktale',
      passage:[
        "An elderly farmer named Mr. Haktak and his wife dug up a large brass pot buried in their garden. It looked ordinary enough, so they carried it home.",
        "While cleaning it, Mrs. Haktak accidentally dropped her hairpin inside. When she reached in to grab it, she pulled out two identical hairpins. Whatever went into the pot came out doubled!",
        "They dropped in coins, and gold appeared. Soon their little house was filled with treasure, and the couple was <span class='lib-vocab'>overjoyed</span>.",
        "But then, while leaning over the rim, Mrs. Haktak tumbled in headfirst. Out climbed two identical Mrs. Haktaks! When old Mr. Haktak reached in to help her out, he fell in too, and now there were two of him as well.",
        "At first the family stood staring at one another, utterly baffled. But they soon realized this was a blessing, not a curse. They now had double the family to share their good fortune, and the little house grew loud and warm with laughter."
      ],
      moral:"An unexpected surprise can turn out to be a gift, if you're willing to see it that way.",
      questions:[
        {q:"What happened when Mrs. Haktak dropped her hairpin in the pot?", options:["It vanished","Two hairpins appeared","It turned to gold"], answer:1, why:"Whatever went into the pot came out doubled, starting with the hairpin.", type:'comp'},
        {q:"How did the Haktak family feel about having two of themselves at the end?", options:["Upset and worried","Confused but happy","Angry with each other"], answer:1, why:"They were surprised at first but ended up glad for the extra family and joy.", type:'comp'},
        {q:"The family felt \u201coverjoyed\u201d once treasure started appearing. What does overjoyed mean?", options:["Extremely happy","A little bit sad","Very sleepy"], answer:0, why:"Overjoyed means filled with a huge amount of joy, more than just happy.", type:'vocab'}
      ]
    },
    { id:'eggs', title:"The Talking Eggs", emoji:'\u{1F95A}', culture:'Louisiana Creole folktale',
      passage:[
        "Two sisters lived with their mother. Rose was spoiled and demanding, while Blanche was kind and hardworking, even though her mother treated her unfairly.",
        "One day, while fetching water, Blanche met a strange old woman who asked for a place to rest. Blanche welcomed her warmly and walked her all the way home.",
        "The old woman told Blanche to enter her henhouse and choose eggs, but warned her to take only the eggs that stayed silent, and to leave any egg that shouted \u201ctake me!\u201d",
        "Blanche listened carefully and chose only the quiet eggs. On her way home, she cracked them open one by one to find jewels, silk gowns, and a fine carriage.",
        "When jealous Rose heard about the fortune, she rushed off to find the same old woman, but she was rude and impatient the whole visit. In the henhouse, Rose ignored the warning and grabbed only the loudest, most <span class='lib-vocab'>boastful</span> eggs. When she cracked them open at home, out poured snakes and frogs instead of treasure."
      ],
      moral:"Kindness and patience are worth more than grabbing for the loudest, showiest thing.",
      questions:[
        {q:"How did Blanche treat the strange old woman?", options:["She ignored her","She was kind and helpful","She ran away"], answer:1, why:"Blanche welcomed the old woman warmly and walked her home.", type:'comp'},
        {q:"What kind of eggs was Blanche told to choose?", options:["The loudest eggs","The eggs that stayed silent","The biggest eggs"], answer:1, why:"The old woman warned her to only take the quiet ones.", type:'comp'},
        {q:"Rose chose eggs that were \u201cboastful.\u201d What does boastful mean?", options:["Quiet and shy","Bragging and showing off","Sweet and gentle"], answer:1, why:"Boastful eggs shouted and showed off, which is exactly what the word means.", type:'vocab'}
      ]
    },
    { id:'anansi', title:"Anansi and the Box of Stories", emoji:'\u{1F577}\uFE0F', culture:'Ashanti folktale, Ghana',
      passage:[
        "Long ago, all the world's stories belonged to Nyame, the Sky God, locked safely inside a wooden box. Anansi the spider longed to own the stories himself, so he climbed all the way to the sky to ask for them.",
        "Nyame laughed, for many had asked before him and failed. \u201cBring me three treasures,\u201d he said, \u201ca swarm of stinging hornets, the fearsome python, and the invisible fairy who is never caught.\u201d",
        "Anansi did not rush off boldly. Instead he thought carefully, using his <span class='lib-vocab'>cunning</span> instead of his strength. To catch the hornets, he sprinkled water over their nest and called out that rain was coming, so they crawled gratefully into his gourd for shelter.",
        "To catch the python, Anansi bragged that the python could never lie as straight as a certain palm branch. When the proud python stretched out to prove him wrong, Anansi wound him fast with vine.",
        "Finally, Anansi covered a small doll in sticky sap and set it near the fairy's favorite fruit tree. When the curious fairy struck the doll for being rude, her hand stuck fast. One by one, Anansi carried his three prizes to Nyame, who marveled at the little spider's patience and handed over the box. That is why, to this day, such tales are called Anansi stories."
      ],
      moral:"Careful thinking can accomplish what strength alone cannot.",
      questions:[
        {q:"What three things did Nyame ask Anansi to bring him?", options:["Gold, silver, and jewels","Hornets, a python, and a fairy","A crown, a sword, and a cape"], answer:1, why:"Nyame set three living, tricky creatures as the price for the stories.", type:'comp'},
        {q:"How did Anansi capture the python?", options:["He tricked the python into stretching straight to compare himself to a branch","He chased the python into a cave","He asked the python nicely"], answer:0, why:"Anansi used the python's pride against him rather than force.", type:'comp'},
        {q:"Nyame admired Anansi's patience and \u201ccunning.\u201d What does cunning mean?", options:["Loud and clumsy","Clever in a sneaky, resourceful way","Slow and careful"], answer:1, why:"Anansi solved each trick using clever plans rather than strength, which is what cunning means.", type:'vocab'}
      ]
    },
    { id:'crane', title:"The Crane Wife", emoji:'\u{1F54A}\uFE0F', culture:'Japanese folktale',
      passage:[
        "A poor but kind man named Yohei once freed an injured crane he found trapped in the snow, gently removing an arrow from its wing and letting it fly free.",
        "That night, a mysterious young woman appeared at his door, asking for shelter from a storm. Yohei welcomed her in, and soon they married, though they had little money.",
        "One day, the woman offered to weave a bolt of cloth to sell, but she made one strange request: Yohei must never watch her while she worked behind the closed screen. Yohei agreed.",
        "Days later, she emerged with cloth so shimmering and fine that it sold for a fortune in the village market. She wove again and again, and their fortune grew, but each time she looked thinner and more tired.",
        "Overcome with worry and curiosity, Yohei finally broke his promise and peeked behind the screen. There sat not his wife, but the very crane he had once saved, plucking her own feathers to weave the thread. Heartbroken at being discovered, the crane looked at Yohei with <span class='lib-vocab'>sorrow</span> in her eyes and flew out the window, never to return."
      ],
      moral:"A promise, once made, should be kept, even when curiosity makes it hard.",
      questions:[
        {q:"What did Yohei do at the beginning of the story?", options:["He caught a crane to sell it","He freed an injured crane","He built a house for a crane"], answer:1, why:"Yohei gently freed a crane trapped in the snow.", type:'comp'},
        {q:"What was the crane wife's one request of Yohei?", options:["Never to watch her while she wove","Never to leave the house","Never to speak to her"], answer:0, why:"She asked him never to look behind the screen while she worked.", type:'comp'},
        {q:"The crane looked at Yohei with \u201csorrow\u201d before flying away. What does sorrow mean?", options:["Deep sadness","Great joy","Bright anger"], answer:0, why:"Sorrow means deep sadness, which is how the crane felt at being discovered.", type:'vocab'}
      ]
    },
    { id:'coyote', title:"Coyote Places the Stars", emoji:'\u2B50', culture:'Wasco folktale',
      passage:[
        "One clear night, Coyote looked up and noticed that only a few stars dotted the huge, dark sky. He decided this would not do.",
        "Coyote built a ladder by shooting arrows into the sky, one after another, until they formed a chain reaching all the way to the stars. He climbed up to see what he could do.",
        "Once there, he began plucking stars from a great shining pile and placing them carefully, one by one, forming pictures: a bear, a hunter, a great dipper to scoop water from the heavens.",
        "He worked so long and so carefully that dawn began to break before he was finished. Coyote had just enough time to fling the remaining stars into the sky all at once before hurrying back down his ladder.",
        "That is why, even today, some stars form neat pictures overhead, while countless others are <span class='lib-vocab'>scattered</span> without any pattern at all across the night sky."
      ],
      moral:"Even careful, patient work sometimes has to end in a hurry, and that's alright.",
      questions:[
        {q:"How did Coyote reach the sky?", options:["He climbed a tall tree","He built a ladder of arrows","He flew on an eagle"], answer:1, why:"Coyote shot arrows one after another to form a ladder into the sky.", type:'comp'},
        {q:"Why are some stars in neat pictures while others are not?", options:["Coyote ran out of time and flung the rest up quickly","The wolves knocked some stars down","A storm rearranged them"], answer:0, why:"Dawn was breaking, so Coyote had to toss the leftover stars up all at once.", type:'comp'},
        {q:"At the end, the leftover stars were \u201cscattered\u201d across the sky. What does scattered mean?", options:["Arranged in a neat circle","Spread out messily, with no pattern","Hidden behind clouds"], answer:1, why:"Coyote flung them up in a rush, so they landed spread out with no plan.", type:'vocab'}
      ]
    }
  ];

  const STAR_THRESHOLD = 4; // finish at least 4 of 7 tales to earn the star

  let stylesInjected = false;
  function injectStyles(){
    if(stylesInjected) return;
    stylesInjected = true;
    const style = document.createElement('style');
    style.textContent =
      '.lib-vocab{background:#fff3c4;border-radius:4px;padding:0 3px;font-weight:800;color:#7a5b00;}'+
      '.lib-tag{display:inline-block;font-size:11px;font-weight:800;padding:3px 9px;border-radius:20px;margin-bottom:8px;}'+
      '.lib-tag-comp{background:#e3eefc;color:#1c5aa8;}'+
      '.lib-tag-vocab{background:#fdeecf;color:#9a5b00;}'+
      '.story-pick{position:relative;}';
    document.head.appendChild(style);
  }

  function start(host, ctx){
    injectStyles();
    if(!ctx.state.storiesDone) ctx.state.storiesDone = {};
    let cur=null, idx=0, correct=0;
    list();

    function list(){
      const doneCount = Object.keys(ctx.state.storiesDone).filter(k=>ctx.state.storiesDone[k]).length;
      host.innerHTML =
        '<h2>\u{1F4DA} Plaza Library</h2>'+
        '<p class="sub">Read a tale with Clover, then answer her questions. ('+doneCount+' / '+FABLES.length+' read)</p>'+
        '<div class="story-grid">'+FABLES.map(f=>{
          const done = ctx.state.storiesDone[f.id];
          return '<button class="story-pick" data-id="'+f.id+'">'+
                 (done?'<div style="position:absolute;top:6px;right:10px">\u2B50</div>':'')+
                 '<div class="emo">'+f.emoji+'</div><b>'+f.title+'</b>'+
                 '<div style="font-size:10px;color:var(--ink-soft,#556);margin-top:2px">'+f.culture+'</div></button>';
        }).join('')+'</div>';
      host.querySelectorAll('.story-pick').forEach(b=> b.onclick=()=>open(b.dataset.id));
    }

    function open(id){
      cur = FABLES.find(f=>f.id===id); idx=0; correct=0;
      host.innerHTML =
        '<h2>'+cur.emoji+' '+cur.title+'</h2>'+
        '<p class="sub">'+cur.culture+'</p>'+
        '<div class="passage">'+cur.passage.map(p=>'<p>'+p+'</p>').join('')+
        '<p style="font-style:italic;color:var(--green-deep);font-weight:800">Lesson: '+cur.moral+'</p></div>'+
        '<div class="row mt"><button class="btn green" id="goQ">I\u2019m ready \u2014 ask me!</button>'+
        '<button class="btn ghost" id="back">Back</button></div>';
      host.querySelector('#goQ').onclick=question;
      host.querySelector('#back').onclick=list;
    }

    function question(){
      const q = cur.questions[idx];
      const tag = q.type==='vocab'
        ? '<span class="lib-tag lib-tag-vocab">\u{1F50D} Word Detective</span>'
        : '<span class="lib-tag lib-tag-comp">Question '+(idx+1)+' of '+cur.questions.length+'</span>';
      host.innerHTML = tag+'<h3 style="font-size:19px;margin-top:6px">'+q.q+'</h3>'+
        '<div id="opts"></div><div class="fb" id="fb">&nbsp;</div><div id="nextWrap"></div>';
      const opts = host.querySelector('#opts');
      q.options.forEach((o,i)=>{
        const b=document.createElement('button'); b.className='q-opt'; b.textContent=o;
        b.onclick=()=>answer(i,b); opts.appendChild(b);
      });
    }

    function answer(i,btn){
      const q = cur.questions[idx];
      host.querySelectorAll('.q-opt').forEach((b,bi)=>{
        b.disabled=true;
        if(bi===q.answer){ b.style.borderColor='var(--green,#2f9e57)'; b.style.background='#eafaf0'; }
        else if(bi===i){ b.style.borderColor='var(--red,#CF3339)'; b.style.background='#fff0ee'; }
      });
      const fb = host.querySelector('#fb');
      if(i===q.answer){ correct++; fb.textContent='Yes! '+q.why; fb.className='fb ok'; }
      else{ fb.textContent='The green one is right. '+q.why; fb.className='fb no'; }
      const nb = document.createElement('button'); nb.className='btn green';
      nb.textContent = idx<cur.questions.length-1 ? 'Next' : 'See how I did!';
      nb.onclick=()=>{ idx++; if(idx<cur.questions.length) question(); else finish(); };
      host.querySelector('#nextWrap').appendChild(nb);
    }

    function finish(){
      const total = cur.questions.length;
      const firstTime = !ctx.state.storiesDone[cur.id];
      ctx.state.storiesDone[cur.id] = true;

      const coins = correct; // 1 coin per correct answer, up to 3
      let star = false;
      if(firstTime && !ctx.state.libraryStarEarned){
        const doneCount = Object.keys(ctx.state.storiesDone).filter(k=>ctx.state.storiesDone[k]).length;
        if(doneCount >= STAR_THRESHOLD){
          star = true;
          ctx.state.libraryStarEarned = true;
        }
      }
      ctx.award({coins:coins, star:star});
      if(star && ctx.confetti) ctx.confetti();
      if(ctx.toast) ctx.toast(star ? 'You earned the Library star! \u2B50' : 'Nice reading! +'+coins+' coins');

      host.innerHTML = '<div class="center"><h2>'+cur.emoji+' Nice reading!</h2>'+
        '<p>You got <b>'+correct+' / '+total+'</b> right on \u201c'+cur.title+'\u201d.</p>'+
        (star ? '<p style="font-weight:800;color:var(--green-deep)">\u2B50 You earned the Plaza Library star!</p>' : '')+
        '<div class="row" style="justify-content:center;flex-wrap:wrap"><button class="btn green" id="again">Read another tale</button>'+
        '<button class="btn ghost" id="done">Back to map</button></div></div>';
      host.querySelector('#again').onclick=list;
      host.querySelector('#done').onclick=ctx.close;
    }
  }

  window.Stops.register('7C', { name:'Plaza Library', start });
})();
