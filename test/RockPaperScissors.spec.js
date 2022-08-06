import RockPaperScissors from '~/src/components/RockPaperScissors.vue';
import { shallowMount } from '@vue/test-utils';

describe('RockPaperScisssors.vue', function() {
  let wrapper;
  let rockPlayerBtn;
  let paperPlayerBtn;
  let scissorsPlayerBtn;
  let score;
  let playerPick;
  let computerPick;
  
  beforeEach(function() {
    wrapper = shallowMount(RockPaperScissors);
    rockPlayerBtn = wrapper.find('button:nth-child(1)');
    paperPlayerBtn = wrapper.find('button:nth-child(2)');
    scissorsPlayerBtn = wrapper.find('button:nth-child(3)');
    score = wrapper.find('h1');
    playerPick = wrapper.find('.players i:first-of-type');
    computerPick = wrapper.find('.players i:last-of-type');
  });

  it('should render the component correctly', function() {
    expect(wrapper.element).to.matchSnapshot();
    assert.matchSnapshot(wrapper.element);
  });

  it('displays the initial game score', () => {
    expect(score.text()).to.equal('0 - 0');
  });

  it('should have three player buttons for selecting the options', () => {
    expect(wrapper.findAll('button').length).to.equal(3);
  });

  it('displays the player and computer options when player selects option', async () => {
    expect(playerPick.classes()).contains('fa-circle-o-notch');
    expect(computerPick.classes()).contains('fa-circle-o-notch');
    await rockPlayerBtn.trigger('click');
    expect(playerPick.classes()).contains('fa-hand-rock-o');
    expect(computerPick.classes()).does.not.contain('fa-circle-o-notch');
  });

});
