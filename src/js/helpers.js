//stuff to help application

export const getJSON = async function (url) {
  //does fetching and converting to json all in one
  try {
    const res = await fetch(url);
    const data = await res.json(); //returns another promise
    //data from serer, ok property is coming from response itself
    //invalid id 400
    // console.log(res);
    console.log(data);
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data; //will be resolved value of the promise in the function
  } catch (err) {
    throw err; //rethrow error so PROMISE from get json gets rejected
  }
};
