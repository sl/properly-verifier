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
    'optional': function(property, present) {
      if (this.properties.hasOwnProperty(property)
        && this.properties[property] !== undefined) {
        present(properties[property]);
      } else {
        this.missing.push(property);
      }
      return this;
    },
    'optionalNonNull': function(property, present) {
      if (this.properties.hasOwnProperty(property)
        && this.properties[property] !== undefined
        && this.properties[property] !== null) {
        present(properties[property]);
      } else {
        this.missing.push(property);
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