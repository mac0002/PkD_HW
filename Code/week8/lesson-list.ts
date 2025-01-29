type Pair<H, T> = [H, T];
type List<T> = null | [T, List<T>];

function pair<H, T>(hd: H, tl: T): Pair<H, T> {
    return [hd, tl];
}

function head<H, T>(p: Pair<H, T>): H {
    return p[0];
}

function tail<H, T>(p: Pair<H, T>): T {
    return p[1];
}

function is_null(v: any): v is null {
    return v === null;
}

// uncomment and type the following:
// function append(xs, ys) {
//     return is_null(xs)
//            ? ys
//            : pair(head(xs), append(tail(xs), ys));
// }

// function list(...elements) { // elements is an array
//     let lst = null
//     for (let i = elements.length - 1; i >= 0; i -= 1) {
//         lst = pair(elements[i], lst);
//     }
//     return lst;
// }