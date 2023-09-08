import {
  pgEnum,
  pgTable,
  serial,
  text,
  integer,
  timestamp,
  index,
} from "drizzle-orm/pg-core";

export const visibilityEnum = pgEnum("visibility", ["public", "private"]);

export const collections = pgTable(
  "collections",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    visibility: visibilityEnum("visibility").notNull().default("private"),
    user_id: text("user_id").notNull(),
    created_at: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => {
    return {
      userIdx: index("user_id_idx").on(table.user_id),
    };
  },
);

export const links = pgTable(
  "links",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    url: text("url").notNull(),
    collection_id: integer("collection_id")
      .notNull()
      .references(() => collections.id),
    user_id: text("user_id").notNull(),
    created_at: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => {
    return {
      userCollectionIdx: index("user_collection_idx").on(
        table.user_id,
        table.collection_id,
      ),
    };
  },
);
