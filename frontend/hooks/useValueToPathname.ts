import { usePathname, useSearchParams } from 'next/navigation';

function useValueToPathname() {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  function valueToPathname(key: string, value: string): string {
    const params = new URLSearchParams(searchParams);

    if (value) params.set(key, value);
    else params.delete(key);

    return `${pathname}?${params.toString()}`;
  }

  function valuesToPathname(
    keyValuesMap: Record<string, Array<string>>,
    prevKeys?: Array<string>
  ): string {
    const params = new URLSearchParams(searchParams);

    if (prevKeys) prevKeys.forEach((key) => params.delete(key));

    for (const [key, values] of Object.entries(keyValuesMap)) {
      params.delete(key);
      values.forEach((value) => params.append(key, value));
    }

    return `${pathname}?${params.toString()}`;
  }

  function valueFromPathname(key: string): string {
    const params = new URLSearchParams(searchParams);
    return params.get(key) ?? '';
  }

  function valuesFromPathname(keys: Array<string>): Record<string, Array<string>> {
    const params = new URLSearchParams(searchParams);

    const values = keys.reduce((acc, key) => {
      const values = params.getAll(key);
      return values.length > 0 ? { ...acc, [key]: values } : acc;
    }, {});

    return values;
  }

  return { valueToPathname, valuesToPathname, valueFromPathname, valuesFromPathname };
}

export default useValueToPathname;
