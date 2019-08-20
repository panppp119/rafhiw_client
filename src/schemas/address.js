import { schema } from 'normalizr';

const addressSchema = new schema.Entity('addresses');

addressSchema.define({});

export default addressSchema;
