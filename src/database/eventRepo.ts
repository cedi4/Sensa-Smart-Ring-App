import { appDb } from './database';

export type RingEvent = {
  id?: number;
  deviceEventId: number;
  eventType: string;
  timestamp: string;
  confidence: number;
  batteryLevel: number;
  source: 'mock-ble' | 'ble';
};

export async function addEvent(event: RingEvent) {
  const db = await appDb;

  await db.runAsync(
    `INSERT INTO events
      (device_event_id, event_type, timestamp, confidence, battery_level, source)
     VALUES (?, ?, ?, ?, ?, ?)`,
    event.deviceEventId,
    event.eventType,
    event.timestamp,
    event.confidence,
    event.batteryLevel,
    event.source
  );
}

export async function getAllEvents(): Promise<RingEvent[]> {
  const db = await appDb;

  return db.getAllAsync<RingEvent>(
    `SELECT
       id,
       device_event_id AS deviceEventId,
       event_type AS eventType,
       timestamp,
       confidence,
       battery_level AS batteryLevel,
       source
     FROM events
     ORDER BY timestamp DESC`
  );
}

export async function deleteAllEvents() {
  const db = await appDb    ;
  await db.runAsync('DELETE FROM events');
}