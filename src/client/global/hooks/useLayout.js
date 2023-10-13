import { LayoutContext } from '../contexts';
import { useContext } from 'react';

export const useLayout = () => {
	return useContext(LayoutContext);
};
