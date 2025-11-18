import type {
  FieldSet,
  Record as AirtableRecord,
  Records as AirtableRecords,
  SelectOptions,
} from 'airtable';
import { getAirtableTable } from '../airtableClient';

export type FetchRecordsOptions<TFields extends FieldSet> = {
  tableName: string;
} & SelectOptions<TFields>;

export async function fetchAirtableRecords<TFields extends FieldSet>(
  options: FetchRecordsOptions<TFields>
): Promise<AirtableRecords<TFields>> {
  const { tableName, ...selectOptions } = options;
  const table = getAirtableTable<TFields>(tableName);

  return table.select(selectOptions).all();
}

export async function fetchAirtableRecordById<TFields extends FieldSet>(
  tableName: string,
  recordId: string
): Promise<AirtableRecord<TFields>> {
  if (!recordId) {
    throw new Error('Airtable record ID is required.');
  }

  const table = getAirtableTable<TFields>(tableName);
  return table.find(recordId);
}

