import { Quiz } from './SeriousRiddleQuiz';
enum WebsiteState {
	Selection = 'selection',
	Playful = 'playful',
	Serious = 'serious',
	Website = 'website',
}
class SeriousRiddle {
	titleScreen: HTMLElement | undefined | null;
	completeDiv: HTMLElement | undefined | null;
	continueDiv: HTMLElement | undefined | null;
	titleDiv: HTMLElement | undefined | null;
	alternatives: HTMLElement | undefined | null;
	resultDiv: HTMLElement | undefined | null;
	continueButton: HTMLElement | undefined | null;
	quizContainer: HTMLElement | undefined | null;
	clickedAnswer: HTMLElement | undefined | null;
	arrayHTML: HTMLElement[] = [];
	quizContent: string[] = [];
	quiz: Quiz[] = [];
	qIndex: number;
	riddleIter = 0;

	constructor(q: Quiz[]) {
		if (this.riddleIter == 0) {
			this.titleScreen = document.getElementById('title-screen');
			this.completeDiv = document.getElementById('complete');
			this.continueDiv = document.getElementById('continue-click');
			this.titleDiv = document.getElementById('title');
			this.alternatives = document.getElementById('alternatives');
			this.resultDiv = document.getElementById('result');
			this.continueButton = document.getElementById('continue');
			this.quizContainer = document.getElementById('quizContainer');
			this.init();
		}
		this.riddleIter++;
		this.quiz = q;
		this.qIndex = 0;
	}

	init() {
		const alts = document.querySelectorAll('.alternative');
		if (this.titleDiv == null) return;
		// Fill the question
		this.arrayHTML = [this.titleDiv];

		// Fill the alternatives
		for (let index = 0; index < alts.length; index++) {
			const element = alts[index];
			this.arrayHTML.push(element as HTMLElement);
			element.addEventListener('click', this.showResults);
		}

		if (this.continueButton == null || this.titleScreen == null) return;
		this.continueButton.addEventListener('click', this.nextQ);
		this.titleScreen.addEventListener('click', this.showFirst);
	}

	startRiddle() {
		if (this.titleScreen == null || this.completeDiv == null || this.continueDiv == null) return;
		this.typeWriter(
			[this.completeDiv, this.continueDiv],
			['Complete this quiz to enter the website', 'Click anywhere to continue'],
			0
		);
		console.log('beginning');
	}

	showFirst() {
		console.log(this);
		if (this.titleScreen == null || this.quizContainer == null) return;
		this.showQuestion(this.quiz[0], 0);
		this.titleScreen.style.display = 'none';
		this.quizContainer.style.display = 'block';
	}

	showQuestion(q: Quiz, i: number) {
		if (this.qIndex < i) {
			this.qIndex = i;
		}
		const qHeader = this.qIndex + 1 + '/3 ' + q.question;
		this.quizContent = [qHeader];

		for (let index = 0; index < q.answers.length; index++) {
			const element = q.answers[index];
			this.quizContent.push(index + 1 + '. ' + element);
		}

		this.typeWriterQuiz(i);
	}

	typeWriterQuiz(i: number) {
		this.typeWriter(this.arrayHTML, this.quizContent, i);
	}

	typeWriter(arrayDiv: HTMLElement[], texts: string[], i: number) {
		this.arrayHTML.forEach(function (element: HTMLElement) {
			element.textContent = '';
		});

		for (let index = 0; index < arrayDiv.length; index++) {
			const div = arrayDiv[index];
			for (let e = 0; e < texts[index].length; e++) {
				const char = texts[index][e];
				setTimeout(() => {
					if (this.qIndex == i) div.innerHTML += char;
				}, 20 * e * index);
			}
		}
	}

	showResults(event: { currentTarget: any }) {
		const asnwerSelected = event.currentTarget;
		const asnwerSelectedIndex = asnwerSelected.index;
		// Add results effects
		if (
			this.resultDiv == null ||
			this.continueButton == null ||
			this.alternatives == null ||
			this.continueButton == null
		)
			return;

		if (this.quiz[this.qIndex].correctAnswer == asnwerSelectedIndex) {
			this.resultDiv.textContent = 'Correct Answer!';
		} else {
			asnwerSelected.classList.add('glow-wrong');
			asnwerSelected.classList.remove('glow');
			this.resultDiv.textContent = '';
		}
		console.log(asnwerSelectedIndex);
		this.arrayHTML[this.quiz[this.qIndex].correctAnswer + 1].classList.add('glow-correct');
		this.alternatives.classList.add('pointer-events-none');
		this.resultDiv.style.display = 'block';
		this.continueButton.style.display = 'block';
	}

	nextQ() {
		if (this.resultDiv == null || this.continueButton == null || this.alternatives == null) return;
		// Remove results effects
		this.resetAllEffects();
		this.alternatives.classList.remove('pointer-events-none');
		this.resultDiv.style.display = 'none';
		this.continueButton.style.display = 'none';
		if (this.qIndex + 2 > this.quiz.length) this.endRiddle();
		else this.showQuestion(this.quiz[this.qIndex + 1], this.qIndex + 1);
	}

	resetAllEffects() {
		if (this.alternatives == null) return;
		for (let index = 1; index < this.arrayHTML.length; index++) {
			const element = this.arrayHTML[index];
			element.classList.remove('glow-correct');
			element.classList.remove('glow-wrong');
		}
	}

	endRiddle() {
		if (localStorage.getItem('websiteState') != WebsiteState.Website) {
			localStorage.setItem('websiteState', WebsiteState.Website);
		}

		if (this.quizContainer == null || this.continueButton == null) return;
		this.quizContainer.style.display = 'none';
		this.resetAllEffects();
		window.dispatchEvent(new Event('stateChange'));
	}
}

export default SeriousRiddle;
