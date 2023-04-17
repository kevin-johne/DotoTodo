import { test, assert } from 'vitest'
import { move } from "./index";
import { Todo } from './types/types';

test( 'should move item from lower to higher position' , () => {
  const list = [
    {
      pos: 0,
      name: 'react',
      checked: false
    },
    {
      pos: 1,
      name: 'angular',
      checked: false
    },
    {
      pos: 2,
      name: 'vue',
      checked: false
    }
  ] as Todo[];

  move(list, 0, 2);

  assert.equal(list[0].name, 'angular');
  assert.equal(list[0].pos, 0);
  assert.equal(list[1].name, 'vue');
  assert.equal(list[1].pos, 1);
  assert.equal(list[2].name, 'react');
  assert.equal(list[2].pos, 2);
});

test( 'should move item by one position up' , () => {
  const list = [
    {
      pos: 0,
      name: 'react',
      checked: false
    },
    {
      pos: 1,
      name: 'angular',
      checked: false
    },
    {
      pos: 2,
      name: 'vue',
      checked: false
    }
  ] as Todo[];

  move(list, 0, 1);

  assert.equal(list[0].name, 'angular');
  assert.equal(list[0].pos, 0);
  assert.equal(list[1].name, 'react');
  assert.equal(list[1].pos, 1);
  assert.equal(list[2].name, 'vue');
  assert.equal(list[2].pos, 2);
});

test( 'should move item from higher to lower position' , () => {
  const list = [
    {
      pos: 0,
      name: 'react',
      checked: false
    },
    {
      pos: 1,
      name: 'angular',
      checked: false
    },
    {
      pos: 2,
      name: 'vue',
      checked: false
    }
  ] as Todo[];

  move(list, 2, 0);

  assert.equal(list[0].name, 'vue');
  assert.equal(list[0].pos, 0);
  assert.equal(list[1].name, 'react');
  assert.equal(list[1].pos, 1);
  assert.equal(list[2].name, 'angular');
  assert.equal(list[2].pos, 2);
});

test( 'should move item one position lower' , () => {
  const list = [
    {
      pos: 0,
      name: 'react',
      checked: false
    },
    {
      pos: 1,
      name: 'angular',
      checked: false
    },
    {
      pos: 2,
      name: 'vue',
      checked: false
    }
  ] as Todo[];

  move(list, 2, 1);

  assert.equal(list[0].name, 'react');
  assert.equal(list[0].pos, 0);
  assert.equal(list[1].name, 'vue');
  assert.equal(list[1].pos, 1);
  assert.equal(list[2].name, 'angular');
  assert.equal(list[2].pos, 2);
});

test( 'should not move a position' , () => {
  const list = [
    {
      pos: 0,
      name: 'react',
      checked: false
    },
    {
      pos: 1,
      name: 'angular',
      checked: false
    },
    {
      pos: 2,
      name: 'vue',
      checked: false
    }
  ] as Todo[];

  move(list, 2, 2);

  assert.equal(list[0].name, 'react');
  assert.equal(list[0].pos, 0);
  assert.equal(list[1].name, 'angular');
  assert.equal(list[1].pos, 1);
  assert.equal(list[2].name, 'vue');
  assert.equal(list[2].pos, 2);
});



