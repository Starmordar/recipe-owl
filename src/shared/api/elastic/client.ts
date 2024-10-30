import { Client } from '@elastic/elasticsearch';

const elasticClient = () => {
  return new Client({ node: process.env.ELASTIC_NODE });
};

declare global {
  // eslint-disable-next-line no-var
  var elasticGlobal: undefined | ReturnType<typeof elasticClient>;
}

const elastic = globalThis.elasticGlobal ?? elasticClient();
if (process.env.NODE_ENV !== 'production') globalThis.elasticGlobal = elastic;

export { elastic };
