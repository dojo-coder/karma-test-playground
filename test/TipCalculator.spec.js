import TipCalculator from '~/src/components/TipCalculator.vue';
import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';

describe('TipCalculator.vue', function() {
  let wrapper;
  let input;
  let tipFifteen;
  let tipEighteen;
  let tipTwenty;
  let totalFifteen;
  let totalEighteen;
  let totalTwenty;

  beforeEach(async function() {
    wrapper = shallowMount(TipCalculator);
    input = wrapper.find('input');
    await input.setValue(222);
  });

  // should show the correct tip for 15%
  it('displays the correct tip for 15%', () => {
    tipFifteen = wrapper.find('tr:first-of-type td:nth-child(2)');
    expect(tipFifteen.text()).to.equal('$33.30');
  });

  // should show the correct tip for 18%
  it('displays the correct tip for 18%', () => {
    tipEighteen = wrapper.find('tr:first-of-type td:nth-child(3)');
    expect(tipEighteen.text()).to.equal('$39.96');
  });

  // should show the correct tip for 20%
  it('displays the correct tip for 20%', () => {
    tipTwenty = wrapper.find('tr:first-of-type td:nth-child(4)');
    expect(tipTwenty.text()).to.equal('$44.40');
  });

  // should show the correct total for 15%
  it('displays the correct total for 15% tip', () => {
    totalFifteen = wrapper.find('tr:last-of-type td:nth-child(2)');
    expect(totalFifteen.text()).to.equal('$255.30');
  });

  // should show the correct total for 18%
  it('displays the correct total for 18% tip', () => {
    totalEighteen = wrapper.find('tr:last-of-type td:nth-child(3)');
    expect(totalEighteen.text()).to.equal('$261.96');
  });

  // should show the correct total for 20%
  it('displays the correct total for 20% tip', () => {
    totalTwenty = wrapper.find('tr:last-of-type td:nth-child(4)');
    expect(totalTwenty.text()).to.equal('$266.40');
  });
});
