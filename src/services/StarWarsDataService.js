import { shuffleArray } from '../helpers';

export class StarWarsDataService {

  data = {};

  constructor(
    rootUrl = 'https://swapi.co/api/',
  ) {
    this.rootUrl = rootUrl;
  }

  getRandom(resourceName, count) {
    return this.getAll(resourceName)
      .then(all => shuffleArray(all.slice(0)).slice(0, count));
  }

  getAll(resourceName) {
    return this.data[resourceName]
      ? Promise.resolve(this.data[resourceName])
      : this.getAllPageByPage(`${this.rootUrl}${resourceName}/`)
          .then(all => {
            this.data[resourceName] = all;
            return all;
          });
  }

  getAllPageByPage(pageUrl, acc = []) {
    return fetch(pageUrl)
      .then(data => data.json())
      .then(data => data.next
        ? this.getAllPageByPage(data.next, acc.concat(data.results))
        : acc.concat(data.results)
      );
  }

}

export const starWarsDataService = new StarWarsDataService();
