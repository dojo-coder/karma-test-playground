import EmployeeForm from '~/src/components/EmployeeForm.vue';
import { shallowMount } from '@vue/test-utils';

describe('EmployeeForm.vue', function() {
  let wrapper;
  let nameInput;
  let emailInput;
  
  beforeEach(function() {
    wrapper = shallowMount(EmployeeForm);
    nameInput = wrapper.find('input:first-of-type');
    emailInput = wrapper.find('input:last-of-type');
  });


  it('should display error message if required fields are not filled', () => {
    const errorMessage = wrapper.find('.error-message');
    expect(errorMessage).to.exist;
  });

  it('should display success message if inputs are filled correctly', async () => {
    await nameInput.setValue('John Davros');
    await emailInput.setValue('johndavros@gmail.com');

    const successMessage = wrapper.find('.success-message');
    expect(successMessage).to.exist;
  });

});
