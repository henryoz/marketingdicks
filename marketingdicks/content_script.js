walk(document.body);

function walk(node) 
{
	// I also stole this function from here:
	// http://is.gd/mwZp7E
	
	var child, next;

	switch ( node.nodeType )  
	{
		case 1:  // Element
		case 9:  // Document
		case 11: // Document fragment
			child = node.firstChild;
			while ( child ) 
			{
				next = child.nextSibling;
				walk(child);
				child = next;
			}
			break;

		case 3: // Text node
            if(node.parentElement.tagName.toLowerCase() != "script") {
                handleText(node);
            }
			break;
	}
}

function handleText(textNode) {
	var v = textNode.nodeValue;

	// Grab basic instances of the word "brand" but ignore whatever annoying edge cases I find.
	// Hacky, but it'll do for now.
	if (!v.match(/brand new|brandweiner|brandenburg|brandish|brandy/i)) {
		v = v.replace(/(B|b)rand/g, function(match, p1, offset, string) {
			// b + 2 = d
			d = String.fromCharCode(p1.charCodeAt(0) + 2);
			return d + "ick";
		});
	}
	textNode.nodeValue = v;
}