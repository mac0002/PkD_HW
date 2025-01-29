import { list } from '../lib/list';
import { is_balanced } from './balanced';

// "[{()[]}]" is okay, but "[{(])[]}][" is not okay.

console.log("the string \"[{()[]}]\" is okay:");
console.log(is_balanced(list("[", "{", "(", ")", "[", "]", "}", "]")));

console.log("the string \"[{(])[]}][\" is not okay:");
console.log(is_balanced(list("[","{","(","]",")","[","]","}","]","[")));