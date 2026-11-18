//This context connects the database and the screens. 
// It will hold the current connection state, current battery value, and the event list currently displayed by the app.
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  addEvent as insertEvent,
  getAllEvents,
  RingEvent,
} from '@/database/eventRepo';

type RingData = {
  connected: boolean;
  battery: number;
  events: RingEvent[];
  setConnected: (value: boolean) => void;
  updateBattery: (value: number) => void;
  addEvent: (event: RingEvent) => Promise<void>;
};

// Create a context for the ring data with an initial value of null
const RingDataContext = createContext<RingData | null>(null);

// Create a REACT component that provides the ring data context to the rest of the app
export function RingDataProvider({ children }: PropsWithChildren) {
  const [connected, setConnected] = useState(false);  //App intially starts disconnected
  const [battery, setBattery] = useState(100); //App initially starts with a full battery
  const [events, setEvents] = useState<RingEvent[]>([]); //App initially starts with an emptyy event list

  //React effect that runs after the provider first appears on the screen. 
  // It fetches all events from the database and sets them in the state.
  useEffect(() => {
    getAllEvents().then(setEvents);
  }, []);

  const updateBattery = (value: number) => {
    setBattery(Math.min(100, Math.max(0, value)));  //The battery level only spans 0 to 100
  };

  const addEvent = async (event: RingEvent) => {
    await insertEvent(event);
    setEvents((current) => [event, ...current]); //Save event data if it matches structure
  };

  // Provide the ring data context to the rest of the app
  return (
    <RingDataContext.Provider
      value={{ connected, battery, events, setConnected, updateBattery, addEvent }}
    >
      {children}
    </RingDataContext.Provider>
  );
}

//Allow other componets to use the ring data context with a custom hook rather than useContext(RingDataContext) directily
export function useRingData() {
  const context = useContext(RingDataContext);
  if (!context) {
    throw new Error('useRingData must be used inside RingDataProvider');
  }
  return context;
}