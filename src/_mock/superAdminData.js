import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

const SuperAdminData = [...Array(20)].map((_, index) => ({
  id: faker.datatype.uuid(),
  name: faker.name.fullName(),
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  toggleStatus:faker.datatype.boolean(),
  role: sample(['Admin', 'Super Admin']),
  email:faker.internet.email()
}));

export default SuperAdminData;
