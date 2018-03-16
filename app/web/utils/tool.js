export const isEmpty = (v) => {
  if (v instanceof Array) return v.length === 0;
  if (typeof v === 'object') return Object.keys(v).length === 0;
  if (typeof v === 'string') return v.trim().length === 0;
  return false;
};

export const encode = (obj) => {
  const kvList = [];
  Object.keys(obj).forEach(k => {
    let kv = obj[k];
    if (typeof kv === 'boolean') {
      kv = kv ? 'true' : 'false';
      kvList.push(`${k}=${kv}`);
    } else if (kv instanceof Array) {
      kv.forEach(v => {
        kvList.push(`${k}=${encodeURIComponent(v)}`);
      });
    } else {
      kvList.push(`${k}=${encodeURIComponent(kv)}`);
    }
  });
  return kvList.join('&');
};

export const getTime = () => {
  const dt = new Date();
  const hh = '0' + dt.getHours();
  const mm = '0' + dt.getMinutes();
  return hh.substr(-2, 2) + ':' + mm.substr(-2, 2);
};

export const handleResponse = (obj, cb) => {
  const {loading, success, result} = obj;
  if (!loading && success) {
    cb(result);
  }
};
