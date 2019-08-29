const convertTime = (timestamp) => {
	const date = new Date(timestamp);

	return `${addZero(date.getHours())}:${addZero(date.getMinutes())}:${addZero(date.getSeconds())}`;
};

const addZero = (value) => value < 10 ? `0${value}` : value;

export default convertTime;