import { host } from "../config/endPoints";
import { getError, getInfo } from "../redux/actions/error.ac";
import { disableLoader, enableLoader } from "../redux/actions/loader.ac";

const customFetch = async (dispatch, url, options) => {
  let result = {status:null, data:undefined}
    dispatch(enableLoader())
    try {
      const response = await fetch(host + url, options)
      const contentType = response.headers.get("content-type");

      if (contentType && contentType.indexOf("application/json") !== -1) {
        result.data = await response.json()
        if(result.data.hasOwnProperty("error")) {
          dispatch(getError(result.data.error))
        } else if (result.data.hasOwnProperty("info")) {
          dispatch(getInfo(result.data.info))
        }
      }
      
      result.status = response.status
      dispatch(disableLoader())
    } catch (err) {
      dispatch(getError(err.message))
      dispatch(disableLoader())
    }
    return result;
}

export default customFetch;
