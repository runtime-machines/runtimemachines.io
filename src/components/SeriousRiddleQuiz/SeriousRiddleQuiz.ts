export interface Quiz {
	question: string;
	answers: string[];
	correctAnswer: number;
}

const dlt: Quiz[] = [
	{
		question: 'The five elements of blockchain are distribution, encryption, immutability, tokenization and:',
		answers: ['Transparency', 'Authorization', 'Efficiency', 'Decentralization'],
		correctAnswer: 3,
	},
	{
		question: 'True or false: Smart contracts are legally binding contracts.',
		answers: ['True', 'False', 'True but not all of them', "I don't know"],
		correctAnswer: 1,
	},
	{
		question: 'How is the first block called in a chain?',
		answers: ['Root', 'Genesis', 'Origin', 'Source'],
		correctAnswer: 1,
	},
	{
		question: 'What does DLT stand for?',
		answers: [
			'Decentralized Logic Tree',
			'Database Live Technology',
			'Distributed Ledger Technology',
			'Democratic Law Technique',
		],
		correctAnswer: 2,
	},
	{
		question:
			'If a hacker intended to attack a blockchain, what percentage of the block copies would he have to alter?',
		answers: ['Only his copy', '50%', '51%', '100%'],
		correctAnswer: 2,
	},
	{
		question: 'What does P2P stand for?',
		answers: ['Person-To-Password', 'Protocol-To-Person', 'Person-To-Person', 'Peer-To-Peer'],
		correctAnswer: 3,
	},
	{
		question: 'What is Round Robin?',
		answers: [
			'A consensus model where nodes are pseudo-randomly selected to create blocks',
			'A consensus model where nodes are randomly chosen to create blocks',
			'A round in a consensus model where the resources are assigned via random oracles.',
			'A round in a consensus model where blocks are built by the fastest participant.',
		],
		correctAnswer: 0,
	},
	{
		question: 'What is the use case for ERC-20 token standard?',
		answers: [
			'Provides functionalities to transfer tokens, as well as approval of tokens',
			'Provides functionalities for non-fungible tokens',
			'Provides functionalities to transfer tokens on behalf of another address, contract or account',
			'Provides functionalities to manage multiple tokens in the same contract',
		],
		correctAnswer: 0,
	},
];

const crypto: Quiz[] = [
	{
		question: 'The properties of zero knowledge proofs are zero knowledge, soundness and:',
		answers: ['Completeness', 'Correctness', 'Tamper resistant', 'Immutable'],
		correctAnswer: 0,
	},
	{
		question: 'What is the main difference between hash functions and cryptographic hash functions?',
		answers: [
			'They are the same',
			'The latter are faster',
			'The former are used to encrypt data',
			'The latter are designed to avoid hash collision',
		],
		correctAnswer: 3,
	},
	{
		question: 'Guess the result of encrypting "RTM" using Caeser cipher',
		answers: ['uwp', 'uds', 'fdw', 'grj'],
		correctAnswer: 0,
	},
	{
		question: 'Where the cryptosystem acronym "RSA" comes from?',
		answers: [
			'It comes from the surnames of its creators',
			"It's a code name to maintain the project secret",
			'It means Refactoring System Algorithm ',
			'It comes from the names of its creators',
		],
		correctAnswer: 0,
	},
	{
		question: 'Is "SNARK" an acronym?',
		answers: [
			"No: it's the surname of the inventor",
			'Yes: Succinct Non-interactive ARgument of Knowledge',
			"No: it's in a book of Lewis Carroll",
			'Yes: Super NAtural tRansaction toolKit',
		],
		correctAnswer: 1,
	},
	{
		question: 'Is computing the discrete logarithm a difficult problem?',
		answers: [
			'Nope',
			'Yes, always',
			'Only in certain cyclic groups having prime order',
			'Only in multiplicative groups of integers modulo n',
		],
		correctAnswer: 2,
	},
	{
		question: '1 + 1 = ?',
		answers: ['2', '1', '0', 'It depends on the base...'],
		correctAnswer: 3,
	},
	{
		question: 'Does a digital signature guarantee confidentiality?',
		answers: ['No', 'Yes', 'Yes, for a sufficiently long key', 'No, if the key is reused'],
		correctAnswer: 0,
	},
];

const data: Quiz[] = [
	{
		question: 'What does SQL stands for?',
		answers: [
			'Simple Query Language',
			'Structured Query Language',
			'Scripting Query Language',
			'Strange Query Language',
		],
		correctAnswer: 1,
	},
	{
		question: 'What is a common table expression (CTE)?',
		answers: [
			'It is a powerful construct in SQL that helps simplify a query',
			'It is a common way to define table via regular expression',
			'It is an expression that runs on multiple tables sharing a common structure',
			'None of the previous',
		],
		correctAnswer: 0,
	},
	{
		question: 'What is data analysis?',
		answers: [
			'Association of rules that provide information in the form of "if-then" statements',
			'An analysis of the bits that compose a bunch of data',
			'Set of graphs and pivot table in a spreadsheet.',
			'The science of examining raw data with the purpose of supporting decision-making',
		],
		correctAnswer: 3,
	},
	{
		question: 'What is the difference between SQL databases and NoSQL databases?',
		answers: [
			'The former is for relational data model, while the latter is for non relational data model',
			'The former scales better vertically, while the latter scales better horizontally',
			'All three are correct',
			'The former is based on ACID constraints, while the latter is based on BASE constraints',
		],
		correctAnswer: 2,
	},
	{
		question: 'The operator AND in a query has the effect of...',
		answers: ['Expanding your result', 'Restricting your result', 'Quantifying your result', 'Grouping your result'],
		correctAnswer: 1,
	},
	{
		question: 'What is the purpose of the NOT operator?',
		answers: [
			'To exclude a term or phrase from a result',
			'To expand your result',
			'To check if the result equals a specific value',
			'To negate your result',
		],
		correctAnswer: 0,
	},
	{
		question: 'Which of the following stores all of the data in the database?',
		answers: ['Query', 'Record', 'Table', 'Field'],
		correctAnswer: 2,
	},
	{
		question: 'Which of the following is NOT a datatype?',
		answers: ['Integer', 'Text', 'Telephone Number', 'Byte'],
		correctAnswer: 2,
	},
];

/*function getRandomQuiz(q: Quiz[]) {
	const r = Math.floor(Math.random() * q.length);

	return q[r];
}*/

export function getRandomTenQuiz(): Quiz[] {
	const quiz: Quiz[] = [];
	/*quiz.push(getRandomQuiz(dlt));
	quiz.push(getRandomQuiz(crypto));
	quiz.push(getRandomQuiz(data));*/
	const fullQuiz: Quiz[] = dlt.concat(crypto.concat(data));

	const randomNumbers: number[] = [];

	while (randomNumbers.length < 10) {
		const randomNumber = Math.floor(Math.random() * fullQuiz.length);
		if (!randomNumbers.includes(randomNumber) && randomNumber < fullQuiz.length) {
			randomNumbers.push(randomNumber);
		}
	}

	for (let index = 0; index < 10; index++) {
		quiz.push(fullQuiz[randomNumbers[index]]);
	}

	return quiz;
}
