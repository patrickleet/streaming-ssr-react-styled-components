
    /* eslint-disable */
    /* tslint:disable */
     
    import {assignImportedComponents} from 'react-imported-component';
    
    const applicationImports = [
      () => import('./pages/About'),
    ];
    
    assignImportedComponents(applicationImports);
    export default applicationImports;