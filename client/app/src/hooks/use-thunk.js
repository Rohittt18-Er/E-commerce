import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";

export function useThunk(thunk) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorFlag,setErrorFlag] = useState(false)
  const [successMsg, setSuccessMsg] = useState(null);
  const dispatch = useDispatch();

  const runThunk = useCallback(
    (arg) => {
      setIsLoading(true);
      setSuccessMsg(null);
      dispatch(thunk(arg))
        .unwrap()
        .then((response) => {
          console.log("response",response.message);
          if (response && response.message) {
            setSuccessMsg(response.message); 
            setErrorFlag(false)
          } else {
            setSuccessMsg("Operation successful."); 
          }
        })
        .catch((err) => {setError(err)
          setErrorFlag(true)
        }
      
      )
        .finally(() => setIsLoading(false));
    },
    [dispatch, thunk]
  );

  return [runThunk, isLoading, error, successMsg,errorFlag];
}
