import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';

import { Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import { SQLiteProvider, type SQLiteDatabase } from 'expo-sqlite';

import { useColorScheme } from '@/hooks/use-color-scheme';

const DATABASE_VERSION = 1;

export default function RootLayout() {
  const colorScheme = useColorScheme();

  // TODO: Initialize SQLite DB here

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <SQLiteProvider databaseName='odom.db' onInit={migrateDb}>
        <Stack>
          <Stack.Screen name="index" options={{ title: "Home" }} />
          <Stack.Screen name="[tripId]" options={{ title: "Trip Information" }} />
          <Stack.Screen name="car" options={{ title: "Add Car" }} />
          <Stack.Screen name="leg" options={{ title: "Trip Leg" }} />
        </Stack>
        <StatusBar style="auto" />
      </SQLiteProvider>
    </ThemeProvider>
  );
}

async function migrateDb(db: SQLiteDatabase): Promise<void> {
  // TODO: Delete this when version 1 schema is finalized
  await db.execAsync(`
    DROP TABLE IF EXISTS legs;
    DROP TABLE IF EXISTS trips;
`);

  let { user_version: currentDbVersion } = await db.getFirstAsync<{ user_version: number }>(
    "PRAGMA user_version"
  ) ?? { user_version: 0 };

  if (currentDbVersion >= DATABASE_VERSION) {
    return;
  }

  if (currentDbVersion === 0) {
    await db.execAsync(`
      PRAGMA journal_mode = 'wal';
      PRAGMA foreign_keys = 'on';
      CREATE TABLE trips (
        id INTEGER PRIMARY KEY NOT NULL,
        name VARCHAR(255) NOT NULL
      );
      CREATE TABLE legs (
        id INTEGER PRIMARY KEY NOT NULL,
        name VARCAR(255) NOT NULL,
        distance VARCHAR(8) NOT NULL,
        tripId INTEGER NOT NULL,
        FOREIGN KEY (tripId) REFERENCES trips(id)
      );
    `);
  }
  // TODO: uncomment this when ready to finialize schema for version 1
  // await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}
