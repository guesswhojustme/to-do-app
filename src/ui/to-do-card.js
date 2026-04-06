

export function todoCard(id, title, description, priority, dueDate){
	//create ui and put data in the UI based on the argument that it has
	//data is dependent on the to do card form

	const toDoCard = document.createElement('div');
	toDoCard.id = id;
	Object.assign(toDoCard.style, {
		display: 'flex',
		width: '680px',
		height: '70px',
		padding: '0px 15px 0px 15px',
		alignItems: 'center',
		justifyContent: 'space-between'
	})

	const toDoTitle = document.createElement('p');
	toDoTitle.textContent = title;

	const toDoDesc = document.createElement('p')
	toDoDesc.textContent = description;

	const toDoPrio = document.createElement('button');
	toDoPrio.textContent = priority;

	const toDoDD = document.createElement('p');
	toDoDD.textContent = dueDate;

	toDoCard.append(toDoDD, toDoTitle, toDoDesc, toDoPrio)

	return toDoCard
}