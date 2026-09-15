
const exList = [
  "jQuery Selectors & DOM",
  "Event Handling",
  "Effects & Animation",
  "Callbacks",
  "Promises: Basics",
  "Promise Chaining",
  "Promise.all",
  "Async / Await",
  "jQuery AJAX",
  "Fetch + async/await"
];

const tabsEl = $('#tabs');
exList.forEach((name, i) => {
  $('<button>').text(`${i+1}. ${name}`).attr('data-idx', i)
    .toggleClass('active', i===0)
    .appendTo(tabsEl);
});

tabsEl.on('click', 'button', function(){
  const idx = $(this).data('idx');
  $('nav button').removeClass('active');
  $(this).addClass('active');
  $('.ex').removeClass('active');
  $(`.ex[data-idx="${idx}"]`).addClass('active');
});


// ========== DOM Exercises ==========
/* ---------- Exercise 1: Selectors & DOM ---------- */
$('#ex1Add').on('click', function(){
  const name = $('#nameInput').val().trim() || 'Unnamed item';
  $('#itemList').append($('<li>').text(name));
  $('#nameInput').val('');
  $('#ex1out').text(`Added: "${name}"`);
});
$('#ex1Highlight').on('click', function(){
  $('#itemList li').toggleClass('highlight');
  $('#ex1out').text('Toggled .highlight class on all <li> elements');
});
$('#ex1Reset').on('click', function(){
  $('#ex1title').text('Shopping List');
  $('#ex1out').text('Title reset');
});
// inject highlight style
$('<style>.highlight{ border-left:3px solid var(--accent) !important; background:#132420 !important; }</style>').appendTo('head');

/* ---------- Exercise 2: Events ---------- */
$('#liveInput').on('keyup', function(){
  $('#counter').text(this.value.length);
});
const colors = ['#f47174','#5eead4','#f2b84b','#82aaff'];
function addSwatch(color){
  const el = $('<div class="swatch">').css({
    width:'32px', height:'32px', borderRadius:'6px', cursor:'pointer',
    background: color, border:'2px solid transparent'
  }).attr('data-color', color);
  $('#swatches').append(el);
}
colors.forEach(addSwatch);
$('#swatches').on('click', '.swatch', function(){
  $('.swatch').css('border-color','transparent');
  $(this).css('border-color','#fff');
  $('#ex2out').text('Selected color: ' + $(this).data('color'));
});
$('#ex2AddSwatch').on('click', function(){
  const rand = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6,'0');
  addSwatch(rand);
  $('#ex2out').text('Added new swatch: ' + rand + ' (click it — delegation makes it clickable immediately)');
});

/* ---------- Exercise 3: Effects ---------- */
$('#ex3Fade').on('click', function(){
  $('#panel').fadeToggle(300);
});
$('#ex3Animate').on('click', function(){
  const btn = $(this).prop('disabled', true);
  $('#ex3box').addClass('spin').animate({marginLeft:'220px'}, 400, function(){
    $(this).animate({marginLeft:'0px'}, 400, function(){
      $(this).removeClass('spin');
      btn.prop('disabled', false);
    });
  });
});

/* ---------- Exercise 4: Callbacks ---------- */
function getUser(id, callback){
  $('#ex4out').html('<span class="info">loading...</span>');
  setTimeout(function(){
    if (id < 0) callback(new Error('Invalid user id'), null);
    else callback(null, { id: id, name: 'Ada Lovelace' });
  }, 1500);
}
$('#ex4Ok').on('click', function(){
  getUser(42, function(err, user){
    if (err) $('#ex4out').html('<span class="err">Error: ' + err.message + '</span>');
    else $('#ex4out').text('Success: ' + JSON.stringify(user));
  });
});
$('#ex4Fail').on('click', function(){
  getUser(-1, function(err, user){
    if (err) $('#ex4out').html('<span class="err">Error: ' + err.message + '</span>');
    else $('#ex4out').text('Success: ' + JSON.stringify(user));
  });
});

/* ---------- Exercise 5: Promise basics ---------- */
function rollDice(){
  return new Promise(function(resolve, reject){
    setTimeout(function(){
      const roll = Math.floor(Math.random()*6)+1;
      if (roll >= 4) resolve(roll);
      else reject(new Error('Rolled too low: ' + roll));
    }, 800);
  });
}
$('#ex5Roll').on('click', function(){
  $('#ex5out').html('<span class="info">rolling...</span>');
  rollDice()
    .then(function(roll){ $('#ex5out').text('🎉 .then() → Win! Rolled ' + roll); })
    .catch(function(err){ $('#ex5out').html('<span class="err">.catch() → ' + err.message + '</span>'); })
    .finally(function(){ console.log('finally: round over'); });
});

/* ---------- Exercise 6: Chaining ---------- */
function fetchOrder(id){ return new Promise(res => setTimeout(() => res({id, total:100}), 500)); }
function applyDiscount(o){ return new Promise(res => setTimeout(() => res({...o, total:o.total*0.9}), 500)); }
function addTax(o){ return new Promise(res => setTimeout(() => res({...o, total:o.total*1.08}), 500)); }
$('#ex6Run').on('click', function(){
  const log = [];
  $('#ex6out').html('<span class="info">step 1: fetching order...</span>');
  fetchOrder(101)
    .then(order => { log.push('fetched order: $' + order.total.toFixed(2)); $('#ex6out').text(log.join('\n') + '\nstep 2: applying discount...'); return applyDiscount(order); })
    .then(disc => { log.push('after 10% discount: $' + disc.total.toFixed(2)); $('#ex6out').text(log.join('\n') + '\nstep 3: adding tax...'); return addTax(disc); })
    .then(final => { log.push('after 8% tax: $' + final.total.toFixed(2)); $('#ex6out').text(log.join('\n')); })
    .catch(err => $('#ex6out').html('<span class="err">Pipeline failed: ' + err.message + '</span>'));
});

/* ---------- Exercise 7: Promise.all ---------- */
function loadWidget(name, delay){
  return new Promise(resolve => setTimeout(() => resolve(name + ' loaded in ' + delay + 'ms'), delay));
}
$('#ex7Run').on('click', function(){
  const start = Date.now();
  $('#ex7out').html('<span class="info">loading 3 widgets in parallel...</span>');
  Promise.all([
    loadWidget('Weather', 600),
    loadWidget('Stocks', 1200),
    loadWidget('News', 900)
  ]).then(function(results){
    const elapsed = Date.now() - start;
    $('#ex7out').text(results.join('\n') + `\n\nTotal elapsed: ~${elapsed}ms (≈ slowest request, not the sum of all three)`);
  });
});

/* ---------- Exercise 8: async/await ---------- */
function wait(ms, value, shouldFail){
  return new Promise((resolve, reject) => setTimeout(() => shouldFail ? reject(new Error('Card declined')) : resolve(value), ms));
}
async function runCheckout(fail){
  await wait(400, null);
  await wait(600, null, fail);
  await wait(300, null);
  return 'Payment succeeded — receipt emailed.';
}
$('#ex8Run').on('click', async function(){
  $('#ex8out').html('<span class="info">validating cart...</span>');
  try{
    const result = await runCheckout(false);
    $('#ex8out').text(result);
  } catch(err){
    $('#ex8out').html('<span class="err">Checkout failed: ' + err.message + '</span>');
  }
});
$('#ex8Fail').on('click', async function(){
  $('#ex8out').html('<span class="info">validating cart...</span>');
  try{
    const result = await runCheckout(true);
    $('#ex8out').text(result);
  } catch(err){
    $('#ex8out').html('<span class="err">Checkout failed: ' + err.message + '</span>');
  }
});

/* ---------- Exercise 9: jQuery AJAX ---------- */
$('#ex9Load').on('click', function(){
  const btn = $(this).prop('disabled', true);
  $('#postList').empty();
  $('#ex9out').html('<span class="info">requesting...</span>');
  $.ajax({
    url: 'https://jsonplaceholder.typicode.com/posts',
    method: 'GET',
    data: { _limit: 5 }
  })
  .done(function(posts){
    posts.forEach(function(p){
      $('#postList').append($('<li>').html('<b>#' + p.id + '</b> — ' + p.title));
    });
    $('#ex9out').text('Loaded ' + posts.length + ' posts via $.ajax().done()');
  })
  .fail(function(jqXHR, status, err){
    $('#ex9out').html('<span class="err">AJAX error: ' + status + ' — ' + err + '</span>');
  })
  .always(function(){
    btn.prop('disabled', false);
  });
});
$('#ex9User').on('click', function(){
  $('#ex9out').html('<span class="info">requesting...</span>');
  $.getJSON('https://jsonplaceholder.typicode.com/users/1', function(user){
    $('#ex9out').text('$.getJSON() → ' + user.name + ' <' + user.email + '>');
  }).fail(function(){
    $('#ex9out').html('<span class="err">Could not load user</span>');
  });
});

/* ---------- Exercise 10: Fetch + async/await ---------- */
async function getTodo(id){
  const response = await fetch('https://jsonplaceholder.typicode.com/todos/' + id);
  if (!response.ok) throw new Error('HTTP ' + response.status + ': ' + response.statusText);
  return await response.json();
}
$('#ex10Ok').on('click', async function(){
  $('#ex10out').html('<span class="info">fetching...</span>');
  try{
    const todo = await getTodo(1);
    $('#ex10out').text(JSON.stringify(todo, null, 2));
  } catch(err){
    $('#ex10out').html('<span class="err">' + err.message + '</span>');
  }
});
$('#ex10Missing').on('click', async function(){
  $('#ex10out').html('<span class="info">fetching...</span>');
  try{
    const todo = await getTodo(99999);
    $('#ex10out').text(JSON.stringify(todo, null, 2));
  } catch(err){
    $('#ex10out').html('<span class="err">Caught: ' + err.message + ' (fetch resolved normally, response.ok was false)</span>');
  }
});
