const handleEnter = (event) => {
	if (event.keyCode === 13) {
		event.target.blur();
		event.preventDefault();
	}
};

export default handleEnter;
