import { useHubspotForm } from 'next-hubspot';
import styles from './hubspotForm.module.css';
import { Skeleton, Stack } from '@mui/material';
import { useEffect, useState } from 'react';

const HubspotForm = () => {
	const [isLoaded, setIsLoading] = useState(false);
	useEffect(() => {
		setTimeout(() => {
			setIsLoading(true);
		}, 500);
	}, []);
	//TODO: add CSS styling
	// ref: https://legacydocs.hubspot.com/docs/methods/forms/advanced_form_options
	const { loaded, error, formCreated } = useHubspotForm({
		portalId: '27093460',
		formId: '3580d67b-b042-4c3f-af72-1e1a08667418',
		target: '#hubspot-form-wrapper',
	});

	const showSkeleton = !loaded && !isLoaded;

	return (
		<>
			<div id="hubspot-form-wrapper" className={styles.formWrapper} hidden={!loaded && !isLoaded} />
			{showSkeleton && (
				<Stack spacing={1}>
					<Skeleton height={90} sx={{ backgroundColor: 'grey' }} />
					<Skeleton height={90} sx={{ backgroundColor: 'grey' }} />
					<Skeleton height={90} sx={{ backgroundColor: 'grey' }} />
					<Skeleton height={70} sx={{ backgroundColor: 'grey' }} />
					<Skeleton height={70} sx={{ backgroundColor: 'grey' }} />
					<Skeleton height={200} sx={{ backgroundColor: 'grey' }} />
					<Skeleton height={50} sx={{ backgroundColor: 'grey' }} />
					<Skeleton height={100} sx={{ backgroundColor: 'grey' }} />
				</Stack>
			)}
		</>
	);
};

export default HubspotForm;
