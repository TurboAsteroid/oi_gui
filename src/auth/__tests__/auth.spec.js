import { createLocalVue, mount } from '@vue/test-utils'
import Vuetify from 'vuetify'
import auth from '../auth'
describe('auth', () => {
  let localVue
  let wrapper
  beforeAll(() => {
    localVue = createLocalVue()
    localVue.use(Vuetify)
    localVue.config.silent = true
    wrapper = mount(auth, { localVue })
  })
  test('auth является экземпляром Vue', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  test('auth на форме есть поле login', () => {
    expect(wrapper.contains('#login')).toBe(true)
  })
  test('auth на форме есть поле password', () => {
    expect(wrapper.contains('#password')).toBe(true)
  })
  test('auth на форме есть кнопка вход', () => {
    expect(wrapper.contains('#loginbtn')).toBe(true)
  })
})
