(function(){
  var FRUITS = [
    {emoji:'🍌', name:'Banana',           price:30},
    {emoji:'🍎', name:'Apple',            price:45},
    {emoji:'🍊', name:'Orange',           price:50},
    {emoji:'🍇', name:'Grapes',           price:65},
    {emoji:'🍉', name:'Watermelon Slice', price:115}
  ];
  var BONUS = {emoji:'🧋', name:'Boba Tea', price:85, changeTarget:15};

  var DENOMS = [
    {v:1,   label:'1¢',  type:'coin', name:'penny'},
    {v:5,   label:'5¢',  type:'coin', name:'nickel'},
    {v:10,  label:'10¢', type:'coin', name:'dime'},
    {v:25,  label:'25¢', type:'coin', name:'quarter'},
    {v:100, label:'$1',  type:'bill', name:'dollar'}
  ];

  function fmt(cents){
    if (cents >= 100){
      var d = Math.floor(cents/100), c = cents % 100;
      return '$' + d + '.' + (c < 10 ? '0' : '') + c;
    }
    return cents + '¢';
  }

  function ensureStyles(){
    if (document.getElementById('mm-style')) return;
    var s = document.createElement('style');
    s.id = 'mm-style';
    s.textContent =
      '.mm-chip{border:none;cursor:pointer;font-family:inherit;font-weight:800;' +
      'color:#fff;margin:5px;box-shadow:0 3px 0 rgba(0,0,0,.25);}' +
      '.mm-chip:active{transform:translateY(2px);box-shadow:0 1px 0 rgba(0,0,0,.25);}' +
      '.mm-coin{width:58px;height:58px;border-radius:50%;font-size:14px;}' +
      '.mm-penny{background:#B87333;}' +
      '.mm-nickel{background:#AEB6BB;color:#081F2C;}' +
      '.mm-dime{background:#D9DCDD;color:#081F2C;}' +
      '.mm-quarter{background:#7C8E97;}' +
      '.mm-bill{width:92px;height:56px;border-radius:8px;background:#2E7D46;font-size:18px;border:2px solid #fff;}' +
      '#mm-tray{flex-wrap:wrap;}';
    document.head.appendChild(s);
  }

  function start(host, ctx){
    ensureStyles();

    var total = FRUITS.length + 1; // fruits + bonus
    var round = 0;
    var current = 0;
    var attemptsThisRound = 0;
    var correctFirstTry = 0;

    render();

    function currentItem(){
      return round >= FRUITS.length ? BONUS : FRUITS[round];
    }
    function currentTarget(){
      return round >= FRUITS.length ? BONUS.changeTarget : FRUITS[round].price;
    }

    function render(){
      var isBonus = round >= FRUITS.length;
      var item = currentItem();
      var target = currentTarget();
      var denoms = isBonus ? DENOMS.filter(function(d){ return d.type === 'coin'; }) : DENOMS;

      var dots = '';
      for (var i = 0; i < total; i++){
        var color = i < round ? '#62CBC9' : (i === round ? '#CF3339' : '#dfe6e2');
        dots += '<span style="display:inline-block;width:10px;height:10px;border-radius:50%;margin:0 3px;background:' + color + '"></span>';
      }

      var promptHtml = isBonus
        ? '<div class="h3">🧋 Bonus Round: Boba Time!</div>' +
          '<div class="passage">Clover treats herself to a boba tea — it costs <b>' + fmt(BONUS.price) + '</b>. ' +
          'She only has a <b>$1 bill</b> to pay with. Help her count out the <b>change</b> she should get back!</div>'
        : '<div class="h3">Round ' + (round + 1) + ' of ' + FRUITS.length + '</div>' +
          '<div class="passage">Clover wants a <b>' + item.name + '</b>. It costs <b>' + fmt(item.price) + '</b>. ' +
          'Tap coins and bills below to pay the <b>exact</b> amount.</div>';

      var chips = denoms.map(function(d){
        var cls = d.type === 'bill' ? 'mm-bill' : 'mm-coin mm-' + d.name;
        return '<button class="mm-chip ' + cls + '" data-v="' + d.v + '">' + d.label + '</button>';
      }).join('');

      host.innerHTML =
        '<div class="center mt">' + dots + '</div>' +
        '<div class="center mt">' + promptHtml + '</div>' +
        '<div class="center mt" style="font-size:52px">' + item.emoji + '</div>' +
        '<div class="row center mt" id="mm-tray">' + chips + '</div>' +
        '<div class="center mt sub">Your total: <b id="mm-total">' + fmt(current) + '</b>' +
        (isBonus ? '' : ' &nbsp;•&nbsp; Price: <b>' + fmt(target) + '</b>') + '</div>' +
        '<div class="row center mt">' +
          '<button class="btn ghost btn sm" id="mm-clear">Clear</button>' +
          '<button class="btn green" id="mm-buy">' + (isBonus ? 'Give the change!' : 'Buy it!') + '</button>' +
        '</div>' +
        '<div class="center mt" id="mm-fb"></div>' +
        '<div class="center mt"><img src="' + ctx.clover.head + '" style="width:60px" alt="Clover"/></div>';

      Array.prototype.forEach.call(host.querySelectorAll('.mm-chip'), function(btn){
        btn.addEventListener('pointerup', function(){
          current += parseInt(btn.getAttribute('data-v'), 10);
          host.querySelector('#mm-total').textContent = fmt(current);
        });
      });

      host.querySelector('#mm-clear').addEventListener('pointerup', function(){
        current = 0;
        host.querySelector('#mm-total').textContent = fmt(current);
        host.querySelector('#mm-fb').innerHTML = '';
      });

      host.querySelector('#mm-buy').addEventListener('pointerup', function(){
        attemptsThisRound++;
        var fb = host.querySelector('#mm-fb');
        if (current === target){
          if (attemptsThisRound === 1) correctFirstTry++;
          fb.innerHTML = '<div class="fb ok">' +
            (isBonus ? "That's exactly right — boba time! 🧋" : 'Exact payment — Clover says thanks! 🎉') +
            '</div>';
          if (ctx.confetti) ctx.confetti();
          setTimeout(nextRound, 1100);
        } else {
          var msg = current < target
            ? "Not quite enough yet — keep adding!"
            : "That's too much — try Clear and build it again.";
          fb.innerHTML = '<div class="fb no">' + msg + '</div>';
        }
      });
    }

    function nextRound(){
      round++;
      current = 0;
      attemptsThisRound = 0;
      if (round >= total){
        finish();
      } else {
        render();
      }
    }

    function finish(){
      var earnedStar = correctFirstTry >= 4; // 4 of 5 fruit rounds right on first try
      ctx.state.riverMarketDone = true;
      var coinsEarned = 10 + correctFirstTry;
      ctx.award({coins: coinsEarned, star: earnedStar, treat: true});
      if (ctx.confetti) ctx.confetti();
      if (ctx.toast) ctx.toast('River Market complete! 🧋');

      host.innerHTML =
        '<div class="center mt"><img src="' + ctx.clover.cele + '" style="width:120px" alt="Clover celebrating"/></div>' +
        '<div class="center h2 mt">Great shopping, helper!</div>' +
        '<div class="center passage mt">Clover got all her fruit and a boba tea treat, thanks to you! ' +
        'You earned ' + coinsEarned + ' coins' + (earnedStar ? ' and a star ⭐' : '') + '.</div>' +
        '<div class="center mt"><button class="btn teal" id="mm-done">← Map</button></div>';

      host.querySelector('#mm-done').addEventListener('pointerup', function(){ ctx.close(); });
    }
  }

  window.Stops.register('3C', { name: 'River Market', start: start });
})();
