import Airtable, { type Base, type FieldSet, type Table } from 'airtable';

let cachedBase: Base | null = null;

function ensureEnv(name: 'AIRTABLE_API_KEY' | 'AIRTABLE_BASE_ID'): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Missing required environment variable "${name}". Set it in your .env.local file.`
    );
  }

  return value;
}

function initBase(): Base {
  const apiKey = ensureEnv('AIRTABLE_API_KEY');
  const baseId = ensureEnv('AIRTABLE_BASE_ID');

  Airtable.configure({ apiKey });
  return Airtable.base(baseId);
}

export function getAirtableBase(): Base {
  if (!cachedBase) {
    cachedBase = initBase();
  }

  return cachedBase;
}

export function getAirtableTable<TFields extends FieldSet = FieldSet>(
  tableName: string
): Table<TFields> {
  if (!tableName) {
    throw new Error('Airtable table name is required.');
  }

  return getAirtableBase().table<TFields>(tableName);
}

