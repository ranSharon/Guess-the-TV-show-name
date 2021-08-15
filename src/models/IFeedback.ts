type AlertSeverity = 'error' | 'info' | 'success' | 'warning';

export interface IFeedback {
	show: boolean;
	message: string;
	color: AlertSeverity;
}
