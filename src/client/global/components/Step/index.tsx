import { Box } from '@mui/material';
import { StepButtons } from '..';

export const Step = ({
	previousButtonLabel = 'Back',
	nextButtonLabel = 'Continue',
	children,
	isLastStep = false,
	handleBack,
	handleForward,
}) => {
	return (
		<>
			<Box spacing={1}>{children}</Box>
			{!isLastStep && (
				<StepButtons
					previousButtonLabel={previousButtonLabel}
					nextButtonLabel={nextButtonLabel}
					handleBack={handleBack}
					handleForward={handleForward}
				/>
			)}
		</>
	);
};
