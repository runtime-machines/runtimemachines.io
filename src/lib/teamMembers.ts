export interface TeamMemberProps {
	img: { src: string; alt: string };
	name: string;
	role: string;
	linkedin?: string;
}

export const TeamMembers: TeamMemberProps[] = [
	{
		img: {
			src: '/assets/avatars/emanuele_ragnoli.png',
			alt: 'Emanuele Ragnoli',
		},
		name: 'Emanuele Ragnoli',
		role: 'co-CEO, CTO',
		linkedin: 'https://www.linkedin.com/in/emanuele-ragnoli-a33b57/',
	},
	{
		img: {
			src: '/assets/avatars/roberto_ripamonti.png',
			alt: 'Roberto Ripamonti',
		},
		name: 'Roberto Ripamonti',
		role: 'Lead Software Engineer',
		linkedin: 'https://www.linkedin.com/in/roberto-ripamonti/',
	},
	{
		img: {
			src: '/assets/avatars/gokhan_sagirlar.png',
			alt: 'Gokhan Sagirlar',
		},
		name: 'Gokhan Sagirlar',
		role: 'Technical Leader',
	},
	{
		img: {
			src: '/assets/avatars/simone_bottoni.png',
			alt: 'Simone Bottoni',
		},
		name: 'Simone Bottoni',
		role: 'Technical Leadear',
		linkedin: 'https://www.linkedin.com/in/simone-bottoni/',
	},
	{
		img: {
			src: '/assets/avatars/alberto_trombetta.png',
			alt: 'Alberto Trombetta',
		},
		name: 'Alberto Trombetta',
		role: 'Scientific Advisor',
		linkedin: 'https://www.linkedin.com/in/albertotrombetta/',
	},
	{
		img: {
			src: '/assets/avatars/achille_lambrughi.png',
			alt: 'Achille Lambrughi',
		},
		name: 'Achille Lambrughi',
		role: 'Blockchain Engineer',
		linkedin: 'https://www.linkedin.com/in/achillelamb/',
	},
	{
		img: {
			src: '/assets/avatars/erika_reale.png',
			alt: 'Erika Reale',
		},
		name: 'Erika Reale',
		role: 'Applied Cryptographer',
		linkedin: 'https://www.linkedin.com/in/erikareale/',
	},
	{
		img: {
			src: '/assets/avatars/christian_rondanini.png',
			alt: 'Christian Rondanini',
		},
		name: 'Christian Rondanini',
		role: 'Technical Leadear',
		linkedin: 'https://www.linkedin.com/in/christianrondanini/',
	},
	{
		img: {
			src: '/assets/avatars/gianluca_stefanoni.png',
			alt: 'Gianluca Stefanoni',
		},
		name: 'Gianluca Stefanoni',
		role: 'Frontend Developer',
		linkedin: 'https://www.linkedin.com/in/gianluca-stefanoni-7818a9168/',
	},
	{
		img: {
			src: '/assets/avatars/nadia_fabrizio.png',
			alt: 'Nadia Fabrizio',
		},
		name: 'Nadia Fabrizio',
		role: 'co-CEO, COO',
		linkedin: 'https://www.linkedin.com/in/nadiafabrizio/',
	},
	{
		img: {
			src: '/assets/avatars/arsenii_ronzhyn.png',
			alt: 'Arsenii Ronzhyn',
		},
		name: 'Arsenii Ronzhyn',
		role: 'Blockchain Engineer',
		linkedin: 'https://www.linkedin.com/in/arsenii-ronzhyn/',
	},
	{
		img: {
			src: '/assets/avatars/mirko_trapani.png',
			alt: 'Mirko Trapani',
		},
		name: 'Mirko Trapani',
		role: 'Applied Cryptographer',
	},
	{
		img: {
			src: '/assets/avatars/elia_maggioni.png',
			alt: 'Elia Maggioni',
		},
		name: 'Elia Maggioni',
		role: 'DevOps Engineer',
		linkedin: 'https://www.linkedin.com/in/elia-maggioni-0093a51b6/',
	},
	{
		img: {
			src: '/assets/avatars/paolo_bonomi.png',
			alt: 'Paolo Bonomi',
		},
		name: 'Paolo Bonomi',
		role: 'Software Engineer',
		linkedin: 'https://www.linkedin.com/in/pbonomi/',
	},
	{
		img: {
			src: '/assets/avatars/shyam_duraiswami.png',
			alt: 'Shyam Duraiswami',
		},
		name: 'Shyam Duraiswami',
		role: 'Chief Stategist',
		linkedin: 'https://www.linkedin.com/in/shyam-durai/',
	},
	{
		img: {
			src: '/assets/avatars/alberts_celmins.png',
			alt: 'Alberts Celmins',
		},
		name: 'Alberts Celmins',
		role: 'Business Developer Intern',
		linkedin: 'https://www.linkedin.com/in/alberts-celmins/',
	},
	{
		img: {
			src: '/assets/avatars/benedek_orban.png',
			alt: 'Benedek Orban',
		},
		name: 'Benedek Orban',
		role: 'Head of Business Dev & Partnerships',
		linkedin: 'https://www.linkedin.com/in/benedekorban/',
	},
	{
		img: {
			src: '/assets/avatars/davide_bellucci.png',
			alt: 'Davide Bellucci',
		},
		name: 'Davide Bellucci',
		role: 'Frontend Developer',
		linkedin: 'https://www.linkedin.com/in/davide-bellucci-72b884264/',
	},
	{
		img: {
			src: '/assets/avatars/geert_schute.png',
			alt: 'Geert Schute',
		},
		name: 'Geert Schute',
		role: 'Business Advisor',
		linkedin: 'https://www.linkedin.com/in/geert-schute-/',
	},
];

export function shuffleArray(array: TeamMemberProps[]) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}

export function randomTeamMembers(): TeamMemberProps[] {
	let val = TeamMembers.slice(0);
	shuffleArray(val);
	return val;
}
