interface EventItem {
  date: string;
  label: string;
  color?: 'green' | 'red' | 'gray' | string;
}

export const CalendarView = ({ selectedDate, events, onDateClick }: { mode?: 'month' | 'week'; selectedDate?: string; events: EventItem[]; onDateClick?: (date: string) => void }) => {
  const today = new Date(selectedDate ?? new Date());
  const start = new Date(today.getFullYear(), today.getMonth(), 1);
  const days = Array.from({ length: 35 }, (_, index) => {
    const date = new Date(start);
    date.setDate(1 - start.getDay() + index);
    return date.toISOString().slice(0, 10);
  });
  return (
    <div className="calendar-grid">
      {['日', '一', '二', '三', '四', '五', '六'].map((day) => <b key={day}>{day}</b>)}
      {days.map((date) => {
        const dayEvents = events.filter((event) => event.date === date);
        return (
          <button key={date} className={date === selectedDate ? 'selected' : ''} onClick={() => onDateClick?.(date)}>
            <span>{Number(date.slice(-2))}</span>
            {dayEvents.slice(0, 2).map((event) => <small className={event.color} key={event.label}>{event.label}</small>)}
          </button>
        );
      })}
    </div>
  );
};
