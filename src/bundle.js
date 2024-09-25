const getRelativeUrlFromDocument = (relativePath, umd = false) => 
  getResolveUrl(
    `'${escapeId(relativePath)}', ${umd ? `typeof document === 'undefined' ? location.href : ` : ''} 
    document.currentScript && document.currentScript.tagName.toUpperCase() === 'SCRIPT' && 
    document.currentScript.src || document.baseURI`
  );

const getUrlFromDocument = (chunkId, umd = false) => 
  `${umd ? `typeof document === 'undefined' ? location.href : ` : ''} 
  (${DOCUMENT_CURRENT_SCRIPT} && ${DOCUMENT_CURRENT_SCRIPT}.tagName.toUpperCase() === 'SCRIPT' && 
  ${DOCUMENT_CURRENT_SCRIPT}.src || new URL('${escapeId(chunkId)}', document.baseURI).href)`;
