import React, { Component } from 'react';
import './DynamicForm.css';

// begin interfaces

// interface for the props typeing
export interface formProps {
  rooms: number
}

// interface for the state typing and default four rooms
export interface formState {
  rooms: {
    [roomID: string]: roomState
  }
}

// interface for setting up a room using the basicRoom helper
export interface roomSetup {
  selected?: boolean,
  toggle?: boolean
}

// interface for return type of basicRoom helper
export interface roomState {
  [key: string]: number | boolean,
  adults: number,
  children: number,
  selected: boolean,
  toggle: boolean
}

// private helper to easily and reapetably setup rooms in the state
function basicRoom({ selected = false, toggle = true }: roomSetup): roomState {
  return {
    adults: 1,
    children: 0,
    selected,
    toggle
  };
}

class DynamicForm extends Component<formProps, formState>  {
  constructor(props: formProps) {
    super(props);
    const passedNumberOfRooms = props.rooms;
    // either use the stored state in local storage, or use a new formState
    let state;
    try {
      state = JSON.parse(window.localStorage.getItem('DynamicForm.state') || 'false');
    } catch (error) {
      console.error('DynamicForm could not parse what was saved as state');
      console.error(error.message);
      state = false;
    }
    let roomNotFound: boolean = false;
    let i: number = 0;
    let numberOfLoadedRooms: number = 0;
    if (!state || !state.rooms) {
      roomNotFound = true;
    } else {
      numberOfLoadedRooms = Object.keys(state.rooms).length;
      if (numberOfLoadedRooms != passedNumberOfRooms) {
        roomNotFound = true;
      } else {
        for (i = 0; i < numberOfLoadedRooms; i++) {
          roomNotFound = roomNotFound || state.rooms[`room${i}`] === undefined;
        }
      }
    }
    // if there is no state saved, or the numberOfRooms is different from the state
    if (roomNotFound) {
      const rooms: { [key: string]: roomState } = {};
      i = 0;
      while (i < passedNumberOfRooms) {
        rooms[`room${i}`] = basicRoom({ selected: i == 0 ? true : false, toggle: i == 0 ? false : true });
        i++;
      }
      state = { rooms };
    }
    this.state = state;

    this.updatePeople = this.updatePeople.bind(this);
    this.toggleRoom = this.toggleRoom.bind(this);
    this.submit = this.submit.bind(this);
    this.render = this.render.bind(this);
  }

  updatePeople(roomID: string, key: 'adults' | 'children'): React.EventHandler<React.ChangeEvent<HTMLSelectElement>> {
    return (event) => {
      const value = +event.target.value;
      this.setState((state): formState => {
        const room = state.rooms[roomID];
        room[key] = value;

        return Object.assign({}, state);
      });
    };
  }

  toggleRoom(roomID: string): React.EventHandler<React.ChangeEvent<HTMLInputElement>> {
    return (event) => {
      if (roomID == 'room0') return;
      const value = event.target.checked;
      this.setState((state): formState => {
        const rooms = Object.entries(state.rooms);
        rooms.forEach(([room, roomState]): void => {
          if (
            (value && room <= roomID)
            || (!value && room >= roomID)
          ) {
            roomState.selected = value;
            roomState.adults = !value ? 1 : roomState.adults;
            roomState.children = !value ? 0 : roomState.children;
          }
        })

        return Object.assign({}, state);
      });
    }
  }

  submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    window.localStorage.setItem('DynamicForm.state', JSON.stringify(this.state));
    console.log('Saved to local storage');
  }

  render(): JSX.Element {

    // iterate over the rooms and generate the form fields and containers
    const ROOMS = Object.entries(this.state.rooms)
      .map(([roomID, { toggle, adults, children, selected }], index): JSX.Element => {
        return <span key={roomID} className={"roomForm_room" + (selected ? '' : ' roomForm_disabled')}>
          <label className="roomForm_room-label">
            <input type="checkbox" checked={selected || !toggle} disabled={!toggle} onChange={this.toggleRoom(roomID)} />
            <strong>Room {index + 1}</strong>
          </label>
          <div className='roomForm_room_option'>
            <label className="padL">
              <span>
                Adults (18+)
            </span>
              <select value={adults} disabled={!selected} onChange={this.updatePeople(roomID, 'adults')}>
                <option value="1">1</option>
                <option value="2">2</option>
              </select>
            </label>
            <label className="padL">
              <span>
                Children (0-17)
            </span>
              <select value={children} disabled={!selected} onChange={this.updatePeople(roomID, 'children')}>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
              </select>
            </label>
          </div>
        </span>
      });

    return (
      <form onSubmit={this.submit}>
        <div className="roomForm">
          {ROOMS}
        </div>
        <input type='submit' value='Submit' />
      </form>
    );
  }
}

export default DynamicForm;
