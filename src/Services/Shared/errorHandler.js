const errorHandler = (datastore, event, error) => {
  // for example
  console.log({ error });
  // datastore, 'find', error, [{ foo: 'bar' }, {}]
  console.log('Deu erro seu Jacú!!');
};

module.exports = errorHandler;
