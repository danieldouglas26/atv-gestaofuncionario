import { CanDeactivateFn } from '@angular/router';

export interface CanComponentDeactivate {

  hasUnsavedChanges(): boolean;
}


export const unsavedChangesGuard: CanDeactivateFn<CanComponentDeactivate> = (
  component: CanComponentDeactivate,
  currentRoute,
  currentState,
  nextState
) => {



  if (!component.hasUnsavedChanges()) {
    return true;
  }


  return confirm(
    'AVISO: Você possui alterações não salvas!\n\nDeseja realmente sair desta página e perder os dados?'
  );
};
