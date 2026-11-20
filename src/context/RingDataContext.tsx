import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';

import { initializeDatabase } from '@/database/database';

import {
  getAllEvents,
  addEvent as insertEvent,
  deleteAllEvents as removeAllEvents,
  RingEvent,
} from '@/database/eventRepo';

type RingData = {
  connected: boolean;
  battery: number;
  events: RingEvent[];

  setConnected: (value: boolean) => void;
  updateBattery: (value: number) => void;
  addEvent: (event: RingEvent) => Promise<void>;
  connectMockRing: () => void;
  disconnectMockRing: () => void;
  clearEvents: () => Promise<void>;
};

const RingDataContext =
  createContext<RingData | null>(null);

export function RingDataProvider({
  children,
}: PropsWithChildren) {
  const [connected, setConnected] =
    useState(false);

  const [battery, setBattery] =
    useState(100);

  const [events, setEvents] =
    useState<RingEvent[]>([]);

  useEffect(() => {
    async function loadDatabaseData() {
      await initializeDatabase();

      const savedEvents = await getAllEvents();

      setEvents(savedEvents);
    }

    loadDatabaseData().catch((error) => {
      console.error(
        'Failed to initialize database:',
        error
      );
    });
  }, []);

  const updateBattery = (value: number) => {
    const safeBattery = Math.min(
      100,
      Math.max(0, value)
    );

    setBattery(safeBattery);
  };

 const addEvent = async (event: RingEvent) => {
  // Save the event to SQLite
  await insertEvent(event);

  // Update the battery display using the manually entered value
  updateBattery(event.batteryLevel);

  // Add the event to the visible event list
  setEvents((currentEvents) => [
    event,
    ...currentEvents,
  ]);
};

  // This must be outside the useEffect
  const clearEvents = async () => {
    await removeAllEvents();

    // Immediately clear the events shown in the app
    setEvents([]);
  };

  const connectMockRing = () => {
    setConnected(true);
    setBattery(100);
  };

  const disconnectMockRing = () => {
    setConnected(false);
  };

  return (
    <RingDataContext.Provider
      value={{
        connected,
        battery,
        events,
        setConnected,
        updateBattery,
        addEvent,
        connectMockRing,
        disconnectMockRing,

        // This makes clearEvents available
        // to listOfEventsScreen.tsx
        clearEvents,
      }}
    >
      {children}
    </RingDataContext.Provider>
  );
}

export function useRingData() {
  const context = useContext(RingDataContext);

  if (!context) {
    throw new Error(
      'useRingData must be used inside RingDataProvider'
    );
  }

  return context;
}