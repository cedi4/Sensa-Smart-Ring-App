import { RingEvent } from '@/database/eventRepo';

// A packet containing a behavior event.
export type EventPacket = {
  kind: 'event';
  event: RingEvent;
};

// A packet containing live device status.
export type TelemetryPacket = {
  kind: 'telemetry';
  connected: boolean;
  battery: number;
  timestamp: string;
};

// Every service sends one of these packet types.
export type RingPacket =
  | EventPacket
  | TelemetryPacket;

// A service calls this whenever it receives data.
export type RingPacketListener = (
  packet: RingPacket
) => void;