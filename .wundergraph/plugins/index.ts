import { countries } from "./countries";
import _ from 'lodash';

export const plugins = {
	configs: [ countries.config ],
	operations: _.merge({}, countries.operations),
	servers: _.merge({}, countries.server),
};




// export const loadOperations = async (schemaFileName: string): Promise<LoadOperationsOutput> => {
// 	const operationsPath = path.join(process.env.WG_DIR_ABS!, 'operations');
// 	const fragmentsPath = path.join(process.env.WG_DIR_ABS!, 'fragments');
// 	const schemaFilePath = path.join(process.env.WG_DIR_ABS!, 'generated', schemaFileName);
// 	const outFilePath = path.join(process.env.WG_DIR_ABS!, 'generated', 'wundergraph.operations.json');
// 	// stdout is not displayed intentionally
// 	// we are only interested in the final result
// 	const result = await wunderctl({
// 		cmd: ['loadoperations', operationsPath, fragmentsPath, schemaFilePath],
// 	});
// 	if (result?.failed) {
// 		throw new Error(`Could not load operations: ${result?.stderr}`);
// 	}

// 	const output = fs.readFileSync(outFilePath, 'utf8');
// 	const out = JSON.parse(output) as LoadOperationsOutput;

// 	out.info?.forEach((msg) => Logger.info(msg));
// 	out.errors?.forEach((msg) => Logger.error(msg));

// 	const isTuiEnabled = process.env.WG_ENABLE_TUI === 'true';

// 	if (isTuiEnabled && out.errors?.length) {
// 		if (out.invalid?.length) {
// 			throw new Error(`Could not load operation '${out.invalid[0]}': ${out.errors[0]}`);
// 		} else {
// 			throw new Error(`Could not load operation: ${out.errors[0]}`);
// 		}
// 	}

// 	return out;
// };