import { attr, Model } from 'redux-orm';

class Category extends Model {
  static noCategoryId = -1;

  static noCategoryColor = 'gray';

  getShortName() {
    return this.alias || this.name;
  }
}

Category.modelName = 'Category';

Category.fields = {
  id: attr(),
  name: attr(),
  alias: attr(),
  description: attr(),
  color: attr(),
};

export default Category;
