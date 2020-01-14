var testA = async () => {
  let res = await testPromise();
  console.log(res);
  return res.status;
};

var testPromise = () => {
  let promise = new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: true
      });
    }, 1000);
  });

  return promise;
};

var testB = () => {
  console.log('before testA');
  testA();
  console.log('after testA');
};

var testC = async () => {
  console.log('before testA');
  await testA();
  console.log('after testA');
};