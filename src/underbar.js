(function() {
  'use strict';

  // testing 
  // this is another comment ok.

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    if (n === 0) {
      return [];
    } else {
    //  console.log(n);
    return n === undefined ? array[array.length - 1] : array.slice(-n);
    }
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
   
    if (Array.isArray(collection)){
      for (var i =0; i < collection.length; i++){
       iterator(collection[i], i, collection)
      }
    } else {
      for (var j in collection) {
      iterator(collection[j], j, collection)
      }
    }
    
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, targetValue){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(element, index) {
      if (element === targetValue && result === -1) {
        result = index;
      }
    });
    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    var arr = [];

      _.each(collection, function(element, index){
        if (test(element) === true) {
          arr.push(element);
        } 
      })
     return arr;  
    //for (var i =0; i < collection.length; i++){
     // 1. **** if truth test then
    //   arr.push(collection[i]);
     // }
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
      var arr = [];

      _.filter(collection, function(element, index){
        if (test(element) === false) {
          arr.push(element);
        }    
      })

    return arr; 
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array, isSorted, funcOutput) {
    var duplicateFreeArr = [];  

//    console.log(funcOutput)
    var trueCount = 0;
    var falseCount = 0;


      if(isSorted){
        _.each(array, function(element){
          if (funcOutput(element) === true && trueCount === 0){
              if (!duplicateFreeArr.includes(element)) {
                duplicateFreeArr.push(element);                
              }
            trueCount ++;   
          } else if (funcOutput(element) === false && falseCount === 0 ){
              if (!duplicateFreeArr.includes(element)) {
                duplicateFreeArr.push(element); 
              }        
            falseCount ++;
          }
        }) 
    } else {

      for(var i = 0; i < array.length; i++) {
        if (!duplicateFreeArr.includes(array[i])) {
          duplicateFreeArr.push(array[i]);
        }
      }
    }
    return duplicateFreeArr;
  }; 


  // Return the results of applying an iterator to each element.
  _.map = function(collection, action) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var arr = [];

    _.each(collection, function(element){
      arr.push(action(element));
    })

    return arr;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //  
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //  
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //  
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function(collection, iterator, accumulator) {

// what is this test asking me to fix?
       _.each(collection, function(element, index){ 
        // change accumulator undefined as it's not what i need to test. Need to chnage to test
        // first run. 
        if(accumulator === undefined && index === 0){
          accumulator = element;
        } else {
          accumulator = iterator(accumulator, element);
        }
      })
      return accumulator;
  };

/*
acc     un->1    1    un->2 
element   1      1      2         
index     0      1      2
item(el)  -      1      -  
total(ac) -      1      -
callCount 0     0->1    1
callback  0      √      x
(how many times is iterator invoked)
*/

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };

  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {

  // TIP: Try re-using reduce() here.
    iterator = iterator || _.identity;

/*
    if (!iterator){
      iterator = _.identity;
    } 
*/

    if(collection.length < 1){
      return true;
    }

    return _.reduce(collection, function(acc, element){
                    
          if(!acc){
            return false;
          }          

          if(iterator(element)){
            return true;
          } 
          return false;
      }, true);    
  };


  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(coll, iterator) {

   iterator = iterator || _.identity;

    // TIP: There's a very clever way to re-use every() here.
      return !_.every(coll, function(element, index){
        if (iterator(element)){
          return false;
        } else {
          return true;
        }
      });
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  
  // objA = {a:2, b:3, c:6};
  // objB = {a:5, e:56, f:89};  

  
  //_.extend(objA, objB); // (destination / source) // objA = {a:5, b:3, c:6, e:56, f:89} or objB = {a:2, b:3, c:6, e:56, f:89}

/*
  _.extend = function(obj1, obj2) {
  //  loop through source obj2   
  //  add obj2 keys and values to obj1
  //  return destination obj1
    if (JSON.stringify(obj1) === JSON.stringify({}) && JSON.stringify(obj2) === JSON.stringify({}) ){
      return obj1;
    }  

    for (var key in obj2){
       obj1[key] = obj2[key];
    }

    return obj1;
  };


*/
  _.extend = function(obj) {
  //  loop through source obj2   
  //  add obj2 keys and values to obj1
  //  return destination obj1

  for (var i = 1; i < arguments.length; i++){
    for (var key in arguments[i]){
       obj[key] = arguments[i][key];
    }
  }
  
  return obj;
  };


  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {

    for (var i = 1; i < arguments.length; i++){
      for (var key in arguments[i]){

        // if argument i's key is the same string as the first argument key do nothing, else add the key 
        // arguments[0]

        if(!arguments[0].hasOwnProperty(key)){
           obj[key] = arguments[i][key];
        } 
        // arguments[0].hasOwnProperty(key) ? null : obj[key] = arguments[i][key];
      }
    }
    return obj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return the previously calculated value
  // instead if possible.
  _.memoize = function(func) {
     //  
    var obj = {};
    // var args = JSON.stringify(arguments);
 //   var args = [].slice.call(arguments);
 //   var myArgs = args.slice(0);
   
//    console.log('my args = ', myArgs);
//    console.log('my arguments = ', arguments);

    return function(){
      var args = JSON.stringify(arguments);

      if (obj[args]){
        return obj[args];
      } else { 
     // console.log('my args = ', args);

        for (var i = 0; i < arguments.length; i++){
          if (!obj.hasOwnProperty(args)){
            obj[args] = func.apply(null, arguments);
          }
     //   console.log(obj[args]);
        return obj[args];
        }
      }
    }

     // store result in obj
     // if arguments exist already use previous result
     // return obj 

  };




  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {

//    var argz = Array.prototype.slice.call(arguments);
//    console.log('my argz = ', argz);
    
    var args = [].slice.call(arguments);
 //   var args1 = args.slice(0,1);

    var myArgs = args.slice(2);

  // var myArgs = args1.concat(args2)
  // console.log('my args = ', myArgs);
  // console.log('my args1 = ', args1);
  // console.log('my args2 = ', args2);
  
  // review set time out // 
    setTimeout(function(){
        func.apply(null, myArgs);
    }, wait);
  
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    var newArr = array.slice();

      // Do the Durstenfeld shuffle
      for (var i = newArr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = newArr[i];
        newArr[i] = newArr[j];
        newArr[j] = temp;
    }
    /*
    get last in newArr array, place last into temp
    last position in newArray = newArr random.
    newArr random = temp (last position) 
    newArr last is removed

    */

    return newArr;
  };


  /**
   * ADVANCED
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
  };
}());
