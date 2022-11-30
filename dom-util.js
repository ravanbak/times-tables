function createElement(args) {
    if (!args.tag) return;

    const el = document.createElement(args.tag);

    for (const [key, value] of Object.entries(args)) {
        if (key === 'classList') {
            el[key].add(...value);
        }
        else if (key === 'parent') {
            args.parent?.appendChild(el);
        }
        else {
            el[key] = value;
        }
    }
    
    return el;
}

function deleteAllChildren(selector) {
    // Delete all children of the selected element 
    // and return the selected element.

    const parent = document.querySelector(selector);

    while (parent?.firstChild) {
        parent?.removeChild(parent?.lastChild);
    }

    return parent;
}