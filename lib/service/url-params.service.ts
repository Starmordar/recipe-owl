import type { ReadonlyURLSearchParams } from 'next/navigation';

type Params = Record<string | number, Array<string>>;

class UrlParamsService {
  private searchParams: URLSearchParams;

  constructor(searchParams: ReadonlyURLSearchParams) {
    this.searchParams = new URLSearchParams(searchParams);
  }

  refresh(searchParams: ReadonlyURLSearchParams) {
    this.searchParams = new URLSearchParams(searchParams);
  }

  insert(params: Params): void {
    for (const [categoryId, values] of Object.entries(params)) {
      values.forEach((value) => this.searchParams.append(categoryId, value));
    }
  }

  fromKeys(keys: Array<string>): Params {
    const params = keys.reduce((params, key) => {
      const values = this.searchParams.getAll(key);
      return values.length > 0 ? { ...params, [key]: values } : params;
    }, {});

    return params;
  }

  clear(keys: Array<string>): void {
    keys.forEach((key) => this.searchParams.delete(key));
  }

  toString(): string {
    return this.searchParams.toString();
  }
}

export default UrlParamsService;
