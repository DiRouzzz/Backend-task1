document.addEventListener('click', e => {
	const id = e.target.dataset.id;

	if (e.target.dataset.type === 'remove') {
		remove(id).then(() => {
			e.target.closest('li').remove();
		});
	}

	if (e.target.dataset.type === 'edit') {
		edit(id);
	}
});

async function remove(id) {
	await fetch(`/${id}`, {
		method: 'DELETE',
	});
}

async function edit(id) {
	const promptNote = prompt('Введите новое значение...');
	if (!promptNote) {
		return;
	}

	const response = await fetch(`/${id}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json;charset=utf-8' },
		body: JSON.stringify({ title: promptNote.trim(), id }),
	});

	if (response.ok) {
		const li = document.querySelector(`li[data-id="${id}"]`);
		const span = li.querySelector('.note-title');
		span.textContent = promptNote.trim();
	}
}
