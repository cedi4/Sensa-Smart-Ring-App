import { RingEvent } from '@/database/eventRepo';
import {
  RingPacket,
  RingPacketListener,
} from './ringPacketTypes';

export type TestRingService = {
  connect: () => void;
  disconnect: () => void;
  emitEvent: (event: RingEvent) => void;
  emitBattery: (battery: number) => void;
  startAutomaticSimulation: () => void;
  stopAutomaticSimulation: () => void;
};

export function createTestRingService(
  onPacket: RingPacketListener
): TestRingService {
  let connected = false;
  let eventId = 1;
  let batteryTimer: ReturnType<typeof setInterval> | null = null;
  let eventTimer: ReturnType<typeof setInterval> | null = null;

  const send = (packet: RingPacket) => {
    // Every test packet enters the app here.
    onPacket(packet);
  };

  const connect = () => {
    connected = true;

    send({
      kind: 'telemetry',
      connected: true,
      battery: 100,
      timestamp: new Date().toISOString(),
    });
  };

  const disconnect = () => {
    stopAutomaticSimulation();
    connected = false;

    send({
      kind: 'telemetry',
      connected: false,
      battery: 0,
      timestamp: new Date().toISOString(),
    });
  };

  const emitBattery = (battery: number) => {
    send({
      kind: 'telemetry',
      connected,
      battery: Math.min(100, Math.max(0, battery)),
      timestamp: new Date().toISOString(),
    });
  };

  const emitEvent = (event: RingEvent) => {
    console.log('Test packet emitted:', event);

    send({
      kind: 'event',
      event,
    });
  };

  const startAutomaticSimulation = () => {
    if (!connected || batteryTimer || eventTimer) {
      return;
    }

    batteryTimer = setInterval(() => {
      emitBattery(Math.floor(Math.random() * 31) + 60);
    }, 5000);

    eventTimer = setInterval(() => {
      const behaviors = [
        'nail_bite',
        'face_touch',
        'hair_pull',
      ];

      const event: RingEvent = {
        deviceEventId: eventId,
        eventType: behaviors[eventId % behaviors.length],
        timestamp: new Date().toISOString(),
        confidence: Math.floor(Math.random() * 16) + 80,
        batteryLevel: 75,
        source: 'mock-ble',
      };

      eventId += 1;
      emitEvent(event);
    }, 8000);
  };

  const stopAutomaticSimulation = () => {
    if (batteryTimer) {
      clearInterval(batteryTimer);
      batteryTimer = null;
    }

    if (eventTimer) {
      clearInterval(eventTimer);
      eventTimer = null;
    }
  };

  return {
    connect,
    disconnect,
    emitEvent,
    emitBattery,
    startAutomaticSimulation,
    stopAutomaticSimulation,
  };
}