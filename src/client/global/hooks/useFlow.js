import { useContext } from 'react';
import { FlowContext } from '../contexts/flow';

export const useFlow = () => {
	return useContext(FlowContext);
};
