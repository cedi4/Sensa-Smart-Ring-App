import * as SQLite from 'expo-sqlite';

// This file is responsible for managing the SQLite database for the Sensa Smart Ring App.
//sensa-ring.db is the name of the database file
export const appDb = SQLite.openDatabaseAsync('sensa-ring.db');

export async function initializeDatabase() {
  const db = await appDb;

  await db.execAsync(`
    PRAGMA journal_mode = WAL;

    //Create a table for storing device events
    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      device_event_id INTEGER NOT NULL,
      event_type TEXT NOT NULL,
      timestamp TEXT NOT NULL,
      confidence INTEGER NOT NULL,
      battery_level INTEGER NOT NULL,
      source TEXT NOT NULL
    );
    //Create a table for storing the status of the ring
    CREATE TABLE IF NOT EXISTS ringStatus (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      timestamp TEXT NOT NULL,
      battery_level INTEGER NOT NULL,
      connected INTEGER NOT NULL
    );
  `);
}