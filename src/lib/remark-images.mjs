// Markdown images live inside the article column, not across the whole viewport.
export default function remarkImages() {
  return (tree) => {
    let firstLocalImage = true;
    function visit(node) {
      if (node.type === 'image' && node.url.startsWith('../assets/')) {
        node.data ??= {};
        node.data.hProperties = {
          ...node.data.hProperties,
          sizes: '(max-width: 480px) calc(100vw - 56px), (max-width: 736px) calc(100vw - 64px), 672px',
          ...(firstLocalImage ? { loading: 'eager', fetchpriority: 'high' } : {}),
        };
        firstLocalImage = false;
      }
      node.children?.forEach(visit);
    }
    visit(tree);
  };
}
