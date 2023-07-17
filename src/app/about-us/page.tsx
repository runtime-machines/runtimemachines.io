'use client';

import { Box, Stack } from '@mui/material';
import styles from './page.module.css';
import { TeamMembers } from '../../lib/teamMembers';
import MemberCard from '../components/about-us/MemberCard';

const page = () => {
	//TODO: call randomTeamMembers()
	const teamMembers = TeamMembers.sort(() => Math.random() - 0.5);
	return (
		<main className={styles.main}>
			<Stack spacing={5} className="textBox" textAlign="center">
				<h1 className="boxTitle">The team</h1>
				<p className="boxSubtitle">
					A hive mind of leading computer scientists, Mathematicians, Cryptologists (5 PhDs), Software engineers, Smart
					Contract engineers for all major blockchain programming languages, and Web3/DLT experts, located in
					Switzerland.
				</p>
			</Stack>

			<Box className={styles.cardsContainer}>
				{teamMembers.map((member, index) => (
					<MemberCard key={index} img={member.img} name={member.name} role={member.role} linkedin={member.linkedin} />
				))}
			</Box>
		</main>
	);
};

export default page;
