import { } from 'solid-js';


export function CheckAuth() {
  try {
    if (window.localStorage.getItem("AuthToken") != null) {
      return true
    }
  }
  catch {
    return false
  }
}
