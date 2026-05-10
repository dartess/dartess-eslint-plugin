# Disallow the use of MobX flow in favor of async/await with actions (mobx-no-flow)

Disallow MobX generator-based `flow` in favor of `async/await` with actions (`runInAction` or `@action`).

MobX `flow` wraps generator functions to make them reactive, but generators are harder to read, debug,
and type compared to native `async/await`. The same result is achievable with `async/await` by wrapping
state mutations in `runInAction` or marking the method with `@action`.

## Rule Details

Examples of **incorrect** code for this rule:

```ts
import { flow } from 'mobx';

class Store {
  @observable
  public loading = false;
  
  @observable
  public data = [];

  @flow
  *fetchData() {
    this.loading = true;
    this.data = yield fetch('/api/data').then(r => r.json());
    this.loading = false;
  }
}
```

Examples of **correct** code for this rule:

```ts
import { action, runInAction } from 'mobx';

class Store {
  @observable
  public loading = false;

  @observable
  public data = [];

  async fetchData() {
    runInAction(() => this.loading = true);
    const data = await fetch('/api/data').then(r => r.json());
    runInAction(() => {
      this.data = data;
      this.loading = false;
    });
  }
}
```

or

```ts
import { action, runInAction } from 'mobx';

class Store {
  @observable
  public loading = false;

  @observable
  public data = [];

  @action
  private setLoading(value: boolean) {
    this.loading = loading;
  }

  @action
  private setData(data: Array<unknown>) {
    this.data = data;
  }

  async fetchData() {
    this.setLoading(true);
    const data = await fetch('/api/data').then(r => r.json());
    this.setData(data);
    this.setLoading(false);
  }
}
```