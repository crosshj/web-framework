import { useContext } from 'react';
import { FlowContext } from '../contexts';

export const useFlow = () => {
	return useContext(FlowContext);
};
