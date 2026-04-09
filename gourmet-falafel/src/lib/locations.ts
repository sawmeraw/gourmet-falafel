// Shared locations + opening-hours data, used by OpeningHours and OpenNowBadge.

export const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
export const DAYS_SHORT = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export interface Slot {
  open: string | null;
  close: string | null;
}

export interface Location {
  key: string;
  name: string;
  shortName: string;
  address: string;
  hours: Slot[];
}

export const locations: Location[] = [
  {
    key: 'acm',
    name: 'Adelaide Central Market',
    shortName: 'Central Market',
    address: '44-60 Gouger St',
    hours: [
      { open: '09:00', close: '14:00' }, // Monday
      { open: '07:00', close: '17:30' }, // Tuesday
      { open: '09:00', close: '17:30' }, // Wednesday
      { open: '09:00', close: '17:30' }, // Thursday
      { open: '07:00', close: '21:00' }, // Friday
      { open: '07:00', close: '15:00' }, // Saturday
      { open: null,    close: null    }, // Sunday
    ],
  },
  {
    key: 'acp',
    name: 'Adelaide Central Plaza',
    shortName: 'Central Plaza',
    address: 'Shop 21, Lower Ground Level',
    hours: [
      { open: '09:00', close: '17:00' },
      { open: '09:00', close: '17:00' },
      { open: '09:00', close: '17:00' },
      { open: '09:00', close: '17:00' },
      { open: '09:00', close: '20:00' },
      { open: '09:00', close: '17:00' },
      { open: '11:00', close: '17:00' },
    ],
  },
];

export function toMin(t: string) {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
}

export function fmt12(t: string) {
  const [h, m] = t.split(':').map(Number);
  const p = h >= 12 ? 'PM' : 'AM';
  const dh = h > 12 ? h - 12 : h === 0 ? 12 : h;
  return `${dh}:${m.toString().padStart(2, '0')} ${p}`;
}

export function formatSlot(open: string | null, close: string | null) {
  if (!open || !close) return 'Closed';
  return `${fmt12(open)} – ${fmt12(close)}`;
}

export interface AdelaideTime {
  displayTime: string;
  weekday: string;
  currentMin: number;
}

export function getAdelaideTime(): AdelaideTime {
  const now = new Date();
  const parts = new Intl.DateTimeFormat('en-AU', {
    timeZone: 'Australia/Adelaide',
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(now);

  const weekday = parts.find(p => p.type === 'weekday')?.value ?? '';
  const hour = parseInt(parts.find(p => p.type === 'hour')?.value ?? '0');
  const minute = parseInt(parts.find(p => p.type === 'minute')?.value ?? '0');

  const displayTime = new Intl.DateTimeFormat('en-AU', {
    timeZone: 'Australia/Adelaide',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(now).toUpperCase();

  return { displayTime, weekday, currentMin: hour * 60 + minute };
}

export interface Status {
  isOpen: boolean;
  label: string;
}

export function getStatus(loc: Location, weekday: string, currentMin: number): Status {
  const dayIdx = DAYS.indexOf(weekday);
  if (dayIdx === -1) return { isOpen: false, label: 'Closed' };
  const { open, close } = loc.hours[dayIdx];
  if (!open || !close) return { isOpen: false, label: 'Closed today' };
  if (currentMin < toMin(open))  return { isOpen: false, label: `Opens ${fmt12(open)}` };
  if (currentMin >= toMin(close)) return { isOpen: false, label: `Closed at ${fmt12(close)}` };
  return { isOpen: true, label: `Closes ${fmt12(close)}` };
}

// Best status across all locations — used by the live badge.
// Prefers any open location; otherwise returns the first.
export function getAnyOpenStatus(time: AdelaideTime): { loc: Location; status: Status } {
  for (const loc of locations) {
    const s = getStatus(loc, time.weekday, time.currentMin);
    if (s.isOpen) return { loc, status: s };
  }
  return { loc: locations[0], status: getStatus(locations[0], time.weekday, time.currentMin) };
}
