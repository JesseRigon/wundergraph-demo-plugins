import { configureWunderGraphServer } from '@wundergraph/sdk/server';
import _ from 'lodash'
import { plugins } from './plugins';

export default configureWunderGraphServer(() => ({
	hooks: {
		queries: {},
		mutations: {},
	},
	graphqlServers: [],
}));

