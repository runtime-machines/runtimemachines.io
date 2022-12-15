interface Quiz {
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
        answers: ['True', 'False','True but not all of them', 'I don\'t know'],
        correctAnswer: 1,
    },
    {
        question: 'How is the first block called in a chain?',
        answers: ['Root', 'Genesis','Origin', 'Source'],
        correctAnswer: 1,
    },
    {
        question: 'What does DLT stand for?',
        answers: ['Decentralized Logic Tree', 'Database Live Technology','Distributed Ledger Technology', 'Democratic Law Technique'],
        correctAnswer: 2,
    },
    {
        question: 'If a hacker intended to attack a blockchain, what percentage of the block copies would he have to alter?',
        answers: ['Only his copy', '50%','51%', '100%'],
        correctAnswer: 2,
    },
    {
        question: 'What does P2P stand for?',
        answers: ['Person-To-Password', 'Protocol-To-Person','Person-To-Person', 'Peer-To-Peer'],
        correctAnswer: 3,
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
        answers: ['They are the same', 'The latter are faster', 'The former are used to encrypt data', 
                    'The latter are designed to avoid hash collision'],
        correctAnswer: 3,
    },
    {
        question: 'Result of encrypting "rtm" using Caeser cipher',
        answers: ['uwp', 'uds', 'fdw', 'grj'],
        correctAnswer: 0,
    },
];

const data: Quiz[] = [
    {
        question: 'What does SQL stands for?',
        answers: ['Simple Query Language', 'Structured Query Language', 'Scripting Query Language', 'Strange Query Language'],
        correctAnswer: 1,
    },
    {
        question: 'What is a common table expression (CTE)?',
        answers: ['It is a powerful construct in SQL that helps simplify a query', 'It is a common way to define table via regular expression', 
                    'It is an expression that runs on multiple tables sharing a common structure', 'None of the previous'],
        correctAnswer: 0,
    },
    {
        question: 'What is data analysis?',
        answers: ['Association of rules that provide information in the form of "if-then" statements', 
                    'An analysis of the bits that compose a bunch of data', 'Set of graphs and pivot table in a spreadsheet.', 
                    'The science of examining raw data with the purpose of supporting decision-making'],
        correctAnswer: 3,
    },
    {
        question: 'What is the difference between SQL databases and NoSQL databases?',
        answers: ['The former is for relational data model, while the latter is for non relational data model', 
                    'The former scales better vertically, while the latter scales better horizontally', 
                    'All three are correct', 'The former is based on ACID constraints, while the latter is based on BASE constraints'],
        correctAnswer: 2,
    },
];

function getRandomQuiz(q: Quiz[]){
    const r = Math.floor(Math.random() * q.length);

    return q[r];
}

export function getRandomThreeQuiz(): Quiz[] {
    const quiz: Quiz[] = [];
    quiz.push(getRandomQuiz(dlt));
    quiz.push(getRandomQuiz(crypto));
    quiz.push(getRandomQuiz(data));

	return quiz;
}

