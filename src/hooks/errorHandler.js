import { useEffect, useState } from "react";

export default (httpClient) => {
  const [error, setError] = useState(null);

  // componentWillMount() No need to useEffect beacuse he render before the jsx code {
  const reqInterceptor = httpClient.interceptors.request.use((req) => {
    setError(null);
    return req;
  });
  const resInterceptor = httpClient.interceptors.response.use(
    (res) => res,
    (err) => {
      setError(err);
    }
  );
  // componentWillUnmount() MustNeed to use effect because he need to run AFTER the jsx code{
  useEffect(() => {
    return () => {
      // console.log("Wiil unmount", this.reqInterceptor, this.resInterceptor);
      httpClient.interceptors.request.eject(reqInterceptor);
      httpClient.interceptors.request.eject(resInterceptor);
    };
  }, [reqInterceptor, resInterceptor]);

  const errorConfirmedHandler = () => {
    setError(null);
  };

  return [error, errorConfirmedHandler];
};
