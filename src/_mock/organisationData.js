import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

const OrganisationData = [...Array(20)].map(() => ({
  id: faker.datatype.uuid(),
  name: faker.name.fullName(),
  company: faker.company.name(),
  status: sample(['accepted', 'unccepted']),
  toggleStatus:faker.datatype.boolean(),
  role: sample(['Admin', 'Super Admin']),
  email:faker.internet.email()
}));

export default OrganisationData;
