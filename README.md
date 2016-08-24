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
  firstName: "Ford",
  lastName: "Prefect",
  nickname: "Ix",
  species: "Betelgeusian",
  towel : {
    color: 'red'
  }
};

const opts = {
  "customAttributes": {
    fullName: function (data, customAttributes) {
      return {
        value: data.firstName + ' ' + data.lastName
      }
    }
  },
  "strategies": {
    "info": {
      "map": {
        "firstName": "name",
        "towel.color": "towelColor"
      },
      "customAttributes": ["fullName"],
      "exclude" : ["nickname", "lastName", "towel"]
    },
    "basicInfo": {
      "map": {
        "towel.color": "towelColor"
      },
      "customAttributes": ["fullName"],
      "include": ["species"]
    }
  }
};
const Presenter = ModelPrefect.presenter(opts);
let fordPresenter = Presenter.present(ford, "info");
// {"name": "Ford", "fullName": "Ford Prefect", "towelColor": "red", "species": "Betelgeusian"}

let fordPresenter = Presenter.present(ford, "basicInfo");
// {"fullName": "Ford Prefect", "towelColor": "red", "species": "Betelgeusian"}

```

#### Using extends


```js

class FordPresenter extends ModelPrefect {

  static presenter = {
    "customAttributes": {
      fullName: function (data, customAttributes) {
        return {
          value: data.firstName + ' ' + data.lastName
        }
      }
    },
    "strategies": {
      "info": {
        "map": {
          "firstName": "name",
          "towel.color": "towelColor"
        },
        "customAttributes": ["fullName"],
        "exclude" : ["nickname", "lastName", "towel"]
      },
      "basicInfo": {
        "map": {
          "towel.color": "towelColor"
        },
        "customAttributes": ["fullName"],
        "include": ["species"]
      }
    }
  }

}

let fordPresenter = new FordPresenter(ford, "basicInfo");
// {"fullName": "Ford Prefect", "towelColor": "red", "species": "Betelgeusian"}

```
### Usage with [Betelgeuse](https://github.com/MarcosRava/betelgeuse)

```js

import Betelgeuse, { Types } from 'betelgeuse';
import ModelPrefect from 'model-prefect';

ModelPrefect.goesToBetelgeuse(Betelgeuse); // Add `toPresenter` function to Betelgeuse instances

class Towel extends Betelgeuse {

  static schema = {
    color: {
      type: Types.string,
      minLength: 3
    }
  }

}

class Ford extends Betelgeuse {

  static schema = {
    firstName: {
      type: Types.string,
      minLength: 3
    },
    lastName: {
      type: Types.string,
      minLength: 3
    },
    nickname: {
      type: Types.string,
      minLength: 3
    },
    towel: {
      ref: Towel
    }
    species:  Types.string
  }

  static presenter = {
    "customAttributes": {
      fullName: function (data, customAttributes) {
        return {
          value: data.firstName + ' ' + data.lastName
        }
      }
    },
    "strategies": {
      "info": {
        "map": {
          "firstName": "name",
          "towel.color": "towelColor"
        },
        "customAttributes": ["fullName"],
        "exclude" : ["nickname", "lastName", "towel"]
      },
      "basicInfo": {
        "map": {
          "towel.color": "towelColor"
        },
        "customAttributes": ["fullName"],
        "include": ["species"]
      }
    }
  }
}

let ford = new Ford({
  firstName: "Ford",
  lastName: "Prefect",
  nickname: "Ix",
  species: "Betelgeusian",
  towel : {
    color: 'red'
  }
});

ford.toPresenter('basicInfo');
// {"fullName": "Ford Prefect", "towelColor": "red", "species": "Betelgeusian"}

```

#### Inherit from Betelgeuse instances (?)

```js

class FordPresenter extends ModelPrefect {

  static presenter = {
    "betelgeuse" : true, // generate validation schema
    "customAttributes": {
      fullName: function (data, customAttributes) {
        return {
          value: data.firstName + ' ' + data.lastName
        }
      }
    },
    "strategies": {
      "info": {
        "map": {
          "firstName": "name"
        },
        "customAttributes": ["fullName"],
        "exclude" : ["nickname", "lastName"]
      },
      "basicInfo": {
        "map": {
          "towel.color": "towelColor"
        },
        "customAttributes": ["fullName"],
        "include": ["species"]
      }
    }
  }
}

let fordPresenter = new FordPresenter(ford, 'info');
/*
{
  "name": "Ford Prefect",
  "species": "Betelgeusian",
  "_schema": {
    "fullName": {
      "type": "string"
    },
    "name": {
      "type": "string",
      "minLength": 3
    },
    "species": {
      "type": "string"
    },
    "towel": {
      "type: "object",
      "properties": {
        "color": {
          "type": "string",
          "minLength": 3
        }
      }
    }
  }
}
*/

fordPresenter.prototype instance of Betelgeuse
// true
fordPresenter.validate
// Function.validate
fordPresenter.fields()
// {"name": "Ford", "fullName": "Ford Prefect", towel": { "color": "red"}, "species": "Betelgeusian"}


```

