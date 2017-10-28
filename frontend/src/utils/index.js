export const int = (str) =>
parseInt(str, 10);

export const isNumeric = (val) =>
!isNaN(val - parseFloat(val));

export const sortNumeric = (a, b) =>
a - b;

export const sortString = (a, b) => {
  const upA = a.toUpperCase();
  const upB = b.toUpperCase();
  return (upA > upB) ? 1 : ((upA < upB) ? -1 : 0);
};

export const sortBy = (prop) => (a, b) =>
isNumeric(a[prop])
  ? sortNumeric(a[prop], b[prop])
  : sortString(a[prop], b[prop]);

export const desc = (func) => (a, b) =>
func(b, a);

export const isDesc = (func, direction) =>
(direction === 'desc')
  ? desc(func)
  : func;

export const listOf = (prop, items) =>
[...new Set(items.map(item => item[prop]))];

export const filterBy = (by, items, compare) =>
items.filter(item => item[by] === compare);

export const getById = (items, id) =>
filterBy('id', items, id)[0];

export const filterDeleted = (items) =>
filterBy('deleted', items, false);

export const isIn = (str, arr, def) =>
arr.includes(str) ? str : ((def) ? def : '');

export const zero = (str) =>
(String(str).length < 2)
  ? `0${str}`
  : str;

export const formatTime = (timestamp) => {
const t = new Date(timestamp);
return t.toLocaleString();
};

export const formatExcerptBody = (body) => {
let excerpt = body.substring(0, 200);
return (body.length < 200)
  ? excerpt
  : `${excerpt}...`;
};

export const updateProp = (obj, action, prop) => ({
...obj,
[prop]: action[prop]
});

export const generateId = () => {
  let text = '';
  const possible = 'abcdefghijklmnopqrstuvwxyz0123456789';
  for(let i = 0; i < 22; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

export const newPostId = (posts) => {
let id = generateId();
return (!!getById(posts, id))
  ? newPostId(posts)
  : id;
};

export const generateTimestamp = () =>
Date.now();

export const modalPostStyle = {
  content : {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    width: '700px',
    height: '600px',
    transform: 'translate(-50%, -50%)'
  }
};

export const modalCommentStyle = {
  content : {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    width: '600px',
    height: '450px',
    transform: 'translate(-50%, -50%)'
  }
};

export const getPathArray = (pathName) => {
  let pathArray = [];
  let paths = pathName.split('/');
  
  if (paths.length >= 1)  {
      pathArray = paths;
  } 
  
  return pathArray;
}

export const capitalizeFirstLetter = (item) => {
  return item.charAt(0).toUpperCase() + item.slice(1);
}
