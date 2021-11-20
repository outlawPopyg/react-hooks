# useEffect
---
If we want, we can even clean up or cancel the promise-based token in Axios, we could do that with the clean-up method discussed above.
```js
useEffect(() => {
    const source = axios.CancelToken.source(); 

    const fetchUserIds = () => {
      axios
        .get(`${endPoint}/${currentID}`, {
          cancelToken: source.token
        })
        .then(({ data }) => setUser(data));
    };

    fetchUserIds();

    return () => source.cancel();
  }, [currentID]);
```
Here, we passed the Axios’ token as a second parameter to `axios.get`. When the component unmounts we then canceled the subscription by calling the cancel method of the source object.
