import { configureWunderGraphOperations } from '@wundergraph/sdk';
import type { OperationsConfiguration } from '../../generated/wundergraph.operations';

const countriesOperations = configureWunderGraphOperations<OperationsConfiguration>({
	operations: {
		defaultConfig: {
			authentication: {
				required: false,
			},
		},
		queries: (config) => ({
			...config,
			caching: {
				enable: false,
				staleWhileRevalidate: 60,
				maxAge: 60,
				public: true,
			},
			liveQuery: {
				enable: true,
				pollingIntervalSeconds: 1,
			},
		}),
		mutations: (config) => ({
			...config,
		}),
		subscriptions: (config) => ({
			...config,
		}),
		custom: {
			Country: (config) => ({
				...config,
				caching: {
					...config.caching,
					enable: true,
				},
			})
		}	
	}
});

export default countriesOperations;