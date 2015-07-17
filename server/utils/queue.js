module.exports = { 
  queryQueue: [],
  /**
   * function to dequeue keywords for streaming server to retrieve
   * @function
   */
  dequeue: function(numberOfKeywords) {
    var returnedKeywords = [];
    //if no keywords in queue, return empty string
    if (module.exports.queryQueue.length === 0) {
      return returnedKeywords;
    }
    while (numberOfKeywords > 0) {
      console.log('called');
      //if queryQueue runs out of items, stop pushing keywords
      if (module.exports.queryQueue.length === 0) {
        break;
      }
      returnedKeywords.push(module.exports.queryQueue.shift());
      numberOfKeywords--;
    }
    return returnedKeywords;
  },
  
  /**
   * function to queue keywords for streaming server to retrieve if they don't exist in queue
   * @function
   */
  checkDuplicates: function(keyword) {
    if (module.exports.queryQueue.indexOf(keyword) > -1) {
      return;
    } else {
      module.exports.queryQueue.push(keyword);
    }
  }
};
