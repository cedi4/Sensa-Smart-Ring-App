import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  getAllEvents,
  addEvent as insertEvent,
  RingEvent,
} from '@/database/eventRepo';

import { initializeDatabase } from '@/database/database';
import { startMockBle } from '@/services/mockBleService';

type RingData = {
  // Current connection status
  connected: boolean;

  // Current battery percentage
  battery: number;

  // Events currently loaded in the app
  events: RingEvent[];

  // Changes connection status
  setConnected: (value: boolean) => void;

  // Changes battery value
  updateBattery: (value: number) => void;

  // Saves an event to SQLite and React state
  addEvent: (event: RingEvent) => Promise<void>;

  // Starts the fake BLE service
  connectMockRing: () => void;

  // Stops the fake BLE service
  disconnectMockRing: () => void;
};

// Creates the shared context.
const RingDataContext =
  createContext<RingData | null>(null);

export function RingDataProvider({
  children,
}: PropsWithChildren) {
  // The app starts disconnected.
  const [connected, setConnected] =
    useState(false);

  // The app starts with a full battery.
  const [battery, setBattery] =
    useState(100);

  // The app starts with no events in memory.
  const [events, setEvents] =
    useState<RingEvent[]>([]);

  // Stores the cleanup function returned
  // by startMockBle().
  const mockCleanupRef =
    useRef<(() => void) | null>(null);

  // Initialize SQLite and then load saved events.
  useEffect(() => {
    async function loadDatabaseData() {
      // Create the tables if they do not exist.
      await initializeDatabase();

      // Read saved events from SQLite.
      const savedEvents = await getAllEvents();

      // Put the saved events into React state.
      setEvents(savedEvents);
    }

    loadDatabaseData().catch((error) => {
      console.error(
        'Failed to initialize database:',
        error
      );
    });
  }, []);

  // Updates the battery while keeping it
  // between 0 and 100.
  const updateBattery = (value: number) => {
    const safeBattery = Math.min(
      100,
      Math.max(0, value)
    );

    setBattery(safeBattery);
  };

  // Saves an event to SQLite and updates
  // the events currently visible in the app.
  const addEvent = async (event: RingEvent) => {
    // Save the event permanently.
    await insertEvent(event);

    // Add the event to the beginning
    // of the visible event list.
    setEvents((currentEvents) => [
      event,
      ...currentEvents,
    ]);
  };

  // Starts the fake BLE service.
  const connectMockRing = () => {
    // Do not start it twice.
    if (mockCleanupRef.current) {
      return;
    }

    // Start mock BLE and connect its callbacks
    // to the context functions.
    mockCleanupRef.current = startMockBle({
      onConnectionChange: setConnected,
      onBattery: updateBattery,
      onEvent: addEvent,
    });
  };

  // Stops the fake BLE service.
  const disconnectMockRing = () => {
    if (mockCleanupRef.current) {
      // Stop the battery and event timers.
      mockCleanupRef.current();

      // Mark the mock service as stopped.
      mockCleanupRef.current = null;
    }

    // Update the app status.
    setConnected(false);
  };

  // Stop mock BLE if the provider is removed.
  useEffect(() => {
    return () => {
      mockCleanupRef.current?.();
    };
  }, []);

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
      }}
    >
      {children}
    </RingDataContext.Provider>
  );
}

export function useRingData() {
  const context =
    useContext(RingDataContext);

  if (!context) {
    throw new Error(
      'useRingData must be used inside RingDataProvider'
    );
  }

  return context;
}