'use client';

import { Box, Stack } from '@mui/material';
import styles from './page.module.css';
import { TeamMembers } from '../../../mockedData';
import MemberCard from '../components/about-us/MemberCard';

const page = () => {
	return (
		<main className={styles.main}>
			<Stack spacing={5} className="textBox" textAlign="center">
				<h1 className="boxTitle">The hive mind behind RunTime Machines</h1>
				<p className="boxSubtitle">
					Jorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet
					odio mattis.
				</p>
			</Stack>

			<Box className={styles.cardsContainer}>
				{TeamMembers.map((member, index) => (
					<MemberCard key={index} image={member.img} name={member.name} role={member.role} />
				))}
			</Box>
		</main>
	);
};

export default page;
