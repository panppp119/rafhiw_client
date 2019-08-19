import { schema } from 'normalizr';

const productSchema = new schema.Entity('products');

productSchema.define({});

export default productSchema;
