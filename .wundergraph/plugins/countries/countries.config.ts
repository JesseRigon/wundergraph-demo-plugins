import { introspect } from "@wundergraph/sdk";
const countriesConfig = introspect.graphql({
	apiNamespace: 'countries',
	url: 'https://countries.trevorblades.com/graphql',
});

export default countriesConfig