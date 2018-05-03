/**
 * @see {IMPORTANT}
 * @deprecated
 * @see {NOT-IN-USE-ANYMORE}
 */

const initial = () => {
  let data;
  if (window.localStorage) {
    data = localStorage.getItem('data');
  }
  return data ? JSON.parse(data) : {};
}

export default initial();