import { host } from "../config/endPoints";
import { getError } from "../redux/actions/error.ac";
import { disableLoader, enableLoader } from "../redux/actions/loader.ac";

const customFetch = async (dispatch, url, options) => {
  let result = {status:null, data:undefined}
    dispatch(enableLoader())
    try {
      const response = await fetch(host + url, options)
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        result.data = await response.json()
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
