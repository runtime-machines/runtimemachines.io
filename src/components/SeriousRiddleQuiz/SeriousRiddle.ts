import { Quiz } from './SeriousRiddleQuiz';

import { WebsiteState } from '~/utils/utils';

class ElementWithIndex extends Element {
	index: number | undefined;
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
	qIndex = 0;
	riddleIter = 0;
	correct = 0;
	isModal = false;

	constructor() {
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
			(element as ElementWithIndex).index = index;
			element.addEventListener('click', (e) => this.showResults(e));
		}

		if (this.continueButton == null || this.titleScreen == null) return;
		this.continueButton.addEventListener('click', () => this.nextQ());
		this.titleScreen.addEventListener('click', () => this.showFirst());
	}

	startRiddle(q: Quiz[], modal: boolean) {
		let welcome = 'Now, test your knowledge with the RTM Quiz!';
		if (!modal) welcome = 'Complete this quiz to enter the website';
		this.correct = 0;
		this.riddleIter++;
		this.qIndex = 0;
		this.quiz = q;
		this.isModal = modal;
		if (this.quizContainer == null) return;
		this.quizContainer.style.display = 'none';
		if (this.titleScreen == null || this.completeDiv == null || this.continueDiv == null) return;
		this.typeWriter([this.completeDiv, this.continueDiv], [welcome, 'Click anywhere to continue'], 0);
	}

	showFirst() {
		if (
			this.titleScreen == null ||
			this.quizContainer == null ||
			this.continueButton == null ||
			this.alternatives == null ||
			this.resultDiv == null
		)
			return;
		this.resetAllEffects();
		this.showQuestion(this.quiz[0], 0);
		this.continueButton.textContent = 'Next »';
		this.titleScreen.style.display = 'none';
		this.quizContainer.style.display = 'block';
		this.alternatives.classList.remove('pointer-events-none');
		this.resultDiv.style.display = 'none';
		this.continueButton.style.display = 'none';
	}

	showQuestion(q: Quiz, i: number) {
		if (this.qIndex < i) {
			this.qIndex = i;
		}
		let qHeader = this.qIndex + 1 + '/3 ' + q.question;
		if (this.isModal == true) qHeader = this.qIndex + 1 + '/10 ' + q.question;
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
		arrayDiv.forEach(function (element: HTMLElement) {
			element.textContent = '';
		});
		let time = 20;

		for (let index = 0; index < arrayDiv.length; index++) {
			const div = arrayDiv[index];
			for (let e = 0; e < texts[index].length; e++) {
				const char = texts[index][e];
				setTimeout(() => {
					if (this.qIndex == i) div.innerHTML += char;
				}, time);
				time += 20;
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
			this.correct++;
			this.resultDiv.textContent = 'Correct Answer!';
			if (this.isModal == true && this.qIndex == 9)
				this.resultDiv.textContent = 'You have got ' + this.correct + ' out of 10 questions. Well done!';
		} else {
			asnwerSelected.classList.add('glow-wrong');
			this.resultDiv.textContent = '';
			if (this.isModal == true && this.qIndex == 9)
				this.resultDiv.textContent = 'You have got ' + this.correct + ' out of 10 questions. Well done!';
		}
		if (this.isModal == false && this.qIndex == 2) this.continueButton.textContent = 'Enter »';
		if (this.isModal == true && this.qIndex == 9) this.continueButton.textContent = 'Exit »';
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
		if (this.isModal == false) {
			if (localStorage.getItem('websiteState') != WebsiteState.Website) {
				localStorage.setItem('websiteState', WebsiteState.Website);
			}
			if (this.quizContainer == null || this.continueButton == null) return;
			this.quizContainer.style.display = 'none';
			this.resetAllEffects();
			window.dispatchEvent(new Event('stateChange'));
		} else {
			const riddles = document.getElementById('riddle-riddles-hidden');
			const serious = document.getElementById('riddle-serious-hidden');
			if (riddles == null || this.quizContainer == null || serious == null) return;
			this.quizContainer.style.display = 'none';
			this.resetAllEffects();
			riddles.style.display = 'none';
			serious.style.display = 'none';
		}
	}
}

export default SeriousRiddle;
