$('searchBox').addEventListener('input', function(){
  const q = this.value.toLowerCase();
  const dateFilter = $('filterDate').value || null;
  const list = $('entriesList');

  list.innerHTML = '';

  state.entries.slice().reverse().forEach((e,idx)=>{
    if(dateFilter && e.date !== dateFilter) return;
    const match = 
      e.category.toLowerCase().includes(q) ||
      e.note.toLowerCase().includes(q) ||
      e.type.toLowerCase().includes(q) ||
      String(e.amount).includes(q);

    if(!match) return;

    // (reuse your existing LI creation code)
  });
});