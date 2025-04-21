import axios from 'axios';

const controllerMap = new Map();

export function createAbortController(key) {
  const existing = controllerMap.get(key);
  if (existing) existing.abort();
  const controller = new AbortController();
  controllerMap.set(key, controller);
  return controller.signal;
}

export function cancelRequest(key) {
  const controller = controllerMap.get(key);
  if (controller) controller.abort();
  controllerMap.delete(key);
}

export function cancelAllRequests() {
  for (let key of controllerMap.keys()) cancelRequest(key);
}

export function handleAxiosError(error) {
  if (
    axios.isCancel(error) ||
    error.name === 'AbortError' ||
    error.name === 'CanceledError'
  ) {
    return;
  } else {
    console.error('Error:', error);
    throw error;
  }
}
