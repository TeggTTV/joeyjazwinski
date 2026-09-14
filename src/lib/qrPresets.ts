/**
 * Helper formats for structured QR code payloads.
 */

export interface WifiPayload {
	ssid: string;
	password?: string;
	encryption: 'WPA' | 'WEP' | 'nopass';
	hidden?: boolean;
}

export interface VCardPayload {
	firstName: string;
	lastName: string;
	phone?: string;
	email?: string;
	company?: string;
	title?: string;
	website?: string;
}

export interface EmailPayload {
	email: string;
	subject?: string;
	body?: string;
}

export interface SmsPayload {
	phone: string;
	message?: string;
}

export function formatWifiQr(data: WifiPayload): string {
	const enc = data.encryption || 'WPA';
	const pass = data.password ? `P:${data.password};` : '';
	const hidden = data.hidden ? 'H:true;' : '';
	return `WIFI:T:${enc};S:${data.ssid};${pass}${hidden};`;
}

export function formatVCardQr(data: VCardPayload): string {
	const fullName = `${data.firstName} ${data.lastName}`.trim();
	const lines = [
		'BEGIN:VCARD',
		'VERSION:3.0',
		`N:${data.lastName};${data.firstName};;;`,
		`FN:${fullName}`,
	];
	if (data.company) lines.push(`ORG:${data.company}`);
	if (data.title) lines.push(`TITLE:${data.title}`);
	if (data.phone) lines.push(`TEL;TYPE=CELL:${data.phone}`);
	if (data.email) lines.push(`EMAIL:${data.email}`);
	if (data.website) lines.push(`URL:${data.website}`);
	lines.push('END:VCARD');
	return lines.join('\n');
}

export function formatEmailQr(data: EmailPayload): string {
	const params: string[] = [];
	if (data.subject) params.push(`subject=${encodeURIComponent(data.subject)}`);
	if (data.body) params.push(`body=${encodeURIComponent(data.body)}`);
	const query = params.length > 0 ? `?${params.join('&')}` : '';
	return `mailto:${data.email}${query}`;
}

export function formatSmsQr(data: SmsPayload): string {
	if (data.message) {
		return `smsto:${data.phone}:${data.message}`;
	}
	return `smsto:${data.phone}`;
}
