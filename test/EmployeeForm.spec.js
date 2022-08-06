import EmployeeForm from '~/src/components/EmployeeForm.vue';
import { shallowMount } from '@vue/test-utils';

describe('EmployeeForm.vue', function() {
  let wrapper;
  let nameInput;
  let emailInput;
  let form;
  
  beforeEach(function() {
    wrapper = shallowMount(EmployeeForm);
    nameInput = wrapper.find('input:first-of-type');
    emailInput = wrapper.find('input:last-of-type');
    form = wrapper.find('form');
  });

  it('should display error message if required fields are not filled when submitting form', async () => {
    await form.trigger('submit');
    const errorMessage = wrapper.find('.error-message');
    expect(errorMessage.wrapperElement).to.exist;
  });

  it('should display success message if inputs are filled correctly when submitting form', async () => {
    await nameInput.setValue('John Davros');
    await emailInput.setValue('johndavros@gmail.com');
    await form.trigger('submit');

    const successMessage = wrapper.find('.success-message');
    expect(successMessage.wrapperElement).to.exist;
  });

});
