# ![Model Prefect](https://github.com/MarcosRava/misc/raw/master/imgs/banners/model-prefect-banner.png)


## A simple model presenter


WIP

## Proposal

### Instalation

```

npm install model-prefect

```

### Simple usage

```js

let ford = {
  fullName: "Ford Prefect",
  nickname: "Ix",
  species: "Betelgeusian"
};

const opts = {
  "map": {
    "fullName": "name"
  },
  "exclude" : ["nickname"]
};
let fordPresenter = new ModelPrefect(ford, opts);
// {"name": "Ford Prefect", "species": "Betelgeusian"}

```
### Usage with [Betelgeuse](https://github.com/MarcosRava/betelgeuse)

```js

import Betelgeuse, { Types } from 'betelgeuse';
import ModelPrefect from 'model-prefect;

ModelPrefect.goesToBetelgeuse(Betelgeuse); // Add `toPresenter` function to Betelgeuse instances

class Ford extends Betelgeuse {

  static schema = {
    fullName: {
      type: Types.string,
      minLength: 3
    },
    nickname: {
      type: Types.string,
      minLength: 3
    },
    species:  Types.string
  }

  static presenter = {
    "map": {
      "fullName": "name"
    }
    "exclude": ["nickname"]
  }
}

let ford = new Ford({
  fullName: "Ford Prefect",
  nickname: "Ix",
  species: "Betelgeusian"
});

ford.toPresenter();
// {"name": "Ford Prefect", "species": "Betelgeusian"}

```

Or

```js

class FordPresenter extends ModelPrefect {

  static presenter = {
    "map": {
      "fullName": "name"
    }
    "exclude": ["nickname"]
  }

}

let fordPresenter = new FordPresenter(ford);
// {"name": "Ford Prefect", "species": "Betelgeusian"}

```

Schema

```js

class FordPresenter extends ModelPrefect {

  static options = {
    "betelgeuse" : true, // convert validation schema
    "presenter": {
      "fullName": "name"
    }
    "exclude": ["nickname"]
  }

}

let fordPresenter = new FordPresenter(ford);
/*
{
  "name": "Ford Prefect",
  "species": "Betelgeusian",
  "_schema": {
    "name": {
      "type": "string",
      "minLength": 3
    },
    "species": {
      "type": "string"
    }
  }
}
*/
fordPresenter.isValid
// Function.isValid
fordPresenter.fields()
// {"name": "Ford Prefect", "species": "Betelgeusian"}

```
