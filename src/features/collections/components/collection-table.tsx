import { Collection } from "../types";
import CollectionRow from "./collection-row";

function CollectionTable({ collections }: { collections: Collection[] }) {
  return (
    <div className="mt-4 overflow-x-auto rounded border-2 border-black bg-white shadow-neo">
      <table className="w-full text-left text-sm">
        <thead className="text-xs uppercase [&>tr>th]:px-6 [&>tr>th]:py-3">
          <tr className="border-b-2 border-black">
            <th scope="col">Name</th>
            <th scope="col">Created at</th>
            <th scope="col">Visibility</th>
            <th scope="col" />
          </tr>
        </thead>

        <tbody className="[&_tr:last-child]:border-0">
          {collections.length ? (
            collections.map((collection) => (
              <CollectionRow key={crypto.randomUUID()} {...collection} />
            ))
          ) : (
            <tr>
              <td
                className="p-4 text-base font-medium text-gray-900"
                colSpan={4}
              >
                No collections found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CollectionTable;
