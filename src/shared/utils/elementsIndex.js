/**
 * Stores a collection of elements indexed by a custom id.
 *
 * Given an iterable of elements and an id-getter function, stores the elements
 * indexed with the custom id, and provides a way to access them later.
 */
export default class ElementsIndex {
  constructor(elements, getIdFromElement) {
    this.getIdFromElement = getIdFromElement;
    this.elementsById = {};

    elements.forEach((element) => {
      const id = getIdFromElement(element);
      this.elementsById[id] = element;
    });
  }

  exists(element) {
    return !!this.getWithSameId(element);
  }

  getWithSameId(element) {
    const id = this.getIdFromElement(element);
    return this.elementsById[id];
  }
}
