import type { FieldSet } from 'airtable';
import { fetchAirtableRecords } from '@/lib/controllers/airtableRecords';

type ProductFields = FieldSet & {
  fld5JzdkMX1jC3n3U?: string;
};

export default async function DataTestPage() {
  const records = await fetchAirtableRecords<ProductFields>({
    tableName: 'Products',
    view: 'All Products',
    returnFieldsByFieldId: true,
  });

  return (
    <main className="mx-auto flex max-w-2xl flex-col gap-6 px-4 py-12">
      <div>
        <p className="text-sm uppercase tracking-wide text-neutral-500">
          Data Test
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">
          Airtable Products
        </h1>
        <p className="mt-2 text-base text-neutral-600">
          Listing every record from the “All Products” view using the Airtable
          controller.
        </p>
      </div>

      <ul className="divide-y divide-neutral-200 rounded-lg border border-neutral-200 bg-white shadow-sm">
        {records.map((record) => {
          const productName = record.fields.fld5JzdkMX1jC3n3U;
          return (
            <li key={record.id} className="px-4 py-3">
              <p className="text-base font-medium text-neutral-900">
                {productName || 'Untitled product'}
              </p>
              <p className="text-xs text-neutral-500">Record ID: {record.id}</p>
            </li>
          );
        })}
      </ul>
    </main>
  );
}

