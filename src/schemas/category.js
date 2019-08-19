import { schema } from 'normalizr';

import subCategorySchema from './sub_category';

const categorySchema = new schema.Entity('categories');

categorySchema.define({
  sub_categories: [subCategorySchema]
});

export default categorySchema;
