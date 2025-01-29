import {
    empty, is_empty, enqueue, head, dequeue, display_queue
} from './prio_queue_nonstarving';

const q = empty<string>();

enqueue(2, "a", q); enqueue(7, "b", q); enqueue(7, "c", q); enqueue(4, "d", q);
console.log("expected queue: [7-b, 7-c, 4-d, 2-a]");
display_queue(q);

dequeue(q);
console.log("expected queue: [8-c, 5-d, 3-a]");
display_queue(q);

// testing capping at 10
enqueue(15, "e", q); enqueue(8, "f", q); enqueue(8, "g", q);
enqueue(8, "h", q); enqueue(8, "k", q);
console.log("first element has priority 10: 10-e:");
display_queue(q);
dequeue(q); dequeue(q); dequeue(q); dequeue(q);
console.log("expected queue: 10-h, 10-k, 9-d, 7-a");
display_queue(q);
dequeue(q);
console.log("expected queue: 10-k, 10-d, 8-a");
display_queue(q);
dequeue(q);
console.log("expected queue: 10-d, 9-a");
display_queue(q);