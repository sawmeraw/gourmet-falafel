"use client"

import Image from 'next/image';
import { IoLocationSharp, IoTimeOutline } from 'react-icons/io5';
import { useState, useEffect } from 'react';

// 0 = Monday … 6 = Sunday. Times in 24h "HH:MM", null = closed.
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const DAYS_SHORT = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const locations = [
  {
    key: 'acm',
    address: '44-60 Gouger St',
    hours: [
      { open: null,    close: null    }, // Monday   – closed
      { open: '07:00', close: '17:30' }, // Tuesday
      { open: '09:00', close: '17:30' }, // Wednesday
      { open: '09:00', close: '17:30' }, // Thursday
      { open: '07:00', close: '21:00' }, // Friday
      { open: '07:00', close: '15:00' }, // Saturday
      { open: null,    close: null    }, // Sunday   – closed
    ],
  },
  {
    key: 'acp',
    address: 'Shop 21, Lower Ground Level',
    // Update these hours to match actual ACP trading hours
    hours: [
      { open: '09:00', close: '17:00' }, // Monday
      { open: '09:00', close: '17:00' }, // Tuesday
      { open: '09:00', close: '17:00' }, // Wednesday
      { open: '09:00', close: '17:00' }, // Thursday
      { open: '09:00', close: '20:00' }, // Friday
      { open: '09:00', close: '17:00' }, // Saturday
      { open: '11:00', close: '17:00' }, // Sunday
    ],
  },
];

function toMin(t: string) {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
}

function fmt12(t: string) {
  const [h, m] = t.split(':').map(Number);
  const p = h >= 12 ? 'PM' : 'AM';
  const dh = h > 12 ? h - 12 : h === 0 ? 12 : h;
  return `${dh}:${m.toString().padStart(2, '0')} ${p}`;
}

function formatSlot(open: string | null, close: string | null) {
  if (!open || !close) return 'Closed';
  return `${fmt12(open)} – ${fmt12(close)}`;
}

interface AdelaideTime {
  displayTime: string;
  weekday: string;
  currentMin: number;
}

function getAdelaideTime(): AdelaideTime {
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

function getStatus(loc: typeof locations[number], weekday: string, currentMin: number) {
  const dayIdx = DAYS.indexOf(weekday);
  if (dayIdx === -1) return { isOpen: false, label: 'Closed' };
  const { open, close } = loc.hours[dayIdx];
  if (!open || !close) return { isOpen: false, label: 'Closed today' };
  if (currentMin < toMin(open))  return { isOpen: false, label: `Opens ${fmt12(open)}` };
  if (currentMin >= toMin(close)) return { isOpen: false, label: `Closed at ${fmt12(close)}` };
  return { isOpen: true, label: `Closes ${fmt12(close)}` };
}

const AcpLogo = () => (
  <svg className="w-28 h-auto" viewBox="0 0 120 63" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M23 48.3654L24.4698 49.6462V61.656L23 62.9369V63H28.942V62.9369L26.9473 61.656V49.6462H29.0891C29.7888 49.6462 30.3907 49.7478 30.8946 49.9505C31.3988 50.1536 31.7731 50.4229 32.018 50.7589C32.2628 51.095 32.4414 51.4275 32.5532 51.7563C32.6651 52.0854 32.7214 52.4176 32.7214 52.7537V53.0475C32.7214 54.0418 32.277 54.8533 31.3881 55.4832C30.4991 56.1132 29.2359 56.281 27.5983 55.9871V56.722C29.2918 57.1838 30.7233 57.2646 31.8919 56.9634C33.0606 56.6625 33.9529 56.1518 34.569 55.4308C35.1848 54.71 35.4928 53.9016 35.4928 53.0054V52.7537C35.4928 51.5778 34.9924 50.5421 33.9916 49.6462C32.9908 48.7504 31.4827 48.3025 29.4669 48.3025H23V48.3654ZM43.9544 48.3025H38.5374V48.3654L40.0068 49.6462V61.656L38.5374 62.9369V63H50.0221V59.4516H49.9593L48.4056 61.656H42.4846V49.6462L43.9544 48.3654V48.3025ZM58.0634 48.3025L52.5207 61.656L51.0716 62.9369V63H55.5231V62.9369L54.0533 61.656L55.3549 58.4857H61.003L62.3049 61.656L60.8352 62.9369V63H66.504V62.9369L65.0345 61.656L59.3025 48.3025H58.0634ZM58.1056 51.7877L60.3942 57.142H55.9009L58.1056 51.7877ZM80.0466 48.3025H69.0865V51.9977H69.1497L70.8923 49.6462H76.3515L67.9738 63H80.1516V58.9685H80.0888L78.2408 61.656H71.6693L80.0466 48.3025ZM88.655 48.3025L83.1119 61.656L81.6632 62.9369V63H86.1143V62.9369L84.6449 61.656L85.9465 58.4857H91.5946L92.8962 61.656L91.4264 62.9369V63H97.0956V62.9369L95.6258 61.656L89.8938 48.3025H88.655ZM88.6971 51.7877L90.9857 57.142H86.4925L88.6971 51.7877Z" fill="#1F1F1F"/>
    <path d="M7.36205 26.8022C5.78742 28.1742 5 29.959 5 32.1561V32.4503C5 34.6481 5.78742 36.4324 7.36205 37.8042C8.93682 39.1762 10.8227 39.8621 13.0205 39.8621C14.7282 39.8621 16.408 39.554 18.0598 38.9379V35.5995H17.9969C17.157 36.7198 16.3344 37.4861 15.5298 37.8988C14.7248 38.3118 13.8884 38.518 13.0205 38.518C11.4526 38.518 10.1825 37.9547 9.20964 36.8279C8.2368 35.7014 7.75056 34.2557 7.75056 32.4921V32.1143C7.75056 30.3506 8.2368 28.9053 9.20964 27.7785C10.1825 26.652 11.4526 26.0884 13.0205 26.0884C13.8884 26.0884 14.7248 26.2949 15.5298 26.7076C16.3344 27.1206 17.157 27.8869 17.9969 29.0069H18.0598V25.6684C16.408 25.0527 14.7282 24.7446 13.0205 24.7446C10.8227 24.7446 8.93682 25.4305 7.36205 26.8022ZM32.568 24.9546H20.9568V25.0175L22.4266 26.2983V38.308L20.9568 39.5889V39.6521H32.9669V36.2087H32.904L31.3503 38.308H25.6183C25.1421 38.308 24.9041 38.0704 24.9041 37.5942V32.7231H29.6074L30.8461 34.34H30.9093V29.7418H30.8461L29.6074 31.3794H24.9041V26.2983H31.2453L32.5048 28.1881H32.568V24.9546ZM51.6955 24.9546H47.0555V25.0175L48.7142 26.2983V35.5366L40.5465 24.9546H35.9272V25.0175L37.3969 26.2983V38.308L35.9272 39.5889V39.6521H40.6093V39.5889L38.9506 38.308V26.97L48.7353 39.6521H50.2468V26.2983L51.6955 25.0175V24.9546ZM67.3379 24.9546H53.8792V28.8808H53.9424L55.7899 26.2983H59.3594V38.308L57.9104 39.5889V39.6521H63.3278V39.5889L61.858 38.308V26.2983H65.4482L67.275 28.8808H67.3379V24.9546ZM69.5426 25.0175L71.0123 26.2983V38.308L69.5426 39.5889V39.6521H74.9596V39.5889L73.4898 38.308V33.3741H73.8677C74.5953 33.3741 75.18 33.5841 75.621 34.004C76.062 34.4239 76.6532 35.2217 77.395 36.3976C77.703 36.8876 78.018 37.3145 78.3399 37.6781C78.6617 38.0424 79.054 38.3995 79.5157 38.749C79.9778 39.0992 80.5238 39.3686 81.1534 39.5575C81.7833 39.7464 82.4833 39.8479 83.2531 39.8621H83.9462V39.7989C82.7841 39.3371 81.6223 38.1823 80.4606 36.3344C79.4246 34.7109 78.3537 33.6963 77.2482 33.2902C78.746 33.1641 79.8728 32.702 80.6288 31.9043C81.3844 31.1066 81.7626 30.2387 81.7626 29.3008V29.0487C81.7626 27.957 81.2794 27.0015 80.3135 26.1826C79.3479 25.3638 77.8992 24.9546 75.9673 24.9546H69.5426V25.0175ZM75.7574 26.2983C76.4011 26.2983 76.9574 26.3895 77.4268 26.5712C77.8954 26.7532 78.2456 26.9946 78.4766 27.2957C78.7073 27.5968 78.8755 27.8907 78.9805 28.1774C79.0854 28.4643 79.1379 28.7479 79.1379 29.0276V29.3218C79.1379 30.0077 78.8927 30.6307 78.403 31.1905C77.913 31.7503 77.108 32.0304 75.9884 32.0304H73.5109V26.2983H75.7574ZM91.7775 24.9546L86.2344 38.308L84.7857 39.5889V39.6521H89.2368V39.5889L87.767 38.308L89.069 35.1378H94.7167L96.0187 38.308L94.5489 39.5889V39.6521H100.218V39.5889L98.7483 38.308L93.0163 24.9546H91.7775ZM91.8193 28.4398L94.1079 33.794H89.6146L91.8193 28.4398ZM107.839 24.9546H102.422V25.0175L103.892 26.2983V38.308L102.422 39.5889V39.6521H113.907V36.1037H113.845L112.291 38.308H106.37V26.2983L107.839 25.0175V24.9546Z" fill="#1F1F1F"/>
    <path d="M6.99172 2.19345e-05L1.44885 13.3538L0 14.6347V14.6975H4.45131V14.6347L2.98156 13.3538L4.28337 10.1835H9.93129L11.2332 13.3538L9.76345 14.6347V14.6975H15.4323V14.6347L13.9628 13.3538L8.23082 2.19345e-05H6.99172ZM7.03386 3.48558L9.32245 8.83945H4.82929L7.03386 3.48558ZM17.6369 0.0628767L19.1067 1.34376V13.3538L17.6369 14.6347V14.6975H24.251C25.7066 14.6975 27.0538 14.4247 28.2925 13.8787C29.5313 13.3327 30.5462 12.5035 31.3371 11.3905C32.1276 10.2778 32.5233 8.97965 32.5233 7.49571V7.20182C32.5233 5.73204 32.1276 4.43769 31.3371 3.3174C30.5462 2.19779 29.5313 1.36483 28.2925 0.818839C27.0538 0.273195 25.7066 2.19345e-05 24.251 2.19345e-05H17.6369V0.0628767ZM24.2717 1.34376C25.8675 1.34376 27.1867 1.87593 28.2297 2.93959C29.2723 4.0036 29.7937 5.41018 29.7937 7.15969V7.53784C29.7937 9.2877 29.2757 10.6946 28.24 11.7579C27.204 12.8219 25.8813 13.3538 24.2717 13.3538H22.3191C21.8432 13.3538 21.6053 13.1158 21.6053 12.6399V1.34376H24.2717ZM47.1998 2.19345e-05H35.5886V0.0628767L37.0584 1.34376V13.3538L35.5886 14.6347V14.6975H47.5986V11.2541H47.5358L45.9821 13.3538H40.2501C39.7738 13.3538 39.5362 13.1158 39.5362 12.6399V7.76888H44.2395L45.4782 9.38543H45.5411V4.78718H45.4782L44.2395 6.42514H39.5362V1.34376H45.8771L47.1369 3.23348H47.1998V2.19345e-05ZM56.0181 2.19345e-05H50.601V0.0628767L52.0708 1.34376V13.3538L50.601 14.6347V14.6975H62.0861V11.1491H62.0233L60.4696 13.3538H54.5483V1.34376L56.0181 0.0628767V2.19345e-05ZM70.1275 2.19345e-05L64.5844 13.3538L63.1356 14.6347V14.6975H67.5868V14.6347L66.1173 13.3538L67.4189 10.1835H73.067L74.3686 13.3538L72.8992 14.6347V14.6975H78.568V14.6347L77.0982 13.3538L71.3662 2.19345e-05H70.1275ZM70.1696 3.48558L72.4582 8.83945H67.9649L70.1696 3.48558ZM86.1898 2.19345e-05H80.7727V0.0628767L82.2421 1.34376V13.3538L80.7727 14.6347V14.6975H86.1898V14.6347L84.72 13.3538V1.34376L86.1898 0.0628767V2.19345e-05ZM89.7796 0.0628767L91.2494 1.34376V13.3538L89.7796 14.6347V14.6975H96.3936C97.8492 14.6975 99.1964 14.4247 100.436 13.8787C101.674 13.3327 102.689 12.5035 103.48 11.3905C104.271 10.2778 104.666 8.97965 104.666 7.49571V7.20182C104.666 5.73204 104.271 4.43769 103.48 3.3174C102.689 2.19779 101.674 1.36483 100.436 0.818839C99.1964 0.273195 97.8492 2.19345e-05 96.3936 2.19345e-05H89.7796V0.0628767ZM96.4147 1.34376C98.0102 1.34376 99.3294 1.87593 100.372 2.93959C101.415 4.0036 101.937 5.41018 101.937 7.15969V7.53784C101.937 9.2877 101.419 10.6946 100.383 11.7579C99.347 12.8219 98.024 13.3538 96.4147 13.3538H94.4618C93.9859 13.3538 93.7479 13.1158 93.7479 12.6399V1.34376H96.4147ZM119.342 2.19345e-05H107.732V0.0628767L109.201 1.34376V13.3538L107.732 14.6347V14.6975H119.742V11.2541H119.678L118.125 13.3538H112.393C111.917 13.3538 111.679 13.1158 111.679 12.6399V7.76888H116.382L117.621 9.38543H117.684V4.78718H117.621L116.382 6.42514H111.679V1.34376H118.02L119.28 3.23348H119.342V2.19345e-05Z" fill="#1F1F1F"/>
  </svg>
);

export default function OpeningHours() {
  const [time, setTime] = useState<AdelaideTime | null>(null);

  useEffect(() => {
    setTime(getAdelaideTime());
    const timer = setInterval(() => setTime(getAdelaideTime()), 60_000);
    return () => clearInterval(timer);
  }, []);

  const todayIdx = time ? DAYS.indexOf(time.weekday) : -1;

  return (
    <section id="hours" className="bg-primary py-14 border-t border-gray-100">
      <div className="container mx-auto px-4">

        {/* Header row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-2">
            <IoLocationSharp size={24} className="text-color-primary" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Our Locations & Hours</h2>
          </div>
          {time && (
            <div className="flex items-center gap-2 bg-white/60 rounded-full px-4 py-1.5 text-sm font-medium text-gray-700">
              <IoTimeOutline size={16} />
              <span>Adelaide time: <span className="font-bold">{time.displayTime}</span></span>
            </div>
          )}
        </div>

        {/* Location cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {locations.map((loc) => {
            const status = time ? getStatus(loc, time.weekday, time.currentMin) : null;

            return (
              <div key={loc.key} className="bg-white rounded-2xl shadow-md overflow-hidden">

                {/* Card header */}
                <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100">
                  <div>
                    {loc.key === 'acm' ? (
                      <div className="relative w-28 h-14">
                        <Image src="/acm_logo.png" alt="Adelaide Central Market" fill style={{ objectFit: 'contain', objectPosition: 'left' }} />
                      </div>
                    ) : (
                      <AcpLogo />
                    )}
                    <p className="text-xs text-gray-400 mt-1">{loc.address}</p>
                  </div>

                  {status && (
                    <div className="text-right flex-shrink-0 ml-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wide ${
                        status.isOpen ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
                      }`}>
                        {status.isOpen ? 'Open' : 'Closed'}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">{status.label}</p>
                    </div>
                  )}
                </div>

                {/* Hours table */}
                <div className="px-6 py-4 space-y-1.5">
                  {DAYS.map((day, i) => {
                    const { open, close } = loc.hours[i];
                    const isToday = i === todayIdx;
                    return (
                      <div
                        key={day}
                        className={`flex justify-between items-center text-sm py-1 px-2 rounded-lg transition-colors ${
                          isToday ? 'bg-primary font-semibold text-gray-900' : 'text-gray-600'
                        }`}
                      >
                        <span className="w-10">{DAYS_SHORT[i]}</span>
                        <span className={isToday ? 'text-gray-800' : 'text-gray-500'}>
                          {formatSlot(open, close)}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Footer note */}
                <div className="px-6 pb-5">
                  <p className="text-xs text-gray-400 border-t border-gray-100 pt-3">
                    Hours may vary on public holidays.
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}