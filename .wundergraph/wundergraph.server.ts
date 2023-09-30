import { configureWunderGraphServer } from '@wundergraph/sdk/server';
import _ from 'lodash'
import { plugins } from './plugins';

const baseServers = configureWunderGraphServer(() => ({
	hooks: {
		queries: {},
		mutations: {},
	},
	graphqlServers: [],
}));

// const servers = _.merge(baseServers, plugins.operations);

export default baseServers;