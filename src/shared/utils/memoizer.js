/* Based on memoize-one `memoize()` function */

const simpleIsEqual = (a, b) => a === b;

function Memoizer(isEqual = simpleIsEqual) {
  let lastThis;
  let lastArgs = [];
  let calledOnce = false;

  const isNewArgEqualToLast = (newArg, index) => isEqual(newArg, lastArgs[index]);

  return {
    hasChanged: (...newArgs) => {
      if (calledOnce
        && lastThis === this
        && newArgs.length === lastArgs.length
        && newArgs.every(isNewArgEqualToLast)) {
        return false;
      }

      calledOnce = true;
      lastThis = this;
      lastArgs = newArgs;
      return true;
    },
  };
}

export default Memoizer;
