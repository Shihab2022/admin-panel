import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

const users = [...Array(30)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  name: faker.name.fullName(),
  company: faker.company.name(),
  status: sample(['Accepted', 'Unccepted']),
  role: sample(['Admin', 'User']),
  email:faker.internet.email()
}));

export default users;
