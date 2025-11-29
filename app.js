// Book7 v1.1 app.js — works with login.html
(function(){
  const current = localStorage.getItem('book7_current');
  if(!current){ window.location='login.html'; return; }

  // Load users
  function users(){ return JSON.parse(localStorage.getItem('book7_users')||'{}'); }
  function saveUsers(u){ localStorage.setItem('book7_users', JSON.stringify(u)); }
  const u = users();
  if(!u[current]){ alert('User not found — please login again'); localStorage.removeItem('book7_current'); window.location='login.html'; return; }
  const user = u[current];

  // DOM refs
  const userArea = document.getElementById('userArea');
  const currentUserName = document.getElementById('currentUserName');
  userArea.textContent = current + (user.premium? ' (Premium)':'');
  currentUserName.textContent = current;

  // tabs
  document.querySelectorAll('.tabs button').forEach(b=>{
    b.onclick = ()=>{ document.querySelectorAll('.tabs button').forEach(x=>x.classList.remove('active')); b.classList.add('active'); document.querySelectorAll('.panel').forEach(p=>p.classList.add('hidden')); document.getElementById(b.dataset.tab).classList.remove('hidden'); }
  });

  // elements
  const entryType = document.getElementById('entryType');
  const entryAmount = document.getElementById('entryAmount');
  const entryCategory = document.getElementById('entryCategory');
  const entryNote = document.getElementById('entryNote');
  const entryDate = document.getElementById('entryDate');
  const addEntryBtn = document.getElementById('addEntryBtn');
  const entriesList = document.getElementById('entriesList');
  const sumIncome = document.getElementById('sumIncome');
  const sumExpense = document.getElementById('sumExpense');
  const sumNet = document.getElementById('sumNet');

  // inventory
  const invItem = document.getElementById('invItem');
  const invQty = document.getElementById('invQty');
  const invCost = document.getElementById('invCost');
  const addInvBtn = document.getElementById('addInvBtn');
  const invList = document.getElementById('invList');
  const invValue = document.getElementById('invValue');

  // calendar
  const calDate = document.getElementById('calDate');
  const calEntries = document.getElementById('calEntries');

  // settings
  const exportBtn = document.getElementById('exportBtn');
  const importFile = document.getElementById('importFile');
  const logoutBtn = document.getElementById('logoutBtn');
  const togglePremium = document.getElementById('togglePremium');

  // P&L
  const plFrom = document.getElementById('plFrom');
  const plTo = document.getElementById('plTo');
  const plFilter = document.getElementById('plFilter');
  const plCard = document.getElementById('plCard');

  // helpers
  function save(){ u[current] = user; 