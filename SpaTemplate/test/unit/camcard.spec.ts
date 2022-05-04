import { mount } from '@vue/test-utils'
import camcard from '@/camcard.vue'

test('displays message', async () => {
  const wrapper = await mount(camcard)

  // Assert the rendered text of the component
  expect(wrapper.find('p').text()).toBe('0')
  await wrapper.find('button').trigger('click')
  expect(wrapper.find('p').text()).toBe('1')
})
