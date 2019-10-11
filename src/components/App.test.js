import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import renderer from 'react-test-renderer';
import { Badge, Card, Progress } from 'reactstrap';

import { BATTLE_TIMEOUT, machine } from '../config';

import { App } from './App';
import { Battle } from './Battle';
import { Header } from './Header';
import { Loading } from './Loading';
import { Menu } from './Menu';
import { Scores } from './Scores';

configure({ adapter: new Adapter() });

// TODO: remove when not needed
const consoleError = console.error;
beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation((...args) => {
    if ([
      `It looks like you're using the wrong act()`,
      'Warning: An update to %s inside a test was not wrapped in act',
    ].every(ignored => !args[0].includes(ignored))) {
      consoleError(...args);
    }
  });
});
// end of TODO

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('matches snapshot', () => {
  const component = renderer.create(
    <App />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('allows playing a game', async () => {
 jest.useFakeTimers();
  let loadingInvokeResolve, battleInvokeResolve;
  const mockMachine = machine.withConfig({
    services: {
      loadingInvoke: () => new Promise(resolve => {
        loadingInvokeResolve = resolve;
      }),
      battleInvoke: () => new Promise(resolve => {
        battleInvokeResolve = resolve;
      }),
    },
  });
  const wrapper = mount(<App machine={mockMachine} />);

  // loading
  expect(wrapper.find(Header).exists()).toEqual(true);
  expect(wrapper.find(Loading).exists()).toEqual(true);
  expect(wrapper.find(Menu).exists()).toEqual(false);

  await act(async () => {
    await loadingInvokeResolve();
  });
  wrapper.update();

  // menu
  expect(wrapper.find(Loading).exists()).toEqual(false);
  expect(wrapper.find(Menu).exists()).toEqual(true);
  expect(wrapper.find(Scores).find(Progress).at(0).text()).toEqual('0');
  expect(wrapper.find(Scores).find(Progress).at(1).text()).toEqual('0');

  wrapper
    .find('button')
    .filterWhere(n => n.text().trim() === 'people')
    .simulate('click');

  await act(async () => {
    await battleInvokeResolve([
      { name: 'name1', mass: '1' },
      { name: 'name2', mass: '10' },
    ]);
  });
  wrapper.update();

  // battle
  expect(wrapper.find(Menu).exists()).toEqual(false);
  expect(wrapper.find(Battle).exists()).toEqual(true);

  jest.advanceTimersByTime(BATTLE_TIMEOUT - 1);
  wrapper.update();

  expect(wrapper.find(Battle).exists()).toEqual(true);
  expect(wrapper.find(Battle).find(Card).find('strong').at(0).text()).toEqual('name1')
  expect(wrapper.find(Battle).find(Card).find(Badge).at(0).text()).toEqual('mass: 1');
  expect(wrapper.find(Battle).find(Card).find('strong').at(1).text()).toEqual('name2')
  expect(wrapper.find(Battle).find(Card).find(Badge).at(1).text()).toEqual('mass: 10');

  // menu
  jest.advanceTimersByTime(1);
  wrapper.update();

  expect(wrapper.find(Battle).exists()).toEqual(false);
  expect(wrapper.find(Menu).exists()).toEqual(true);
  expect(wrapper.find(Scores).exists()).toEqual(true);
  expect(wrapper.find(Scores).find(Progress).at(0).text()).toEqual('0');
  expect(wrapper.find(Scores).find(Progress).at(1).text()).toEqual('1');
});
