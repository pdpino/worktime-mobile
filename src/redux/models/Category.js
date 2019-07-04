import { attr, Model } from 'redux-orm';

class Category extends Model {
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
};

export default Category;
