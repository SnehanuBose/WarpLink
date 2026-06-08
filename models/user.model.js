import { uuid, pgTable, varchar , text,timestamp} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),

  firstname: varchar('first_name',{ length: 255 }).notNull(),
  lastname: varchar('last_name',{ length: 255 }).notNull(),

  username: varchar({ length: 30 }).notNull().unique(),
  email: varchar({ length: 120 }).notNull().unique(),
  password: text().notNull(),

  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().$onUpdate(()=> new Date())
});
