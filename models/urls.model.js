import { uuid, pgTable, varchar , text,timestamp} from "drizzle-orm/pg-core";
import { usersTable } from "./user.model.js";

export const urlsTable = pgTable("urls", {
  id: uuid().primaryKey().defaultRandom(),

  shortCode: varchar("code",{length: 10 }).notNull().unique(),
  targetUrl: text("target_url").notNull(),
  userId: uuid("user_id").notNull().references(() => usersTable.id),

  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().$onUpdate(()=> new Date())
});
