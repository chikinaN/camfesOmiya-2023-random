const setCountElements = document.querySelectorAll('.setCount');
const confirmation = document.getElementById('confirmation')
const displayNum = document.getElementById('randomNumber')
const generateButton = document.getElementById('generate')
const drumPermission = document.getElementById('drumRoll')
const drumInputRange = document.getElementById('IntervalRange')
const rangeData = {
	first: 1,
	last: 100
}
const setConfirmation = () => {
	confirmation.innerHTML = `${rangeData.first}から${rangeData.last}の中でランダムな値を出力する`
}
setConfirmation()
const getOppositeValue = (key) => {
  if (key === 'first') {
    return rangeData.last;
  } else if (key === 'last') {
    return rangeData.first;
  }
}
const fetchLength = (key, value) => {
	if (key === 'first') {
    return rangeData.last > value;
  } else if (key === 'last') {
    return rangeData.first < value;
  }
}
setCountElements.forEach(setCountElement => {
	const numberInput = setCountElement.querySelector('input[type="number"]');
	const rangeInput = setCountElement.querySelector('input[type="range"]');
	const displayValue = setCountElement.querySelector('.displayValue');
	const id = setCountElement.getAttribute('id')
	numberInput.addEventListener('input', () => {
		const value = Number(numberInput.value);
		console.log(id,getOppositeValue(id))
		if (fetchLength(id, value)) {
			rangeInput.value = value;
			displayValue.textContent = value;
			rangeData[id] = value
			setConfirmation()
			console.log(rangeData)
		} else {
			numberInput.value = getOppositeValue(id)
		}
	});
	rangeInput.addEventListener('input', () => {
		const value = Number(rangeInput.value);
		console.log(id,getOppositeValue(id))
		if (fetchLength(id, value)) {
			numberInput.value = value;
			displayValue.textContent = value;
			rangeData[id] = value
			setConfirmation()
			console.log(rangeData)
		} else {
			rangeInput.value = getOppositeValue(id)
		}
	});
});
const ranNum = (max, min) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
drumInputRange.addEventListener('input', () => {
	document.querySelector('#option > label > .displayValue').innerHTML = `${drumInputRange.value}秒`
})
const drumRange = () => {
	return drumInputRange.value * 1000
}
generateButton.addEventListener('click',() => {
	if (drumPermission.checked) {
		const intervalId = setInterval(() => {
			displayNum.innerHTML = ranNum(rangeData.first, rangeData.last)
		}, 50);
		setTimeout(() => {
			clearInterval(intervalId);
		}, drumRange());
	} else {
		displayNum.innerHTML = ranNum(rangeData.first, rangeData.last)
	}
})
