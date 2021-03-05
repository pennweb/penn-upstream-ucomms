// Media queries
const mq_xsmall = 0;
const mq_small = 600;
const mq_medium = 848;
const mq_large = 1024;
const mq_xlarge = 1200;

export default {
	'small_up': `(min-width: ${mq_small}px)`,
	'medium_up': `(min-width: ${mq_medium}px)`,
	'large_up': `(min-width: ${mq_large}px)`,
	'xlarge_up': `(min-width: ${mq_xlarge}px)`,
	
	'small_down': `(max-width: ${mq_medium - 1}px)`,
	'medium_down': `(max-width: ${mq_large - 1}px)`,
	'large_down': `(max-width: ${mq_xlarge - 1}px)`,
	
	'xsmall_only': `(min-width: ${mq_xsmall}px) and (max-width: ${mq_small - 1}px)`,
	'small_only': `(min-width: ${mq_small}px) and (max-width: ${mq_medium - 1}px)`,
	'medium_only': `(min-width: ${mq_medium}px) and (max-width: ${mq_large - 1}px)`,
	'large_only': `(min-width: ${mq_large}px) and (max-width: ${mq_xlarge - 1}px)`,
	'xlarge_only': `(min-width: ${mq_xlarge}px)`,

	'coarse_pointer': '( -moz-touch-enabled: 1), (pointer: coarse)',
	'fine_pointer': '( -moz-touch-enabled: 0), (pointer: fine)',

	'admin_bar_mobile': '(min-width: 0px) and (max-width: 600px)',
	'admin_bar_tablet': '(min-width: 601px) and (max-width: 781px)',
	'admin_bar_desktop': '(min-width: 782px)',
}
