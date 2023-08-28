import CollectionRow from "./collection-row";

export type Collection = {
  id: number;
  name: string;
  user_id: string;
  visibility: "public" | "private" | null;
  created_at: Date | null;
};

async function CollectionList({ collections }: { collections: Collection[] }) {
  return (
    <table className="mt-4 bg-white w-full border-2 border-black">
      <thead>
        <tr className="border-2 border-black [&>th]:p-2 [&>th]:text-start">
          <th>Name</th>
          <th className="hidden sm:table-cell">Created at</th>
          <th>Visiblity</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        {collections && collections.length ? (
          collections.map((collection) => {
            return <CollectionRow key={crypto.randomUUID()} {...collection} />;
          })
        ) : (
          <tr>
            <td className="text-lg text-center font-semibold py-4" colSpan={4}>
              No collections found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default CollectionList;
