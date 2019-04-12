const {createDBConnection, insertFinData, closeDB} = require('./dao');

// Test code snippet
let db = createDBConnection();
insertFinData(db, {
  id: '76612ae6401e4804a9e58c117045db45',
  category: '汽车周边',
  subcategory: '停车费',
  amount: 80.00,
  comment: '八佰伴',
  date: '2018-03-18 19:42:12'
});
closeDB(db);