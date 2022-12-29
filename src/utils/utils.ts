export enum WebsiteState {
	Selection = 'selection',
	Playful = 'playful',
	Serious = 'serious',
	Website = 'website',
}

export function getSides() {
	return ['left', 'right'];
}

export function typeWriter(arrayDiv: HTMLElement[], texts: string[], timeSpan: number, condition: () => boolean) {
	arrayDiv.forEach(function (element: HTMLElement) {
		element.textContent = '';
	});
	let time = 20;

	for (let index = 0; index < arrayDiv.length; index++) {
		const div = arrayDiv[index];
		for (let e = 0; e < texts[index].length; e++) {
			const char = texts[index][e];
			setTimeout(() => {
				if (condition()) div.innerHTML += char;
			}, time);
			time += timeSpan;
		}
	}
}
