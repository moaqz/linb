import CollectionRow from "./collection-row";
import { Collection } from "../types";

function CollectionTable({ collections }: { collections: Collection[] }) {
  return (
    <div className="mt-4 overflow-x-auto shadow-md border-2 border-black bg-white">
      <table className="w-full text-sm text-left">
        <thead className="text-xs uppercase [&>tr>th]:px-6 [&>tr>th]:py-3">
          <tr className="border-b-2 border-black">
            <th scope="col">Name</th>
            <th scope="col">Created at</th>
            <th scope="col">Visibility</th>
            <th scope="col"></th>
          </tr>
        </thead>

        <tbody className="[&_tr:last-child]:border-0">
          {collections && collections.length
            ? (
              collections.map((collection) => (
                <CollectionRow key={crypto.randomUUID()} {...collection} />
              ))
            )
            : (
              <tr>
                <td
                  className="p-4 font-medium text-gray-900 text-base"
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
