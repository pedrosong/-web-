import {mount} from '@vue/test-utils';
import Button from '../../src/components/button.vue';

describe("button.vue", () => {
    test('测试slot基本功能', () => {
        const wrapper = mount(Button);
        expect(wrapper.text()).toContain('default btn')
    });

    test('测试slot变化', () => {
        const wrapper = mount(Button, {
            slots: {
                default: 'default'
            }
        });
        expect(wrapper.text()).toContain('default');
    });

    test("如果没有设置disbable，可以收到emitted", () => {
        const wrapper = mount(Button);
        wrapper.get("[data-test=clickBtn]").trigger('click');
        console.log(wrapper.emitted());
        expect(wrapper.emitted('click-event')).toBeTruthy();
    });

    test('如果设置了disbable，就不可以收到emitted', () => {
        const wrapper = mount(Button, {
            propData: {
                disbaled: {
                    default: 'toBeFalsy'
                }
            }
        })
        wrapper.get("[data-test=clickBtn]").trigger('click');
        console.log(wrapper.emitted());
        expect(wrapper.emitted('click-event')).toBeFalsy();
    })

});