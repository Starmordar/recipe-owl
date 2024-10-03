import path from 'path';

import { Client } from '@elastic/elasticsearch';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: path.resolve(__dirname, '../../.env') });

const client = new Client({ node: process.env.ELASTIC_NODE });

const indices = [
  {
    name: 'recipes',
    body: {
      settings: {
        number_of_shards: 1,
        number_of_replicas: 1,
      },
      mappings: {
        properties: {
          title: { type: 'text' },
          description: { type: 'text' },
          imageUrl: { type: 'keyword', index: false },
          ingredients: { type: 'text' },
          createdAt: { type: 'date' },
          createdById: { type: 'keyword' },
        },
      },
    },
  },
];

async function createIndices() {
  Promise.allSettled(indices.map(({ name, body }) => createIndex({ name, body })));
}

async function createIndex({ name, body }: { name: string; body: Record<string, unknown> }) {
  try {
    const response = await client.indices.create({ index: name, body });
    console.log('Index created:', response);
  } catch (error) {
    console.error('Error creating index:', error);
  }
}

createIndices();
