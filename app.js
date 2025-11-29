$('searchBox').addEventListener('input', function () {

    const q = this.value.toLowerCase();
    const dateFilter = $('filterDate').value || null;
    const list = $('entriesList');

    list.innerHTML = '';

    state.entries.slice().reverse().forEach((e, idx) => {

        if (dateFilter && e.date !== dateFilter) return;

        const match =
            (e.category || '').toLowerCase().includes(q) ||
            (e.note || '').toLowerCase().includes(q) ||
            (e.type || '').toLowerCase().includes(q) ||
            String(e.amount).includes(q);

        if (!match) return;

        /* --- Build <li> element --- */
        const li = document.createElement('li');

        /* LEFT SIDE */
        const left = document.createElement('div');
        left.innerHTML = `
            <div style="font-weight:600">
                ${escapeHtml(e.category || 'Untitled')}
                <span class="pill ${e.type === 'income' ? 'income' : 'expense'}">
                    ${e.type}
                </span>
            </div>
            <div class="muted">${e.date} — ${escapeHtml(e.note || '')}</div>
        `;

        /* RIGHT SIDE */
        const right = document.createElement('div');
        right.style.textAlign = 'right';
        right.innerHTML = `
            <div style="font-weight:700">${money(e.amount)}</div>
            <div style="display:flex;gap:6px;margin-top:6px;justify-content:flex-end">
                <button data-i="${state.entries.length - 1 - idx}" class="editBtn">Edit</button>
                <button data-i="${state.entries.length - 1 - idx}" class="delBtn">Delete</button>
            </div>
        `;

        li.appendChild(left);
        li.appendChild(right);
        list.appendChild(li);
    });

    attachButtons(); // VERY IMPORTANT → reuse your edit/delete handlers
});