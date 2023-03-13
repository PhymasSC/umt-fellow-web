export const EMAIL_PATTERN = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
export const PASSWORD_PATTERN = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
export const URL_PATTERN =
	/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
export const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
export const TIME_PATTERN = /^([01]\d|2[0-3]):?([0-5]\d):?([0-5]\d)$/;
export const DATETIME_PATTERN =
	/^\d{4}-\d{2}-\d{2}T([01]\d|2[0-3]):?([0-5]\d):?([0-5]\d)Z$/;
export const HEX_PATTERN = /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i;
