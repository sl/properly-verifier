var check = function (properties) {
  return {
    'properties': properties,
    'missing': [],
    'failed': false,
    'fail': function(property) {
      this.missing.push(property);
      this.failed = true;
      return this;
    },
    'require': function(property) {
      if (this.properties.hasOwnProperty(property)
        && this.properties[property] !== undefined) {
        return this;
      } else {
        return this.fail(property)
      }
    },
    'requireNonNull': function(property) {
      if (this.properties.hasOwnProperty(property)
        && this.properties[property] !== undefined
        && this.properties[property] !== null) {
        return this;
      } else {
        return this.fail(property)
      }
    },
    'optional': function(property, default) {
      if (!this.properties.hasOwnProperty(property)
        || this.properties[property] === undefined) {
        if (this.arguments.length < 2) {
          this.missing.push(property);
        } else {
          this.properties[property] = default;
        }
      }
      return this;
    },
    'optionalNonNull': function(property, default) {
      if (!this.properties.hasOwnProperty(property)
        || this.properties[property] === undefined
        || this.properties[property] === null) {
        if (this.arguments.length < 2) {
          this.missing.push(property);
        } else {
          this.properties[property] = default;
        }
      }
      return this;
    },
    'validate': function() {
      if (this.failed) {
        var missingProps = 'The property check failed. The following required properties were missing: ';
        missingProps += this.missing.map((x) => '"' + x + '"').join(", ");
        throw new Error(missingProps);
      }
      return this.properties;
    },
    'close': function() {
      return this.properties;
    }
  }
}

module.exports = {
  'check': check
}