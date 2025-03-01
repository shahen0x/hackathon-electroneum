import { format, parseISO } from 'date-fns';

export const formatDate = (
	dateString: string | undefined | null,
	dateFormat: string = 'dd MMM HH:mm'
): string => {
	if (!dateString) return '';
	const date = parseISO(dateString);
	return format(date, dateFormat);
};
