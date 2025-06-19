import {describe, it, expect} from 'vitest';
import {mount} from '@vue/test-utils';
import DoctorCard
  from '../../../src/components/sections/Doctors/DoctorCard.vue';
import type {IDoctor} from '../../../src/types';

describe('DoctorCard.vue', () => {
  it('корректно отображает данные врача', () => {
    const doctor: IDoctor = {
      id: 1,
      name: 'Dr. John Doe',
      specialties: ['Cardiology', 'Neurology'],
      photo: 'doc.png',
      metro: 'Main Street',
    };

    const wrapper = mount(DoctorCard, {
      props: {doctor},
    });

    expect(wrapper.find('.doctor-card__name').text()).toBe('Dr. John Doe');
    expect(wrapper.find('.doctor-card__specialty').text()).toBe('Cardiology, Neurology');
    expect(wrapper.find('.doctor-card__photo').attributes('src')).toBe('doc.png');
  });
});