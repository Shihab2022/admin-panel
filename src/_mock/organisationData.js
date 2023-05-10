import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const OrganisationData = [...Array(20)].map((_, index) => ({
  id: faker.datatype.uuid(),
//   avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  name: faker.name.fullName(),
  company: faker.company.name(),
  status: sample(['accepted', 'unccepted']),
  toggleStatus:faker.datatype.boolean(),
  role: sample(['Admin', 'Super Admin']),
  email:faker.internet.email()
}));

export default OrganisationData;
