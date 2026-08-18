import { pgTable, serial, text, timestamp, integer } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const podcasts = pgTable('podcasts', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  coverImageUrl: text('cover_image_url'),
  ownerId: integer('owner_id').notNull().references(() => users.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const episodes = pgTable('episodes', {
  id: serial('id').primaryKey(),
  podcastId: integer('podcast_id').notNull().references(() => podcasts.id),
  title: text('title').notNull(),
  description: text('description'),
  durationSeconds: integer('duration_seconds'),
  publishedAt: timestamp('published_at').defaultNow().notNull(),
});
