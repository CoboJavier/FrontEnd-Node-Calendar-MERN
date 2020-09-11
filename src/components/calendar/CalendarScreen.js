import React, { useState } from 'react'
import { NavBar } from '../ui/NavBar'
import {Calendar, momentLocalizer} from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { messages } from '../../helpers/calendar-messages-esp';
import {useDispatch, useSelector} from 'react-redux';

import 'moment/locale/es';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { uiOpenModal } from '../../actions/ui';
import { eventSetActive } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';

moment.locale('es');

const localizer = momentLocalizer(moment) // or globalizeLocalizer
/*
const events = [{
    title: 'Cumpleaños del webo',
    start: moment().toDate(),
    end: moment().add(2, 'hours').toDate(),
    bgcolor: '#fafafa',
    notes: 'comprar el pastel',
    user:{
            _id: '1234',
            name: 'Javier'
    }
}];
*/

export const CalendarScreen = () => {

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');

    const dispatch = useDispatch();
    const {events, activeEvent} = useSelector(state => state.calendar)

    const onDoubleClick=(e)=>{
        console.log('double', e);
        dispatch(uiOpenModal());
    }

    const onSelectEvent=(e)=>{
       dispatch(eventSetActive(e));
    }

    const onViewChange=(e)=>{
        setLastView(e)
        localStorage.setItem('lastView', e)
    }

    const eventStyleGetter=(event, start, finish, isSelected)=>{
            const style ={
                backgroundColor: '#367CF7',
                borderRadius: '0px',
                opacity: 0.8,
                display: 'block',
                color: 'white',
            }

            return{
                style
            }
                
            
    }


    return (
        <div className="calendar-screen">
            <NavBar />
            
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                messages={messages}
                eventPropGetter={eventStyleGetter}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelectEvent}
                onView={onViewChange}
                view={lastView}
                components={{
                    event: CalendarEvent
                }}
            />

            


            {
                (activeEvent) && <DeleteEventFab />
            }

            <DeleteEventFab/>
            
            <AddNewFab/>
            <CalendarModal/>        
        </div>
    )
}
