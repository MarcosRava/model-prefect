//
//  toPresenter() {
//    let rawData = {};
//    let presenter = this.presenter || {};
//    let properties = presenter.properties || {};
//    let fields = this._getPresenterFields();
//    for(let i in fields) {
//      let field = fields[i];
//      rawData[properties[field] || field] = this[field]
//    }
//
//    return rawData;
//  }
//
//
//  _getPresenterFields() {
//    let fields = [];
//    let presenter = this.presenter;
//    let exclude = presenter.exclude || [];
//    //let include = presenter.include || [];
//    for(let field in this.schema) {
//      if (exclude.indexOf(field) === -1) {
//        fields.push(field);
//      }
//    }
//    return fields;
//  }
//
//  static fromPresenter(data) {
//    let rawData = {};
//    let presenterProperties = this._getFromPresenterFields();
//
//    for (let field in data) {
//      rawData[presenterProperties[field] || field] = data[field];
//    }
//    return new this(rawData);
//  }
//
//
//  static _getFromPresenterFields() {
//    let fields = {};
//    let presenter = this.presenter || {};
//    let properties = presenter.properties || {};
//    for (let field in properties) {
//      fields[properties[field]] = field;
//    }
//    return fields
//  }
//
////Object.byString =
//function byString(o, s) {
//    s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
//    s = s.replace(/^\./, '');           // strip a leading dot
//    var a = s.split('.');
//    for (var i = 0, n = a.length; i < n; ++i) {
//        var k = a[i];
//        if (k in o) {
//            o = o[k];
//        } else {
//            return;
//        }
//    }
//    return o;
//}
