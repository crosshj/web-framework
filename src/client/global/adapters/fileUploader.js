import { FileUploader } from '../components';

export const fileUploaderAdapter = ({ label, props }) => {
	return { Component: FileUploader, label, ...props };
};
