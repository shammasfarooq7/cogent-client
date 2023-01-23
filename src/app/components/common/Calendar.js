// packages import
import { useState } from 'react';
import { Box, } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { CalendarPicker } from '@mui/x-date-pickers/CalendarPicker';
import { PickersDay } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
// others
// import palette from '../../theme/palette';

export const Deposits = ()=> {
  const [date, setDate] = useState(dayjs(new Date()));
  const EventsDate = [
    dayjs(new Date(2022, 8, 1)).format('YYYY-MM-DD'),
    dayjs(new Date(2022, 8, 4)).format('YYYY-MM-DD'),
    dayjs(new Date(2022, 8, 22)).format('YYYY-MM-DD')
  ]

  return (
    <Box >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CalendarPicker date={date} onChange={(newDate) => setDate(newDate)}
          renderDay={(day, selectedDays, pickersDayProps) => {
            let selectedMuiClass = '';
            if (EventsDate.includes(dayjs(day).format('YYYY-MM-DD'))) {
              selectedMuiClass = 'event-day';
            }

            return (
              <PickersDay className={selectedMuiClass} {...pickersDayProps} />
            );
          }}
        />
      </LocalizationProvider>
    </Box>
  );
}