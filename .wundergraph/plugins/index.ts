import { countries } from "./countries";
import _ from 'lodash';

export const plugins = {
	configs: [ countries.config ],
	operations: _.merge({}, countries.operations),
	servers: _.merge({}, countries.server),
};
