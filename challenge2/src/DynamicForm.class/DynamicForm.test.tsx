import React from 'react';
import DynamicForm, { formState, formProps } from './DynamicForm.class';

// testing imports
import Enzyme, { mount, ReactWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// testing interfaces
interface store {
  [key: string] :string | null
}

Enzyme.configure({ adapter: new Adapter() });

describe(
  "Dynamic Form",
  (): void => {

    let props: formProps;
    let mountedAPP: ReactWrapper<formProps, formState> | undefined;
    const APP = () => {
      if (!mountedAPP) {
        mountedAPP = mount(
          <DynamicForm {...props} />
        );
      }
      return mountedAPP;
    };

    beforeEach(() => {
      window.localStorage.clear();
      props = {
        rooms: 4
      };
      mountedAPP = undefined;
    });
    
    it('always renders a form', () => {
      expect(APP().find('form').length).toBe(1);
    });

    it('renders a container around the rooms and one submit input for a total of 2 children', () => {
      const app = APP().find('form').first();
      expect(app.children().length).toBe(2);
    });

    describe('Loads state from local storage',() => {
      it('loads state successfully if it is able to be parsed', () => {
        window.localStorage.setItem('DynamicForm.state', JSON.stringify({
          rooms: {
            room0: {
              adults: 1,
              children: 0,
              selected: true,
              toggle: false
            },
            room1: {
              adults: 1,
              children: 0,
              selected: true,
              toggle: false
            }
          }
        }));
        props.rooms = 2;
        expect(APP().state('rooms').room1.toggle).toBe(false);
        window.localStorage.clear();
      });

      it('it will generate a new state if if cannot parse the state', () => {
        window.localStorage.setItem('DynamicForm.state', 'undefined');
        props.rooms = 2;
        let consolerror = console.error;
        console.error = jest.fn();
        expect(APP().state('rooms').room1.toggle).toBe(true);
        window.localStorage.clear();
        console.error = consolerror;
      });

      it('it will log a message and an error message both through console.error', () => {
        window.localStorage.setItem('DynamicForm.state', 'undefined');
        props.rooms = 2;
        let consolerror = console.error;
        console.error = jest.fn();
        APP();
        expect(console.error).toBeCalledTimes(2);
        window.localStorage.clear();
        console.error = consolerror;
      });
      
    });

    describe('Will render the amount of rooms passed in the props', () => {
      it('will render 1 room if you set the prop \'rooms\' to 1', () => {
        props.rooms = 1;
        expect(APP().find('.roomForm_room').length).toBe(1);
      });

      it('will compare the rooms in the loaded state to the number of rooms in the props and prioritize the rooms in the props', () => {
        window.localStorage.setItem('DynamicForm.state', JSON.stringify({
          rooms: {
            room4: {
              adults: 1,
              children: 0,
              selected: true,
              toggle: true
            }
          }
        }));
        props.rooms = 2;
        const rooms = APP().state('rooms');
        expect(rooms.room0 != null && rooms.room1 != null && rooms.room4 == null).toBe(true);
        window.localStorage.clear();
      });

      it('will compare the rooms in the loaded state to the number of rooms, and if any rooms are missing recreate state from scratch', () => {
        window.localStorage.setItem('DynamicForm.state', JSON.stringify({
          rooms: {
            room4: {
              adults: 1,
              children: 0,
              selected: true,
              toggle: true
            }
          }
        }));
        props.rooms = 1;
        const rooms = APP().state('rooms');
        expect(rooms.room0 != null && rooms.room4 == null).toBe(true);
        window.localStorage.clear();
      });

      it('will render the number of rooms you tell it to render', () => {
        props.rooms = 3;
        expect(APP().find('.roomForm_room').length).toBe(3);
      });
    });

    describe('The rendered form with the required 4 rooms', () => {

      it('renders twelve labels', () => {
        expect(APP().find('label').length).toBe(12);
      });

      it('renders one submit input', () => {
        expect(APP().find({ type: 'submit' }).length).toBe(1);
      });

      it('renders 8 selects', () => {
        expect(APP().find('select').length).toBe(8);
      });

      it('renders 20 options', () => {
        expect(APP().find('option').length).toBe(20);
      });

      it('renders 4 checkboxes', () => {
        expect(APP().find({ type: 'checkbox' }).length).toBe(4);
      });
    });

    describe('Interaction with the form', () => {
      describe('The checkboxes', () =>{
        it('does not let you change the `Room 1` checkbox even if you enable it or manually fire a change event', () => {
          APP().find({ type: 'checkbox' }).first().simulate('change', { target: {checked : false}});
          expect(APP().state('rooms').room0.selected).toBe(true);
        });

        it('updates state when you click on a checkbox other tham `Room 1`', () => {
          APP().find({ type: 'checkbox' }).last().simulate('change', { target: {checked : true}});
          expect(APP().state('rooms').room3.selected).toBe(true);
        });
  
        it('selects the room if you click on the checkbox for the room and will set any lower rooms selected as well', () => {
          APP().find({ type: 'checkbox' }).at(2).simulate('change', { target: {checked : true}});
          expect(
            APP().state('rooms').room3.selected == false &&
            APP().state('rooms').room2.selected == true &&
            APP().state('rooms').room1.selected == true
            ).toBe(true);
        });

        it('de-selects the room if you click on the checkbox for the room and will set any higher rooms de-selected as well', () => {
          APP().find({ type: 'checkbox' }).last().simulate('change', { target: {checked : true}});
          APP().find({ type: 'checkbox' }).at(1).simulate('change', { target: {checked : false}});
          expect(
            APP().state('rooms').room3.selected == false &&
            APP().state('rooms').room2.selected == false &&
            APP().state('rooms').room1.selected == false
            ).toBe(true);
        });
      });

      describe('The Select Options', () => {
        describe('The Adult Selection', () => {
          describe('The Options', () => {
            it('there are two options', () => {
              expect(APP().find('.roomForm_room').first().find('select').first().find('option').length).toBe(2);
            });
            it('the first option has value \'1\'', () => {
              expect(APP().find('.roomForm_room').first().find('select').first().find('option').first().prop('value')).toBe('1');
            });
            it('the second option has value \'2\'', () => {
              expect(APP().find('.roomForm_room').first().find('select').first().find('option').at(1).prop('value')).toBe('2');
            });
          });
          
          it('is disabled if the corresponding checkbox is unchecked', () => {
            let disabled = APP().find('.roomForm_room').at(2);
            expect(disabled.find('select').first().prop('disabled')).toBe(true)
          });
          it('is enabled if the corresponding checkbox is unchecked', () => {
            APP().find('.roomForm_room').at(2).find({ type: 'checkbox' }).first().simulate('change', { target: {checked : true}});
            expect(APP().find('.roomForm_room').at(2).find('select').first().prop('disabled')).toBe(false);
          });
          it('updates the state and thus the value if it is enabled and changed', () => {
            APP().find('.roomForm_room').at(2).find({ type: 'checkbox' }).first().simulate('change', { target: {checked : true}});
            APP().find('.roomForm_room').at(2).find('select').first().simulate('change', { target: { value: 2 } });
            expect(APP().find('.roomForm_room').at(2).find('select').first().prop('value')).toBe(2);
          })
        });
        describe('The Children Selection', () => {
          describe('The Options', () => {
            it('there are three options', () => {
              expect(APP().find('.roomForm_room').first().find('select').last().find('option').length).toBe(3);
            });
            it('the first option has value \'0\'', () => {
              expect(APP().find('.roomForm_room').first().find('select').last().find('option').first().prop('value')).toBe('0');
            });
            it('the second option has value \'1\'', () => {
              expect(APP().find('.roomForm_room').first().find('select').last().find('option').at(1).prop('value')).toBe('1');
            });
            it('the third option has value \'2\'', () => {
              expect(APP().find('.roomForm_room').first().find('select').last().find('option').at(2).prop('value')).toBe('2');
            });
          });
          it('is disabled if the corresponding checkbox is unchecked', () => {
            let disabled = APP().find('.roomForm_room').at(2);
            expect(disabled.find('select').last().prop('disabled')).toBe(true)
          });
          it('is enabled if the corresponding checkbox is unchecked', () => {
            APP().find('.roomForm_room').at(2).find({ type: 'checkbox' }).first().simulate('change', { target: {checked : true}});
            expect(APP().find('.roomForm_room').at(2).find('select').last().prop('disabled')).toBe(false);
          });
          it('updates the state and thus the value if it is enabled and changed', () => {
            APP().find('.roomForm_room').at(2).find({ type: 'checkbox' }).first().simulate('change', { target: {checked : true}});
            APP().find('.roomForm_room').at(2).find('select').last().simulate('change', { target: { value: 2 } });
            expect(APP().find('.roomForm_room').at(2).find('select').last().prop('value')).toBe(2);
          });
        });
      });

      describe('The Submit Input', () => {
        it('saves state to localStorage on submission', () => {
          props.rooms = 0;
          APP().find('form').first().simulate('submit');
          expect(window.localStorage.getItem('DynamicForm.state')).toEqual('{"rooms":{}}');
          window.localStorage.clear();
        });
      });

    });

    const oldLocalStorageSet = window.localStorage.setItem;
    window.localStorage.setItem = jest.fn();

    window.localStorage.setItem = oldLocalStorageSet;

  }
)
