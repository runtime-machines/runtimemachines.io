import { useHubspotForm } from 'next-hubspot';

const HubspotForm = () => {
    //TODO: add CSS styling
    // ref: https://legacydocs.hubspot.com/docs/methods/forms/advanced_form_options
	const { loaded, error, formCreated } = useHubspotForm({
		portalId: '27093460',
		formId: '3580d67b-b042-4c3f-af72-1e1a08667418',
		target: '#hubspot-form-wrapper',
	});

	return <div id="hubspot-form-wrapper" />;
};

export default HubspotForm;
