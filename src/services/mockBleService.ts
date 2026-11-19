import { RingEvent } from '@/database/eventRepo';

// Functions that the mock BLE service
// will call when ring data changes.
type MockBleCallbacks = {
  // Called when the fake ring connects or disconnects
  onConnectionChange: (connected: boolean) => void;

  // Called when the fake battery changes
  onBattery: (battery: number) => void;

  // Called when the fake ring detects an event
  onEvent: (event: RingEvent) => void;
};

// Starts the fake BLE ring
export function startMockBle(
  callbacks: MockBleCallbacks
) {
  // Starting battery level
  let battery = 100;

  // Fake event number
  let deviceEventId = 1;

  // Tell the app that the fake ring connected
  callbacks.onConnectionChange(true);

  // Send the starting battery level
  callbacks.onBattery(battery);

  // Reduce the fake battery every five seconds
  const batteryTimer = setInterval(() => {
    // Do not allow battery below zero
    battery = Math.max(0, battery - 1);

    // Send the new battery value to the context
    callbacks.onBattery(battery);
  }, 5000);

  // Create a fake event every eight seconds
  const eventTimer = setInterval(() => {
    const event: RingEvent = {
      // Event number from the fake device
      deviceEventId: deviceEventId,

      // Fake detected behavior
      eventType: 'nail_bite',

      // Current date and time
      timestamp: new Date().toISOString(),

      // Random confidence between 80 and 95
      confidence: Math.floor(Math.random() * 16) + 80,

      // Battery level when the event occurred
      batteryLevel: battery,

      // Identifies this as test data
      source: 'mock-ble',
    };

    // Prepare the next event number
    deviceEventId += 1;

    // Send the event to RingDataContext
    callbacks.onEvent(event);
  }, 8000);

  // Return a function that stops the fake BLE service
  return () => {
    // Stop battery updates
    clearInterval(batteryTimer);

    // Stop fake event creation
    clearInterval(eventTimer);

    // Tell the app that the fake ring disconnected
    callbacks.onConnectionChange(false);
  };
}