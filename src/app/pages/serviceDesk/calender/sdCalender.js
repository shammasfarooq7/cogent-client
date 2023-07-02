import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import Container from '@mui/material/Container';


// helping finction to add days to current day
//================================================================
Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

Date.prototype.subDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() - days);
    return date;
}
//================================================================


let todayStr = new Date();

const events = [
  { title: 'Long Event', start: new Date().subDays(6), end: new Date().subDays(4) },
  { title: 'Meeting with client', start: new Date().subDays(4)},
  {title: 'All-day event', start: todayStr, color:'red'},
  { title: 'Long Event', start: todayStr, end: todayStr },
  { title: 'Meeting', start: new Date() },
  { title: 'Very Long Event', start: todayStr, color:'green', end: new Date().addDays(10)},
  { title: 'Company Party', start: new Date().subDays(13), color:'purple', end: new Date().subDays(10)},
  { title: 'Birthday Party', start: new Date().subDays(13), color:'red', end: new Date().subDays(13)},
  { title: 'Annual Conference', start: new Date().subDays(13), color:'orange', end: new Date().subDays(12)},
  { title: 'Client Conference', start: new Date().subDays(10), color:'red', end: new Date().subDays(9)}
]


const renderEventContent = (eventInfo) => {
    
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    )
}

export const SDCalender = () => {
  return (
    <Container maxWidth="100%"  sx={{ mt: 4, mb: 4 }}>
        <FullCalendar
        plugins={[dayGridPlugin]}
        initialView='dayGridMonth'
        headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,dayGridDay,dayGridWeek'
        }}
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={true}
        events={events}
        eventContent={renderEventContent}
        nowIndicator= {true}

      />
    </Container>   
  )
}