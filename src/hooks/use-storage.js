import { useCallback, useEffect, useState } from 'react';

const useStorage = initialValues => {
  const [values, setValues] = useState(initialValues);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const isValidKey = useCallback(key => Object.keys(initialValues).includes(key), [initialValues]);

  const set = useCallback(async nextValues => {
    try {
      setError(null);
      if (Object.keys(nextValues).some(key => !isValidKey(key))) {
        throw Error('Unknown key');
      }
      await browser.storage.sync.set(nextValues);
      setValues({
        ...values,
        ...nextValues
      });
    } catch (err) {
      setError(err);
    }
  }, [isValidKey, values]);

  useEffect(() => {
    const restore = async () => {
      const nextValues = await browser.storage.sync.get(initialValues);
      setValues(nextValues);
    };

    restore().catch(err => {
      setError(err);
    }).finally(() => {
      setLoading(false);
    });
  }, [initialValues]);

  return [
    values,
    {
      error,
      loading,
      set
    }
  ];
};

export { useStorage };

export default useStorage;
