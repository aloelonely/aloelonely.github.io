class ImportContent extends HTMLElement {
  
  get path() {
    return this.getAttribute('path') || '';
  }
  
  get loading() {
    return this.getAttribute('loading') || 'auto';
  }
  
  connectedCallback() {
    this.innerHTML = `
      <iframe src="${this.path}" loading="${this.loading}"></iframe>
    `;
    
    const frame = this.querySelector('iframe');
    
    frame.addEventListener('load', evt => {
      const children = [...frame.contentDocument.body.children];

      children.forEach(child => frame.before(child)); 
      
      frame.remove();
    });
  }
}

if ('customElements' in window) {
  customElements.define('import-content', ImportContent);
}

export default ImportContent;