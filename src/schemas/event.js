import { schema } from 'normalizr';

const eventSchema = new schema.Entity('events');

eventSchema.define({});

export default eventSchema;
