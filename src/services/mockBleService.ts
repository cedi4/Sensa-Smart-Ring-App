import { RingEvent } from '@/database/eventRepo';

type MockBleCallbacks = {
  // Updates the connection state in RingDataContext
  onConnectionChange: (connected: boolean) => void;

  // Updates the battery state in RingDataContext
  onBattery: (battery: number) => void;

  // Saves a fake event to SQLite and app state
  onEvent: (
    event: RingEvent
  ) => void | Promise<void>;
};

export function startMockBle(
  callbacks: MockBleCallbacks
) {
  let eventId = 1;
  let battery = 100;

  // Tell the context that the fake ring connected
  callbacks.onConnectionChange(true);

  // Send the starting battery value
  callbacks.onBattery(battery);

  // Decrease the battery every 5 seconds
  const batteryTimer = setInterval(() => {
    battery = Math.max(0, battery - 1);

    callbacks.onBattery(battery);
  }, 5000);

  // Create a fake event every 8 seconds
  const eventTimer = setInterval(() => {
    const behaviors = [
      'nail_bite',
      'face_touch',
      'hair_pull',
    ];

    const event: RingEvent = {
      deviceEventId: eventId,

      eventType:
        behaviors[eventId % behaviors.length],

      timestamp: new Date().toISOString(),

      confidence:
        Math.floor(Math.random() * 16) + 80,

      batteryLevel: battery,

      source: 'mock-ble',
    };

    eventId += 1;

    // Send the event to RingDataContext
    callbacks.onEvent(event);
  }, 8000);

  // Return a cleanup function to stop the fake ring
  return () => {
    clearInterval(batteryTimer);
    clearInterval(eventTimer);

    // Tell the context that the fake ring disconnected
    callbacks.onConnectionChange(false);
  };
}