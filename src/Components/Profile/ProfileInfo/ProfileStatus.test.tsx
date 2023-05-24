import * as React from 'react';
import { create } from 'react-test-renderer';
import ProfileStatus from './ProfileStatus';

// describe('ProfileStatus component', () => {
//   test('status from props should be in the state', () => {
//     const component = create(<ProfileStatus status="it-kamasutra.com" />);
//     const instance = component.getInstance();
//     expect(instance.state.status).toBe('it-kamasutra.com');
//   });
//   test('callback should be called', () => {
//     const component = create(<ProfileStatus status="it-kamasutra.com" />);
//     const root = component.root;
//     let span = root.findByType('span');
//     expect(span.children[0]).toBe('it-kamasutra.com');
//   });
// });
